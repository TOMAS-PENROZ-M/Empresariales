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
        <ul>
            {sales.map((sale, index) => (
                <li key = {index}>
                    <strong>Venta {index + 1}</strong>
                    <ul>
                        {sale.items.map((item, i) => (
                            <li key={i}>
                                {item.product} - {item.quantity} * ${item.price}
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    );
};

export default SalesList;