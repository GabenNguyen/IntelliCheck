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
        }, 900)

        return () => clearInterval(timer)

    }, [counter, onTimeUp])

    const minutes = Math.floor(counter / 60);
    const seconds = counter % 60;

    return (
        <div className="text-center font-sans text-6xl">
            <span>{minutes.toString().padStart(2, "0")}:</span>
            <span>{seconds.toString().padStart(2, "0")}</span>
        </div>
    );
}

export default CountDown

