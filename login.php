<?php
session_start();

header('Content-Type: application/json');

try {
    // $pdo = new PDO('mysql:host=localhost;dbname=momodaitownn;charset=utf8', 'root', '');
    $pdo = new PDO('mysql:host=mysql3101.db.sakura.ne.jp;dbname=momodai_sotusei;charset=utf8', 'momodai', 'nambamomoko0118');
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';

    if (!$name || !$email) {
        echo json_encode(['status' => 'error', 'message' => '名前またはメールアドレスが入力されていません']);
        exit();
    }

    $stmt = $pdo->prepare('SELECT id, name, points FROM users WHERE name = :name AND email = :email');
    $stmt->execute([':name' => $name, ':email' => $email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        $_SESSION['user_id'] = $user['id'];
        echo json_encode(['status' => 'success', 'user' => $user]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'ユーザーが見つかりません']);
    }
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'サーバーエラー: ' . $e->getMessage()]);
}
