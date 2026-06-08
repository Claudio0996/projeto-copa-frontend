import styles from "./ScoreBoardHeader.module.css";
import useScoreBoard from "../../hooks/useScoreBoard";

export default function ScoreBoardHeader() {
  const { data: scores, isPending, error, isError } = useScoreBoard();
  return (
    <div className={styles.scoreboard_header}>
      <h3>Placar total</h3>

      <div className={styles.score}>
        {scores.map((score) => {
          return (
            <div className={styles.team_name} key={score.teamId}>
              <p>{score.teamName}</p>
              <p> {score.goals}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
