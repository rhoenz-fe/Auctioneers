import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ endDate }) => {
    const [timeLeft, setTimeLeft] = useState(getTimeRemaining(endDate));

    useEffect(() => {
        const timer = setInterval(() => {
            const newTimeLeft = getTimeRemaining(endDate);
            setTimeLeft(newTimeLeft);

            if (newTimeLeft.total <= 0) {
                clearInterval(timer);
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [endDate]);

    const formatTime = (value) => {
        return value < 10 ? `0${value}` : value;
    };

    return (
        <div>
            {timeLeft.total > 0 ? (
                <div>
                    <h4 style={{ textAlign: 'center', color: 'darkred' }}>
                        <span>{formatTime(timeLeft.days)}</span> days&nbsp;
                        <span>{formatTime(timeLeft.hours)}</span> hours&nbsp;
                        <span>{formatTime(timeLeft.minutes)}</span> minutes&nbsp;
                        <span>{formatTime(timeLeft.seconds)}</span> seconds
                    </h4>

                </div>
            ) : (
                <div>Countdown expired</div>
            )}
        </div>
    );
};

function getTimeRemaining(endDate) {
    const now = new Date().getTime();
    const targetDate = new Date(endDate).getTime();
    const timeLeft = targetDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return {
        total: timeLeft,
        days,
        hours,
        minutes,
        seconds,
    };
}

export default CountdownTimer;
