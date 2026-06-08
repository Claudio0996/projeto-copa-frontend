import styles from "./ScoreScreen.module.css";
import useScoreBoard from "../../hooks/useScoreBoard";
import ScoreCard from "../ScoreCard/ScoreCard";
import FansList from "../FansList/FansList";

export default function ScoreScreen() {
  const { scores } = useScoreBoard();

  return (
    <div className={styles.container}>
      <p className={styles.widget}>Placar da semana</p>
      <img src="./trofeu.png" alt="trofeu da copa" className={styles.image_float} />
      <div className={styles.info_placar}>
        <div className={styles.list_container}>
          {scores.map((score, index) => {
            return <ScoreCard key={score.teamId} team={score} place={index + 1} />;
          })}
        </div>
      </div>
      <FansList />
    </div>
  );
}
