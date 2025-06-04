// ===== ゲーム状態管理 =====
let gameState = {
    // プレイヤー情報
    playerName: '',
    
    // 基本ステータス
    totalClicks: 0,           // 総クリック数
    currentCash: 10000000,     // 現在の現金（初期値：1000万円）
    
    // オブジェクト管理
    objects: 0,                // 現在保有オブジェクト数
    maxObjects: 111,           // 最大保有可能数（初期値）
    objectValue: 300000,       // オブジェクト単価（30万円）
    acquisitionRate: 0.1,      // オブジェクト獲得確率（10%）
    
    // サーバー管理
    serverHP: 100000,          // サーバーHP
    maxServerHP: 100000,       // サーバー最大HP
    serverRecoveryRate: 10000, // 秒間回復量
    isServerDown: false,       // サーバーダウン状態
    
    // ガチャシステム
    isGachaMode: false,        // ガチャモード状態
    loadedObjects: 0,          // ガチャ装填済みオブジェクト数
    
    // bot君システム
    botLevel: 0,               // bot君レベル
    botClicksPerSecond: 0,     // bot君の秒間クリック数
    botIsActive: false,        // bot君稼働状態
    
    // リスク管理
    newOrderLimit: 33300000,   // 新規建可能額（保有資産の333%）
    riskRatio: 0,              // 確保率（%）
    
    // アイテム所持数
    inventory: {
        rice: 0,               // お米（kg）
        premiumCoins: 0,       // プレミアムコイン
        quoCards: {
            s10000: 0,         // 10,000円QUOカード
            a5000: 0,          // 5,000円QUOカード
            b3000: 0,          // 3,000円QUOカード
            b2000: 0,          // 2,000円QUOカード
            c1000: 0,          // 1,000円QUOカード
            c500: 0            // 500円QUOカード
        },
        warningItems: 0        // 警告書
    }
};

// ===== 初期化処理 =====
window.addEventListener('DOMContentLoaded', function() {
    // セーブデータの読み込み（将来実装）
    loadGameState();
    
    // 画面の初期表示更新
    updateDisplay();
});

// ===== 画面遷移処理 =====
function switchScreen(fromId, toId) {
    document.getElementById(fromId).classList.remove('active');
    document.getElementById(toId).classList.add('active');
}

// ===== ゲーム開始処理 =====
function startGame() {
    const playerName = document.getElementById('player-name').value.trim();
    
    if (playerName === '') {
        alert('プレイヤー名を入力してください！');
        return;
    }
    
    gameState.playerName = playerName;
    document.getElementById('player-display').textContent = `プレイヤー: ${playerName}`;
    
    // 画面遷移
    switchScreen('title-screen', 'game-screen');
    
    // ゲーム初期化
    initializeGame();
}

// ===== ゲーム初期化 =====
function initializeGame() {
    // 新規建可能額の計算
    updateNewOrderLimit();
    
    // bot君の起動（レベル1以上の場合）
    if (gameState.botLevel > 0) {
        startBotSystem();
    }
    
    // サーバー回復処理の開始
    startServerRecovery();
    
    // 画面更新
    updateDisplay();
}

// ===== メインボタンクリック処理 =====
function handleMainClick() {
    if (gameState.isServerDown) {
        // サーバーダウン時は謝罪処理
        handleApologyClick();
        return;
    }
    
    if (gameState.isGachaMode) {
        // ガチャ発火処理（現渡し）
        fireGacha();
    } else {
        // 通常クリック処理（現引き）
        processNormalClick();
    }
}

// ===== 通常クリック処理（現引き） =====
function processNormalClick() {
    // クリック数増加
    gameState.totalClicks++;
    
    // サーバーにダメージ
    damageServer(1);
    
    // オブジェクト獲得判定
    if (Math.random() < gameState.acquisitionRate && gameState.objects < gameState.maxObjects) {
        gameState.objects++;
        
        // 確保率の更新
        updateRiskRatio();
        
        // 横転リスク判定
        checkMarginCall();
    }
    
    // 画面更新
    updateDisplay();
}

// ===== ガチャ装填処理 =====
function loadGacha() {
    if (gameState.objects === 0) {
        alert('オブジェクトがありません！');
        return;
    }
    
    // ガチャモードに切り替え
    gameState.isGachaMode = true;
    gameState.loadedObjects = gameState.objects;
    gameState.objects = 0;
    
    // ボタン表示変更
    const mainButton = document.getElementById('main-button');
    mainButton.textContent = '現渡し';
    mainButton.classList.add('gacha-mode');
    
    // bot君を一時停止
    pauseBotSystem();
    
    updateDisplay();
}

// ===== ガチャ発火処理（現渡し） =====
function fireGacha() {
    // ガチャ抽選処理
    for (let i = 0; i < gameState.loadedObjects; i++) {
        rollGacha();
    }
    
    // サーバーHP回復
    recoverServer(gameState.loadedObjects * 1000);
    
    // 通常モードに戻す
    gameState.isGachaMode = false;
    gameState.loadedObjects = 0;
    
    // ボタン表示を戻す
    const mainButton = document.getElementById('main-button');
    mainButton.textContent = '注文内容を確認';
    mainButton.classList.remove('gacha-mode');
    
    // bot君を再開
    resumeBotSystem();
    
    updateDisplay();
}

