import TextArea from "./TextArea";

export default function TextHistory({
  historyText,
  handleHistoryChange,
  handleDownload,
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
    </div>
  );
}
