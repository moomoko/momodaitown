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
const boardScreen = document.getElementById('board-screen');
const hirobaArea = document.getElementById('hiroba-area');
const boardArea = document.getElementById('board-area');
const backToTownButton = document.getElementById('back-to-town');
const backToHirobaButton = document.getElementById('back-to-hiroba');
const typingText = document.getElementById('typing-text');
const typingTextName = document.getElementById('typing-text-name');
const typingTextBirthday = document.getElementById('typing-text-birthday');
const speakerName = document.getElementById('speaker-name');
const nameInput = document.getElementById('name-input');
const nameSubmit = document.getElementById('name-submit');
const birthdayInput = document.getElementById('birthday-input');
const birthdaySubmit = document.getElementById('birthday-submit');
const postButton = document.getElementById('post-button');
const postForm = document.getElementById('post-form');
const submitPost = document.getElementById('submit-post');
const cancelPost = document.getElementById('cancel-post');
const postText = document.getElementById('post-text');
const loginScreen = document.getElementById('login-screen');
const loginForm = document.getElementById('login-form'); // ログインフォーム追加
const emailInputScreen = document.getElementById('email-input-screen');
const emailInput = document.getElementById('email-input');
const emailSubmit = document.getElementById('email-submit');
const typingTextEmail = document.getElementById("typing-text-email");
const viewButton = document.getElementById("view-ranking");
const homeScreen = document.getElementById('home-screen');
const backToTownFromHomeButton = document.getElementById('back-to-town-from-home');
const homeArea = document.getElementById('home-area'); // ほめ屋さんエリア
const typingTextHome = document.getElementById('typing-text-home');




let userName = ''; // ユーザーの名前
let currentUser = null; // 現在のユーザー情報
let dialogueIndex = 0;
let storedComments = {}; // 投稿ごとのコメントを保存

// セリフの設定
const dialogues = [
  { speaker: "もも", text: "こんにちは！わたしはもも！" },
  { speaker: "だい", text: "ぼくはだいだよ！ぼくたちのお仕事は”ほめ屋さん”。" },
  { speaker: "だい", text: "みんなを褒めたり、元気づけたりするのが大好きなんだ！" },
  { speaker: "もも", text: "まず、あなたの名前を教えてね！", action: "showNameInput" },
  { speaker: "だい", text: "次に、〇〇ちゃんの誕生日も教えて！お祝いするね！", action: "showBirthdayInput" },
  { speaker: "だい", text: "最後に、メールアドレスを教えてね！", action: "showEmailInput" },
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

    // 名前入力画面
    if (action === "showNameInput") {
      introScreen.classList.add('hidden');
      nameInputScreen.classList.remove('hidden');
      typeWriter(text, 0, typingTextName);
    }
    // 誕生日入力画面
    else if (action === "showBirthdayInput") {
      introScreen.classList.add('hidden');
      birthdayInputScreen.classList.remove('hidden');
      const personalizedText = text.replace("〇〇", userName);
      typingTextBirthday.textContent = "";
      typeWriter(personalizedText, 0, typingTextBirthday);
    }
    // メールアドレス入力画面
    else if (action === "showEmailInput") {
      birthdayInputScreen.classList.add('hidden');
      emailInputScreen.classList.remove('hidden');
      typingTextEmail.textContent = "";
      typeWriter(text, 0, typingTextEmail);
    }
    // 通常のセリフ
    else {
      typeWriter(text, 0, typingText, () => nextButton.classList.remove('hidden'));
    }
  } else {
    nextButton.classList.add('hidden');
  }
}



// 矢印ボタンのイベント
nextButton.addEventListener('click', () => {
  nextButton.classList.add('hidden');
  dialogueIndex++;
  startDialogue();
});

// 名前決定ボタンのイベント
nameSubmit.addEventListener('click', () => {
  const inputName = nameInput.value.trim();
  if (inputName) {
    userName = inputName;
    nameInputScreen.classList.add('hidden');
    introScreen.classList.remove('hidden');
    dialogueIndex++;
    startDialogue();
  } else {
    alert("名前を入力してね！");
  }
});

