import { useState } from "react";

import styles from "./ListContainer.module.css";
import useAdminSales from "../../hooks/useAdminSales";
import useVendors from "../../hooks/useVendors";
import useSdrs from "../../hooks/useSdrs";
import { transformData, exportData } from "../../../../helpers/transformationData";

import SalesHeader from "../SalesHeader/SalesHeader";
import SalesList from "../SalesList/SalesList";
import SaleModal from "../SaleModal/SaleModal";

export default function ListContainer() {
  const [modalState, setModalState] = useState({ isOpen: false, sale: null });
  const { vendors, isPeding: pendingVendors, isError: isErrorVendors, error: errorVendors } = useVendors();
  const { sdrs, isPeding, pendingSdrs, isError: isErrorSdrs, error: errorSdrs } = useSdrs();
  const { sales, isPending, isError, error } = useAdminSales();


  function handleExport(){
    const data = transformData(sales.data)
    exportData(data)
  }
  

  const handleOpenCreate = () => {
    setModalState((prev) => ({ ...prev, isOpen: true }));
  };

  const handleOpenEdit = (sale) => {
    setModalState({ isOpen: true, sale: sale });
  };

  const handleClose = () => {
    setModalState({ isOpen: false, sale: null });
  };

  return (
    <>
      {modalState.isOpen && <SaleModal onCloseModal={handleClose} sale={modalState.sale} />}
      <div className={styles.container_sales}>
        <SalesHeader totalSales={sales.total} onOpenModal={handleOpenCreate} onExport={handleExport} />
        <section className={styles.container_overflow}>
          <div className={styles.data_container}>
            {isPending && <p>Buscando Vendas...</p>}
            {isError && <p>Erro: {error?.message || "Erro ao buscar vendas"}</p>}
            {!isError && sales.length === 0 ? (
              <p>Não ha vendas cadastradas</p>
            ) : (
              <SalesList sales={sales.data} onEdit={handleOpenEdit} />
            )}
          </div>
        </section>
      </div>
    </>
  );
}
