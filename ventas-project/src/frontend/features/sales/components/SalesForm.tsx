import { useState } from "react";

interface SaleItem {
  product: string;
  quantity: number;
  price: number;
}

interface Sale {
  items: SaleItem[];
  date: string;
}

interface SalesFormProps {
  onAddSale: (sale: Sale) => void;
}


const SalesForm: React.FC<SalesFormProps> = ({ onAddSale }) => {
  const [items, setItems] = useState<SaleItem[]>([
    { product: "", quantity: 1, price: 0},
  ]);

  const handleItemmChange = (index : number, field: keyof SaleItem, value: string | number) => {
    const newItems = [...items];
    newItems[index][field] = value as never;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, {product: "", quantity: 1, price: 0}]);
  };

  const removeItem = (index : number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    const validItems = items.every(i => i.product && i.quantity > 0 && i.price >= 0);
    if (!validItems) {
      alert("Por favor, complete todos los campos de los productos.");
      return;
    }

    onAddSale({
      items,
      date: new Date().toDateString(),
    });
    setItems([{ product: "", quantity: 1, price: 0}]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Registro de Ventas</h3>

      {items.map((item, index) => (
        <div key={index} style={{display: "flex", marginBottom: "10px", gap: "10px"}}>

          <input 
          type="text"
          placeholder="Producto"
          value={item.product}
          onChange={(e) => handleItemmChange(index, "product", e.target.value)}
           />

          <input 
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => handleItemmChange(index, "quantity", Number(e.target.value))}
          />

          <input
          type="number"
          min="0"
          value={item.price}
          onChange={(e) => handleItemmChange(index, "price", Number(e.target.value))}
          />

          <button type="button" onClick={() => removeItem(index)}>
            Eliminar
          </button>
        </div>
      ))}

      <button type="button" onClick={() => addItem()}>
            Agregar Producto
      </button>

      <br/><br/>
      <button type="submit">Registrar venta</button>
    </form>
  );
};

export default SalesForm;