// 誕生日決定ボタンのイベント修正
birthdaySubmit.addEventListener('click', () => {
  const inputBirthday = birthdayInput.value;
  if (inputBirthday && userName) {
      userBirthday = inputBirthday; // 誕生日を保存
      birthdayInputScreen.classList.add('hidden'); // 誕生日画面を非表示
      emailInputScreen.classList.remove('hidden'); // メールアドレス入力画面を表示
  } else {
      alert("名前または誕生日を入力してください！");
  }
});

// メールアドレス決定ボタンのイベント
emailSubmit.addEventListener('click', () => {
  const inputEmail = emailInput.value.trim();
  if (inputEmail && userName && userBirthday) {
      fetch("save_user.php", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ name: userName, birthday: userBirthday, email: inputEmail }),
      })
      .then((response) => response.json())
      .then((data) => {
          if (data.status === "success") {
              emailInputScreen.classList.add('hidden');
              topScreen.classList.remove('hidden'); // 登録後にトップ画面を表示
              alert(`${userName}さん、登録が完了しました！`);
          } else {
              alert("エラー: " + data.message);
          }
      })
      .catch((error) => {
          console.error("通信エラー:", error);
          alert("通信エラーが発生しました。");
      });
  } else {
      alert("メールアドレスを入力してください！");
  }
});


// 続きからボタンのイベント
continueButton.addEventListener('click', () => {
  topScreen.classList.add('hidden');
  loginScreen.classList.remove('hidden');
});



// 広場エリアをクリックした場合
hirobaArea.addEventListener('click', () => {
  townScreen.classList.add('hidden');
  hirobaScreen.classList.remove('hidden');

  // 投稿をロード（既存の投稿を削除してから）
  loadPosts();

  // 戻るボタンのイベントを再設定
  backToTownButton.addEventListener("click", () => {
    hirobaScreen.classList.add("hidden");
    townScreen.classList.remove("hidden");
  });
});

// やさしさひろば画面からタウン画面に戻る
backToTownButton.addEventListener('click', () => {
  hirobaScreen.classList.add('hidden');
  townScreen.classList.remove('hidden');
});

// 掲示板エリアをタップしたときのイベント
boardArea.addEventListener('click', () => {
  hirobaScreen.classList.add('hidden');
  boardScreen.classList.remove('hidden');
});

// 掲示板から広場に戻るボタンのイベント
backToHirobaButton.addEventListener('click', () => {
  boardScreen.classList.add('hidden');
  hirobaScreen.classList.remove('hidden');
});

// 投稿フォーム関連コード
postButton.addEventListener('click', () => {
  postForm.classList.remove('hidden');
});

cancelPost.addEventListener('click', () => {
  postForm.classList.add('hidden');
  postText.value = "";
});

submitPost.addEventListener('click', () => {
  const content = postText.value.trim();

  console.log('Post content:', content); // 投稿内容をログに出力

  if (!content || !currentUser || !currentUser.id) {
    console.log('User info missing:', currentUser); // currentUser をログに出力
    alert("投稿内容が空か、ユーザー情報が不足しています。");
    return;
  }

  fetch("save_post.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      content: content,
      user_id: currentUser.id, // 正しいユーザーIDを送信
    }),
  })
  .then((response) => response.json())
  .then((data) => {
    if (data.status === "success") {
      postForm.classList.add("hidden");
      postText.value = "";
      loadPosts(); // 投稿後に広場を更新
    } else {
      alert("エラー: " + data.message);
    }
  })
  .catch((error) => {
    console.error("通信エラー:", error);
    alert("通信エラーが発生しました。");
  });
});

