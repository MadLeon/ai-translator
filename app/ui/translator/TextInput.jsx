import { Box, IconButton, Stack } from "@mui/material";
import { ContentPaste, HighlightOff } from "@mui/icons-material";
import TextArea from "./TextArea";

export default function TextInput({
  sourceText,
  handleClearInput,
  handleInputChange,
  handleInputPaste,
}) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      p={1}
      sx={{ borderRadius: 2, bgcolor: "white", width: "100%" }}
    >
      <TextArea
        editable={true}
        placeholder={"Input Text"}
        sourceText={sourceText}
        handleInputChange={handleInputChange}
      />
      <Stack direction="row">
        <IconButton onClick={handleClearInput}>
          <HighlightOff />
        </IconButton>
        <IconButton onClick={handleInputPaste}>
          <ContentPaste />
        </IconButton>
      </Stack>
    </Box>
  );
}
