import { Product } from "../../Entities/Product.js";
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

export default class CreateProductService {
  async execute(productData) {
    const existingProduct = await prisma.product.findFirst({
      where: { sku: productData.sku },
    });

    if (existingProduct) {
      throw new Error("Email já está em uso");
    }

    const createdProduct = await prisma.product.create({
      data: {
        ...productData,
        itensOrder: 0,
        itensOrderBuy: 0,
      },
    });

    const product = new Product(
      {
        ...createdProduct,
        updateAt: createdProduct.updatedAt,
      },
      createdProduct.id
    );
    return product;
  }
}
