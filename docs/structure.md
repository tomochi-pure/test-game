# プロジェクト構成

## 現在のフォルダ構成

```mermaid
graph LR
    Root[test-game/] --> HTML[index.html<br/>メインファイル]
    Root --> README[README.md<br/>プロジェクト説明]
    Root --> Styles[styles/]
    Root --> Scripts[scripts/]
    Root --> Assets[assets/]
    Root --> Docs[docs/]
    
    Styles --> StyleCSS[style.css<br/>全スタイル定義]
    
    Scripts --> MainJS[main.js<br/>ゲームロジック全般]
    
    Assets --> Images[images/<br/>画像ファイル用]
    Assets --> Sounds[sounds/<br/>効果音用]
    
    Docs --> GameConcept[game-concept.md<br/>ゲーム仕様書]
    Docs --> Structure[structure.md<br/>このファイル]
    Docs --> MermaidDemo[mermaid-demo.md<br/>Mermaid検証用]
    
    classDef mainFile fill:#90EE90,stroke:#333,stroke-width:2px
    classDef styleFile fill:#87CEEB,stroke:#333,stroke-width:2px
    classDef scriptFile fill:#FFD700,stroke:#333,stroke-width:2px
    classDef docFile fill:#FFB6C1,stroke:#333,stroke-width:2px
    classDef folder fill:#DDA0DD,stroke:#333,stroke-width:2px
    
    class HTML mainFile
    class StyleCSS styleFile
    class MainJS scriptFile
    class GameConcept,Structure,MermaidDemo,README docFile
    class Root,Styles,Scripts,Assets,Docs,Images,Sounds folder
```

## ファイルの役割

### 📁 ルートディレクトリ
- **index.html**: ゲームのエントリーポイント（HTML構造のみ）
- **README.md**: GitHubで表示されるプロジェクト説明

### 📁 styles/
- **style.css**: ログイン画面・ゲーム画面の全スタイル定義

### 📁 scripts/
- **main.js**: ゲームロジック、画面制御、セーブ機能など全般
  - 将来的に膨大になったら機能別に分割予定

### 📁 assets/
- **images/**: ゲーム内で使用する画像（将来実装用）
- **sounds/**: 効果音ファイル（将来実装用）

### 📁 docs/
- **game-concept.md**: ゲームの完全仕様書
- **structure.md**: このファイル（プロジェクト構成管理）
- **mermaid-demo.md**: Mermaid記法の技術検証

## 開発方針
1. まずはシンプルに保つ（ファイル数を最小限に）
2. コードが膨大になってきたら適切に分割
3. CSSとJavaScriptは外部ファイル化して見通しを良くする
4. assetsフォルダは将来の拡張に備えて準備
