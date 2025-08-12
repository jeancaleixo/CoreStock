import { Category } from "../../Entities/Category.js"
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient()

export default class GetAllCategorysService {
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

        const [categorys, total] = await Promise.all([
            prisma.product.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: "desc" }
            }),
            prisma.category.count({ where })
        ])

        const categoryEntities = categorys.map(
            (category) =>
                new Category(
                    {
                        ...category
                    },
                    category.id
                )
        )

        return {
            categorys: categoryEntities,
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