import TextArea from "./TextArea";

export default function TextDisplay({
  displayText,
  handleInputChange,
  handleClearDisplay,
  handleDisplayCopy,
}) {
  return (
    <div>
      <TextArea
        editable={false}
        placeholder={"翻译结果"}
        sourceText={displayText}
        handleInputChange={handleInputChange}
      />
      <button onClick={handleDisplayCopy}>复制</button>
      <button onClick={handleClearDisplay}>清空</button>
    </div>
  );
}
