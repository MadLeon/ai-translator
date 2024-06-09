"use client";

import { useState, useEffect, useRef } from "react";

import {
  Box,
  Button,
  Container,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";

import TextInput from "../ui/translator/TextInput";
import TextDisplay from "../ui/translator/TextDisplay";
import { translateText, downloadText, cleanUpText } from "../lib/utils";

export default function Home() {
  const [sourceText, setSourceText] = useState(""); // 输入框state
  const [displayText, setDisplayText] = useState(""); // 输出框state
  const [historyText, setHistoryText] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [markdownMode, setMarkdownMode] = useState(false);
  const [includeSource, setIncludeSource] = useState(false);

  const [sourceLanguage, setSourceLanguage] = useState("English");
  const [translateLanguage, setTranslateLanguage] =
    useState("Simplified Chinese");

  const inputFileRef = useRef(null);
  const [bind, setBind] = useState(false);
  const [fileName, setFileName] = useState("");
  const [filePath, setFilePath] = useState("");

  useEffect(() => {
    if (filePath) {
      setBind(true);
    }
  }, [filePath]);

  // ----------------------- Config ----------------------

  const handleChangeSourceLanguage = (e) => {
    setSourceLanguage(e.target.value);
  };

  const handleChangeTranslateLanguage = (e) => {
    setTranslateLanguage(e.target.value);
  };

  const handleDefaultLanguage = (e) => {
    setSourceLanguage("English");
    setTranslateLanguage("Simplified Chinese");
  };

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
    translateText(
      sourceText,
      sourceLanguage,
      translateLanguage,
      historyText,
      markdownMode,
      includeSource,
      setDisplayText,
      setHistoryText
    );
  };

  // ----------------------- 历史记录 -----------------------

  const handleHistoryChange = (e) => {
    setHistoryText(e.target.value);
  };

  const handleDownload = () => {
    downloadText(historyText);
  };

  const handleClearHistory = () => {
    setHistoryText("");
  };

  // -------------------- Markdown 模式 --------------------

  const handleChangeMarkdownMode = () => {
    setMarkdownMode(!markdownMode);
  };

  const handleChangeIncludeSource = () => {
    setIncludeSource(!includeSource);
  };

  const handleCleanUp = () => {
    cleanUpText(sourceText, markdownMode, setSourceText);
  };

  // ----------------------- 打开文件 -----------------------

  const handleBindClick = () => {
    inputFileRef.current.click();
  };

  const handleSelectFile = (event) => {
    setFileName(event.target.files[0].name);
    setFilePath(URL.createObjectURL(event.target.files[0]));
    // 在输入框读取内容
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      setFileContent(content);
      setSourceText(content);
    };

    // 以文本格式读取文件内容
    reader.readAsText(event.target.files[0]);
  };

  return (
    <Container sx={{ bgcolor: grey[200], minHeight: "100vh" }}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={3}
        sx={{ minHeight: "100vh", width: "60%", margin: "0 auto" }}
      >
        {/* -------------------- Configuration Area -------------------- */}
        <Box
          display="flex"
          alignItems="center"
          flexDirection="row"
          justifyContent="space-between"
          gap={4}
          p={1}
          sx={{ borderRadius: 2, bgcolor: "white", width: "100%" }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography>From</Typography>
            <FormControl size="small">
              <Select
                id="sourceLanguage"
                value={sourceLanguage}
                onChange={handleChangeSourceLanguage}
                autoWidth
              >
                <MenuItem value={"English"}>English</MenuItem>
                <MenuItem value={"Simplified Chinese"}>
                  Simplified Chinese
                </MenuItem>
                <MenuItem value={"Traditional Chinese"}>
                  Traditional Chinese
                </MenuItem>
                <MenuItem value={"Japanese"}>Japanese</MenuItem>
              </Select>
            </FormControl>
            <Typography>To</Typography>
            <FormControl size="small">
              <Select
                id="sourceLanguage"
                value={translateLanguage}
                onChange={handleChangeTranslateLanguage}
                autoWidth
              >
                <MenuItem value={"Simplified Chinese"}>
                  Simplified Chinese
                </MenuItem>
                <MenuItem value={"Traditional Chinese"}>
                  Traditional Chinese
                </MenuItem>
                <MenuItem value={"English"}>English</MenuItem>
                <MenuItem value={"Japanese"}>Japanese</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Stack>
            <Button variant="contained" onClick={handleDefaultLanguage}>
              Default
            </Button>
          </Stack>
        </Box>

        {/* <button onClick={handleBindClick}>打开文件</button>
        <input
          type="file"
          accept=""
          ref={inputFileRef}
          style={{ display: "none" }}
          onChange={handleSelectFile}
        />
        <span>{bind ? "🟢" : "🔴"}</span>
        <span>{fileName}</span> */}

        {/* -------------------- Input Area -------------------- */}

        <TextInput
          sourceText={sourceText}
          handleInputChange={handleInputChange}
          handleClearInput={handleClearInput}
          handleInputPaste={handleInputPaste}
        />

        {/* -------------------- Action Area -------------------- */}

        <Box
          display="flex"
          alignItems="center"
          flexDirection="row"
          justifyContent="space-between"
          gap={4}
          p={1}
          sx={{ borderRadius: 2, bgcolor: "white", width: "100%" }}
        >
          <Stack direction="row" gap={1} alignItems="center">
            <Switch
              checked={markdownMode}
              onChange={handleChangeMarkdownMode}
            ></Switch>
            <Typography>Markdown</Typography>
            <Switch
              checked={includeSource}
              onChange={handleChangeIncludeSource}
            ></Switch>
            <Typography>Source Included</Typography>
          </Stack>
          <Stack direction="row" gap={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCleanUp}
            >
              Organize
            </Button>
            <Button variant="contained" onClick={handleTranslate}>
              Translate
            </Button>
          </Stack>
        </Box>

        {/* -------------------- Translation Result -------------------- */}

        <TextDisplay
          displayText={displayText}
          handleClearDisplay={handleClearDisplay}
          handleDisplayCopy={handleDisplayCopy}
        />
      </Box>
    </Container>
  );
}
