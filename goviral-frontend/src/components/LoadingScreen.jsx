// import React from "react";
// import { Box, CircularProgress, Typography, LinearProgress, Paper } from "@mui/material";

// const messages = [
//   "Analyzing the hook...",
//   "Checking pacing and retention...",
//   "Evaluating thumbnail strength...",
//   "Optimizing caption and hashtags...",
//   "Comparing against viral patterns...",
// ];

// export default function LoadingScreen() {
//   const [messageIndex, setMessageIndex] = React.useState(0);

//   React.useEffect(() => {
//     const interval = setInterval(() => {
//       setMessageIndex((prev) => (prev + 1) % messages.length);
//     }, 1400);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: { xs: 3, md: 5 },
//         borderRadius: 4,
//         bgcolor: "rgba(255,255,255,0.05)",
//         border: "1px solid rgba(255,255,255,0.08)",
//         textAlign: "center",
//       }}
//     >
//       <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
//         <CircularProgress size={72} thickness={4.5} />
//       </Box>

//       <Typography variant="h5" fontWeight={800}>
//         Processing file...
//       </Typography>

//       <Typography sx={{ mt: 1, color: "text.secondary" }}>
//         {messages[messageIndex]}
//       </Typography>

//       <LinearProgress
//         sx={{
//           mt: 3,
//           height: 10,
//           borderRadius: 999,
//           bgcolor: "rgba(255,255,255,0.08)",
//         }}
//       />
//     </Paper>
//   );
// }

import React from "react";

import {
  Box,
  Typography,
  LinearProgress,
  Paper,
} from "@mui/material";

import BeatTheAlgorithm from "./BeatTheAlgorithm";

export default function LoadingScreen({
  progress = 0,
  stage = "uploading",
}) {
  const isAnalyzing =
    stage === "analyzing";

  return (
    <Box
      sx={{
        mt: 6,
        width: "100%",
      }}
    >
      {/* TOP STATUS CARD */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 5,
          background:
            "linear-gradient(180deg, #111827 0%, #0f172a 100%)",
          color: "white",
          border:
            "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={800}
        >
          {isAnalyzing
            ? "Analyzing Content..."
            : "Uploading Content..."}
        </Typography>

        <Typography
          sx={{
            mt: 1,
            opacity: 0.8,
          }}
        >
          {isAnalyzing
            ? "AI is evaluating hooks, pacing, engagement and viral potential."
            : "Uploading your content securely to cloud storage."}
        </Typography>

        <Box sx={{ mt: 4 }}>
          <LinearProgress
            variant={
              isAnalyzing
                ? "indeterminate"
                : "determinate"
            }
            value={progress}
            sx={{
              height: 12,
              borderRadius: 999,
            }}
          />
        </Box>

        {!isAnalyzing && (
          <Typography
            sx={{
              mt: 1.5,
              opacity: 0.7,
            }}
          >
            {progress}% uploaded
          </Typography>
        )}
      </Paper>

      {/* GAME ONLY DURING AI ANALYSIS */}
      {isAnalyzing && (
        <BeatTheAlgorithm active />
      )}
    </Box>
  );
}