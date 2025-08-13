import { Category } from "../../Entities/Category.js"
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient()

export default class CreateCategoryService{
    async execute({ name }) {
        const existingCategory = await prisma.category.findFirst({
            where: { name }
        })

        if (existingCategory){
            throw new Error("Categoria já em uso")
        }

        const createdCategory = await prisma.category.create({
            data: {
                name
            }
        })

        const category = new Category(
            {
                name,
                products: []
            },
            createdCategory.id
        )
        return category
    }
}