# 株主優待クロスゲーム 完全仕様書

## 🎮 基本コンセプト
- **ゲーム名**：（仮）優待クロス シミュレーター
- **ジャンル**：放置系クリッカーゲーム + 資金管理
- **ターゲット**：Twitter優待クロス界隈（約100名）+ 一般ユーザー
- **プレイ時間**：1回1分程度 × 1日複数回ログイン
- **ゲーム目標**：自己資金を増やして億万長者を目指す
- **対応端末**：スマホ専用（PCでも動作可能だが保証・想定外）

## 🎯 ゲーム概要
証券アプリ風UIで「現引き」ボタンを連打し、注文完了オブジェクトを獲得。獲得したオブジェクトをガチャ装填→発火して優待券をゲット、売却して自己資金を増やしていく放置系ゲーム。基本はbot君による自動化で、プレイヤーは進捗確認とアップグレードがメイン。

## 💰 資金・リスク管理システム

### 基本資産構造
- **保有資産（現金）**：1,000万円（初期値）
- **新規建可能額**：保有資産の333% = 3,330万円
- **オブジェクト価値**：30万円固定（β版）
- **保有上限計算**：新規建可能額 ÷ 30万円

### 横転リスクシステム
**確保率と全ロストリスク**：
- **0-100%**：リスク0%（安全圏）
- **100-200%**：リスク0%（まだ安全）
- **200-300%**：リスク20%（要注意）
- **300-333%**：リスク50%（高リスク）
- **333%**：リスク90%（極限）
- **333%超**：新規建て不可

### 戦略的要素
- **最適解**：100%付近での運用（合理的プレイ）
- **ハイリスク**：300%台での豪運チャレンジ
- **判断要素**：ガチャ装填タイミング、アップグレード投資vs安全確保

## ⚙️ β版実装機能

### アイテムシステム（3種類）

**💰 通貨系アイテム（資産並列管理）**：
- **お米**：kg単位、資産10,000,000円と同等価値で管理
- **プレミアムコイン**：枚数単位、資産10,000,000円と同等価値で管理

**🎫 優待券カテゴリ**：
- **QUOカード**：6種類の額面 × 枚数管理
  - **S**：10,000円（最高レア）
  - **A**：5,000円（高レア）  
  - **B**：3,000円（中レア）
  - **B**：2,000円（中レア）
  - **C**：1,000円（低レア）
  - **C**：500円（低レア）

### ガチャシステム詳細

**ガチャ装填（現引きフェーズ）**：
- 保有オブジェクトをガチャに装填
- bot君自動クリック停止
- 手動クリック受付停止
- UIの色変化演出（水色→黄色）
- ボタン表記変更：「現引き」→「現渡し」

**ガチャ発火（現渡しフェーズ）**：
- 装填済みガチャの一括発火
- サーバーHP回復処理
- アイテム抽選・排出
- 通常状態に復帰（黄色→水色）
- ボタン表記復帰：「現渡し」→「現引き」
- bot・手動クリック再開

### 基本システム仕様
- **オブジェクト獲得確率**：10%（基本値）
- **bot君初期性能**：1秒に1回クリック
- **サーバー初期HP**：100,000クリック分
- **サーバーHP回復**：秒間10,000クリック分
- **オフライン計算**：最大10日間

### 放置・自動化機能
- **優待クロスbot君**：自動クリック機能（10段階アップグレード、β版はLv4まで）
- **オフライン進行**：ログアウト中も進行
- **復帰アラート**：「○時間の間に××回クリック」「××個取得」表示

### 特殊システム
- **サーバーダウン**：HP枯渇時の爆発演出、全オブジェクト消失
- **謝罪ボタン**：サーバーダウン時「現引き」ボタンが「謝罪する」に変更、連打で回復
- **警告書**：サーバーダウン時に配布されるデメリットアイテム（効果未定）

## 🖥️ UI設計

