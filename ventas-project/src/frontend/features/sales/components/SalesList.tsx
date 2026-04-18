interface SaleItem {
  product: string;
  quantity: number;
  price: number;
}

interface Sale {
  items: SaleItem[];
  date: string;
}

interface SalesListProps {
    sales: Sale[];
}

const SalesList: React.FC<SalesListProps> = ({ sales }) => {
    return (
        <div className="space-y-6">
            {sales.map((sale, index) => (
                <div key = {index} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Venta {index + 1}
                        </h2>
                        <span className="text-sm text-gray-500"> {sale.date}</span>
                    </div>

                    <ul className="divide-y divide-gray-200">
                        {sale.items.map((item, i) => (
                            <li key={i} className="flex justify-between py-2 text-gray-700">
                                <span>{item.product}</span>
                                <span>{item.quantity} * {item.price}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-3 text-right font-bold text-gray-800">
                        Total: ${sale.items.reduce((acc, item) => acc + item.quantity * item.price, 0)}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SalesList;