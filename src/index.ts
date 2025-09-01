import fastify from "fastify";
import cors from "@fastify/cors";
import env from "dotenv";
import UserRoutes from "./routes/user.routes";
import { authMiddleware } from "./middlewares/auth.middlewares";
import LivroRoutes from "./routes/livro.routes";

const app = fastify();
const PORT = process.env.PORT || 3333;

env.config();
app.register(cors);
app.register(UserRoutes);
app.register(LivroRoutes);

app.get("/public", async (req, reply) => {
  return { message: "Esta rota é pública" };
});

// Rota protegida
app.get("/private", { preHandler: authMiddleware }, async (req, reply) => {
  return { message: `Olá usuário, seu id é ${req.user?.id}` };
});

app.listen({ port: 3333 }, () => {
  console.log("Servidor rodando na porta 3333");
});

app
  .listen({ port: Number(PORT), host: "0.0.0.0" })
  .then(() => console.log(`Servidor rodando na porta ${PORT}`))
  .catch((err) => {
    console.error("Erro ao iniciar o servidor:", err);
    process.exit(1);
  });