### タブ構成（5タブ想定）
1. **メインタブ**：ゲームプレイ画面
2. **アップグレードタブ**：bot君強化
3. **ミッションタブ**：（完全版実装）
4. **実績タブ**：（完全版実装）
5. **設定タブ**：セーブ・ロード等

### ユーザー体験設計
**1回のセッション（1分程度）**：
1. アプリを開く
2. オフライン進行結果確認
3. 溜まったオブジェクトをガチャ装填→発火
4. 優待券売却で資金増加確認
5. bot君アップグレード検討
6. アプリを閉じる

**放置時間の進行レンジ**：
- **序盤**：1-2時間で満タン（頻繁ログイン）
- **中盤**：4-6時間で満タン（1日2-3回）
- **終盤**：8-12時間で満タン（朝晩チェック）

## 🚀 完全版への展望

### 基本拡張機能
- **ストーリー機能**：サーバーダウン後の展開
- **優待券100種類**：「食事優待券」「カフェ優待券」等の多様なアイテム
- **実績システム**：サーバーダウン回数等の記録

### 💾 セーブデータ連携（Firebase）
- **1日1回セーブ**：データの安全性確保
- **ログインボーナス演出**：セーブ確認画面でボーナス受け取り
- **ユーザー体験**：「今日もデータ保存完了！」+ 報酬獲得の一石二鳥

### 🎯 ミッション機能
**基本システム**：
- **実行時間**：2-8時間の多様なミッション
- **複数起動促進**：スタミナ的なユーザー体験
- **アイテム報酬**：多種多様なアイテム配布

**ミッション種類**：
- **自己ミッション**：「8時間労働で20万円」（ゲーム初期の心強い収入源）
- **繰り返しミッション**：日常的な収益システム
- **ストーリーミッション**：一回限り、ストーリー進行必須
- **実績ミッション**：一回限り、特別な解除条件

## 🔧 実装ロードマップ

### 1. 基本UI構築（HTML/CSS）
**目標**：メイン画面・タブ構造の構築
**完了定義**：
- 5タブの基本レイアウト完成
- メイン画面の基本要素配置（ボタン、ステータス表示エリア）
- スマホ対応レスポンシブデザイン

**必要な要素**：
```html
<!-- メイン画面要素 -->
<div id="main-button">現引き</div>
<div id="cash-display">保有資産: ○○円</div>
<div id="object-stock">オブジェクト: ○/○</div>
<div id="server-hp">サーバーHP: ○○○○</div>
<div id="risk-meter">確保率: ○○%</div>

<!-- タブナビゲーション -->
<nav id="tab-navigation">
  <button id="main-tab">メイン</button>
  <button id="upgrade-tab">強化</button>
  <!-- 他のタブ -->
</nav>
```

**CSS変数**：
```css
:root {
  --primary-color: #007bff;
  --danger-color: #dc3545;
  --success-color: #28a745;
  --warning-color: #ffc107;
}
```

### 2. 基本クリックシステム（JavaScript）
**目標**：ボタン押下・カウンター機能の実装
**完了定義**：
- ボタンクリックでクリック数増加
- 基本的な数値表示更新
- イベントリスナーの基本動作確認

**必要な変数**：
```javascript
// ゲーム状態管理
let gameState = {
  totalClicks: 0,           // 総クリック数
  currentCash: 10000000,    // 現在の現金
  objects: [],              // 保有オブジェクト配列
  serverHP: 100000,         // サーバーHP
  isGachaMode: false,       // ガチャモード判定
  botLevel: 0,              // bot君レベル
  botClicksPerSecond: 0     // bot君秒間クリック数
};
```

**必要なメソッド**：
```javascript
function handleMainButtonClick() {
  // メインボタンクリック処理
}

function updateDisplay() {
  // 画面表示更新
}

function saveGameState() {
  // ローカルストレージ保存
}

function loadGameState() {
  // ローカルストレージ読み込み
}
```

