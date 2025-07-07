import bcrypt from "bcrypt";
import { User } from "../../Entities/User.js";
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

export default class CreateUserService {
  async execute({ email, password, name }) {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("Email já está em uso");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "USER",
      },
    });

    const user = new User(
      {
        email: createdUser.email,
        password: createdUser.password,
        name: createdUser.name,
        role: createdUser.role,
        createdAt: createdUser.createdAt,
        updatedAt: createdUser.updatedAt,
      },
      createdUser.id
    );

    return user;
  }
}
