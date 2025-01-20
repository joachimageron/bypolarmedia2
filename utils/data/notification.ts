'use server';
import {prisma} from "@/prisma/prisma";


/**
 * ---------------------------
 * Méthodes pour les Notifications
 * ---------------------------
 */

/**
 * Créer une notification
 */

export async function createNotification(data: {
  userId: string;
  content: string;
}) {
  return prisma.notification.create({
    data,
  });
}

/**
 * Récupérer les notifications d'un utilisateur
 */

export async function getNotificationsByUser(userId: string) {
  return prisma.notification.findMany({
    where: {userId},
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * Marquer une notification comme lue
 */

export async function markNotificationAsRead(
  notificationId: string
) {
  return prisma.notification.update({
    where: {id: notificationId},
    data: {isRead: true},
  });
}
