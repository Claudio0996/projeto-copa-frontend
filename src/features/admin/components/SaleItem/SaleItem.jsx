import styles from "./SaleItem.module.css";

export default function SaleItem({ sale, onEdit }) {
  const date = new Date(sale.realizedAt);
  return (
    <li className={styles.item_container}>
      <section className={styles.sale_vendor}>
        <p className={styles.vendor_name}>Vendedor: {sale.vendor?.name}</p>
        {sale?.sdrId && <p className={styles.assistant_name}>Assistente: {sale.sdrId?.name}</p>}
      </section>

      <section className={styles.date_container}>Gol feito em: {date.toLocaleString("pt-BR")}</section>

      <section>
        <button
          className={styles.button_edit}
          onClick={() => {
            onEdit(sale);
          }}
        >
          Editar
        </button>
      </section>
    </li>
  );
}
