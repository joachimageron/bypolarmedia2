import { prisma } from "@/prisma/prisma";
import bcrypt from 'bcryptjs';

/**
 * Vérifier les informations de connexion d'un utilisateur et le retourne si les informations sont correctes
 * @param email
 * @param password
 */
export async function verifyUserCredentials(email: FormDataEntryValue, password: FormDataEntryValue) {
    const user = await prisma.user.findFirst({
        where: { email: String(email) },
    });

    if (user?.password && bcrypt.compareSync(String(password), user.password)) {
        return user;
    } else {
        return null;
    }
}
