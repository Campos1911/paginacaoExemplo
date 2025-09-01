import { FastifyReply, FastifyRequest } from "fastify";
import { LivroServices } from "../services/livro.services";

export class LivroControllers {
  private livroService = new LivroServices();

  async createLivro(
    req: FastifyRequest<{ Body: { nome: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { nome } = req.body;

      await this.livroService.createLivro(nome);

      return reply.status(201).send({ message: "Livro criado" });
    } catch (error) {
      return reply.status(500).send({ message: "Erro interno do servidor" });
    }
  }
  async getLivro(
    req: FastifyRequest<{ Querystring: { page?: number; limit?: number } }>,
    reply: FastifyReply
  ) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const { livros, total } = await this.livroService.getLivros(skip, limit);

      return reply.status(200).send({
        data: livros,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      return reply.status(500).send({ message: "Erro interno do servidor" });
    }
  }
}
