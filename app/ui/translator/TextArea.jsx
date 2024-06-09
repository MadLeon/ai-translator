import { TextField } from "@mui/material";

export default function TextArea({
  editable,
  placeholder,
  sourceText,
  handleInputChange,
}) {
  return (
    <TextField
      placeholder={placeholder}
      value={sourceText}
      onChange={handleInputChange}
      multiline
      rows={10}
      InputProps={{
        readOnly: !editable,
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            border: "none",
          },
        },
      }}
    />
  );
}
