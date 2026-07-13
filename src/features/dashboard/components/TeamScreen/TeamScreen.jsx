import styles from "./TeamScreen.module.css";
import useTeam from "../../hooks/useTeam";
import TeamsEscalation from "../TeamsEscalation/TeamsEscalation";

const teamsInfo = [
  {
    teamId: "6a28354e6ca8b599604b2bc4",
    name: "Seleção Amarela",
    foto: "./escalacao-amarela.png",
  },
  {
    teamId: "6a28354e6ca8b599604b2bc5",
    name: "Seleção Verde",
    foto: "./escalacao-verde.png",
  },
  {
    teamId: "6a28354e6ca8b599604b2bc6",
    name: "Seleção Azul",
    foto: "./escalacao-azul.png",
  },
];

export default function TeamScreen({ teamId }) {
  const team = teamsInfo.filter((item) => item.teamId === teamId);
  const { data, isPending, isError, error } = useTeam(teamId);
  const fansName = data?.data?.fans?.map((item) => item.name) ?? [];
  const fansArray = [...fansName, ...fansName];


  return (
    <div className={styles.container}>
      <p className={styles.widget}>{team[0]?.name}</p>
      <div className={styles.container_data}>
        <img src={team[0]?.foto} className={styles.teamImg} />
        {data && <TeamsEscalation videos={data?.data?.videos} />}
      </div>
      <div className={styles.info_torcedores}>
        <h2 className={styles.torcedores_title}>Na torcida:</h2>
        <div className={styles.scroll_wrapper}>
          <div className={styles.nomes}>
            {data &&
              fansArray.map((fan, index) => {
                return (
                  <span key={`${fan}+${index}`} className={styles.fanName}>
                    {fan} -
                  </span>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
