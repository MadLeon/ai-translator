import TextArea from "./TextArea";

export default function TextInput({
  sourceText,
  handleClearInput,
  handleInputChange,
  handleInputPaste,
}) {
  return (
    <div>
      <TextArea
        editable={true}
        placeholder={"输入文本"}
        sourceText={sourceText}
        handleInputChange={handleInputChange}
      />
      <button onClick={handleInputPaste}>粘贴</button>
      <button onClick={handleClearInput}>清空</button>
    </div>
  );
}
