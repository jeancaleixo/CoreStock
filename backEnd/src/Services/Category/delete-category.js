import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient()

export default class DeleteCategoryService {
    async execute({ id }) {
        const categoryId = parseInt(id, 10)

        if (isNaN(categoryId)) {
            throw new Error("ID da categoria deve ser um número válido");
        }

        const existingCategory = await prisma.category.findUnique({
            where: { id: categoryId }
        })

        if (!existingCategory) {
            throw new Error("Categoria não encontrada")
        }

        await prisma.category.delete({
            where: {id: categoryId}
        })

        return { message: "Categoria deletada com sucesso"}
    }
}