// 投稿をロードする関数
function loadPosts() {
  // 既存の投稿（moyamoya）を削除
  const hirobaScreen = document.getElementById('hiroba-screen');
  const existingMoyamoyas = hirobaScreen.querySelectorAll(".moyamoya");
  existingMoyamoyas.forEach(moyamoya => moyamoya.remove());

  // 新しい投稿を読み込む
  fetch("get_posts.php")
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // ここでレスポンスを確認
      if (data.status === "success") {
        const posts = data.posts;
        posts.forEach((post) => {
          console.log("Displaying post:", post); // 投稿内容を確認
          displayMoyamoya(post); // もやもやを追加
        });
      } else {
        console.error("投稿データの取得に失敗:", data.message);
      }
    })
    .catch((error) => {
      console.error("通信エラー:", error);
    });
}

// もやもやを表示する関数
function displayMoyamoya(post) {
  const moyamoya = document.createElement("div");
  moyamoya.className = "moyamoya";
  moyamoya.dataset.content = post.content;
  moyamoya.dataset.postId = post.id;

  const savedPosition = localStorage.getItem(`moyamoya-${post.id}`);
  let leftPosition, topPosition;

  if (savedPosition) {
    // 位置情報があれば、保存された位置を使用
    const { left, top } = JSON.parse(savedPosition);
    leftPosition = left;
    topPosition = top;
  } else {
    // 位置情報がなければ、適切にランダムで設定する
    const hirobaRect = hirobaScreen.getBoundingClientRect();
    const size = 180; // モヤモヤのサイズ
    const padding = 20; // 余白
    leftPosition = Math.random() * (hirobaRect.width - size - padding * 2) + padding;
    topPosition = hirobaRect.height - size - padding;
  }

  // 位置を設定
  moyamoya.style.left = `${leftPosition}px`;
  moyamoya.style.top = `${topPosition}px`;

  // 位置情報をローカルストレージに保存
  localStorage.setItem(`moyamoya-${post.id}`, JSON.stringify({ left: leftPosition, top: topPosition }));

  hirobaScreen.appendChild(moyamoya);

  moyamoya.addEventListener("click", () => {
    showPopup(post); // モヤモヤをタップしたときの詳細表示
  });
}




// ポイント表示を更新する関数
function updatePointsDisplay() {
  // points-display要素を取得
  const pointsDisplay = document.getElementById("points-display");

  // currentUser.points が変更されたタイミングで表示を更新
  if (pointsDisplay && currentUser) {
    pointsDisplay.textContent = `ポイント: ${currentUser.points}`;
    pointsDisplay.style.display = 'block'; // ポイント表示を表示
  }
}

