import CreateUserService from "../Services/User/create-user.js";
import EditUserService from "../Services/User/edit-user.js";
import GetAllUsersService from "../Services/User/get-all-users.js";
import GetUserByIdService from "../Services/User/get-user-id.js";
import { UserViewModel } from "../View/UserViewModel.js";

const createUserService = new CreateUserService();
const editUserService = new EditUserService();
const getAllUsersService = new GetAllUsersService();
const getUserByIdService = new GetUserByIdService();

export const createUser = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        error: "Email, password e name são obrigatórios",
      });
    }

    const user = await createUserService.execute({
      email,
      password,
      name,
      role,
    });

    const userResponse = UserViewModel.toHttp(user);

    res.status(201).json(userResponse);
  } catch (error) {
    console.log("Erro ao criar usuário:", error);

    if (error.message === "Email já esta em uso") {
      return res.status(409).json({ error: "Email já está em uso" });
    }
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name } = req.body;

    if (!email && !name) {
      return res.status(400).json({
        error: "Email ou name devem ser fornecidos para atualização",
      });
    }

    const user = await editUserService.execute({ id, email, name });
    const userResponse = UserViewModel.toHttp(user);

    res.status(200).json(userResponse);
  } catch (error) {
    console.log("Erro ao atualizar usuário:", error);

    if (error.message === "ID do usuário deve ser um número válido") {
      return res
        .status(400)
        .json({ error: "ID do usuário deve ser um número válido" });
    }

    if (error.message === "Usuário não encontrado") {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    if (error.message === "Este email já está em uso") {
      return res.status(409).json({ error: "Email já está em uso" });
    }

    if (error.message === "Nenhum dado necessita de atualização") {
      return res
        .status(400)
        .json({ error: "Nenhum dado necessita de atualização" });
    }
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { page, limit, search } = req.query;

    const result = await getAllUsersService.execute({
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(page, 10) : undefined,
      search,
    });

    const usersResponse = {
      users: result.users.map((user) => UserViewModel.toHttp(user)),
      pagination: result.pagination,
    };

    res.status(200).json(usersResponse);
  } catch (error) {
    console.log("Erro ao buscar usuários:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getUserByIdService.execute({ id });
    const userResponse = UserViewModel.toHttp(user);
    res.status(200).json(userResponse);
  } catch (error) {
    console.log("Erro ao buscar usuário:", error);

    if (error.message === "ID do usuário deve ser um número válido") {
      return res
        .status(400)
        .json({ error: "ID do usuário deve ser um número válido" });
    }

    if (error.message === "Usuário não encontrado") {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.status(500).json({ error: "Erro interno do servidor" });
  }
};
