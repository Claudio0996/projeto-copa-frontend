import useRanking from "../../hooks/useRanking";
import RankingList from "../RankingList/RankingList";
import styles from "./RankingScreen.module.css";

export default function RankingScreen() {
  const today = new Date();
  const day = today.getDay() || 7;
  const start = today.getDate() - day + 1;

  const startOfWeek = new Date(today);
  startOfWeek.setDate(start);
  startOfWeek.setHours(0, 0, 0, 0);

  const finalOfWeek = new Date(today);
  finalOfWeek.setDate(start + 4);
  finalOfWeek.setHours(23, 59, 59, 999);

  console.log(startOfWeek.getDate());

  const { rank } = useRanking();
  return (
    <div className={styles.container}>
      <h2 className={styles.ranking_title}>
        Artilheiros da semana ({startOfWeek.getDate()} a {finalOfWeek.getDate()}/06)
      </h2>
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
