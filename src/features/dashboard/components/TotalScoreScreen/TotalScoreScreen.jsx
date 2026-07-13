import styles from "./TotalScoreScreen.module.css";
import getTotalScore from "../../hooks/useTotalScoreBoard";
import ScoreCard from "../ScoreCard/ScoreCard";
import FansList from "../FansList/FansList";


export default function TotalScoreScreen(){
    const {scores} = getTotalScore();
    const today = new Date();

    console.log(scores)


    return (
        <div className={styles.container}>
          <p className={styles.widget}>Ranking geral</p>
          <img src="./trofeu.png" alt="trofeu da copa" className={styles.image_float} />
          <div className={styles.info_placar}>
            <div className={styles.list_container}>
              {scores && scores.map((score, index) => {
                return <ScoreCard key={score.teamId} team={score} place={index + 1} />;
              })}
            </div>
          </div>
          <FansList />
        </div>
      );
}