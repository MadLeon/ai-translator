export default function TextArea({
  editable,
  placeholder,
  sourceText,
  handleInputChange,
}) {
  return (
    <textarea
      type="text"
      readOnly={!editable}
      value={sourceText}
      onChange={handleInputChange}
      placeholder={placeholder}
      rows={20}
      style={{ width: "50rem" }}
    />
  );
}
