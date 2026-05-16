import { Card, CardContent, Box, Typography, CircularProgress } from "@mui/material";

function getScoreColor(score) {
  if (score >= 75) return "success.main";
  if (score >= 50) return "warning.main";
  return "error.main";
}

export default function ScoreCard({ score = 0, label = "Virality Score" }) {
  const safeScore = Math.max(0, Math.min(100, Number(score) || 0));

  return (
    <Card
      sx={{
        borderRadius: 3,
        bgcolor: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
        height: "100%",
      }}
    >
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
          {label}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress
              variant="determinate"
              value={safeScore}
              size={110}
              thickness={5}
              sx={{
                color: getScoreColor(safeScore),
              }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4" fontWeight={800}>
                {safeScore}
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" fontWeight={700}>
              Out of 100
            </Typography>
            {/* <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Higher score means stronger hook, better pacing, and better viral potential.
            </Typography> */}
            <Typography
              variant="h6"
              fontWeight={800}
              sx={{
                mt: 2,
                color:
                  safeScore >= 75
                    ? "success.main"
                    : safeScore >= 50
                    ? "warning.main"
                    : "error.main",
              }}
            >
              {safeScore >= 75
                ? "High Viral Potential"
                : safeScore >= 50
                ? "Moderate Viral Potential"
                : "Needs Improvement"}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}