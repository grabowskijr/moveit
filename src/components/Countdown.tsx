import { useState, useEffect } from 'react';
import styles from '../styles/components/Countdown.module.css';

export function Countdown () {

    const initialMinutes = 0.1*60;
    let countdownTimeout: NodeJS.Timeout;
    const [time, setTime] = useState(initialMinutes);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor (time /60);
    const seconds = time % 60;

    const [minutesLeft, minutesRight] = String(minutes).padStart(2 , '0').split('');

    const [secondsLeft, secondsRight] = String(seconds).padStart(2 , '0').split('');

    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        setIsActive(false);
        setTime(initialMinutes);
        clearTimeout(countdownTimeout);
         
    }

    

    useEffect(() => {
        if(isActive && time > 0 ) {
            countdownTimeout = setTimeout ( () => {
                    setTime(time -1);
                }, 1000
            )
        }
        if(time === 0 && isActive) {
            setIsActive(false);
            setTime(initialMinutes);
            setHasFinished(true);
        }
    }, [isActive, time])
    

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

        { hasFinished ? (
            <button
                disabled
                className={styles.countdownButton}
                
            >
                Ciclo encerrado

            </button>    
        ):(
            <>
            { isActive ? (
                    <button type="button" className={`${styles.countdownButton} ${styles.countdownButtonActive}`} onClick={resetCountdown }>
                        Abandonar ciclo
                    </button>
                ) : (
                    <button type="button" className={styles.countdownButton} onClick={startCountdown}>
                        Iniciar ciclo
                    </button>
                )
            }
            </>
        )}
        </div>
    )
}