### 3. オブジェクト獲得システム（JavaScript）
**目標**：確率判定・ストック管理の実装
**完了定義**：
- 10%確率でオブジェクト獲得
- オブジェクト配列への追加
- 上限管理（新規建可能額計算）

**追加変数**：
```javascript
// オブジェクト管理
let objectStock = {
  current: 0,               // 現在保有数
  maxCapacity: 0,           // 最大保有可能数（計算値）
  acquisitionRate: 0.1      // 獲得確率（10%）
};

// 資金管理
let assetManager = {
  cash: 10000000,           // 現金
  newOrderLimit: 0,         // 新規建可能額
  riskRatio: 0              // 確保率
};
```

**追加メソッド**：
```javascript
function calculateNewOrderLimit() {
  // 新規建可能額計算（現金 × 333%）
}

function calculateRiskRatio() {
  // 確保率計算
}

function tryAcquireObject() {
  // オブジェクト獲得判定
}

function checkMarginCall() {
  // 横転リスク判定・全ロスト処理
}
```

### 4. ガチャシステム（JavaScript）
**目標**：装填・発火・アイテム排出システム
**完了定義**：
- ボタン状態変更（現引き⇔現渡し）
- オブジェクト装填でbot停止
- アイテム抽選・排出
- 状態復帰処理

**追加変数**：
```javascript
// ガチャ状態管理
let gachaSystem = {
  isLoaded: false,          // 装填状態
  loadedObjects: 0,         // 装填済みオブジェクト数
  isPaused: false           // 一時停止状態
};

// アイテム管理
let inventory = {
  rice: 0,                  // お米（kg）
  premiumCoins: 0,          // プレミアムコイン（枚）
  quoCards: {               // QUOカード（枚数）
    s10000: 0,
    a5000: 0,
    b3000: 0,
    b2000: 0,
    c1000: 0,
    c500: 0
  }
};
```

**追加メソッド**：
```javascript
function loadGacha() {
  // ガチャ装填処理
}

function fireGacha() {
  // ガチャ発火処理
}

function pauseAllSystems() {
  // bot・手動クリック停止
}

function resumeAllSystems() {
  // bot・手動クリック再開
}

function rollGacha() {
  // アイテム抽選
}

function addItemToInventory(itemType, amount) {
  // インベントリ追加
}
```

### 5. 資金・横転リスク管理（JavaScript）
**目標**：新規建可能額計算・全ロスト判定
**完了定義**：
- リアルタイム確保率計算
- 閾値別リスク判定
- 全ロスト処理実行

**追加メソッド**：
```javascript
function updateRiskLevel() {
  // リスクレベル更新
}

function executeMarginCall() {
  // 全ロスト実行
}

function calculateMaxObjects() {
  // 最大保有可能オブジェクト計算
}

function updateRiskDisplay() {
  // リスク表示更新
}
```

### 6. bot君システム（JavaScript）
**目標**：自動クリック・アップグレード機能
**完了定義**：
- 秒間自動クリック実行
- アップグレード購入機能
- Lv4までの制限実装

**追加変数**：
```javascript
// bot管理
let botSystem = {
  level: 0,                 // 現在レベル
  clicksPerSecond: 0,       // 秒間クリック数
  isActive: true,           // 動作状態
  upgradePrice: [           // アップグレード価格
    1000000, 5000000, 15000000, 50000000
  ],
  clickRates: [             // レベル別クリック数
    1, 5, 20, 100, 500
  ]
};
```

**追加メソッド**：
```javascript
function startBotSystem() {
  // bot自動クリック開始
}

function stopBotSystem() {
  // bot自動クリック停止
}

function upgradeBotLevel() {
  // botアップグレード処理
}

function calculateUpgradePrice(level) {
  // アップグレード価格計算
}
```

### 7. サーバーHP管理（JavaScript）
**目標**：HP減少・回復・ダウン判定システム
**完了定義**：
- クリック時HP減少
- 自動HP回復
- サーバーダウン演出・謝罪システム

