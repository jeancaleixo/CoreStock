import { Client } from "../../Entities/Client";
import { PrismaClient } from "../../generated/prisma";
import HttpError from "../../Utils/httpError";

const prisma = new PrismaClient();

export default class CreateClientService {
  async execute(clientData) {
    const existingClient = await prisma.client.findFirst({
      where: { cnpj: clientData.cnpj },
    });

    if (existingClient) {
      throw new HttpError("Cliente já existe", 409);
    }

    const { orderId, Order, order, ...rest } = clientData;

    const createClient = await prisma.client.create({
      data: {
        ...rest,
        Order: orderId ? { connect: { id: orderId } } : undefined,
      },
    });

    const client = new Client(
      {
        ...createClient,
      },
      createdClient.id
    );
    return client;
  }
}
