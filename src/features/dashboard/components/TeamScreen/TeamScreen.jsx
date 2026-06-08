import styles from "./TeamScreen.module.css";
import useTeam from "../../hooks/useTeam";
import TeamsEscalation from "../TeamsEscalation/TeamsEscalation";

const teamsInfo = [
  {
    teamId: "6a26bfcf5e11d9941410af8d",
    name: "Seleção Amarela",
    foto: "./escalacao-amarela.png",
  },
  {
    teamId: "6a26bfcf5e11d9941410af8e",
    name: "Seleção Verde",
    foto: "./escalacao-verde.png",
  },
  {
    teamId: "6a26bfcf5e11d9941410af8f",
    name: "Seleção Azul",
    foto: "./escalacao-azul.png",
  },
];

export default function TeamScreen({ teamId }) {
  const team = teamsInfo.filter((item) => item.teamId === teamId);
  const { info, isPending, isError, error } = useTeam(teamId);

  console.log(info);

  return (
    <div className={styles.container}>
      <p className={styles.widget}>{team[0].name}</p>
      <img src={team[0].foto} className={styles.teamImg} />
      <TeamsEscalation videos={info.data.videos} />
    </div>
  );
}