function showPopup(post) {
  console.log(post);
  // 既存のポップアップを削除
  const existingPopup = document.querySelector(".letter-popup");
  if (existingPopup) {
    existingPopup.remove();
  }

  const letterPopup = document.createElement("div");
  letterPopup.className = "letter-popup";
  letterPopup.innerHTML = `
    <div class="letter-content">
      <p><strong>投稿者:</strong> ${post.user_name}</p>
      <p><strong>内容:</strong> ${post.content}</p>
      <p><strong>投稿日時:</strong> ${new Date(post.created_at).toLocaleString()}</p>
      <div class="actions">
        <button class="like-button" data-liked="false">❤️</button>
        <button class="comment-button">💬</button>
      </div>
      <div class="comments-section hidden">
        <textarea class="comment-input" placeholder="コメントを入力してください"></textarea>
        <button class="submit-comment">送信</button>
        <ul class="comments-list"></ul>
      </div>
      <button class="close-letter">閉じる</button>
    </div>
  `;

  document.body.appendChild(letterPopup);

  const closeButton = letterPopup.querySelector(".close-letter");
  closeButton.addEventListener("click", () => {
    letterPopup.remove();
  });

  const likeButton = letterPopup.querySelector(".like-button");
  const commentButton = letterPopup.querySelector(".comment-button");
  const commentsSection = letterPopup.querySelector(".comments-section");
  const submitCommentButton = letterPopup.querySelector(".submit-comment");
  const commentInput = letterPopup.querySelector(".comment-input");
  const commentsList = letterPopup.querySelector(".comments-list");

  // localStorageからコメントを取得して表示
  const savedComments = JSON.parse(localStorage.getItem(`comments_${post.id}`)) || [];
  savedComments.forEach(comment => {
    const commentItem = document.createElement("li");
    commentItem.textContent = comment;
    commentsList.appendChild(commentItem);
  });

  // いいねボタンの処理
  likeButton.addEventListener("click", () => {
    const isLiked = likeButton.dataset.liked === "true";
    if (!isLiked && currentUser && currentUser.id) {
      fetch("update_points.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: currentUser.id, points: 5 }), // 5ポイント加算
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            console.log("ポイント加算成功:", data.new_points);
            likeButton.dataset.liked = "true";
            likeButton.style.color = "red";

            // ローカルでポイントを更新
            currentUser.points = data.new_points;
            updatePointsDisplay(); // ポイント表示を更新
          } else {
            console.error("ポイント加算エラー:", data.message);
          }
        })
        .catch((error) => console.error("通信エラー:", error));
    }
  });

  // コメントボタンの処理
  commentButton.addEventListener("click", () => {
    commentsSection.classList.toggle("hidden");
    likeButton.style.display = commentsSection.classList.contains("hidden") ? "inline" : "none";
    commentButton.style.display = commentsSection.classList.contains("hidden") ? "inline" : "none";
  });

  // コメント送信ボタンの処理
  submitCommentButton.addEventListener("click", () => {
    const comment = commentInput.value.trim();
    if (comment && currentUser && currentUser.name) {
      // サーバーにコメントを保存
      fetch("save_comment.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          post_id: post.id,
          comment: comment,
          user_name: currentUser.name, // 正しいユーザー名を送信
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            const commentItem = document.createElement("li");
            commentItem.textContent = comment;
            commentsList.appendChild(commentItem);
            commentInput.value = ""; // 入力欄をクリア

            // コメントが保存されたらlocalStorageにも保存
            savedComments.push(comment);
            localStorage.setItem(`comments_${post.id}`, JSON.stringify(savedComments));

            // コメント保存成功時にポイント加算リクエストを送信
            fetch("update_points.php", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ user_id: currentUser.id, points: 10 }), // コメントは10ポイント
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.status === "success") {
                  console.log("ポイント加算成功:", data.new_points);

                  // ローカルでポイントを更新
                  currentUser.points = data.new_points;
                  updatePointsDisplay(); // ポイント表示を更新
                } else {
                  console.error("ポイント加算エラー:", data.message);
                }
              })
              .catch((error) => console.error("通信エラー:", error));
          } else {
            console.error("コメント保存エラー:", data.message);
          }
        })
        .catch((error) => console.error("通信エラー:", error));
    } else {
      alert("コメントを入力してください！");
    }
  });


  // 「閉じる」ボタンの処理
  closeButton.addEventListener("click", () => {
    if (document.body.contains(letterPopup)) {
      document.body.removeChild(letterPopup);
    }
  });

}


