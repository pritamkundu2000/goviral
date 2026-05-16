
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
  Avatar,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InsightsIcon from "@mui/icons-material/Insights";

function getScoreColor(score) {
  if (score >= 75) return "success";
  if (score >= 50) return "warning";
  return "error";
}

function getScoreLabel(score) {
  if (score >= 75) return "High Viral Potential";
  if (score >= 50) return "Moderate Potential";
  return "Needs Improvement";
}

export default function HistoryTable({ history = [] }) {
  return (
    <Card
      sx={{
        mt: 4,
        borderRadius: 4,
        bgcolor: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h4"
          fontWeight={900}
          sx={{ mb: 1 }}
        >
          Analysis History
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          View your previous AI virality analyses and track content performance.
        </Typography>

        {history.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 6,
            }}
          >
            <InsightsIcon
              sx={{
                fontSize: 64,
                opacity: 0.3,
                mb: 2,
              }}
            />

            <Typography
              variant="h6"
              fontWeight={700}
            >
              No analysis history yet
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              Upload content to start building your AI insights history.
            </Typography>
          </Box>
        ) : (
          <Stack spacing={3}>
            {history.map((item) => {
              const score =
                Number(item?.virality_score) || 0;

              const createdDate = item?.createdAt
                ? new Date(
                    item.createdAt
                  ).toLocaleString()
                : "Unknown date";

              return (
                <Card
                  key={item._id}
                  sx={{
                    borderRadius: 3,
                    bgcolor:
                      "rgba(255,255,255,0.03)",
                    border:
                      "1px solid rgba(255,255,255,0.08)",
                    transition: "0.25s ease",
                    "&:hover": {
                      transform:
                        "translateY(-4px)",
                      bgcolor:
                        "rgba(255,255,255,0.05)",
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent:
                          "space-between",
                        alignItems: "flex-start",
                        gap: 2,
                        flexWrap: "wrap",
                      }}
                    >
                      {/* LEFT SECTION */}
                      <Box sx={{ flex: 1 }}>
                        <Stack
                          direction="row"
                          spacing={2}
                          alignItems="center"
                        >
                          <Avatar
                            sx={{
                              bgcolor:
                                score >= 75
                                  ? "success.main"
                                  : score >= 50
                                  ? "warning.main"
                                  : "error.main",
                            }}
                          >
                            {score >= 75 ? (
                              <TrendingUpIcon />
                            ) : (
                              <WarningAmberIcon />
                            )}
                          </Avatar>

                          <Box>
                            <Typography
                              variant="h6"
                              fontWeight={800}
                            >
                              {getScoreLabel(
                                score
                              )}
                            </Typography>

                            <Typography
                              variant="body2"
                              color="text.secondary"
                            >
                              {createdDate}
                            </Typography>
                          </Box>
                        </Stack>

                        <Typography
                          sx={{
                            mt: 2,
                            color:
                              "text.secondary",
                          }}
                        >
                          {item?.hook_analysis ||
                            "No hook analysis available."}
                        </Typography>

                        <Divider
                          sx={{
                            my: 2,
                            borderColor:
                              "rgba(255,255,255,0.08)",
                          }}
                        />

                        <Stack
                          direction="row"
                          spacing={1}
                          flexWrap="wrap"
                          useFlexGap
                        >
                          {(item?.trending_hashtags ||
                            []
                          ).map((tag, idx) => (
                            <Chip
                              key={`${tag}-${idx}`}
                              label={tag}
                              size="small"
                              color="primary"
                              variant="outlined"
                            />
                          ))}
                        </Stack>
                      </Box>

                      {/* RIGHT SECTION */}
                      <Box
                        sx={{
                          minWidth: 220,
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                        }}
                      >
                        <Card
                          sx={{
                            borderRadius: 3,
                            bgcolor:
                              "rgba(255,255,255,0.04)",
                            border:
                              "1px solid rgba(255,255,255,0.08)",
                          }}
                        >
                          <CardContent>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                            >
                              Virality Score
                            </Typography>

                            <Typography
                              variant="h3"
                              fontWeight={900}
                              sx={{
                                mt: 1,
                              }}
                            >
                              {score}
                            </Typography>

                            <Chip
                              label={
                                item?.viral_label ||
                                getScoreLabel(
                                  score
                                )
                              }
                              color={getScoreColor(
                                score
                              )}
                              sx={{ mt: 2 }}
                            />
                            <Stack
                                direction="row"
                                spacing={1}
                                sx={{ mt: 2 }}
                                flexWrap="wrap"
                            >
                            {item?.competitor_comparison
                            ?.length > 0 && (
                            <Chip
                                label={`${item.competitor_comparison.length} Competitor Insights`}
                                color="secondary"
                                size="small"
                            />
                        )}

                        {item?.trending_audio_recommendations
                            ?.length > 0 && (
                            <Chip
                            label={`${item.trending_audio_recommendations.length} Audio Suggestions`}
                            color="info"
                            size="small"
                            />
                        )}
                        </Stack>
                          </CardContent>
                        </Card>

                        <Card
                          sx={{
                            borderRadius: 3,
                            bgcolor:
                              "rgba(255,255,255,0.04)",
                            border:
                              "1px solid rgba(255,255,255,0.08)",
                          }}
                        >
                          <CardContent>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                            >
                              Best Platform
                            </Typography>

                            <Typography
                              variant="h6"
                              fontWeight={700}
                              sx={{ mt: 1 }}
                            >
                              {item?.best_platform ||
                                "Unknown"}
                            </Typography>

                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mt: 2 }}
                            >
                              Audience
                            </Typography>

                            <Typography
                              variant="body1"
                              fontWeight={600}
                              sx={{ mt: 0.5 }}
                            >
                              {item?.target_audience ||
                                "General"}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}