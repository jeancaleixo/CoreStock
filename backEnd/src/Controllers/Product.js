import CreateProductService from "../Services/Product/create-product.js";
import { ProductViewModel } from "../View/ProductViewModel.js";

const createProductService = new CreateProductService();

export const createProduct = async (req, res) => {
  try {
    const productData = req.body;

    const product = await createProductService.execute({
      ...productData,
      createdAt: new Date(),
      updateAt: new Date(),
    });

    const productResponse = ProductViewModel.toHttp(product);

    res.status(201).json(productResponse);
  } catch (error) {
    console.log("Erro ao criar produto:", error);

    res.status(500).json({ error: "Erro interno do servidor" });
  }
};