document.addEventListener("DOMContentLoaded", () => {
  const viewRankingButton = document.getElementById("view-ranking");
  const rankingScreen = document.getElementById("ranking-screen");
  const closeRankingButton = document.getElementById("close-ranking");
  const rankingList = document.getElementById("ranking-list");

  // いいねやコメントのポイントを設定
  const POINTS = { like: 5, comment: 10 };

  // ログインフォームのイベント
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('login-name').value.trim();
  const email = document.getElementById('login-email').value.trim();

  fetch('login.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ name, email }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 'success') {
        currentUser = data.user; // ユーザー情報を取得（ポイントも含まれる）
        console.log(currentUser); // デバッグ用：currentUser をログに出力
        loginScreen.classList.add('hidden');
        townScreen.classList.remove('hidden');
        alert(`${currentUser.name}さん、ようこそ！`);
        
        // ログインした後にポイントを表示
        displayUserPoints();
      } else {
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error('ログイン失敗:', error);
      alert('ログインに失敗しました。');
    });
});


  // ランキング表示イベント
  viewRankingButton.addEventListener("click", () => {
      fetch("get_ranking.php")
          .then((response) => response.json())
          .then((data) => {
              // ランキングリストを更新
              rankingList.innerHTML = "";
              data.forEach((user, index) => {
                  const listItem = document.createElement("li");
                  listItem.innerHTML = `
                      <span>${index + 1}. ${user.name}</span>
                      <span>${user.points}pt</span>
                  `;
                  rankingList.appendChild(listItem);
              });

              rankingScreen.classList.remove("hidden");
          })
          .catch((error) => console.error("ランキングの取得に失敗しました:", error));
  });

  // ランキング画面を閉じる
  closeRankingButton.addEventListener("click", () => {
      rankingScreen.classList.add("hidden");
  });
  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("like-button")) {
      const liked = event.target.dataset.liked === "true";
      if (!liked && currentUser && currentUser.id) {
        fetch("update_points.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: currentUser.id, points: 5 }), // いいねは5ポイント
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            console.log("ポイント加算成功:", data.new_points);
            event.target.dataset.liked = "true";
            event.target.style.color = "red";
          } else {
            console.error("ポイント加算エラー:", data.message);
          }
        })
        .catch((error) => console.error("通信エラー:", error));
      }
    }
  });
  
  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("submit-comment")) {
      const commentInput = event.target.previousElementSibling;
      const comment = commentInput.value.trim();
      if (comment && currentUser && currentUser.id) {
        // サーバーにコメントを保存
        fetch("save_comment.php", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ post_id: event.target.dataset.postId, comment: comment }),
        })
        .then(() => {
          // コメント成功時にポイント加算
          fetch("update_points.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: currentUser.id, points: 10 }), // コメントは10ポイント
          })
          .then((response) => response.json())
          .then((data) => {
            if (data.status === "success") {
              console.log("ポイント加算成功:", data.new_points);
              currentUser.points = data.new_points; // フロントエンドのポイントも更新
              displayUserPoints(); // タウン画面にポイントを反映
            } else {
              console.error("ポイント加算エラー:", data.message);
            }
          })
          
          .catch((error) => console.error("通信エラー:", error));
        })
        .catch((error) => console.error("コメント保存エラー:", error));
      } else {
        alert("コメントを入力してください！");
      }
    }
  });
  
  // タウン画面でポイントを表示する関数
function displayUserPoints() {
  if (currentUser) {
    const pointsDisplay = document.getElementById("points-display");
    pointsDisplay.textContent = `ポイント: ${currentUser.points}`;
    pointsDisplay.style.display = "block";
  }
}

// タウン画面に移行するとき
backToTownButton.addEventListener("click", () => {
  hirobaScreen.classList.add("hidden");
  townScreen.classList.remove("hidden");
  displayUserPoints();
});

  
});



// 初期状態で「見るボタン」を非表示にする
viewButton.classList.add("hidden");

// トップ画面「はじめから」ボタンをクリックしたとき
startButton.addEventListener("click", () => {
  topScreen.classList.add("hidden");
  introScreen.classList.remove("hidden");

  // 「見るボタン」を非表示
  viewButton.classList.add("hidden");
});

// トップ画面「つづきから」ボタンをクリックしたとき
continueButton.addEventListener("click", () => {
  topScreen.classList.add("hidden");
  loginScreen.classList.remove("hidden");

  // 「見るボタン」を非表示
  viewButton.classList.add("hidden");
});

// 広場エリアをクリックした場合
hirobaArea.addEventListener("click", () => {
  townScreen.classList.add("hidden");
  hirobaScreen.classList.remove("hidden");

  // 広場では「見るボタン」を非表示
  viewButton.classList.add("hidden");
});

