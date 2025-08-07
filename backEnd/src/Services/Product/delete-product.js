import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient()

export default class DeletProductService {
    async execute({ id }) {
        const productId = parseInt(id, 10)

        if (isNaN(productId)) {
            throw new Error("ID do produto deve ser um número válido");
        }

        const existingProduct = await prisma.product.findUnique({
            where: {id: productId}
        })

        if(!existingProduct){
            throw new Error("Produto não encontrado")
        }

        await prisma.product.delete({
            where: { id: idProduct}
        })

        return { message: "Produto deletado com sucesso"}
    }
}