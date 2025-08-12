import { Category } from "../../Entities/Category.js";
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient()

export default class EditCategoryService {
    async execute({ id, name, products = [] }) {
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

        if (name && name !== existingCategory.name) {
            const nameInUse = await prisma.category.findUnique({
                where: { name }
            })
            if (products !== existingCategory.products) {
                const productsInUse = await prisma.category.findUnique({
                    where: { products }
                })
            } if (nameInUse || productsInUse) {
                throw new Error("Nome ou produtos já está em uso")
            }
        }

        const updateData = {}
        if (name) updateData.name = name

        if (Object.keys(updateData).length === 0) {
            throw new Error("Nenhum dado necessita de atualização");
        }
        const updatedCategory = await prisma.category.update({
            where: { id: categoryId },
            data: updateData
        })

        const category = new Category({
            ...updatedCategory,
            updatedAt: new Date()
        },
            updatedCategory.id
        )
        return category
    }
}