import { Product } from "../../Entities/Product.js";
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient()

export default class EditProductService {
    async execute({ id, sku }) {
        const productId = parseInt(id, 10);

        if (isNaN(productId)) {
            throw new Error("ID do produto deve ser um número válido");
        }

        const existingProduct = await prisma.product.findUnique({
            where: {
                id: productId,
            }
        })
        if (!existingProduct) {
            throw new Error("Produto não encontrado");
        }

        if (sku && sku !== existingProduct.sku) {
            const skuInUse = await prisma.user.findUnique({
                where: { sku },
            });
            if (skuInUse) {
                throw new Error("Este sku já está em uso");
            }
        }

        const updateData = {};
        if (sku) updateData.sku = sku;

        if ((Object.keys(updateData).length = 0)) {
            throw new Error("Nenhum dado necessita de atualização");
        }

        const updatedProduct = await prisma.product.update({
            where: { id: productId},
            data: updateData
        })

        const product = new Product(
            {
                ...updatedProduct,
                updatedAt: new Date()
            },
            updatedProduct.id
        );
        return product;
    }
}