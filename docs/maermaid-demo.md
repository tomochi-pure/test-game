# Mermaid全部盛り技術検証

## 1. 基本フローチャート（色分け・注釈付き）
```mermaid
flowchart TD
    Start([ゲーム開始]) -->|初期化| Menu{メニュー選択}
    Menu -->|1| NewGame[新規ゲーム]
    Menu -->|2| Continue(コンティニュー)
    Menu -->|3| Settings[/設定画面/]
    
    NewGame --> GameLoop[[ゲームループ]]
    Continue --> GameLoop
    Settings --> Menu
    
    GameLoop -->|毎フレーム| Input{入力チェック}
    Input -->|移動キー| Move[プレイヤー移動]
    Input -->|攻撃キー| Attack((攻撃処理))
    Input -->|なし| Wait[待機]
    
    Move --> Collision{衝突判定}
    Attack --> Collision
    Wait --> Draw
    
    Collision -->|敵と接触| GameOver[ゲームオーバー]
    Collision -->|アイテム取得| Score[スコア加算]
    Collision -->|壁| Bounce[跳ね返り]
    Collision -->|なし| Draw[描画処理]
    
    Score --> Draw
    Bounce --> Draw
    Draw -->|次フレーム| GameLoop
    GameOver --> Menu
    
    classDef startEnd fill:#90EE90,stroke:#333,stroke-width:2px
    classDef process fill:#87CEEB,stroke:#333,stroke-width:2px
    classDef decision fill:#FFD700,stroke:#333,stroke-width:2px
    classDef danger fill:#FFB6C1,stroke:#333,stroke-width:2px
    
    class Start,Menu,GameOver startEnd
    class NewGame,Continue,Settings,Move,Attack,Wait,Score,Bounce,Draw process
    class Input,Collision decision
    class GameLoop danger
