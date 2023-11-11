import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const translateText = async (
  sourceText,
  historyText,
  markdownMode,
  setDisplayText,
  setHistoryText
) => {
  if (!sourceText) return;
  if (markdownMode) {
    let split = splitTextMdMode(sourceText);
    let organized = organizeTextMdMode(split);
    let translated = await translateArrayMdMode(organized, setDisplayText);
    setHistoryText(
      (prevHistoryText) =>
        prevHistoryText + (historyText === "" ? "" : "\n\n") + translated
    );
  } else {
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
  }
};

const organizeTextMdMode = (sourceArray) => {
  let spaceLineLibrary = [];

  // 使用 map 函数遍历数组，根据条件修改元素
  const organizedArray = sourceArray.map((item, index) => {
    // 检查是否为标题
    if (item.includes("\f")) {
      // 使用字符串替换移除 \f，并去除两端空格
      return "### " + item.replace("\f", "").trimLeft();
    }
    // 标题前一行 - ppt 课件专用
    if (
      item.startsWith("     ") &&
      (sourceArray[index + 1].includes("###") ||
        sourceArray[index + 1].includes("\f"))
    ) {
      return "";
    }
    // 是否以•或o开头 - ppt 课件专用
    if (item.trimLeft().startsWith("•") || item.trimLeft().startsWith("o")) {
      // 如果是，则替换为"- "
      return "- " + item.trimLeft().substring(1).trimLeft();
    }
    // 是否数字项目
    if (/^\s*\d+(\.|\))\s*\S/.test(item)) {
      item = item.trimLeft().replace(/(\.|\))\s*/, (match) => {
        return match === ")" ? ") " : ". "; // 根据匹配的内容选择替换为 '. ' 或 ') '
      });
    }
    // 下一行以空格开头
    if (item.startsWith(" ") && index > 0) {
      // 记录该行 index
      spaceLineLibrary.push(index);
      return item.trimLeft();
    }
    return item;
  });

  // 将记录过的行与它的前一行合并
  spaceLineLibrary.forEach((index) => {
    if (index > 0) {
      organizedArray[index - 1] =
        organizedArray[index - 1].replace(/\n$/, " ") + organizedArray[index];
      organizedArray[index] = ""; // 将当前行清空
    }
  });

  // 返回修改后的数组
  return organizedArray;
};

const splitTextMdMode = (sourceText) => {
  return sourceText.split("\n").map((item) => item + "\n");
};

const translateArrayMdMode = async (sourceArray, setDisplayText) => {
  const translationPromises = sourceArray.map(translateString);

  try {
    const translations = await Promise.all(translationPromises);

    const result = sourceArray.map((sourceItem, index) => {
      if (sourceItem.trim() === "") return "";
      let translatedItem = translations[index] || "";
      if (translatedItem.startsWith("- ")) {
        translatedItem = translatedItem.replace("- ", "  ");
      }
      return `${sourceItem}${translatedItem}\n`;
    });

    // 所有 Promise 完成后更新状态
    setDisplayText(result.filter((item) => item !== "").join("\n")); // 使用适当的连接符，例如换行符

    return result.filter((item) => item !== "").join("\n");
  } catch (error) {
    console.error("Error during translations: ", error);
    throw error;
  }
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
  if (sourceText === "" || sourceText === "\n") return;
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
