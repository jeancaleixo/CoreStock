import { ClientViewModel } from "../View/ClientViewModel";
import CreateProductService from "../Services/Product/create-product";

const createClientService = new CreateClientService();
const deleteClientService = new DeleteClientService();
const editClientService = new EditClientService();
const getAllClientsService = new GetAllClientsService();
const getClientByIdService = new GetClientByIdService();

export const createClient = async (req, res) => {
  try {
    const clientData = req.body;

    const client = await createClientService.execute({
      ...clientData,
    });

    const clientResponse = ClientViewModel.toHttp(client);

    res.status(201).json(clientResponse);
  } catch (error) {
    console.log("Erro ao criar cliente:", error);

    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const editClient = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    const client = await editClientService.execute({ id, ...updateFields });
    const clientResponse = ClientViewModel(client);

    res.status(200).json(clientResponse);
  } catch (error) {
    console.log("Erro ao atualizar cliente:");

    res.status(error.statusCode).json(error.message);
  }
};
