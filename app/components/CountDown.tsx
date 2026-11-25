import React from "react"
import { useState, useEffect } from "react";
import CountDownTime from "@/type/count_down";

const difficultyBasedTime: Record<string, number> = {
    "easy": 60,
    "medium": 90,
    "hard": 120,
    "asian": 45
};

function CountDown( { difficulty, onTimeUp }: CountDownTime ) {
    const startTime = difficultyBasedTime[difficulty] || 60;
    const [counter, setCounter] = useState(startTime)

    useEffect(() => {
        if(counter <= 0) {
            onTimeUp();
            return;
        }

        const timer = setInterval(() => {
            setCounter(prev => prev - 1)
        }, 1000)

        return () => clearInterval(timer)

    }, [counter, onTimeUp])

    const minutes = Math.floor(counter / 60);
    const seconds = counter % 60;

    return (
        <div className={`text-center font-sans text-2xl font-medium tabular-nums ${minutes <= 0 && seconds <= 10 ? "rounded-md bg-destructive/10 px-2 py-1 text-destructive" : ""}`} role="timer" aria-label={`${minutes} minutes ${seconds} seconds remaining`}>
            <span>{minutes.toString().padStart(2, "0")}:</span>
            <span>{seconds.toString().padStart(2, "0")}</span>
        </div>
    );
}

export default CountDown

