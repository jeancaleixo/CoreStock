import { requiredFildsProduct } from "../Utils/requireds/requiredsFildsProduct.js";
import { randomUUID } from "crypto";

export class Product {
  constructor(props, id) {
    const missingFields = requiredFildsProduct.filter((field) => !props[field]);

    if (missingFields.length > 0) {
      throw new Error(
        `Campos obrigatórios ausentes: ${missingFields.join(", ")}`
      );
    }

    this.props = {
      sku: props.sku,
      name: props.name,
      description: props.description,
      price: props.price,
      cost: props.cost,
      measure: props.measure,
      active: props.active,
      category: props.category,
      stock: props.stock,
      itensOrder: props.itensOrder,
      itensOrderBuy: props.itensOrderBuy,
      createdAt: props.createdAt,
      updateAt: props.updateAt,
    };

    this._id = id || randomUUID();
  }

  get id() {
    return this._id;
  }

  get sku() {
    return this.props.sku;
  }

  set sku(sku) {
    this.props.sku = sku;
  }

  get name() {
    return this.props.name;
  }

  set name(name) {
    this.props.name = name;
  }

  get description() {
    return this.props.description;
  }

  set description(description) {
    this.props.description = description;
  }

  get price() {
    return this.props.price;
  }

  set price(price) {
    this.props.price = price;
  }

  get cost() {
    return this.props.cost;
  }

  set cost(cost) {
    this.props.cost = cost;
  }

  get measure() {
    return this.props.measure;
  }

  set measure(measure) {
    this.props.measure = measure;
  }

  get active() {
    return this.props.active;
  }

  set active(active) {
    this.props.active = active;
  }

  get category() {
    return this.props.category;
  }

  set category(category) {
    this.props.category = category;
  }

  get stock() {
    return this.props.stock;
  }

  set stock(stock) {
    this.props.stock = stock;
  }

  get itensOrder() {
    return this.props.itensOrder;
  }

  set itensOrder(itensOrder) {
    this.props.itensOrder = itensOrder;
  }

  get itensOrderBuy() {
    return this.props.itensOrderBuy;
  }

  set itensOrderBuy(itensOrderBuy) {
    this.props.itensOrderBuy = itensOrderBuy;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updateAt() {
    return this.props.updateAt;
  }
}
