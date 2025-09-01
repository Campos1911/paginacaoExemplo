import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { LivroControllers } from "../controllers/livro.controllers";

export default async function LivroRoutes(app: FastifyInstance) {
  app.post(
    "/livro",
    async (
      req: FastifyRequest<{ Body: { nome: string } }>,
      reply: FastifyReply
    ) => {
      return new LivroControllers().createLivro(req, reply);
    }
  );
  app.get(
    "/livro/get",
    async (
      req: FastifyRequest<{ Querystring: { page: number; limit: number } }>,
      reply: FastifyReply
    ) => {
      return new LivroControllers().getLivro(req, reply);
    }
  );
}
