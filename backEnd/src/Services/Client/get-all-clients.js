import { Client } from "../../Entities/Client";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export default class GetAllClientsService {
  async execute({ page = 1, limit = 10, search = "" } = {}) {
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { sku: { contains: search, mode: "insensitive" } },
            { name: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    const [clients, total] = await Promise.all([
      prisma.client.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.client.count({ where }),
    ]);

    const clientEntities = clients.map(
      (client) =>
        new Client(
          {
            ...client,
          },
          client.id
        )
    );

    return {
      clients: clientEntities,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    };
  }
}
