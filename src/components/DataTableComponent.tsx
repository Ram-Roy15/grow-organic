import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";
import axios from "axios";

interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  image?: string;
  price?: number;
  category?: string;
  quantity?: number;
  inventoryStatus?: string;
  rating?: number;
}

export default function CheckboxRowSelectionDemo() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [rowClick, setRowClick] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get("https://api.artic.edu/api/v1/artworks?page=1")
      .then((res) => setProducts(res.data.data as Product[]));
  }, []);

  return (
    <div className="card">
      <div className="flex justify-content-center align-items-center mb-4 gap-2">
        <InputSwitch
          inputId="input-rowclick"
          checked={rowClick}
          onChange={(e: InputSwitchChangeEvent) => setRowClick(e.checked)}
        />
        <label htmlFor="input-rowclick">Row Click</label>
      </div>
      <DataTable
        value={products}
        selectionMode={rowClick ? undefined : "multiple"}
        selection={selectedProducts}
        onSelectionChange={(e) => setSelectedProducts(e.value)}
        dataKey="id"
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column>
        <Column field="title" header="Title"></Column>
        <Column field="place_of_origin" header="Place_of_origin"></Column>
        <Column field="artist_display" header="Artist_display"></Column>
        <Column field="inscriptions" header="Inscriptions"></Column>
        <Column field="date_start" header="Date_start"></Column>
        <Column field="date_end" header="Date_end"></Column>
      </DataTable>
    </div>
  );
}
//  title, place_of_origin, artist_display, inscriptions, date_start, date_end;
