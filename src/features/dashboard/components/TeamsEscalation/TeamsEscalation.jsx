import { useState, useEffect } from "react";
import style from "./TeamsEscalation.module.css";

const MAX_VIDEO_DURATION_MS = 3000;

export default function TeamsEscalation({ videos }) {
  const [index, setIndex] = useState(0);

  function advance() {
    if (!videos?.length) return;
    setIndex((prev) => (prev + 1 >= videos?.length ? 0 : prev + 1));
  }

  useEffect(() => {
    const timer = setTimeout(advance, MAX_VIDEO_DURATION_MS);
    return () => clearTimeout(timer);
  }, [index]);


  if (!videos?.length) return null;

  const current = videos[index];

  return (
    <div className={style.container}>
      <video
        key={current?.videoUrl}
        src={current?.videoUrl}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={advance}
        onError={advance}
        className={style.video_comemoracao}
      />
      <p className={style.video_name}>{current?.name}</p>
      <p className={style.video_job}>{current?.job}</p>
    </div>
  );
}


