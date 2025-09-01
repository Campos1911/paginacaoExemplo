import "fastify";

declare module "fastify" {
  interface FastifyRequest {
    user?: {
      id: string;
      email: string;
      role?: string; // opcional, se você tiver roles
      [key: string]: any; // outros campos do token
    };
  }
}
