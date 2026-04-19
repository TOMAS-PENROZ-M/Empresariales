import { Link } from "react-router-dom";
import SalesSummary from "../components/SalesSummary";

const ReportsPage = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100">

      {/* HEADER */}
      <header className="max-w-6xl mx-auto mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Dashboard</h1>
          <p className="text-gray-500">Estadísticas de ventas</p>
        </div>

        <Link
          to="/"
          className="bg-gray-200 px-4 py-2 rounded-xl hover:bg-gray-300"
        >
          Volver
        </Link>
      </header>

      {/* CONTENIDO */}
      <div className="max-w-6xl mx-auto">
        <SalesSummary />
      </div>

    </div>
  );
};

export default ReportsPage;