import { randomUUID } from "crypto";

export class User {
  constructor(props, id) {
    if (!props.email || !props.password || !props.name) {
      throw new Error("Email, password e name são obrigatórios");
    }

    this.props = {
      email: props.email,
      password: props.password,
      name: props.name,
      role: props.role,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    };

    this._id = id || randomUUID();
  }

  get id() {
    return this._id;
  }

  get email() {
    return this.props.email;
  }

  set email(email) {
    this.props.email = email;
    this.props.updatedAt = new Date();
  }

  get password() {
    return this.props.password;
  }

  set password(password) {
    this.props.password = password;
    this.props.updatedAt = new Date();
  }

  get name() {
    return this.props.name;
  }

  set name(name) {
    this.props.name = name;
    this.props.updatedAt = new Date();
  }

  get role() {
    return this.props.role;
  }

  set role(role) {
    this.props.role = role;
    this.props.updatedAt = new Date();
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
