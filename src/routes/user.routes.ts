import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserControllers } from "../controllers/user.controllers";
import { userSchema } from "../validators/user.validators";
import z from "zod";

export default async function UserRoutes(app: FastifyInstance) {
  app.post(
    "/register",
    async (
      req: FastifyRequest<{ Body: z.infer<typeof userSchema> }>,
      reply: FastifyReply
    ) => {
      return new UserControllers().registerUser(req, reply);
    }
  );
  app.post(
    "/login",
    async (
      req: FastifyRequest<{ Body: z.infer<typeof userSchema> }>,
      reply: FastifyReply
    ) => {
      return new UserControllers().loginUser(req, reply);
    }
  );
}
