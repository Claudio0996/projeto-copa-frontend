import styles from "./RankingList.module.css";


export default function RankingList({ listName, list }) {

  return (
    <div className={`${styles[listName]}`}>
      <p>{listName}</p>
      <ul className={styles.list}>
        {list && list.map(item =>{
          return <li className={styles.member}>
          <p>{item.name}</p>
          <p>{item.goals}</p>
        </li>
        })}
      
      </ul>
    </div>
  );
}
