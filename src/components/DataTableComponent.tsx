

import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import axios from "axios";

export default function CheckboxRowSelectionDemo() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [rowClick, setRowClick] = useState<boolean>(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 0, rows: 12 });
  const [selectedRowData, setSelectedRowData] = useState(null);

  const overlayRef = useRef<OverlayPanel>(null);

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

  // Function to open the OverlayPanel and show row details
  const showOverlay = (event: React.MouseEvent, rowData: any) => {
    setSelectedRowData(rowData);
    overlayRef.current?.toggle(event);
  };

  const actionBodyTemplate = (rowData: any) => {
    return (
      <Button
        type="button"
        icon="pi pi-info-circle"
        className="p-button-text"
        onClick={(e) => showOverlay(e, rowData)}
      />
    );
  };

  return (
    <div className="card">
      <DataTable
        value={products}
        rows={pagination.rows}
        paginator
        lazy
        totalRecords={totalRecords}
        loading={loading}
        onPage={onPageChange}
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
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
        <Column field="date_start" header="Date Start"></Column>
        <Column field="date_end" header="Date End"></Column>
        <Column
          header="Actions"
          body={actionBodyTemplate}
          style={{ textAlign: "center", width: "8rem" }}
        />
      </DataTable>

      {/* OverlayPanel Component */}
      <OverlayPanel ref={overlayRef} style={{ width: "300px" }}>
        {selectedRowData ? (
          <div>
            <h3>{selectedRowData.title}</h3>
            <p>
              <strong>Artist:</strong> {selectedRowData.artist_display || "N/A"}
            </p>
            <p>
              <strong>Place of Origin:</strong>{" "}
              {selectedRowData.place_of_origin || "N/A"}
            </p>
            <p>
              <strong>Inscriptions:</strong>{" "}
              {selectedRowData.inscriptions || "N/A"}
            </p>
            <p>
              <strong>Date:</strong> {selectedRowData.date_start || "N/A"} -{" "}
              {selectedRowData.date_end || "N/A"}
            </p>
          </div>
        ) : (
          <p>No data available</p>
        )}
      </OverlayPanel>
    </div>
  );
}
