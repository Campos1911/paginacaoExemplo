import { prisma } from "../config/config.prisma";
import { IUser } from "../models/user.model";
import bcrypt from "bcrypt";

export class UserServices {
  async getUserByEmail(userEmail: string) {
    return await prisma.user.findUnique({ where: { email: userEmail } });
  }

  async createUser(userData: IUser) {
    const hashSenha = await bcrypt.hash(userData.senha, 10);

    return await prisma.user.create({
      data: { ...userData, senha: hashSenha },
    });
  }
}