// ===== ガチャ抽選処理 =====
function rollGacha() {
    // 仮の抽選ロジック（後で調整）
    const roll = Math.random();
    
    if (roll < 0.01) {
        // 1% - S級 10,000円QUOカード
        gameState.inventory.quoCards.s10000++;
    } else if (roll < 0.05) {
        // 4% - A級 5,000円QUOカード
        gameState.inventory.quoCards.a5000++;
    } else if (roll < 0.15) {
        // 10% - B級 3,000円QUOカード
        gameState.inventory.quoCards.b3000++;
    } else if (roll < 0.30) {
        // 15% - B級 2,000円QUOカード
        gameState.inventory.quoCards.b2000++;
    } else if (roll < 0.60) {
        // 30% - C級 1,000円QUOカード
        gameState.inventory.quoCards.c1000++;
    } else {
        // 40% - C級 500円QUOカード
        gameState.inventory.quoCards.c500++;
    }
}

// ===== サーバーダメージ処理 =====
function damageServer(amount) {
    gameState.serverHP = Math.max(0, gameState.serverHP - amount);
    
    if (gameState.serverHP === 0 && !gameState.isServerDown) {
        executeServerDown();
    }
}

// ===== サーバー回復処理 =====
function recoverServer(amount) {
    gameState.serverHP = Math.min(gameState.maxServerHP, gameState.serverHP + amount);
}

// ===== サーバー自動回復 =====
function startServerRecovery() {
    setInterval(() => {
        if (!gameState.isServerDown) {
            recoverServer(gameState.serverRecoveryRate);
            updateDisplay();
        }
    }, 1000);
}

// ===== サーバーダウン処理 =====
function executeServerDown() {
    gameState.isServerDown = true;
    
    // 全オブジェクト消失
    gameState.objects = 0;
    
    // 警告書を配布
    gameState.inventory.warningItems++;
    
    // ボタンを「謝罪する」に変更
    const mainButton = document.getElementById('main-button');
    mainButton.textContent = '謝罪する';
    
    // bot君停止
    pauseBotSystem();
    
    alert('サーバーがダウンしました！全オブジェクトが消失しました...');
    
    updateDisplay();
}

// ===== 謝罪処理 =====
function handleApologyClick() {
    // 謝罪でHP回復
    recoverServer(5000);
    
    // HP全回復したら通常モードに戻る
    if (gameState.serverHP >= gameState.maxServerHP) {
        gameState.isServerDown = false;
        document.getElementById('main-button').textContent = '注文内容を確認';
        resumeBotSystem();
    }
    
    updateDisplay();
}

// ===== 新規建可能額更新 =====
function updateNewOrderLimit() {
    gameState.newOrderLimit = Math.floor(gameState.currentCash * 3.33);
    gameState.maxObjects = Math.floor(gameState.newOrderLimit / gameState.objectValue);
}

// ===== 確保率更新 =====
function updateRiskRatio() {
    const usedAmount = gameState.objects * gameState.objectValue;
    gameState.riskRatio = (usedAmount / gameState.newOrderLimit) * 100;
}

// ===== 横転リスク判定 =====
function checkMarginCall() {
    let riskChance = 0;
    
    if (gameState.riskRatio >= 333) {
        riskChance = 0.9;
    } else if (gameState.riskRatio >= 300) {
        riskChance = 0.5;
    } else if (gameState.riskRatio >= 200) {
        riskChance = 0.2;
    } else {
        return; // リスクなし
    }
    
    if (Math.random() < riskChance) {
        executeMarginCall();
    }
}

// ===== 全ロスト処理 =====
function executeMarginCall() {
    gameState.objects = 0;
    gameState.currentCash = Math.floor(gameState.currentCash * 0.1); // 90%失う
    
    updateNewOrderLimit();
    updateRiskRatio();
    
    alert('追証が発生しました！資産の90%を失いました...');
    
    updateDisplay();
}

// ===== bot君システム =====
let botInterval = null;

function startBotSystem() {
    if (gameState.botLevel === 0) return;
    
    const clickRates = [0, 1, 5, 20, 100]; // レベル別クリック数/秒
    gameState.botClicksPerSecond = clickRates[gameState.botLevel];
    
    botInterval = setInterval(() => {
        if (gameState.botIsActive && !gameState.isServerDown && !gameState.isGachaMode) {
            for (let i = 0; i < gameState.botClicksPerSecond; i++) {
                processNormalClick();
            }
        }
    }, 1000);
    
    gameState.botIsActive = true;
}

function pauseBotSystem() {
    gameState.botIsActive = false;
}

function resumeBotSystem() {
    if (gameState.botLevel > 0) {
        gameState.botIsActive = true;
    }
}

// ===== 画面更新処理 =====
function updateDisplay() {
    // 資産表示
    document.getElementById('cash-display').textContent = 
        `¥${gameState.currentCash.toLocaleString()}`;
    
    // オブジェクト表示
    document.getElementById('object-display').textContent = 
        `${gameState.objects} / ${gameState.maxObjects}`;
    
    // サーバーHP表示
    document.getElementById('server-hp').textContent = 
        gameState.serverHP.toLocaleString();
    
    // 確保率表示
    document.getElementById('risk-ratio').textContent = 
        `${gameState.riskRatio.toFixed(1)}%`;
    
    // クリック数表示
    document.getElementById('click-count').textContent = 
        gameState.totalClicks.toLocaleString();
    
    // bot君レベル表示
    document.getElementById('bot-level').textContent = 
        gameState.botLevel;
}

// ===== セーブ・ロード処理 =====
function saveGameState() {
    localStorage.setItem('kabuCrossGameState', JSON.stringify(gameState));
}

function loadGameState() {
    const savedData = localStorage.getItem('kabuCrossGameState');
    if (savedData) {
        // 将来実装：セーブデータの読み込みと検証
    }
}

// ===== 定期セーブ =====
setInterval(saveGameState, 60000); // 1分ごとに自動セーブ
