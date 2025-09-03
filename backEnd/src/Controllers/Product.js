import CreateProductService from "../Services/Product/create-product.js";
import DeletProductService from "../Services/Product/delete-product.js";
import EditProductService from "../Services/Product/edit-product.js";
import GetAllProductsService from "../Services/Product/get-all-products.js";
import GetProductById from "../Services/Product/get-product-id.js";
import { ProductViewModel } from "../View/ProductViewModel.js";

const createProductService = new CreateProductService();
const editProductService = new EditProductService();
const getAllProductsService = new GetAllProductsService();
const getProductByIdService = new GetProductById();
const deletProductService = new DeletProductService();

export const createProduct = async (req, res) => {
  try {
    const productData = req.body;

    const product = await createProductService.execute({
      ...productData,
    });

    const productResponse = ProductViewModel.toHttp(product);

    res.status(201).json(productResponse);
  } catch (error) {
    console.log("Erro ao criar produto:", error);

    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    const product = await editProductService.execute({ id, ...updateFields });
    const productResponse = ProductViewModel.toHttp(product);

    res.status(200).json(productResponse);
  } catch (error) {
    console.log("Erro ao atualizar produto:", error);

    if (error.message === "ID do produto deve ser um número válido") {
      return res
        .status(400)
        .json({ error: "ID do produto deve ser um número válido" });
    }

    if (error.message === "Produto não encontrado") {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    if (error.message === "Este sku já está em uso") {
      return res.status(409).json({ error: "SKU já está em uso" });
    }

    if (error.message === "Nenhum dado necessita de atualização") {
      return res
        .status(304)
        .json({ error: "Nenhum dado necessita de atualização" });
    }
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const { page, limit, search } = req.query;

    const result = await getAllProductsService.execute({
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(page, 10) : undefined,
      search,
    });

    const productResponse = {
      products: result.products.map((product) =>
        ProductViewModel.toHttp(product)
      ),
      pagination: result.pagination,
    };

    res.status(200).json(productResponse);
  } catch (error) {
    console.log("Erro ao buscar produtos:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await getProductByIdService.execute({ id });
    const productResponse = ProductViewModel.toHttp(product);
    res.status(200).json(productResponse);
  } catch (error) {
    console.log("Erro ao buscar produto:", error);

    if (error.message === "ID do produto deve ser um número válido") {
      return res
        .status(400)
        .json({ error: "ID do produto deve ser um número válido" });
    }

    if (error.message === "Produto não encontrado") {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const deletProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deletProductService.execute({ id });

    res.status(200).json(result);
  } catch (error) {
    console.log("Erro ao deletar produto:", error);

    if (error.message === "ID do produto deve ser um número válido")
      return res
        .status(400)
        .json({ error: "ID do produto deve ser um número válido" });
  }

  if (error.message === "Produto não encontrado") {
    return res.status(404).json({ error: "Produto não encontrado" });
  }

  res.status(500).json({ error: "Erro interno do servidor" });
};
