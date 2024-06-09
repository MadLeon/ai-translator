import { Box, IconButton, Stack } from "@mui/material";
import { ContentCopy, HighlightOff } from "@mui/icons-material";
import TextArea from "./TextArea";

export default function TextDisplay({
  displayText,
  handleInputChange,
  handleClearDisplay,
  handleDisplayCopy,
}) {
  return (
    <Box
      display="flex"
      alignItems="stretch"
      flexDirection="column"
      p={1}
      sx={{ borderRadius: 2, bgcolor: "white", width: "100%" }}
    >
      <TextArea
        editable={false}
        placeholder={"Translation Result"}
        sourceText={displayText}
        handleInputChange={handleInputChange}
      />
      <Stack direction="row">
        <IconButton onClick={handleClearDisplay}>
          <HighlightOff />
        </IconButton>
        <IconButton onClick={handleDisplayCopy}>
          <ContentCopy />
        </IconButton>
      </Stack>
    </Box>
  );
}
