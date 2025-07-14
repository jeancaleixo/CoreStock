import { User } from "../../Entities/User.js";
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

export default class GetUserByIdService {
  async execute({ id }) {
    const userId = parseInt(id, 10);

    if (isNaN(userId)) {
      throw new Error("ID do usuário deve ser um número válido");
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    return new User(
      {
        email: user.email,
        password: user.password,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      user.id
    );
  }
}
