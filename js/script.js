// 要素の取得
const startButton = document.querySelector('.start-button');
const continueButton = document.querySelector('.continue-button');
const nextButton = document.getElementById('next-button');
const topScreen = document.getElementById('top-screen');
const introScreen = document.getElementById('intro-screen');
const nameInputScreen = document.getElementById('name-input-screen');
const birthdayInputScreen = document.getElementById('birthday-input-screen');
const townScreen = document.getElementById('town-screen');
const typingText = document.getElementById('typing-text');
const typingTextName = document.getElementById('typing-text-name');
const typingTextBirthday = document.getElementById('typing-text-birthday');
const speakerName = document.getElementById('speaker-name');
const nameInput = document.getElementById('name-input');
const nameSubmit = document.getElementById('name-submit');
const birthdayInput = document.getElementById('birthday-input');
const birthdaySubmit = document.getElementById('birthday-submit');

let userName = ''; // ユーザーの名前
let dialogueIndex = 0;

// セリフの設定
const dialogues = [
  { speaker: "もも", text: "こんにちは！わたしはもも！" },
  { speaker: "だい", text: "ぼくはだいだよ！ぼくたちのお仕事は”ほめ屋さん”。" },
  { speaker: "だい", text: "みんなを褒めたり、元気づけたりするのが大好きなんだ！" },
  { speaker: "もも", text: "まず、あなたの名前を教えてね！", action: "showNameInput" },
  { speaker: "だい", text: "次に、〇〇ちゃんの誕生日も教えて！お祝いするね！", action: "showBirthdayInput" },
];

// スタートボタンのイベント
startButton.addEventListener('click', () => {
  topScreen.classList.add('hidden');
  introScreen.classList.remove('hidden');
  startDialogue();
});

// タイピングエフェクト
function typeWriter(text, index, targetElement, callback) {
    if (index < text.length) {
      targetElement.textContent += text.charAt(index);
      setTimeout(() => typeWriter(text, index + 1, targetElement, callback), 50);
    } else if (callback) {
      callback();
    }
  }

// セリフ進行
function startDialogue() {
  if (dialogueIndex < dialogues.length) {
    const { speaker, text, action } = dialogues[dialogueIndex];
    speakerName.textContent = speaker;
    typingText.textContent = "";

    if (action === "showNameInput") {
      introScreen.classList.add("hidden");
      nameInputScreen.classList.remove("hidden");
      typeWriter(text, 0, typingTextName); // 名前入力のタイピングエフェクト
    } else if (action === "showBirthdayInput") {
      introScreen.classList.add("hidden");
      birthdayInputScreen.classList.remove("hidden");
      const personalizedText = text.replace("〇〇", userName);
      typingTextBirthday.textContent = ""; // 初期化
      typeWriter(personalizedText, 0, typingTextBirthday); // 誕生日入力のタイピングエフェクト
    } else {
      typeWriter(text, 0, typingText, () => nextButton.classList.remove("hidden"));
    }
  } else {
    nextButton.classList.add("hidden");
  }
}

// 矢印ボタンのイベント
nextButton.addEventListener("click", () => {
  nextButton.classList.add("hidden");
  dialogueIndex++;
  startDialogue();
});

// 名前決定ボタンのイベント
nameSubmit.addEventListener("click", () => {
  const inputName = nameInput.value.trim();
  if (inputName) {
    userName = inputName;
    nameInputScreen.classList.add("hidden");
    introScreen.classList.remove("hidden");
    dialogueIndex++;
    startDialogue();
  } else {
    alert("名前を入力してね！");
  }
});

// 誕生日決定ボタンのイベント
birthdaySubmit.addEventListener("click", () => {
  const inputBirthday = birthdayInput.value;
  if (inputBirthday) {
    birthdayInputScreen.classList.add("hidden");
    townScreen.classList.remove("hidden");
  } else {
    alert("誕生日を入力してね！");
  }
});

// 続きからボタンのイベント
continueButton.addEventListener("click", () => {
  topScreen.classList.add("hidden");
  townScreen.classList.remove("hidden");
});

