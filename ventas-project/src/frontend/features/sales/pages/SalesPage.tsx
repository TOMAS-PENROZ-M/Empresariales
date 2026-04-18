import { useState } from "react";
import SalesForm from "../components/SalesForm";
import SalesList from "../components/SalesList";
import SalesSummary from "../components/SalesSummary";

interface SaleItem {
  product: string;
  quantity: number;
  price: number;
}

interface Sale {
  items: SaleItem[];
  date: string;
}

const SalesPage =  () => {
    const [sales, setSales] = useState<Sale[]>([]);

    const handleAddSale = (sale : Sale) => {
        setSales((prev) => [...prev, sale]);
    };

    return (
        <div className="min-h-screen p-6 bg-gray-100">

            <header className="max-w-6xl mx-auto mb-6">
                <h1 className="text-3xl font-bold text-blue-900">Ventas</h1>
                <p className="text-gray-500">Gestión y registro de ventas</p>
            </header>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

                <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border">
                    <SalesForm onAddSale={handleAddSale}/>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border">
                    <SalesSummary sales={sales}/>
                </div>

                <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg p-6 border">
                    <h2 className="text-xl font-bold text-blue-900 mb-4">Listado de Ventas</h2>
                <SalesList sales={sales}/>
                </div>
            </div>
        </div>
    );
};

export default SalesPage;