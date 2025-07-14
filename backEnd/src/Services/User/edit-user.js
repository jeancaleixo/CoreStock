import { User } from "../../Entities/User.js";
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

export default class EditUserService {
  async execute({ id, email, name }) {
    const userId = parseInt(id, 10);

    if (isNaN(userId)) {
      throw new Error("ID do usuário deve ser um número válido");
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!existingUser) {
      throw new Error("Usuário não encontrado");
    }

    if (email && email !== existingUser.email) {
      const emailInUse = await prisma.user.findUnique({
        where: { email },
      });
      if (emailInUse) {
        throw new Error("Este email já está em uso");
      }
    }
    const updateData = {};
    if (email) updateData.email = email;
    if (name) updateData.name = name;

    if ((Object.keys(updateData).length = 0)) {
      throw new Error("Nenhum dado necessita de atualização");
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    const user = new User(
      {
        email: updatedUser.email,
        password: updatedUser.password,
        name: updatedUser.name,
        role: updatedUser.role,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      },
      updatedUser.id
    );
    return user;
  }
}
