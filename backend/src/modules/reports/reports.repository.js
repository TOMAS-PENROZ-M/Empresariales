import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../generated/prisma/client.ts";

const connectionString =`${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// filtro de fechas para reportes
function buildDateFilter(start, end) {
  if (!start && !end) return {};

  return {
    date: {
      ...(start && { gte: new Date(start) }),
      ...(end && { lte: new Date(end) })
    }
  };
}

export async function getProductQuantities({ start, end }) {
  const dateFilter = buildDateFilter(start, end);

  return prisma.item.groupBy({
    by: ["name"],
    where: {
      sale: dateFilter
    },
    _sum: {
      qty: true
    }
  });
}

export async function getProductRevenue({ start, end }) {
  const dateFilter = buildDateFilter(start, end);

  const items = await prisma.item.findMany({
    where: {
      sale: dateFilter
    },
    select: {
      name: true,
      price: true,
      qty: true
    }
  });

  const result = {};

  for (const item of items) {
    const revenue = item.price * item.qty;
    result[item.name] = (result[item.name] || 0) + revenue;
  }

  return result;
}

export async function getTotalRevenue({ start, end }) {
  const dateFilter = buildDateFilter(start, end);

  const result = await prisma.sale.aggregate({
    where: dateFilter,
    _sum: {
      total: true
    }
  });

  return {
    total: result._sum.total || 0
  };
}