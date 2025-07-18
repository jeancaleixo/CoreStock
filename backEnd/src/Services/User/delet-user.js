import { PrismaClient } from "../../generated/prisma/index.js"

const prisma = new PrismaClient()

export default class DeletUserService {
    async execute({ id }) {
        const userId = parseInt(id, 10)

        if (isNaN(userId)) {
            throw new Error("ID do usuário deve ser um número válido");
        }

        const existingUser = await prisma.user.findUnique({
            where: { id: userId}
        })

        if(!existingUser){
            throw new Error("Usuário não encontrado")
        }

        await prisma.user.delete({
            where: { id: userId}
        })

        return { message: "Usuário deletado com sucesso" }
    }
}