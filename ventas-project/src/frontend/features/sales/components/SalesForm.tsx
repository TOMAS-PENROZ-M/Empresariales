import { useState } from "react";

interface Sale {
  product: string;
  quantity: number;
  price: number;
}

interface SalesFormProps {
  onAddSale: (sale: Sale) => void;
}


const SalesForm: React.FC<SalesFormProps> = ({ onAddSale }) => {
  const [product, setProduct] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddSale({ product, quantity, price });
    setProduct("");
    setQuantity(1);
    setPrice(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Producto"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />
      <input
        type="number"
        placeholder="Cantidad"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Precio"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <button type="submit">Registrar venta</button>
    </form>
  );
};

export default SalesForm;