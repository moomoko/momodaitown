<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
session_start();

header('Content-Type: application/json');

try {
    // $pdo = new PDO('mysql:host=localhost;dbname=momodaitownn;charset=utf8', 'root', '');
    $pdo = new PDO('mysql:host=mysql3101.db.sakura.ne.jp;dbname=momodai_sotusei;charset=utf8', 'momodai', 'nambamomoko0118');
    // POST データの取得
    $name = $_POST['name'] ?? '';
    $birthday = $_POST['birthday'] ?? '';
    $email = $_POST['email'] ?? '';

    // 必要なデータが送信されていない場合のエラー
    if (!$name || !$birthday || !$email) {
        echo json_encode(['status' => 'error', 'message' => '名前、誕生日、またはメールアドレスが入力されていません']);
        exit();
    }

    // 重複チェック
    $stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email');
    $stmt->execute([':email' => $email]);
    if ($stmt->rowCount() > 0) {
        echo json_encode(['status' => 'error', 'message' => 'このメールアドレスは既に登録されています']);
        exit();
    }

    // データベースに保存
    $stmt = $pdo->prepare('INSERT INTO users (name, birthday, email) VALUES (:name, :birthday, :email)');
    $stmt->execute([':name' => $name, ':birthday' => $birthday, ':email' => $email]);

    // 成功レスポンス
    echo json_encode(['status' => 'success', 'message' => 'ユーザー情報が保存されました']);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'データベースエラー: ' . $e->getMessage()]);
    exit();
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'サーバーエラー: ' . $e->getMessage()]);
    exit();
}


