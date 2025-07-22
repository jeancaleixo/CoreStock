export class ProductViewModel {
  static toHttp(product) {
    return {
      sku: product.sku,
      name: product.name,
      description: product.description,
      price: product.price,
      cost: product.cost,
      measure: product.measure,
      active: product.active,
      category: product.category,
      stock: product.stock,
      itensOrder: product.itensOrder,
      itensOrderBuy: product.itensOrderBuy,
      createdAt: product.createdAt,
      updateAt: product.updateAt,
    };
  }
}
