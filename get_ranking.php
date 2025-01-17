<?php
try {
    // $pdo = new PDO('mysql:host=localhost;dbname=momodaitownn;charset=utf8', 'root', '');
    $pdo = new PDO('mysql:host=mysql3101.db.sakura.ne.jp;dbname=momodai_sotusei;charset=utf8', 'momodai', 'nambamomoko0118');
    $stmt = $pdo->query("SELECT name, points FROM users ORDER BY points DESC LIMIT 10");
    $ranking = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($ranking);
} catch (PDOException $e) {
    echo json_encode(['error' => 'データベース接続失敗: ' . $e->getMessage()]);
}
?>
