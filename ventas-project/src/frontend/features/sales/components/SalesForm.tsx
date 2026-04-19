import { useState } from "react";
//import type { Sale, SaleItem } from "../hooks/useSales";
import type { createSaleInput } from "../hooks/useSales";

interface SaleItem {
  name: string;
  qty: number;
  price: number;
}

interface SalesFormProps {
  onAddSale: (sale: createSaleInput) => void;
}


const SalesForm: React.FC<SalesFormProps> = ({ onAddSale }) => {
  const [items, setItems] = useState<SaleItem[]>([
    { name: "", qty: 1, price: 0},
  ]);

  const handleItemmChange = (index : number, field: keyof SaleItem, value: string | number) => {
    const newItems = [...items];
    newItems[index][field] = value as never;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, {name: "", qty: 1, price: 0}]);
  };

  const removeItem = (index : number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    const validItems = items.every(i => i.name && i.qty > 0 && i.price >= 0);
    if (!validItems) {
      alert("Por favor, complete todos los campos de los productos.");
      return;
    }

    onAddSale({
      items
    });
    setItems([{ name: "", qty: 1, price: 0}]);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-6 max-w-3xl mx-auto border border-gray-200">
      <h3 className="text-2xl font-bold  text-blue-900 mb-6">Registro de Ventas</h3>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} 
          className="flex flex-col md:flex-row gap-3 items-center bg-gray-50 p-4 rounded-xl border">

            <div className="flex flex-col flex-1">
              <label className="text-sm font-medium text-gray-700 mb-1">Producto</label>
              <input 
              type="text"
              placeholder="Ej: papas"
              value={item.name}
              onChange={(e) => handleItemmChange(index, "name", e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Cantidad</label>
              <input 
              type="number"
              min="1"
              value={item.qty}
              onChange={(e) => handleItemmChange(index, "qty", Number(e.target.value))}
              className="w-24 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Precio</label>
              <input
              type="number"
              min="0"
              value={item.price}
              onChange={(e) => handleItemmChange(index, "price", Number(e.target.value))}
              className="w-28 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
              />
            </div>

            <button 
            type="button" 
            onClick={() => removeItem(index)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition mt-6 md:mt-0"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button 
        type="button" 
        onClick={() => addItem()}
        className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition"
        >
          + Agregar Producto
        </button>

        <button 
        type="submit"
        className="bg-blue-900 hover:bg-blue-950 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          Registrar venta
        </button>
      </div>    
    </form>
  );
};

export default SalesForm;