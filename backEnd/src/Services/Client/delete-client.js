import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export default class DeleteClientService {
  async execute({ id }) {
    const clientId = parseInt(id, 10);

    if (isNaN(clientId)) {
      throw new Error("ID do cliente deve ser um número válido");
    }

    const existingClient = await prisma.client.findUnique({
      where: { id: clientId },
    });

    if (!existingClient) {
      throw new Error("Cliente não encontrado");
    }

    await prisma.client.delete({
      where: { id: clientId },
    });
    return { message: "Produto deletado com sucesso" };
  }
}
