interface Sale {
    product: string;
    quantity: number;
    price: number;
}

interface SalesListProps {
    sales: Sale[];
}

const SalesList: React.FC<SalesListProps> = ({ sales }) => {
    return (
        <ul>
            {sales.map((sale, index) => (
                <li key = {index}>
                    {sale.product} - {sale.quantity} x ${sale.price} = ${sale.quantity * sale.price}
                </li>
            ))}
        </ul>
    );
};

export default SalesList;