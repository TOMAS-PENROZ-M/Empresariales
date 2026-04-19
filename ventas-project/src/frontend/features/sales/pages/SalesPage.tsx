//import { useState } from "react";
import { Link } from "react-router-dom";
import SalesForm from "../components/SalesForm";
import SalesList from "../components/SalesList";
import SalesSummary from "../components/SalesSummary";
import { useSales } from "../hooks/useSales";

const SalesPage =  () => {
    const {sales, addSale, loading} = useSales();

    if (loading) return (
        <div className="animate-pulse space-y-4">
            <div className="h-24 bg-gray-200 rounded-xl"></div>
            <div className="h-64 bg-gray-200 rounded-xl"></div>
        </div>
    );
    if (!sales) return <p>Error cargando ventas</p>;

    return (
        <div className="min-h-screen p-6 bg-gray-100">

            <header className="max-w-6xl mx-auto mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-blue-900">Ventas</h1>
                    <p className="text-gray-500">Gestión y registro de ventas</p>
                </div>

                <Link
                    to="/reports"
                    className="bg-blue-900 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-800 transition"
                >
                    Ver estadísticas
                </Link>
            </header>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

                <div className="lg:col-span-3">
                    <SalesForm onAddSale={addSale}/>
                </div>

                <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-blue-900 mb-4">Listado de Ventas</h2>
                    <SalesList sales={sales}/>
                </div>
            </div>
        </div>
    );
};

export default SalesPage;