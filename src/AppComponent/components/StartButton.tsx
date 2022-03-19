import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import StopCircleRoundedIcon from '@mui/icons-material/StopCircleRounded';

const StartButton = ({
  superHandleStop,
  superHandleStart,
}: {
  superHandleStop?: () => void;
  superHandleStart?: () => void;
}) => {
  const [isRecording, setIsRecording] = useState(false);

  const handleClickButton = () => {
    if (isRecording) {
      !!superHandleStop && superHandleStop();
    } else {
      !!superHandleStart && superHandleStart();
    }
    setIsRecording(!isRecording);
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <IconButton onClick={handleClickButton} color='primary'>
        {isRecording ? (
          <StopCircleRoundedIcon sx={{ fontSize: 120 }} />
        ) : (
          <PlayCircleRoundedIcon sx={{ fontSize: 120 }} />
        )}
      </IconButton>
    </div>
  );
};

export default StartButton;
