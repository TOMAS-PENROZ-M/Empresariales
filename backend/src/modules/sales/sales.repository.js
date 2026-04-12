import "dotenv/config";
import { PrismaClient } from "@prisma/client";

console.log(process.env.DATABASE_URL);

const prisma = new PrismaClient();

export async function createSale(data) {
  return prisma.sale.create({
    data: {
      total: data.total,
      items: {
        create: data.items,
      },
    },
    include: {
      items: true,
    },
  });
}

export async function getSales() {
  return prisma.sale.findMany({
    include: {
      items: true,
    },
  });
}