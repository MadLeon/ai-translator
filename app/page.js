"use client";

import { useState, useEffect, useRef } from "react";

import TextInput from "./TextInput";
import TextDisplay from "./TextDisplay";
import TextHistory from "./TextHistory";
import { translateText, downloadText } from "./lib/utils";
import { translateFile } from "./lib/utils";

export default function Home() {
  const [sourceText, setSourceText] = useState(""); // 输入框state
  const [displayText, setDisplayText] = useState(""); // 输出框state
  const [historyText, setHistoryText] = useState("");

  const inputFileRef = useRef(null);
  const [bind, setBind] = useState(false);
  const [fileName, setFileName] = useState("");
  const [filePath, setFilePath] = useState("");

  useEffect(() => {
    if (filePath) {
      setBind(true);
    }
  }, [filePath]);

  // ----------------------- 输入框 -----------------------

  const handleInputChange = (e) => {
    setSourceText(e.target.value);
  };
  const handleClearInput = () => {
    setSourceText("");
  };
  const handleInputPaste = async () => {
    const clipboardText = await navigator.clipboard.readText();
    setSourceText(clipboardText);
  };

  // ----------------------- 输出框 -----------------------

  const handleClearDisplay = () => {
    setDisplayText("");
  };
  const handleDisplayCopy = async () => {
    await navigator.clipboard.writeText(displayText);
  };

  // TODO: 文件翻译功能
  const handleTranslate = async () => {
    translateText(sourceText, historyText, setDisplayText, setHistoryText);
  };

  // ----------------------- 历史记录 -----------------------

  const handleHistoryChange = (e) => {
    setHistoryText(e.target.value);
  };

  const handleDownload = () => {
    downloadText(historyText);
  };

  // ----------------------- 绑定按钮 -----------------------

  const handleBindClick = () => {
    inputFileRef.current.click();
  };

  const handleSelectFile = (event) => {
    setFileName(event.target.files[0].name);
    setFilePath(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div>
      <button onClick={handleBindClick}>打开文件</button>
      <input
        type="file"
        accept=""
        ref={inputFileRef}
        style={{ display: "none" }}
        onChange={handleSelectFile}
      />
      <span>{bind ? "🟢" : "🔴"}</span>
      <TextInput
        sourceText={sourceText}
        handleInputChange={handleInputChange}
        handleClearInput={handleClearInput}
        handleInputPaste={handleInputPaste}
      />
      <button onClick={handleTranslate}>翻译文本</button>
      <TextDisplay
        displayText={displayText}
        handleClearDisplay={handleClearDisplay}
        handleDisplayCopy={handleDisplayCopy}
      />
      <TextHistory
        historyText={historyText}
        handleHistoryChange={handleHistoryChange}
        handleDownload={handleDownload}
      />
    </div>
  );
}
