import { Client } from "../../Entities/Client.js";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export default class EditClientService {
  async execute(clientData) {
    const { id, ...fieldsToUpdate } = clientData;
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

    if (fieldsToUpdate.cnpj && fieldsToUpdate.cnpj !== existingClient.cnpj) {
      const cnpjInUse = await prisma.client.findUnique({
        where: { cnpj: fieldsToUpdate.cnpj },
      });

      if (cnpjInUse) {
        throw new Error("Este cnpj já está em uso");
      }
    }

    delete fieldsToUpdate.id;
    delete fieldsToUpdate.createdAt;
    delete fieldsToUpdate.updatedAt;

    if (Object.keys(fieldsToUpdate).lenght === 0) {
      throw new Error("Nenhum dado necessita de atualização");
    }

    const updatedClient = await prisma.client.update({
      where: { id: clientId },
      data: fieldsToUpdate,
    });

    const client = new Client(
      {
        ...updatedClient,
        updatedAt: new Date(),
      },
      updatedClient.id
    );
    return client;
  }
}
