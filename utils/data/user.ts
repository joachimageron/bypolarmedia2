'use server';
import {prisma} from "@/prisma/prisma";
import {hash} from "node:crypto";
import path from "path";
import fs from "fs/promises";

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
    password: hash('sha1', String(data.password)),
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
  email = String(email);
  password = String(password);
  password = hash('sha1', password);
  console.log(email, password)
  return prisma.user.findFirst({
    where: {
      email,
      password,
    },
  });
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
 * @param userId
 * @param data{name, description, image, bgImage}
 */
export async function updateUser(
  userId: string,
  data: Partial<{
    name?: string;
    description?: string;
    image?: string;
    bgImage?: string;
  }>
) {
  
  try {
    
    if(data.image) {
      const buffer = Buffer.from(data.image.replace(/^data:image\/\w+;base64,/, ""), "base64");
      
      // Détermine l'extension du fichier
      const ext = /^data:(image\/\w+);base64,/.exec(data.image)?.[1].split('/')[1] ?? 'png';
      
      // Génère un nom de fichier unique
      const uniqueFileName = `${userId}_${Date.now()}.${ext}`;
      
      // Définit le chemin de sauvegarde
      const uploadPath = path.join(process.cwd(), "public", "uploads", uniqueFileName);
      
      // Sauvegarde le fichier
      await fs.writeFile(uploadPath, buffer);
      
      // Génère l'URL publique de l'image
      data.image = `/uploads/${uniqueFileName}`;
    }
    
    if (data.bgImage) {
      
      const buffer = Buffer.from(data.bgImage.replace(/^data:image\/\w+;base64,/, ""), "base64");
      
      // Détermine l'extension du fichier
      const ext = /^data:(image\/\w+);base64,/.exec(data.bgImage)?.[1].split('/')[1] ?? 'png';
      
      // Génère un nom de fichier unique
      const uniqueFileName = `${userId}_${Date.now()}.${ext}`;
      
      // Définit le chemin de sauvegarde
      const uploadPath = path.join(process.cwd(), "public", "uploads", uniqueFileName);
      
      // Sauvegarde le fichier
      await fs.writeFile(uploadPath, buffer);
      
      // Génère l'URL publique de l'image
      data.bgImage = `/uploads/${uniqueFileName}`;
    }
    // Décode les données base64
    
    console.log(data);
    
    // Met à jour l'utilisateur dans la base de données
    return await prisma.user.update({
      where: {id: userId},
      data
    });
  } catch (error) {
    console.error("Erreur lors du téléchargement de l'image:", error);
    return null;
  }
}

