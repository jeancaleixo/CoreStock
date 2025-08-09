import { requiredFildsCategory } from "../Utils/requireds/requiredsFilds.js";
import { randomUUID} from "crypto"

export class Category {
    constructor(props, id){
        const missingFields = requiredFildsCategory.filter((field) => !props[field])

        if (missingFields.length > 0){
            throw new Error(
                `Campos obrigatórios ausentes: ${missingFields.join(", ")}`
            )
        }

        this.props = {
            name: props.name,
            products: props.products,
            createdAt: props.createdAt,
            updateAt: props.updateAt,
        }
        this._id = id || randomUUID()
    }

    get id() {
        return this._id;
    }

    get name() {
        return this.props.name;
    }
    set name(name) {
        this.props.name = name;
    }

    get products() {
        return this.props.products;
    }
    set products(products) {
        this.props.products = products;
    }

    get createdAt() {
        return this.props.createdAt;
    }

    get updateAt() {
        return this.props.updateAt;
    }
    set updateAt(updateAt) {
        this.props.updateAt = updateAt;
    }
}