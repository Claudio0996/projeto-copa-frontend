import styles from "./SaleModal.module.css";
import SaleForm from "./SaleForm";

export default function SaleModal({ onCloseModal, sale }) {
  return (
    <div className={styles.modal_overlay} onClick={onCloseModal}>
      <div
        className={styles.modal_container}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2 className={styles.modal_title}>{sale ? "Editar venda" : "Nova venda"}</h2>
        <SaleForm sale={sale} onClose={onCloseModal} />
      </div>
    </div>
  );
}
