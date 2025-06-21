<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$jsonFile = 'streamingData.json';
$chunkSize = 500;
$requestedChunk = isset($_GET['chunk']) ? (int)$_GET['chunk'] : 0;

if (!file_exists($jsonFile)) {
    http_response_code(404);
    die(json_encode(['error' => 'Fichier non trouvé']));
}

$fileSize = filesize($jsonFile);
$handle = fopen($jsonFile, 'r');
$data = json_decode(stream_get_contents($handle), true);
fclose($handle);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(500);
    die(json_encode(['error' => 'JSON invalide']));
}

$totalItems = count($data);
$chunks = array_chunk($data, $chunkSize);
$totalChunks = count($chunks);

if ($requestedChunk >= $totalChunks) {
    http_response_code(400);
    die(json_encode(['error' => 'Chunk inexistant']));
}

echo json_encode([
    'data' => $chunks[$requestedChunk],
    'total' => $totalItems,
    'hasMore' => ($requestedChunk + 1) < $totalChunks
]);
?>