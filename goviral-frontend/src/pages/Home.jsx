import React from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Paper,
  Stack,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import axios from "axios";
import API from "../services/api";
import UploadZone from "../components/UploadZone";
import UploadProgress from "../components/UploadProgress";
import LoadingScreen from "../components/LoadingScreen";
import AnalysisDashboard from "../components/AnalysisDashboard";
import HistoryTable from "../components/HistoryTable";

export default function Home() {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState("");
  const [caption, setCaption] = React.useState("");
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [stage, setStage] = React.useState("idle"); // idle | uploading | analyzing
  const [analysis, setAnalysis] = React.useState(null);
  const [history, setHistory] = React.useState([]);
  const [error, setError] = React.useState("");
  const [uploadFileUrl, setUploadFileUrl] = React.useState("");

  React.useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  React.useEffect(() => {
    fetchHistory();
  }, []);

  const handleFileSelected = (file) => {
    setSelectedFile(file);
    setAnalysis(null);
    setError("");
    setUploadProgress(0);
    setUploadFileUrl("");
    setStage("idle");
  };

  const fetchHistory = async () => {
    try {
      const res = await API.get("/history");

      setHistory(res.data || []);
    } catch (error) {
      console.error("History fetch failed:", error);
    }
  };

  // const normalizeAnalysis = (data) => {
  //   return {
  //     virality_score:
  //       data?.virality_score || 0,

  //     hook_strength:
  //       data?.hook_strength || 0,

  //     hook_analysis:
  //       data?.hook_analysis || "",

  //     pacing_rating:
  //       data?.pacing_rating || 0,

  //     thumbnail_rating:
  //       data?.thumbnail_rating || 0,

  //     caption_feedback:
  //       data?.caption_feedback || "",

  //     trending_hashtags:
  //       data?.trending_hashtags || [],

  //     edit_suggestions:
  //       data?.edit_suggestions || [],
  //   };
  // };

  const normalizeAnalysis = (data) => {
  return {
    virality_score:
      data?.virality_score || 0,

    viral_label:
      data?.viral_label || "",

    hook_strength:
      data?.hook_strength || 0,

    hook_analysis:
      data?.hook_analysis || "",

    pacing_rating:
      data?.pacing_rating || 0,

    thumbnail_rating:
      data?.thumbnail_rating || 0,

    caption_feedback:
      data?.caption_feedback || "",

    engagement_prediction:
      data?.engagement_prediction || "",

    target_audience:
      data?.target_audience || "",

    best_platform:
      data?.best_platform || "",

    strongest_moment:
      data?.strongest_moment || "",

    weakest_moment:
      data?.weakest_moment || "",

    trending_hashtags: Array.isArray(data?.trending_hashtags)
    ? data.trending_hashtags
    : data?.trending_hashtags
    ? [data.trending_hashtags]
    : [],

    edit_suggestions: Array.isArray(data?.edit_suggestions)
    ? data.edit_suggestions
    : data?.edit_suggestions
    ? [data.edit_suggestions]
    : [],

    competitor_comparison: Array.isArray(
      data?.competitor_comparison
    )
      ? data.competitor_comparison.map(
          (item) => ({
            competitor_name:
              item?.competitor_name || "",

            competitor_score:
              item?.competitor_score || 0,

            why_it_works:
              item?.why_it_works || "",

            gap_to_close:
              item?.gap_to_close || "",

            search_keyword:
              item?.search_keyword || "",

            platform:
              item?.platform || "",

            competitor_link:
              item?.competitor_link || "",
          })
        )
      : [],

    trending_audio_recommendations: Array.isArray(data?.trending_audio_recommendations)
    ? data.trending_audio_recommendations.map(
        (audio) => ({
          audio_name:
            audio?.audio_name || "",

          artist:
            audio?.artist || "",

          platform:
            audio?.platform || "",

          why_recommended:
            audio?.why_recommended || "",

          confidence:
            audio?.confidence || "",

          // preview_url:
          //   audio?.preview_url || "",
          
          youtube_search_keyword:
            audio?.youtube_search_keyword || "",

          youtube_link:
            audio?.youtube_link || "",
        })
      )
    : [],
  };
};

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError("Please upload a video or image first.");
      return;
    }

    setError("");
    setAnalysis(null);

    try {
      setStage("uploading");
      setUploadProgress(0);

      const uploadRes = await API.get("/upload/get-upload-url", {
        params: {
          fileType: selectedFile.type,
          fileName: selectedFile.name,
        },
      });

      const { uploadURL, fileUrl } = uploadRes.data;
      setUploadFileUrl(fileUrl);

      await axios.put(uploadURL, selectedFile, {
        headers: {
          "Content-Type": selectedFile.type,
        },
        onUploadProgress: (progressEvent) => {
          if (!progressEvent.total) return;
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percent);
        },
      });

      setUploadProgress(100);
      setStage("analyzing");

      const analysisRes = await API.post("/analyze", {
        fileUrl,
        caption,
      });

      const parsed = normalizeAnalysis(analysisRes.data);
      // setAnalysis(parsed || analysisRes.data);
      const normalizedAnalysis = normalizeAnalysis(
        parsed || analysisRes.data
      );

      setAnalysis(normalizedAnalysis);

      fetchHistory();
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          err.message ||
          "Something went wrong."
      );
    } finally {
      setStage("idle");
    }
  };

  const isBusy = stage === "uploading" || stage === "analyzing";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0b1020",
        color: "white",
        py: 4,
        background:
          "radial-gradient(circle at top, rgba(129, 92, 255, 0.22), transparent 35%), linear-gradient(180deg, #0b1020 0%, #070b14 100%)",
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 4,
              bgcolor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Typography variant="overline" color="primary.main" fontWeight={800}>
              Go Viral Clone
            </Typography>

            <Typography variant="h3" fontWeight={900} sx={{ mt: 1 }}>
              AI Content Virality Analyzer
            </Typography>

            <Typography sx={{ mt: 1.5, color: "text.secondary", maxWidth: 760 }}>
              Upload a video or image, get a virality score, see what works, and
              get specific edits to improve reach.
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 4,
              bgcolor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Stack spacing={3}>
              <UploadZone onFileSelected={handleFileSelected} disabled={isBusy} />

              {selectedFile && (
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    bgcolor: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary">
                    Selected File
                  </Typography>
                  <Typography variant="body1" fontWeight={700}>
                    {selectedFile.name}
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    {selectedFile.type.startsWith("video/") ? (
                      <video
                        src={previewUrl}
                        controls
                        style={{
                          width: "100%",
                          maxHeight: 360,
                          borderRadius: 16,
                        }}
                      />
                    ) : (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        style={{
                          width: "100%",
                          maxHeight: 360,
                          objectFit: "contain",
                          borderRadius: 16,
                        }}
                      />
                    )}
                  </Box>
                </Paper>
              )}

              <TextField
                fullWidth
                label="Caption / Context"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                disabled={isBusy}
                multiline
                minRows={3}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    bgcolor: "rgba(255,255,255,0.03)",
                  },
                }}
              />

              <Button
                variant="contained"
                size="large"
                onClick={handleAnalyze}
                disabled={!selectedFile || isBusy}
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 800,
                }}
              >
                {isBusy ? "Processing..." : "Analyze Content"}
              </Button>

              {stage === "uploading" && (
                <UploadProgress value={uploadProgress} />
              )}

              {/* {stage === "analyzing" && <LoadingScreen />} */}
              {(stage === "uploading" ||
                stage === "analyzing") && (
                <LoadingScreen
                  progress={uploadProgress}
                  stage={stage}
                />
              )}

              {error && <Alert severity="error">{error}</Alert>}

              {/* {uploadFileUrl && (
                <Alert severity="info">
                  Uploaded file URL ready.
                </Alert>
              )} */}
            </Stack>
          </Paper>

          {analysis && <AnalysisDashboard analysis={analysis} />}

          {history.length > 0 && (
            <HistoryTable history={history} />
          )}
        </Stack>
      </Container>
    </Box>
  );
}