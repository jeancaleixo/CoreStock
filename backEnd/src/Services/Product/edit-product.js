import { Product } from "../../Entities/Product.js";
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient()

export default class EditProductService {
    async execute(data) {
        const { id, ...fieldsToUpdate } = data;
        const productId = parseInt(id, 10);

        if (isNaN(productId)) {
            throw new Error("ID do produto deve ser um número válido");
        }

        const existingProduct = await prisma.product.findUnique({
            where: { id: productId }
        });
        if (!existingProduct) {
            throw new Error("Produto não encontrado");
        }

        if (fieldsToUpdate.sku && fieldsToUpdate.sku !== existingProduct.sku) {
            const skuInUse = await prisma.product.findUnique({
                where: { sku: fieldsToUpdate.sku },
            });
            if (skuInUse) {
                throw new Error("Este sku já está em uso");
            }
        }

        delete fieldsToUpdate.id;
        delete fieldsToUpdate.createdAt;
        delete fieldsToUpdate.updatedAt;

        if (Object.keys(fieldsToUpdate).length === 0) {
            throw new Error("Nenhum dado necessita de atualização");
        }

        const updatedProduct = await prisma.product.update({
            where: { id: productId },
            data: fieldsToUpdate
        });

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