import { Client } from "../../Entities/Client.js";
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

export default class GetClientByIdService {
  async execute({ id }) {
    const clientId = parseInt(id, 10);

    if (isNaN(clientId)) {
      throw new Error("ID do cliente deve ser um número válido");
    }

    const client = await prisma.client.findUnique({
      where: { id: clientId },
    });

    if (!client) {
      throw new Error("Cliente não encontrado");
    }

    return new Client(
      {
        ...client,
      },
      client.id
    );
  }
}
