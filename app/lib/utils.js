import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const translateText = async (
  sourceText,
  historyText,
  setDisplayText,
  setHistoryText
) => {
  if (!sourceText) return;
  // 整理
  let organized = organizeText(sourceText);
  // 分割
  let split = splitText(organized);
  // 翻译
  let result = await translateArray(split, setDisplayText);
  // 组合
  setHistoryText(
    (prevHistoryText) =>
      prevHistoryText + (historyText === "" ? "" : "\n\n") + result
  );
};

const translateArray = async (sourceArray, setDisplayText) => {
  const translationPromises = sourceArray.map(translateString);

  try {
    const translations = await Promise.all(translationPromises);

    const result = sourceArray.map((sourceItem, index) => {
      const translatedItem = translations[index] || "";
      return `${sourceItem}\n\n${translatedItem}`;
    });

    // 所有 Promise 完成后更新状态
    setDisplayText(result.join("\n\n")); // 使用适当的连接符，例如换行符

    return result.join("\n\n");
  } catch (error) {
    console.error("Error during translations: ", error);
    throw error;
  }
};

const translateString = async (sourceText) => {
  const completion = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You will be provided with a sentence in English, and your task is to translate it into zh-CN.",
      },
      {
        role: "user",
        content: sourceText,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  return completion.choices[0].message.content;
};

const splitText = (sourceText) => {
  return sourceText.split("\n\n");
};

const organizeText = (sourceText) => {
  let textArray = sourceText.split("");
  let result = "";

  // 循环寻找换行符号
  for (let i = 0; i < textArray.length; i++) {
    const currentChar = textArray[i];
    const previousChar = textArray[i - 1];
    const nextChar = textArray[i + 1];

    if (currentChar === "\n") {
      // 段落结尾
      if (previousChar && previousChar === ".") {
        if (nextChar && nextChar !== "\n") {
          // 段落结尾添加空行
          textArray.splice(i + 1, 0, "\n");
        }
      } else {
        // 段落间空行
        if (previousChar && previousChar === "\n") {
          // 连续空行(不需要)
          if (nextChar && nextChar === "\n") {
            textArray[i] = "";
          }
        } else {
          // 连接断行
          textArray[i] = " ";
        }
      }
    }
    result += textArray[i];
  }

  return result;
};

// ------------------------------------------------------

export const translateFile = () => {
  let result = "";
  return result;
};

// ------------------------------------------------------

export const downloadText = (historyText) => {
  // 创建 Blob
  const blob = new Blob([historyText], { type: "text/plain" });
  const blobURL = URL.createObjectURL(blob);

  // 创建下载链接
  const downloadLink = document.createElement("a");
  downloadLink.href = blobURL;
  downloadLink.download = "output.txt";

  // 模拟点击下载链接
  downloadLink.click();

  // 释放Blob URL
  URL.revokeObjectURL(blobURL);
};