**追加変数**：
```javascript
// サーバー管理
let serverSystem = {
  currentHP: 100000,        // 現在HP
  maxHP: 100000,            // 最大HP
  recoveryRate: 10000,      // 秒間回復量
  isDown: false,            // ダウン状態
  warningItems: 0           // 警告書所持数
};
```

**追加メソッド**：
```javascript
function damageServer(amount) {
  // サーバーダメージ処理
}

function recoverServer() {
  // サーバー回復処理
}

function checkServerDown() {
  // サーバーダウン判定
}

function executeServerDown() {
  // サーバーダウン処理・演出
}

function handleApologyClick() {
  // 謝罪ボタン処理
}
```

### 8. オフライン進行（JavaScript）
**目標**：時間計算・復帰処理システム
**完了定義**：
- オフライン時間計算
- 簡易進行シミュレーション
- 復帰時結果表示

**追加変数**：
```javascript
// オフライン管理
let offlineSystem = {
  lastSaveTime: Date.now(), // 最終セーブ時刻
  maxOfflineHours: 240,     // 最大オフライン時間（10日）
  offlineResults: {         // オフライン結果
    totalClicks: 0,
    objectsGained: 0,
    objectsSpilled: 0
  }
};
```

**追加メソッド**：
```javascript
function calculateOfflineProgress() {
  // オフライン進行計算
}

function displayOfflineResults() {
  // 復帰結果表示
}

function simulateOfflineClicks(seconds) {
  // オフラインクリックシミュレーション
}
```

### 9. ローカルストレージ（JavaScript）
**目標**：セーブ・ロード機能実装
**完了定義**：
- 全ゲーム状態の保存
- 起動時自動読み込み
- エラーハンドリング

**追加メソッド**：
```javascript
function saveToLocalStorage() {
  // ローカルストレージ保存
}

function loadFromLocalStorage() {
  // ローカルストレージ読み込み
}

function resetGameData() {
  // ゲームデータリセット
}

function validateSaveData(data) {
  // セーブデータ検証
}
```

### 10. UI調整・演出（CSS/JavaScript）
**目標**：アニメーション・エフェクトの実装
**完了定義**：
- ガチャ装填時の色変化アニメーション
- サーバーダウン爆発エフェクト
- 数値変化アニメーション
- タッチフィードバック

**追加CSS**：
```css
/* アニメーション */
.hp-bar-transition {
  transition: background-color 0.3s ease;
}

.server-explosion {
  animation: explosion 2s ease-out;
}

.number-change {
  animation: numberPop 0.5s ease;
}

/* エフェクト */
@keyframes explosion {
  0% { transform: scale(1); }
  50% { transform: scale(1.5); background-color: #ff4444; }
  100% { transform: scale(1); background-color: #333; }
}
```

**追加メソッド**：
```javascript
function animateHPBarChange() {
  // HPバー色変化アニメーション
}

function playExplosionEffect() {
  // 爆発エフェクト再生
}

function animateNumberChange(element, newValue) {
  // 数値変化アニメーション
}
```

## 🎨 UI・演出方針
- **証券アプリ風デザイン**：リアルな証券会社アプリに似せたUI
- **段階的気づき設計**：「あれ？HP減ってる？」→「楽しい！」→「倒せそう？」→「サーバーダウン」
- **爽快感演出**：ガチャ装填時の静止→発火、色変化アニメーション
- **界隈ネタ散りばめ**：Twitter優待クロス界隈のインサイダーネタ

## 💾 技術仕様
- **保存方式**：ローカルストレージ（β版）
- **対応環境**：スマートフォンブラウザ
- **外部ライブラリ**：なし（HTML5/CSS3/JavaScript標準のみ）
- **ファイル構成**：
  ```
  test-game/
  ├── index.html
  ├── styles/style.css
  ├── scripts/main.js
  └── docs/game-concept.md
  ```

---
**開発方針**：まずは動くものを作る → バランス調整 → 演出強化 → β版リリース → フィードバック収集 → 完全版開発