// 掲示板エリアをクリックした場合
boardArea.addEventListener("click", () => {
  hirobaScreen.classList.add("hidden");
  boardScreen.classList.remove("hidden");

  // 掲示板では「見るボタン」を表示
  viewButton.classList.remove("hidden");
});

// 掲示板画面から広場に戻るボタンをクリックした場合
backToHirobaButton.addEventListener("click", () => {
  boardScreen.classList.add("hidden");
  hirobaScreen.classList.remove("hidden");

  // 広場では「見るボタン」を非表示
  viewButton.classList.add("hidden");
});

// 広場画面から島全体に戻るボタンをクリックした場合
backToTownButton.addEventListener("click", () => {
  hirobaScreen.classList.add("hidden");
  townScreen.classList.remove("hidden");

  // 島全体では「見るボタン」を非表示
  viewButton.classList.add("hidden");
});



// 広場をタップしたときの処理
hirobaArea.addEventListener('click', () => {
  townScreen.classList.add('hidden');
  hirobaScreen.classList.remove('hidden');
  // 必要に応じて広場の初期化処理を追加
});

// ほめ屋さんエリアをタップしたときの処理
homeArea.addEventListener('click', () => {
  townScreen.classList.add('hidden');
  homeScreen.classList.remove('hidden');
  // ほめ屋さんのセリフの初期化処理など
  startHomeDialogue(); // ほめ屋さんのダイアログを開始
});

// ほめ屋さん画面からタウンに戻るボタンの処理
backToTownFromHomeButton.addEventListener('click', () => {
  homeScreen.classList.add('hidden');
  townScreen.classList.remove('hidden');
});

// 広場画面からタウンに戻るボタンの処理
backToTownButton.addEventListener('click', () => {
  hirobaScreen.classList.add('hidden');
  townScreen.classList.remove('hidden');
});

// ほめ屋さんのセリフ
const homeDialogues = [
  { speaker: "もも", text: "いらっしゃいませ！ここはほめ屋さん。" },
  { speaker: "だい", text: "ここはなぐさめたり、ほめたりするところだよ。" },
  { speaker: "もも", text: "今日は何をして欲しい？" },
];

// ボタンの表示・非表示管理
const nextButtonHome = document.getElementById('next-button-home'); // 次へボタン


// セリフを順番に表示
let homeDialogueIndex = 0;

// タイプライターの修正: 文字が表示された後にcallbackを実行
function typeWriter(text, index, targetElement, callback) {
  targetElement.textContent = text.substring(0, index);

  if (index < text.length) {
    setTimeout(() => typeWriter(text, index + 1, targetElement, callback), 50); // 文字を1つずつ表示
  } else if (callback && typeof callback === 'function') {
    callback(); // 文字表示が終わったら次の処理へ
  }
}


// セリフを進行する関数
function startHomeDialogue() {
  if (homeDialogueIndex < homeDialogues.length) {
    const { speaker, text } = homeDialogues[homeDialogueIndex];
    speakerName.textContent = speaker;
    typingTextHome.textContent = "";  // タイピングエリアをクリア
    typeWriter(text, 0, typingTextHome, () => {
      nextButtonHome.classList.remove('hidden');  // 文字が全て表示されたら次へボタンを表示
    });
  } else {
    nextButtonHome.classList.add('hidden');  // すべてのセリフが表示されたら次へボタンを隠す
    showChoices();  // ダイアログ終了後に選択肢を表示
  }
}

// ほめ屋さんの「次へ」ボタンイベント
nextButtonHome.addEventListener('click', () => {
  nextButtonHome.classList.add('hidden');  // 次へボタンを隠す
  homeDialogueIndex++;  // 次のセリフに進む
  startHomeDialogue();  // セリフを表示
});

