import RankingItem from "../RankingItem/RankingItem";
import styles from "./RankingList.module.css";
export default function RankingList({ list }) {
  return (
    <div className={styles.ranking_list}>
      {list.map((item, index) => {
        return <RankingItem key={item.name} item={item} position={index + 1} />;
      })}
    </div>
  );
}
