// src/components/Countdown.tsx
import React, { useState, useEffect } from 'react';
import { Typography, Paper } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

interface CountdownProps {
  targetDate: string;
}

interface TimeLeft {
  days?: number;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: TimeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        width: 100,
        height: 100,
        marginTop: 'auto',
        backgroundColor: '#f5f5f5',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <SchoolIcon sx={{ fontSize: 40, marginBottom: 1 }} />
      <Typography variant="h6" align="center">
        {timeLeft.days}
      </Typography>
      <Typography variant="body2" align="center">
        days
      </Typography>
    </Paper>
  );
};

export default Countdown;
