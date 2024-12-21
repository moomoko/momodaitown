// 要素の取得
const startButton = document.querySelector('.start-button');
const continueButton = document.querySelector('.continue-button');
const nextButton = document.getElementById('next-button');
const topScreen = document.getElementById('top-screen');
const introScreen = document.getElementById('intro-screen');
const nameInputScreen = document.getElementById('name-input-screen');
const birthdayInputScreen = document.getElementById('birthday-input-screen');
const townScreen = document.getElementById('town-screen');
const hirobaScreen = document.getElementById('hiroba-screen');
const boardScreen = document.getElementById("board-screen");
const hirobaArea = document.getElementById("hiroba-area");
const boardArea = document.getElementById("board-area");
const backToTownButton = document.getElementById("back-to-town");
const backToHirobaButton = document.getElementById("back-to-hiroba");
const typingText = document.getElementById('typing-text');
const typingTextName = document.getElementById('typing-text-name');
const typingTextBirthday = document.getElementById('typing-text-birthday');
const speakerName = document.getElementById('speaker-name');
const nameInput = document.getElementById('name-input');
const nameSubmit = document.getElementById('name-submit');
const birthdayInput = document.getElementById('birthday-input');
const birthdaySubmit = document.getElementById('birthday-submit');
const postButton = document.getElementById("post-button");
const postForm = document.getElementById("post-form");
const submitPost = document.getElementById("submit-post");
const cancelPost = document.getElementById("cancel-post");
const postText = document.getElementById("post-text");

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

// やさしさひろばエリアクリックイベント
hirobaArea.addEventListener("click", () => {
  townScreen.classList.add("hidden");
  hirobaScreen.classList.remove("hidden");
});

// やさしさひろば画面からタウン画面に戻る
backToTownButton.addEventListener("click", () => {
  hirobaScreen.classList.add("hidden");
  townScreen.classList.remove("hidden");
});

// 掲示板エリアをタップしたときのイベント
boardArea.addEventListener("click", () => {
  hirobaScreen.classList.add("hidden");
  boardScreen.classList.remove("hidden");
});

// 掲示板から広場に戻るボタンのイベント
backToHirobaButton.addEventListener("click", () => {
  boardScreen.classList.add("hidden");
  hirobaScreen.classList.remove("hidden");
});

// 投稿フォーム関連コード
document.addEventListener("DOMContentLoaded", () => {
  const postButton = document.getElementById("post-button");
  const postForm = document.getElementById("post-form");
  const submitPost = document.getElementById("submit-post");
  const cancelPost = document.getElementById("cancel-post");
  const postText = document.getElementById("post-text");
  const hirobaScreen = document.getElementById("hiroba-screen");

  // やさしさひろば画面でのみ投稿ボタンを表示
  function togglePostButton() {
    if (!hirobaScreen.classList.contains("hidden")) {
      postButton.classList.remove("hidden");
    } else {
      postButton.classList.add("hidden");
    }
  }

  // MutationObserverで画面遷移を監視して投稿ボタンの表示状態を調整
  const observer = new MutationObserver(() => {
    togglePostButton();
  });

  observer.observe(hirobaScreen, {
    attributes: true, // 属性の変化を監視
    attributeFilter: ["class"], // クラス属性のみ監視
  });

  // 投稿ボタンを押したとき、投稿フォームを表示
  postButton.addEventListener("click", () => {
    postForm.classList.remove("hidden");
  });

  // キャンセルボタンを押したとき、投稿フォームを非表示
  cancelPost.addEventListener("click", () => {
    postForm.classList.add("hidden");
    postText.value = ""; // 入力内容をクリア
  });

  // 送信ボタンを押したとき、「もやもやイラスト」を追加
submitPost.addEventListener("click", () => {
  const text = postText.value.trim();
  if (text) {
    // PHPにデータを送信して保存
    fetch("save_post.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ content: text }),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);

        // 投稿成功メッセージを表示
        const messageBox = document.createElement("div");
        messageBox.classList.add("message-box"); // CSSでスタイルを適用
        messageBox.textContent = "やさしさ広場に投稿できました！";
        hirobaScreen.appendChild(messageBox);

        // 数秒後にメッセージを消す
        setTimeout(() => {
          hirobaScreen.removeChild(messageBox);

          // 「もやもやイラスト」を作成
          const moyamoya = document.createElement("div");
          moyamoya.classList.add("moyamoya");

          // ランダムな位置を計算
          const hirobaRect = hirobaScreen.getBoundingClientRect();
          const moyamoyaSize = 180; // CSSで定義されたもやもやのサイズ
          const padding = 20;
          const randomX = Math.random() * (hirobaRect.width - moyamoyaSize - padding * 2) + padding;
          const randomY = Math.random() * (hirobaRect.height - moyamoyaSize - padding * 2) + padding;

          moyamoya.style.left = `${randomX}px`;
          moyamoya.style.top = `${randomY}px`;

          // 投稿内容を属性に追加
          moyamoya.dataset.content = text;

          // イラストを追加
          hirobaScreen.appendChild(moyamoya);

          // クリックイベントで投稿内容を表示
          moyamoya.addEventListener("click", () => {
            const letterPopup = document.createElement("div");
            letterPopup.classList.add("letter-popup");
            letterPopup.innerHTML = `
              <div class="letter-content">
                <p>${moyamoya.dataset.content}</p>
                <button class="close-letter">閉じる</button>
              </div>
            `;
            document.body.appendChild(letterPopup);

            // 閉じるボタン処理
            letterPopup.querySelector(".close-letter").addEventListener("click", () => {
              document.body.removeChild(letterPopup);
            });
          });
        }, 2000); // 2秒後にメッセージを消してもやもやイラストを表示

        // 投稿フォームを非表示
        postForm.classList.add("hidden");
        postText.value = ""; // フォームをリセット
      })
      .catch((error) => {
        console.error("エラー:", error);
        alert("投稿に失敗しました。");
      });
  } else {
    alert("投稿内容を入力してください！");
  }
});

});
