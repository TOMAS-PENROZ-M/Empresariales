interface SaleItem {
  product: string;
  quantity: number;
  price: number;
}

interface Sale {
  items: SaleItem[];
  date: string;
}

interface SalesSummaryProps {
    sales: Sale[];

}

const SalesSummary: React.FC<SalesSummaryProps> = ({ sales }) => {
    const total = sales.reduce(
        (acc, sale) => acc + sale.items.reduce(
            (sub, item) => sub + item.quantity * item.price, 0
        ), 0
    );

    return (
        <div className="max-w-3xl mx-auto mt-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">
                Resumen de ventas:
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-900 text-white p-5 rounded-2xl shadow-lg">
                    <p className="text-sm opacity-80">Total</p>
                    <h3 className="text-2xl font-semibold">${total.toFixed(2)}</h3>
                </div>

                <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-lg">
                    <p className="text-sm text-gray-500">Numero de ventas</p>
                    <h3 className="text-2xl font-semibold text-blue-900">{sales.length}</h3>
                </div>
            </div>    
        </div>
    );
};

export default SalesSummary;