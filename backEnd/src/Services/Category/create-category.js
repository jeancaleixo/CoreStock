import { Category } from "../../Entities/Category.js"
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient()

export default class CreateCategoryService{
    async execute(name, products = []) {
        const existingCategory = await prisma.category.findFirst({
            where: { name: name}
        })

        if (existingCategory){
            throw new Error("Categoria já em uso")
        }

        const createdCategory = await prisma.category.create({
            data: {
                name,
                products: {
                    connect: []
                }
            }
        })

        const category = new Category(
            {
                name,
                products
            },
            createdCategory.id
        )
        return category
    }
}