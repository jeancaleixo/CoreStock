export class ClientViewModel {
  static toHttp(client) {
    return {
      cnpj: client.cnpj,
      fantasy: client.fantasy,
      phone: client.phone,
      email: client.email,
      address: client.address,
      orders: client.order,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }
}
