import { Product } from "../../Entities/Product.js";
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient()

export default class GetAllProductsService {
    async execute({ page = 1, limit = 10, search = "" } = {}) {
        const skip = (page - 1) * limit

        const where = search
            ? {
                OR: [
                    { sku: { contains: search, mode: "insensitive" } },
                    { name: { contains: search, mode: "insensitive" } },

                ],
            }
            : {}

        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
            }),
            prisma.product.count({ where })
        ])

        const productEntities = products.map(
            (product) =>
                new Product(
                    {
                        ...product
                    },
                    product.id
                )
        )

        return {
            products: productEntities,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                hasNext: page < Math.ceil(total / limit),
                hasPrev: page > 1,
            }
        }
    }
}