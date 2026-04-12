import { useState } from "react";
import SalesForm from "../components/SalesForm";
import SalesList from "../components/SalesList";
import SalesSummary from "../components/SalesSummary";

interface Sale {
    product: string;
    quantity: number;
    price: number;
}

const SalesPage: React.FC = () => {
    const [sales, setSales] = useState<Sale[]>([]);

    const addSale = (sale : Sale) => {
        setSales((prevSales) => [...prevSales, sale]);
    };

    return (
        <div>
            <h1>Ventas</h1>
            <section>
                <h2>Registro de ventas</h2>
                <SalesForm onAddSale={addSale}/>
            </section>

            <section>
                <h2>Lista de ventas</h2>
                <SalesList sales={sales} />
            </section>

            <section>
                <h2>Resumen de ventas</h2>
                <SalesSummary sales={sales} />
            </section>
        </div>
    );
};

export default SalesPage;