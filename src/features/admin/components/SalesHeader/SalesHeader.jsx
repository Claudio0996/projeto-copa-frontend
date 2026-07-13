import style from "./SalesHeader.module.css";

export default function SalesHeader({ totalSales, onOpenModal, onExport }) {
  return (
    <header className={style.header}>
      <div className={style.header_container}>
        <h1 className={style.header_title}>Gerenciar Vendas</h1>
        <p>
          {totalSales >= 1 ? totalSales : 0} {totalSales > 1 ? "Vendas cadastradas" : "Venda cadastrada"}
        </p>
      </div>
      <button className={style.header_button} onClick={onExport}>Exportar dados</button>
      <button className={style.header_button} onClick={onOpenModal}>
        + Nova venda
      </button>
    </header>
  );
}
