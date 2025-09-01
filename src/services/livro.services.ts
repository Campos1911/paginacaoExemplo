import { prisma } from "../config/config.prisma";

export class LivroServices {
  async createLivro(nome: string) {
    return await prisma.livro.create({ data: { nome } });
  }
  async getLivros(skip: number, take: number) {
    const [livros, total] = await Promise.all([
      prisma.livro.findMany({
        skip,
        take,
      }),
      prisma.livro.count(),
    ]);

    return { livros, total };
  }
}
