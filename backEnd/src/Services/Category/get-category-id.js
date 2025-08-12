import { Category } from "../../Entities/Category.js"
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient()

export default class GetCategoryIdService {
    async execute({ id }) {
        const categoryId = parseInt(id, 10)

        if (isNaN(categoryId)) {
            throw new Error("ID da categoria deve ser um número válido");
        }

        const category = await prisma.category.findUnique({
            where: { id: categoryId }
        })

        if (!category) {
            throw new Error("Categoria não encontrada");
        }

        return new category(
            {
                ...category
            },
            category.id
        )
    }
}