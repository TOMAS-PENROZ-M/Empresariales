import { useState } from "react";
import { useDashboard } from "../hooks/useDashboard";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const SalesSummary = () => {

  const [formFilters, setFormFilters] = useState({
    start: "",
    end: "",
    limit: 5
  });


  const [appliedFilters, setAppliedFilters] = useState(formFilters);

  const { data, loading } = useDashboard(appliedFilters);

  const formatCLP = (value: number) =>
    new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
    }).format(value);


  if (loading) return (
        <div className="animate-pulse space-y-4">
            <div className="h-24 bg-gray-200 rounded-xl"></div>
            <div className="h-64 bg-gray-200 rounded-xl"></div>
        </div>
    );
  if (!data) return <p>Error cargando datos</p>;

  return (
    <div className="max-w-5xl mx-auto mt-6 space-y-6">
      
      {/* 🔎 FILTROS */}
      <div className="flex gap-4 flex-wrap items-end">

        <div>
            <label className="text-sm text-gray-500">Desde</label>
            <input
            type="date"
            value={formFilters.start}
            onChange={(e) =>
                setFormFilters({ ...formFilters, start: e.target.value })
            }
            className="border p-2 rounded w-full"
            />
        </div>

        <div>
            <label className="text-sm text-gray-500">Hasta</label>
            <input
            type="date"
            value={formFilters.end}
            onChange={(e) =>
                setFormFilters({ ...formFilters, end: e.target.value })
            }
            className="border p-2 rounded w-full"
            />
        </div>

        <div>
            <label className="text-sm text-gray-500">Top</label>
            <input
            type="number"
            value={formFilters.limit}
            onChange={(e) =>
                setFormFilters({
                ...formFilters,
                limit: Number(e.target.value)
                })
            }
            className="border p-2 rounded w-20"
            />
        </div>

        <button
            onClick={() => setAppliedFilters(formFilters)}
            className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
        >
            Aplicar
        </button>

        <p className="text-sm text-gray-500">
          Mostrando datos {appliedFilters.start || "inicio"} - {appliedFilters.end || "hoy"}
        </p>

      </div>

      {/* 📈 KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-900 text-white p-5 rounded-2xl">
          <p>Total ingresos</p>
          <h3 className="text-2xl">{formatCLP(data.totalRevenue)}</h3>
        </div>

        <div className="bg-white border p-5 rounded-2xl">
          <p>Ventas</p>
          <h3 className="text-2xl">{data.totalTransactions}</h3>
        </div>

        <div className="bg-white border p-5 rounded-2xl">
          <p>Promedio</p>
          <h3 className="text-2xl">{formatCLP(data.averageSale)}</h3>
        </div>
      </div>

      {/* 📊 TOP PRODUCTOS */}
      <div className="bg-white p-5 rounded-2xl shadow">
        <h3 className="font-bold mb-2">Productos más vendidos</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.topProducts}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="quantity" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 💰 INGRESOS POR PRODUCTO */}
      <div className="bg-white p-5 rounded-2xl shadow">
        <h3 className="font-bold mb-2">Ingresos por producto</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.productRevenue}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default SalesSummary;