import { japaneseData } from "./data.js";

let correctCount = 0; // 전역 변수로 맞춘 정답 횟수를 관리

// 히라가나, 가타카나 랜덤 추출
const getRandomJapaneseSound = (type) => {
  const sounds = japaneseData[type];
  return sounds[Math.floor(Math.random() * sounds.length)];
};

// 히라가나, 가타카나에 맞는 한국어 발음 추출
const getKoreanPronunciation = (char, type) => {
  const pronunciationMap =
    type === "hiragana"
      ? japaneseData.hiraganaPronunciation
      : japaneseData.katakanaPronunciation;
  return pronunciationMap[char] || "Unknown";
};

// 추출한 글자 중 '히라가나'만 저장, 출력
const getHiragana = () => {
  const japaneseSound = getRandomJapaneseSound("hiragana");
  document.getElementById("japanese-sound-label").innerText = japaneseSound;
  document.getElementById("quiz-type-label").innerText = "퀴즈 타입: 히라가나";
};

// 추출한 글자 중 '가타카나'만 저장, 출력
const getKatakana = () => {
  const japaneseSound = getRandomJapaneseSound("katakana");
  document.getElementById("japanese-sound-label").innerText = japaneseSound;
  document.getElementById("quiz-type-label").innerText = "퀴즈 타입: 가타카나";
};

// 2~4개의 단어를 저장, 출력
const generateWord = (type) => {
  const wordLength = Math.floor(Math.random() * 3) + 2; // 2~4개의 단어
  let word = "";
  for (let i = 0; i < wordLength; i++) {
    word += getRandomJapaneseSound(type);
  }
  document.getElementById("japanese-sound-label").innerText = word;
  document.getElementById("quiz-type-label").innerText = "퀴즈 타입: 단어 생성";
};

// 정답 처리 함수
const checkAnswer = () => {
  const userInput = document.getElementById("answer-input").value;
  const japaneseSound = document.getElementById(
    "japanese-sound-label",
  ).innerText;
  let koreanPronunciation = "";
  const quizType = document.getElementById("quiz-type-label").innerText;

  // 퀴즈 타입이 단어 생성일 때
  if (quizType === "퀴즈 타입: 단어 생성") {
    for (let char of japaneseSound) {
      koreanPronunciation +=
        getKoreanPronunciation(char, "hiragana") ||
        getKoreanPronunciation(char, "katakana");
    }
  } else if (quizType === "퀴즈 타입: 히라가나") {
    koreanPronunciation = getKoreanPronunciation(japaneseSound, "hiragana");
  } else if (quizType === "퀴즈 타입: 가타카나") {
    koreanPronunciation = getKoreanPronunciation(japaneseSound, "katakana");
  }

  if (userInput === koreanPronunciation) {
    document.getElementById("result-label").innerText = "정답입니다!";
    document.getElementById("answer-input").value = "";
    correctCount++;
    document.getElementById("correct-cnt").innerText =
      `맞춘 정답: ${correctCount}`;

    // 다음 퀴즈 설정
    if (quizType === "퀴즈 타입: 히라가나") {
      getHiragana();
    } else if (quizType === "퀴즈 타입: 가타카나") {
      getKatakana();
    } else if (quizType === "퀴즈 타입: 단어 생성") {
      const firstChar = japaneseSound[0];
      if (japaneseData.hiragana.includes(firstChar)) {
        generateWord("hiragana");
      } else {
        generateWord("katakana");
      }
    }
  } else {
    document.getElementById("result-label").innerText = "틀렸습니다.";
  }
};

const showHint = () => {
  const japaneseSound = document.getElementById(
    "japanese-sound-label",
  ).innerText;
  let koreanPronunciation = "";
  const quizType = document.getElementById("quiz-type-label").innerText;

  // 퀴즈 타입이 단어 생성일 때
  if (quizType === "퀴즈 타입: 단어 생성") {
    for (let char of japaneseSound) {
      koreanPronunciation +=
        getKoreanPronunciation(char, "hiragana") ||
        getKoreanPronunciation(char, "katakana");
    }
  } else if (quizType === "퀴즈 타입: 히라가나") {
    koreanPronunciation = getKoreanPronunciation(japaneseSound, "hiragana");
  } else if (quizType === "퀴즈 타입: 가타카나") {
    koreanPronunciation = getKoreanPronunciation(japaneseSound, "katakana");
  }

  alert(`힌트: ${koreanPronunciation}`);
};

// 이벤트 리스너 설정
document.getElementById("hiragana-btn").addEventListener("click", getHiragana);
document.getElementById("katakana-btn").addEventListener("click", getKatakana);
document
  .getElementById("generate-hiragana-word-btn")
  .addEventListener("click", () => generateWord("hiragana"));
document
  .getElementById("generate-katakana-word-btn")
  .addEventListener("click", () => generateWord("katakana"));
document.getElementById("show-hint-btn").addEventListener("click", showHint);
document
  .getElementById("check-answer-btn")
  .addEventListener("click", checkAnswer);
