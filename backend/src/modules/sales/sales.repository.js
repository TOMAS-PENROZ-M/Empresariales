import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../generated/prisma/client.ts";

const connectionString =`${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

//const test = await prisma.sale.findMany();
//console.log(test);

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