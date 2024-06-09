import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const translateText = async (
  sourceText,
  sourceLanguage,
  translateLanguage,
  historyText,
  markdownMode,
  includeSource,
  setDisplayText,
  setHistoryText
) => {
  if (!sourceText) return;
  if (markdownMode) {
    let split = splitTextMdMode(sourceText);
    let organized = organizeTextMdMode(split);
    let translated = await translateArrayMdMode(
      organized,
      sourceLanguage,
      translateLanguage,
      setDisplayText
    );
    setHistoryText(
      (prevHistoryText) =>
        prevHistoryText + (historyText === "" ? "" : "\n\n") + translated
    );
  } else {
    console.log("Original Text:" + sourceText);
    // 整理
    let organized = organizeText(sourceText);
    console.log("After organizeText():" + organized);
    // 分割
    let split = splitText(organized);
    console.log("After splitText():" + split);
    // 翻译
    let result = await translateArray(
      split,
      sourceLanguage,
      translateLanguage,
      setDisplayText,
      includeSource
    );
    console.log("After TranslateArray():" + result);
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
    if (
      item.trimLeft().startsWith("•") ||
      item.trimLeft().startsWith("o") ||
      item.trimLeft().startsWith("❑")
    ) {
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

const translateArrayMdMode = async (
  sourceArray,
  sourceLanguage,
  translateLanguage,
  setDisplayText
) => {
  const translationPromises = sourceArray.map((source) =>
    translateString(source, sourceLanguage, translateLanguage)
  );

  try {
    const translations = await Promise.all(translationPromises);

    const result = sourceArray.map((sourceItem, index) => {
      if (sourceItem.trim() === "") return "";
      let translatedItem = translations[index] || "";
      if (translatedItem.startsWith("- ")) {
        translatedItem = translatedItem.replace("- ", "  ");
      }
      if (sourceItem.startsWith("#"))
        return `${sourceItem.trim()} ${translatedItem.replace(/^#+/, "")}\n`;
      else return `${sourceItem}${translatedItem}\n`;
    });

    // 所有 Promise 完成后更新状态
    setDisplayText(result.filter((item) => item !== "").join("\n")); // 使用适当的连接符，例如换行符

    return result.filter((item) => item !== "").join("\n");
  } catch (error) {
    console.error("Error during translations: ", error);
    throw error;
  }
};

const translateArray = async (
  sourceArray,
  sourceLanguage,
  translateLanguage,
  setDisplayText,
  includeSource
) => {
  const translationPromises = sourceArray.map((source) =>
    translateString(source, sourceLanguage, translateLanguage)
  );

  try {
    const translations = await Promise.all(translationPromises);

    const result = sourceArray.map((sourceItem, index) => {
      const translatedItem = translations[index] || "";
      return includeSource
        ? `${sourceItem}\n\n${translatedItem}`
        : `${translatedItem}`;
    });

    // 所有 Promise 完成后更新状态
    setDisplayText(result.join("\n\n")); // 使用适当的连接符，例如换行符

    return result.join("\n\n");
  } catch (error) {
    console.error("Error during translations: ", error);
    throw error;
  }
};

const translateString = async (
  sourceText,
  sourceLanguage,
  translateLanguage
) => {
  console.log(translateLanguage);
  if (sourceText === "" || sourceText === "\n") return;
  const completion = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You will be provided with a sentence in ${sourceLanguage}, and your task is to translate it into ${translateLanguage}.`,
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

const cleanZoomCaptionTimeStamp = (sourceText) => {
  let cleanedText = sourceText.replace(/\[.*?\] \d{2}:\d{2}:\d{2}\s*/g, "");
  return cleanedText;
};

const organizeText = (sourceText) => {
  // 清除Zoom caption的时间戳
  let cleanedText = cleanZoomCaptionTimeStamp(sourceText);

  // 去掉换行符附近的空白字符
  let paragraphs = cleanedText.split("\n");
  for (let i = 0; i < paragraphs.length; i++) {
    paragraphs[i] = paragraphs[i].trim();
  }
  let trimmedText = paragraphs.join("\n");

  let result = "";
  let textArray = trimmedText.split(""); // 单字符组成的数组

  // 循环寻找换行符号
  for (let i = 0; i < textArray.length; i++) {
    let currentChar = textArray[i];
    let previousChar = textArray[i - 1];
    let nextChar = textArray[i + 1];

    if (currentChar === "\n") {
      // 段落结尾
      if (
        (previousChar === ".") |
        (previousChar === " ") |
        (previousChar === ":") |
        (previousChar === ";")
      ) {
        if (nextChar !== "\n") {
          // 段落结尾添加空行
          textArray.splice(i + 1, 0, "\n");
        }
      } else {
        // 段落间空行
        if (previousChar && previousChar === "\n") {
          // 连续空行(不需要)
          if (nextChar === "\n") {
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

// --------------------------------------------------------

/**
 *
 * @param {string} sourceText State value
 * @param {bool} markdownMode State value
 * @param {function} setSourceText State function
 *
 * 排除项目符号与项目内容不在一行的情况, 将二者合并为一行
 */
export const cleanUpText = (sourceText, markdownMode, setSourceText) => {
  let sourceArray = splitTextMdMode(sourceText);
  console.log("After splitTextMdMode():" + sourceArray);

  // let trimmedArray = removeSpace(sourceArray);
  // console.log(trimmedArray);

  for (let i = 0; i < sourceArray.length; i++) {
    sourceArray[i] = sourceArray[i].trim();
    if (
      sourceArray[i].trim().length === 1 && // Only has one char
      isNonAlphanumeric(sourceArray[i][0]) && // Is not alphanumeric value
      i < sourceArray.length - 1 // Has at least one following line
    ) {
      sourceArray[i] = ""; // remove the invalid char
      sourceArray[i + 1] = "- " + sourceArray[i + 1]; // Add a "- " at the beginning of next line
    }
  }
  setSourceText(sourceArray.filter((line) => line != "").join("\n"));
};

const isNonAlphanumeric = (char) => {
  return /\W/.test(char);
};

export const calculateWeekday = (day) => {
  let result = "";
  switch (day) {
    case 0:
      result = "Sunday";
      break;
    case 1:
      result = "Monday";
      break;
    case 2:
      result = "Tuesday";
      break;
    case 3:
      result = "Wednesday";
      break;
    case 4:
      result = "Thursday";
      break;
    case 5:
      result = "Friday";
      break;
    case 6:
      result = "Saturday";
      break;
  }
  return result;
};
