import { requiredFildsClient } from "../Utils/requireds/requiredsFilds.js";
import { randomUUID } from "crypto"

export class Client {
    constructor(props, id) {
        const missingFields = requiredFildsClient.filter((field) => !props[field])

        if (missingFields.length > 0) {
            throw new Error(
                `Campos obrigatórios ausentes: ${missingFields.join(", ")}`
            )
        }

        this.props = {
            cnpj: props.cnpj,
            fantasy: props.fantasy,
            phone: props.phone,
            email: props.email,
            adress: props.adress
        }
        this._id = id || randomUUID()
    }

    get id() {
        return this._id
    }

    get cnpj() {
        return this.props.cnpj;
    }
    set cnpj(cnpj) {
        this.props.cnpj = cnpj;
    }

    get fantasy() {
        return this.props.fantasy;
    }
    set fantasy(fantasy) {
        this.props.fantasy = fantasy;
    }

    get phone() {
        return this.props.phone;
    }
    set phone(phone) {
        this.props.phone = phone;
    }

    get email() {
        return this.props.email;
    }
    set email(email) {
        this.props.email = email;
    }

    get adress() {
        return this.props.adress;
    }
    set adress(adress) {
        this.props.adress = adress;
        this.props.updatedAt = new Date();
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