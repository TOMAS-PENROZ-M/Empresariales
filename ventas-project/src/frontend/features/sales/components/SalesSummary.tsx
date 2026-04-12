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
        <div>
            <h2>
                Resumen de ventas:
            </h2>
            <p>
                Total: ${total}
            </p>
            <p>
                Numero de ventas: {sales.length}
            </p>
        </div>
    );
};

export default SalesSummary;