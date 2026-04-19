import type { Sale } from "../hooks/useSales";


interface SalesListProps {
    sales: Sale[];
}

function formatDate(dateString: string) {
  const date = new Date(dateString);

  return `${date.toLocaleDateString("es-CL")} ${date.toLocaleTimeString("es-CL", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })}`;
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
                        <span className="text-sm text-gray-500">
                            {formatDate(sale.date)}
                        </span>
                    </div>

                    <ul className="divide-y divide-gray-200">
                        {sale.items.map((item, i) => (
                            <li key={i} className="flex justify-between py-2 text-gray-700">
                                <span>{item.name}</span>
                                <span>{item.qty} * {item.price}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-3 text-right font-bold text-gray-800">
                        Total: ${sale.items.reduce((acc, item) => acc + item.qty * item.price, 0)}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SalesList;