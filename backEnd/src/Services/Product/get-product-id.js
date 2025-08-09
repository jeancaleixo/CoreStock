import { Product } from "../../Entities/Product.js";
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient()

export default class GetProductById {
    async execute({ id }) {
        const productId = parseInt(id, 10)

        if (isNaN(productId)) {
            throw new Error("ID do produto deve ser um número válido");
        }

        const product = await prisma.product.findUnique({
            where: { id: productId }
        })

        if (!product) {
            throw new Error("Produto não encontrado");
        }

        return new Product(
            {
                ...product
            },
            product.id
        )
    }
}