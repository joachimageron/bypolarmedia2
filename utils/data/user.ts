'use server';
import {prisma} from "@/prisma/prisma";
import bcrypt from 'bcryptjs';
import path from "path";
import fs from "fs/promises";
import {put} from "@vercel/blob";
import {serverSession} from "@/utils/auth";

/**
 * ---------------------------
 * Méthodes pour les Utilisateurs
 * ---------------------------
 */

/**
 * Créer un nouvel utilisateur
 * @param data{email, name, password}
 */
export async function createUser(data: {
  email: FormDataEntryValue;
  name: FormDataEntryValue;
  password: FormDataEntryValue;
}) {
  const strData = {
    email: String(data.email),
    name: String(data.name),
    password: bcrypt.hashSync(String(data.password), 10),
  };
  return prisma.user.create({
    data: strData,
  });
}

/**
 * Vérifier les informations de connexion d'un utilisateur et le retourne si les informations sont correctes
 * @param email
 * @param password
 */
export async function verifyUserCredentials(email: FormDataEntryValue, password: FormDataEntryValue) {
  const user = await prisma.user.findFirst({
    where: {email: String(email)},
  });
  
  if (user?.password && bcrypt.compareSync(String(password), user.password)) {
    return user;
  } else {
    return null;
  }
}


/**
 * Savoir si un utilisateur existe
 * @param id
 */
export async function userExists(id: string) {
  const user = await prisma.user.findUnique({
    where: {id},
  });
  return !!user;
}

/**
 * Récupérer un utilisateur par son ID
 * @param userId
 */
export async function getUserById(userId: string | null) {
  if (!userId) return null;
  return prisma.user.findUnique({
    where: {id: userId},
    include: {
      followers: true,
      following: true,
    },
  });
}
export type GetUserByIdReturnType = Awaited<ReturnType<typeof getUserById>>;

/**
 * Récupérer les informations de plusieurs utilisateurs à partir d'une liste d'IDs
 * @param userIds - Tableau d'IDs d'utilisateurs
 * @returns Tableau d'objets utilisateur ou tableau vide si aucun utilisateur trouvé
 */
export async function getUsersByIds(userIds: string[]) {
  if (!userIds || userIds.length === 0) {
    return [];
  }
  return prisma.user.findMany({
    where: {
      id: {
        in: userIds,
      },
    },
    include: {
      followers: true,
      following: true,
    },
  });
}

/**
 * Rechercher des utilisateurs par leur nom ou email
 * @param query
 */
export async function getSearchUsers(query: string) {
  return prisma.user.findMany({
    take: 5,
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
  });
}

/**
 * Récupérer un utilisateur par son email
 * @param email
 */
export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {email},
    include: {
      posts: true,
      followers: true,
      following: true,
    },
  });
}

/**
 * Mettre à jour les informations d'un utilisateur
 * @param data{name, description, image, bgImage}
 */
export async function updateUser(
  data: Partial<{
    name?: string;
    description?: string;
    image?: string;    // base64 ou rien
    bgImage?: string | null;  // base64 ou "dell"
  }>
) {
  const session = await serverSession();
  const userId = session?.user.userId;
  if (!session) return null;
  try {
    const isProd = process.env.NODE_ENV === "production";
    
    // 1) Gestion de l'image "profile"
    if (data.image) {
      const buffer = Buffer.from(
        data.image.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
      const ext =
        /^data:(image\/\w+);base64,/.exec(data.image)?.[1].split("/")[1] ?? "png";
      const uniqueFileName = `${userId}_${Date.now()}.${ext}`;
      
      if (isProd) {
        // En PROD: upload via Vercel Blob
        const result = await put(`users/${uniqueFileName}`, buffer, {
          access: "public",
        });
        data.image = result.url; // URL renvoyée par Blob
      } else {
        // En DEV: stockage local
        const uploadPath = path.join(
          process.cwd(),
          "public",
          "uploads",
          "users",
          uniqueFileName
        );
        await fs.writeFile(uploadPath, buffer);
        data.image = `/uploads/users/${uniqueFileName}`;
      }
    }
    
    // 2) Gestion de l'image "bgImage"
    if (data.bgImage === "dell") {
      // "dell" => suppression
      data.bgImage = null;
    } else if (typeof data.bgImage === "string") {
      const buffer = Buffer.from(
        data.bgImage.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
      const ext =
        /^data:(image\/\w+);base64,/.exec(data.bgImage)?.[1].split("/")[1] ??
        "png";
      const uniqueFileName = `${userId}_${Date.now()}.${ext}`;
      
      if (isProd) {
        // En PROD: upload via Vercel Blob
        const result = await put(`users/${uniqueFileName}`, buffer, {
          access: "public",
        });
        data.bgImage = result.url;
      } else {
        // En DEV: stockage local
        const uploadPath = path.join(
          process.cwd(),
          "public",
          "uploads",
          "users",
          uniqueFileName
        );
        await fs.writeFile(uploadPath, buffer);
        data.bgImage = `/uploads/users/${uniqueFileName}`;
      }
    }
    
    // 3) Mise à jour en base
    return await prisma.user.update({
      where: {id: userId},
      data,
    });
  } catch (error) {
    console.error("Erreur lors du téléchargement de l'image:", error);
    return null;
  }
}

/**
 * toggleDarkMode - Activer ou désactiver le mode sombre pour un utilisateur
 * @returns Promise<null | User>
 *       null si l'utilisateur n'est pas connecté
 *       User si le mode sombre a été mis à jour
  */
export async function toggleDarkMode() {
  const session = await serverSession();
  if (!session) return null;
  
  const user = await prisma.user.findUnique({
    where: { id: session.user.userId },
    select: { darkMode: true }
  });
  
  if (!user) return null;
  
  return prisma.user.update({
    where: { id: session.user.userId },
    data: {
      darkMode: !user.darkMode
    }
  });
}
