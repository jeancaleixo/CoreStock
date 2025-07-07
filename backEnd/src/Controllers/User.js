import CreateUserService from "../Services/User/create-user.js";
import { UserViewModel } from "../View/UserViewModel.js";

const createUserService = new CreateUserService();

export const createUser = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        error: "Email, password e name são obrigatórios",
      });
    }

    const user = await createUserService.execute({ email, password, name, role });

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
