import CreateCategoryService from "../Services/Category/create-category.js"
import EditCategoryService from "../Services/Category/edit-category.js"
import DeletCategoryservice from "../Services/Category/delete-category.js"
import GetAllCategorysService from "../Services/Category/get-all-categorys.js"
import GetCategoryIdService from "../Services/Category/get-category-id.js"
import { CategoryViewModel } from "../View/CategoryViewModel.js"

const createCategoryService = new CreateCategoryService()
const editCategoryService = new EditCategoryService()
const getAllCategorysService = new GetAllCategorysService()
const getCategoryByIdService = new GetCategoryIdService()
const deletCategoryService = new DeletCategoryservice()

export const createCategory = async (req, res) => {
    try {
        const categoryData = req.body

        const category = await createCategoryService.execute({
            ...categoryData
        })

        const categoryResponse = CategoryViewModel.toHttp(category)

        res.status(201).json(categoryResponse)
    } catch (error) {
        console.log("Erro ao criar categoria:", error);

        res.status(500).json({ error: "Erro interno do servidor" });
    }
}

export const editCategory = async (req, res) => {
    try {
        const { id } = req.params
        const updateFields = req.body

        if (!updateFields || Object.keys(updateFields).length === 0) {
            return res.status(400).json({
                error: "Nenhum campo enviado para atualização",
            });
        }

        const category = await editCategoryService.execute(id, ...updateFields)
        const categoryResponse = CategoryViewModel.toHttp(category)

        res.status(200).json(productResponse);
    } catch (error) {
        console.log("Erro ao atualizar categoria:", error);

        if (error.message === "ID da categoria deve ser um número válido") {
            return res
                .status(400)
                .json({ error: "ID da categoria deve ser um número válido" });
        }

        if (error.message === "Categoria não encontrada") {
            return res.status(404).json({ error: "Categoria não encontrada" });
        }

        if (error.message === "Nome ou produtos já está em uso") {
            return res.status(409).json({ error: "Nome ou produtos já está em uso" });
        }

        if (error.message === "Nenhum dado necessita de atualização") {
            return res
                .status(400)
                .json({ error: "Nenhum dado necessita de atualização" });
        }
        res.status(500).json({ error: "Erro interno do servidor" });
    }
}

export const getAllCategorys = async (req, res) => {
  try {
    const { page, limit, search } = req.query

    const result = await getAllCategorysService.execute({
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(page, 10) : undefined,
      search,
    })

    const categoryResponse = {
      categorys: result.categorys.map((category) => CategoryViewModel.toHttp(category)),
      pagination: result.pagination
    }

    res.status(200).json(categoryResponse)
  } catch (error) {
    console.log("Erro ao buscar categorias:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

export const getCategoryById = async (req, res) => {
  try {
    const id = req.params.id
    const category = await getCategoryByIdService.execute({ id })
    const categoryResponse = CategoryViewModel.toHttp(category)
    res.status(200).json(categoryResponse)
  } catch (error) {
    console.log("Erro ao buscar categoria:", error);

    if (error.message === "ID da categoria deve ser um número válido") {
      return res
        .status(400)
        .json({ error: "ID da categoria deve ser um número válido" });
    }

    if (error.message === "Categoria não encontrada") {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

export const deletCategory = async (req, res) => {
  try {
    const { id } = req.params

    const result = await deletCategoryService.execute({ id })

    res.status(200).json(result)
  } catch (error) {
    console.log("Erro ao deletar categoria:", error)

    if (error.message === "ID da categoria deve ser um número válido")
      return res.status(400).json({ error: "ID da categoria deve ser um número válido" });
  }

  if (error.message === "Categoria não encontrada") {
    return res.status(404).json({ error: "Categoria não encontrada" });
  }

  res.status(500).json({ error: "Erro interno do servidor" })
}