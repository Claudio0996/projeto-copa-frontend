import useTotalSdrRanking from "../../hooks/useTotalSdrRanking";
import RankingList from "../RankingList/RankingList";
import styles from "./SdrRankingTotalScreen.module.css";

export default function SdrRankingTotalScreen(){
    const { rank } = useTotalSdrRanking();
      return (
        <div className={styles.container}>
          <h2 className={styles.ranking_title}>
            Assistências - Ranking geral
          </h2>
          <div className={styles.ranking_container}>
            <div className={styles.content_container}>
              <div className={styles.sales_container}>
                <div className={styles.content_header}>
                  <h3 className={styles.ranking_content_title}>Jogadores</h3>
                  <p className={styles.ranking_goals}>Passagens</p>
                </div>
                <RankingList list={rank} />
              </div>
            </div>
          </div>
        </div>
      );
}