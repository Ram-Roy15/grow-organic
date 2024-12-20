
import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";
import axios from "axios";

export default function CheckboxRowSelectionDemo() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [rowClick, setRowClick] = useState<boolean>(true);
  const [totalRecords, setTotalRecords] = useState(0); 
  const [loading, setLoading] = useState(false); 
  const [pagination, setPagination] = useState({ page: 0, rows: 12 }); 

  const fetchProducts = async (page: number, rows: number) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.artic.edu/api/v1/artworks?page=${page + 1}&limit=${rows}`
      );
      setProducts(response.data.data); 
      setTotalRecords(response.data.pagination.total); 
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(pagination.page, pagination.rows); 
  }, [pagination.page, pagination.rows]);

  const onPageChange = (event: {
    first: number;
    rows: number;
    page: number;
  }) => {
    setPagination({ page: event.page, rows: event.rows }); 
  };

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
        rows={pagination.rows}
        paginator
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        lazy // Use lazy loading for better performance
        totalRecords={totalRecords}
        loading={loading}
        onPage={onPageChange}
        tableStyle={{ minWidth: "50rem" }}
        selectionMode={rowClick ? undefined : "multiple"}
        selection={selectedProducts}
        onSelectionChange={(e) => setSelectedProducts(e.value)}
        dataKey="id"
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column>
        <Column field="title" header="Title"></Column>
        <Column field="place_of_origin" header="Place of Origin"></Column>
        <Column field="artist_display" header="Artist Display"></Column>
        <Column field="inscriptions" header="Inscriptions"></Column>
        <Column field="date_start" header="Date Start"></Column>
        <Column field="date_end" header="Date End"></Column>
      </DataTable>
    </div>
  );
}
