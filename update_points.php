<?php
header("Content-Type: application/json");

try {
    // データベース接続
    // $pdo = new PDO('mysql:host=localhost;dbname=momodaitownn;charset=utf8', 'root', '');
    $pdo = new PDO('mysql:host=mysql3101.db.sakura.ne.jp;dbname=momodai_sotusei;charset=utf8', 'momodai', 'nambamomoko0118');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // POSTデータの取得
    $input = json_decode(file_get_contents('php://input'), true);

    $user_id = $input['user_id'];
    $points_to_add = $input['points'];

    // ユーザーが存在するか確認
    $stmt = $pdo->prepare("SELECT points FROM users WHERE id = :id");
    $stmt->bindValue(':id', $user_id, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->rowCount() === 0) {
        echo json_encode(['status' => 'error', 'message' => 'ユーザーが見つかりません']);
        exit;
    }

    // ポイントを更新
    $stmt = $pdo->prepare("UPDATE users SET points = points + :points WHERE id = :id");
    $stmt->bindValue(':points', $points_to_add, PDO::PARAM_INT);
    $stmt->bindValue(':id', $user_id, PDO::PARAM_INT);

    if ($stmt->execute()) {
        // 新しいポイントを取得してレスポンス
        $stmt = $pdo->prepare("SELECT points FROM users WHERE id = :id");
        $stmt->bindValue(':id', $user_id, PDO::PARAM_INT);
        $stmt->execute();
        $new_points = $stmt->fetch(PDO::FETCH_ASSOC)['points'];

        echo json_encode(['status' => 'success', 'new_points' => $new_points]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'ポイントの更新に失敗しました']);
    }
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'データベースエラー: ' . $e->getMessage()]);
}

?>




