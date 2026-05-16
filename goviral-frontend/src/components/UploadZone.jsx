import React from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function UploadZone({ onFileSelected, disabled = false }) {
  const onDrop = React.useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        onFileSelected(acceptedFiles[0]);
      }
    },
    [onFileSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    disabled,
    accept: {
      "video/*": [],
      "image/*": [],
    },
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: "2px dashed",
        borderColor: isDragActive ? "primary.main" : "rgba(255,255,255,0.18)",
        borderRadius: 4,
        p: { xs: 3, md: 5 },
        textAlign: "center",
        bgcolor: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(12px)",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "0.2s ease",
        opacity: disabled ? 0.65 : 1,
        "&:hover": {
          borderColor: disabled ? "rgba(255,255,255,0.18)" : "primary.main",
          bgcolor: "rgba(255,255,255,0.06)",
        },
      }}
    >
      <input {...getInputProps()} />
      <CloudUploadIcon sx={{ fontSize: 54, mb: 1, color: "primary.main" }} />
      <Typography variant="h5" fontWeight={700}>
        {isDragActive ? "Drop your content here" : "Drag & drop your video or image"}
      </Typography>
      <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
        Upload an MP4, PNG, or JPG. We will send it to S3 and analyze virality.
      </Typography>

      <Button variant="contained" sx={{ mt: 3 }} disabled={disabled}>
        Choose File
      </Button>
    </Box>
  );
}