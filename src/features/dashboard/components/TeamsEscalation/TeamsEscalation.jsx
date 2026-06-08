import { useState } from "react";
import style from "./TeamsEscalation.module.css";

export default function TeamsEscalation({ videos }) {
  console.log(videos);
  const [index, setIndex] = useState(0);

  function handleNextIndex() {
    setIndex((prev) => (prev + 1 >= videos.length ? 0 : prev + 1));
  }

  return (
    <div className={style.container}>
      {videos && (
        <>
          <video
            key={videos[index]?.vendorId}
            src={videos[index]?.videoUrl}
            autoPlay
            muted
            onEnded={handleNextIndex}
            className={style.video_comemoracao}
          ></video>
          <p className={style.video_name}>{videos[index]?.name}</p>
          <p className={style.video_job}>{videos[index]?.job}</p>
        </>
      )}
    </div>
  );
}
