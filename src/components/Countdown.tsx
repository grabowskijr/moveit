import { useState, useEffect } from 'react';
import styles from '../styles/components/Countdown.module.css';

export function Countdown () {

    const [time, setTime] = useState(1*60);
    const [active, setActive] = useState(false);

    const minutes = Math.floor (time /60);
    const seconds = time % 60;

    const [minutesLeft, minutesRight] = String(minutes).padStart(2 , '0').split('');

    const [secondsLeft, secondsRight] = String(seconds).padStart(2 , '0').split('');

    function startCountdown() {
        setActive(true);
    }

    useEffect(() => {
        if(active && time > 0 ) {
            setTimeout ( () => {
                    setTime(time -1);
                }, 1000
            )
        }
        if(time == 0) {
            setActive(false);
            setTime(1*60);
        }
    }, [active, time])
    

    return (
        <div>
            <div>
                <div className={styles.countdownContainer}>
                <div>
                    <span>{minutesLeft}</span>
                    <span>{minutesRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondsLeft}</span>
                    <span>{secondsRight}</span>
                </div>
            </div>
    
        
        </div>

        <button type="button" className={styles.countdownButton} onClick={startCountdown}>
            Iniciar um ciclo
        </button>

      </div>
    )
}