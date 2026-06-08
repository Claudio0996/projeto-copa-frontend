import useRanking from "../../hooks/useRanking";
import RankingList from "../RankingList/RankingList";
import styles from "./RankingScreen.module.css";

export default function RankingScreen() {
  const { rank } = useRanking();
  return (
    <div className={styles.container}>
      <h2 className={styles.ranking_title}>Artilheiros da semana</h2>
      <div className={styles.ranking_container}>
        <div className={styles.content_container}>
          <div className={styles.sales_container}>
            <div className={styles.content_header}>
              <h3 className={styles.ranking_content_title}>Vendas</h3>
              <p className={styles.ranking_goals}>Gols</p>
            </div>
            <RankingList list={rank.venda} />
          </div>
          <div className={styles.divider}></div>
          <div className={styles.sales_container}>
            <div className={styles.content_header}>
              <h3 className={styles.ranking_content_title}>Farmer</h3>
              <p className={styles.ranking_goals}>Gols</p>
            </div>
            <RankingList list={rank.farm} />
          </div>
        </div>
      </div>
    </div>
  );
}
