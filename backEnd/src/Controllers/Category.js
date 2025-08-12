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
const deletCategoryservice = new DeletCategoryservice()

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