import styles from "./interationRoute.module.css";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { TvAudioContext } from "../shared/TvAudioContext";

export default function InterationRoute(){
    const audioRef = useContext(TvAudioContext);
    const navigate = useNavigate();


    function handleUserInteraction(){
        audioRef.current = new Audio("/vinheta.mp3");
        audioRef.current.play();
        navigate("/dashboard");
    }
    return <div >
        <button onClick={handleUserInteraction} className={styles.dash_container}>Dahsboard</button>
    </div>
}