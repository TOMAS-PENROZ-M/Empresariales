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
        <div style={{fontFamily:"Arial", padding:"20px"}}>
            <h1>Ventas</h1>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

                <div style={{border: "1px solid #CCC", padding:"15px", borderRadius:"8px"}}>
                    <h2>Nueva venta</h2>
                    <SalesForm onAddSale={handleAddSale}/>
                </div>

                <div style={{border: "1px solid #CCC", padding:"15px", borderRadius:"8px"}}>
                    <SalesSummary sales={sales}/>
                </div>

            </div>

            <div style={{marginTop:"20px", border: "1px solid #CCC", padding:"15px", borderRadius:"8px"}}>
                <h2>Listado de Ventas</h2>
                <SalesList sales={sales}/>
            </div>
        </div>
    );
};

export default SalesPage;