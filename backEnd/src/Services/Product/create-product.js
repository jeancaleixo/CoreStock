import { Product } from "../../Entities/Product.js";
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

export default class CreateProductService {
  async execute(productData) {
    const existingProduct = await prisma.product.findFirst({
      where: { sku: productData.sku },
    });

    if (existingProduct) {
      throw new Error("Produto já está em uso");
    }


    const { categoryId, Stock, stock, ...rest } = productData;

    const createdProduct = await prisma.product.create({
      data: {
        ...rest,
        Category: categoryId ? { connect: { id: categoryId } } : undefined,
      },
    });

    const product = new Product(
      {
        ...createdProduct,
      },
      createdProduct.id
    );
    return product;
  }
}
