import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../generated/prisma/client.ts";

const connectionString =`${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

function parseLocalDate(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

// filtro de fechas para reportes
function buildDateFilter(start, end) {
  if (!start && !end) return {};

  const filter = {};

  if (start) {
    filter.gte = parseLocalDate(start);
  }

  if (end) {
    const endDate = parseLocalDate(end);
    endDate.setDate(endDate.getDate() + 1);
    filter.lt = endDate;
  }

  return {
    date: filter
  };
}

// Cantidad de cada producto vendido
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

// Ganancias por producto
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

// Ganancias totales
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

// Ganancias totales y cantidad de transacciones para el dashboard
export async function getSalesStats({ start, end }) {
  const dateFilter = buildDateFilter(start, end);

  const result = await prisma.sale.aggregate({
    where: dateFilter,
    _sum: { total: true },
    _count: { id: true }
  });

  return {
    totalRevenue: result._sum.total || 0,
    totalTransactions: result._count.id || 0
  };
}

// Top 5 productos más vendidos
export async function getTopProducts({ start, end, limit }) {
  const dateFilter = buildDateFilter(start, end);

  return prisma.item.groupBy({
    by: ["name"],
    where: {
      sale: dateFilter
    },
    _sum: {
      qty: true
    },
    orderBy: {
      _sum: {
        qty: "desc"
      }
    },
    take: limit || 5
  });
}