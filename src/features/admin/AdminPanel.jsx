import ScoreBoardHeader from "./components/ScoreBoardHeader/ScoreBoardHeader";
import RankingList from "./components/RankingList/RankingList";
import SalesHeader from "./components/SalesHeader/SalesHeader";

import styles from "./AdminPanel.module.css";
import ListContainer from "./components/ListContainer/ListContainer";

export default function AdminPanel() {
  return (
    <section className={styles.admin_container}>
      <div className={styles.sidebar_content}>
        <ScoreBoardHeader />
        <div className={styles.ranking}>
          <h3>Ranking total</h3>
          <div className={styles.ranking_container}>
            <RankingList listName="Farmer" />
            <RankingList listName="Vendas" />
          </div>
        </div>
      </div>
      <div className={styles.main_content}>
        <ListContainer />
      </div>
    </section>
  );
}
