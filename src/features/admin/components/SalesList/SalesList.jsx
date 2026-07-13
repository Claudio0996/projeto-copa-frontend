import SaleItem from "../SaleItem/SaleItem";
import styles from "./SalesList.module.css";

export default function SalesList({ sales, onEdit }) {
  return (
    <ul className={styles.vendorList}>
      
      {sales.map((sale) => {
        return <SaleItem key={sale._id} sale={sale} onEdit={onEdit} />;
      })}
    </ul>
  );
}
