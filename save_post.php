<?php
session_start();

// try {
//     $pdo = new PDO('mysql:host=localhost;dbname=momodaitownn;charset=utf8', 'root', '');
// } catch (PDOException $e) {
//     echo json_encode(['status' => 'error', 'message' => 'データベース接続失敗: ' . $e->getMessage()]);
//     exit();
// }

try {
    $pdo = new PDO('mysql:host=mysql3101.db.sakura.ne.jp;dbname=momodai_sotusei;charset=utf8', 'momodai', 'nambamomoko0118');
} catch (PDOException $e) {
    echo 'データベース接続失敗: ' . $e->getMessage();
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $content = $_POST['content'] ?? '';
    $userId = $_SESSION['user_id'] ?? null;

    // 入力チェック
    if (empty($content) || empty($userId)) {
        echo json_encode(['status' => 'error', 'message' => '無効な投稿内容またはユーザーID']);
        exit();
    }

    // 投稿を保存
    try {
        $stmt = $pdo->prepare("INSERT INTO posts (content, user_id, created_at) VALUES (:content, :user_id, NOW())");
        $stmt->bindParam(':content', $content, PDO::PARAM_STR);
        $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);

        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => '投稿が保存されました']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'データ保存に失敗しました']);
        }
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'データベースエラー: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => '不正なアクセスです']);
}

?>