// 選択肢を表示する関数
function showChoices() {
  const choiceContainer = document.createElement('div');
  choiceContainer.classList.add('choices');

  const comfortButton = document.createElement('button');
  const praiseButton = document.createElement('button');

  comfortButton.textContent = "なぐさめて";
  praiseButton.textContent = "ほめて";

  // ボタンにクリックイベントを追加
  comfortButton.addEventListener('click', () => {
    console.log('なぐさめてボタンがクリックされました');
    showComfort(() => {
      homeDialogueIndex++;  // 次のセリフへ進む
      startHomeDialogue();  // セリフを表示
    });
  });

  praiseButton.addEventListener('click', () => {
    console.log('ほめてボタンがクリックされました');
    showPraise(() => {
      homeDialogueIndex++;  // 次のセリフへ進む
      startHomeDialogue();  // セリフを表示
    });
  });

  // ボタンを画面に追加
  choiceContainer.appendChild(comfortButton);
  choiceContainer.appendChild(praiseButton);
  homeScreen.appendChild(choiceContainer);
}

// 「なぐさめて」ボタンがクリックされた場合
function showComfort(callback) {
  const comfortMessages = [
    "大変だったんだね…少しずつ気持ちが軽くなるようにお手伝いするね",
    "無理しなくていいんだよ！少しずつ進もうね",
    "ぼくたちはずっとここにいるから大丈夫だよ",
    "たくさん頑張ってきたんだね、とってもえらいよ",
    "どうしたらいいか分からなくなったら、休むことがだいじ！",
    "気持ちを受け止めるね、一緒に考えていこう",
    "心が疲れちゃっても、こうして話してくれるだけですごいんだよ",
    "どんな話でも大丈夫、ここでは自由に話してね",
    "言葉にするのは勇気がいるよね、話してくれてありがとう",
    "どんな小さなことでもいいから教えてね"
  ];
  const randomMessage = comfortMessages[Math.floor(Math.random() * comfortMessages.length)];
  speakerName.textContent = "だい";
  typingTextHome.textContent = "";
  typeWriter(randomMessage, 0, typingTextHome, callback);
}

// 「ほめて」ボタンがクリックされた場合
function showPraise(callback) {
  const praiseMessages = [
    "生きてるだけではなまる！",
    "たくさん頑張っていてえらいね",
    "ここに来てくれたことがとっても嬉しいんだ、ありがとう！",
    "存在が素敵だよ",
    "いてくれるだけで幸せなんだよ",
    "外に出たの！すごい",
    "笑顔がとっても素敵だから笑って欲しいな",
    "とってもかわいい！",
    "キラキラの宝石みたいだね",
    "ここに来てくれるだけでもうまんてん！"
  ];
  const randomMessage = praiseMessages[Math.floor(Math.random() * praiseMessages.length)];
  speakerName.textContent = "もも";
  typingTextHome.textContent = "";
  typeWriter(randomMessage, 0, typingTextHome, callback);
}

// 初期化: ページ読み込み時にダイアログを開始
document.addEventListener("DOMContentLoaded", () => {
  const homeArea = document.getElementById('home-area');  // ほめ屋さんエリアのクリック用要素を取得

  if (homeArea) {
    homeArea.addEventListener('click', () => {
      townScreen.classList.add('hidden');
      homeScreen.classList.remove('hidden');
      homeDialogueIndex = 0;  // 最初に戻す
      startHomeDialogue();  // ほめ屋さんのダイアログを開始
    });
  } else {
    console.error('homeArea element not found.');
  }
});

// 再生ボタンと音楽の要素を取得
const playBtn = document.getElementById('play-btn');
const bgm = document.getElementById('bgm');

// 再生ボタンをクリックした時に音楽を再生または停止
playBtn.addEventListener('click', function() {
  if (bgm.paused) {
    bgm.play(); // 音楽を再生
    playBtn.textContent = '❚❚'; // ボタンのテキストを変更
  } else {
    bgm.pause(); // 音楽を停止
    playBtn.textContent = '▶'; // ボタンのテキストを元に戻す
  }
});
