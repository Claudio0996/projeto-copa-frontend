import styles from "./RankingList.module.css";

export default function RankingList({ listName }) {
  return (
    <div className={`${styles[listName]}`}>
      <p>{listName}</p>
      <ul className={styles.list}>
        <li className={styles.member}>
          <p>Roberta</p>
          <p>0</p>
        </li>
        <li className={styles.member}>
          <p>Roberta</p>
          <p>0</p>
        </li>
        <li className={styles.member}>
          <p>Roberta</p>
          <p>0</p>
        </li>
      </ul>
    </div>
  );
}
