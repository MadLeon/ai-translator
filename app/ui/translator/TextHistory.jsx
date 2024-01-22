import TextArea from "./TextArea";

export default function TextHistory({
  historyText,
  handleHistoryChange,
  handleDownload,
  handleClearHistory,
}) {
  return (
    <div>
      <TextArea
        editable={true}
        placeholder={"历史记录"}
        sourceText={historyText}
        handleInputChange={handleHistoryChange}
      />
      <button onClick={handleDownload}>下载</button>
      <button onClick={handleClearHistory}>清空</button>
    </div>
  );
}
