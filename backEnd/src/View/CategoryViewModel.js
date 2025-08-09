export class CategoryViewModel {
    static toHttp(category) {
        return {
            name: category.name,
            products: category.products,
            createdAt: category.createdAt,
            updateAt: category.updateAt,
        }
    }
}