'use server';
import { prisma } from "@/prisma/prisma";
import bcrypt from 'bcryptjs';
import { serverSession } from "@/utils/auth";
import uploadImage from "@/utils/uploadImage";

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
 * Savoir si un utilisateur existe
 * @param id
 */
export async function userExists(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
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
    where: { id: userId },
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
    where: { email },
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
    image?: string;    // data URL base64 ou rien
    bgImage?: string | null;  // data URL base64 ou "dell"
  }>
) {
  const session = await serverSession();
  if (!session) return null;
  const userId = session.user.userId;

  const userFolder = process.env.USER_FOLDER || "users";
  try {
    // Traitement de l'image de profil
    if (data.image) {
      data.image = await uploadImage(data.image, userFolder);
      if (data.image === undefined) return null;
    }

    // Traitement de l'image de fond
    if (data.bgImage === "dell") {
      data.bgImage = null;
    } else if (typeof data.bgImage === "string") {
      data.bgImage = await uploadImage(data.bgImage, userFolder);
      if (data.bgImage === undefined) return null;
    }

    // Mise à jour de l'utilisateur en base
    return await prisma.user.update({
      where: { id: userId },
      data,
    });
  } catch (error) {
    console.error("Erreur lors de l'upload de l'image:", error);
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
