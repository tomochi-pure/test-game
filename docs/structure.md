# プロジェクト構成

```mermaid
graph TD
    Root[test-game] --> HTML[index.html]
    Root --> README[README.md]  
    Root --> Docs[docs/]
    
    Docs --> Structure[structure.md<br/>この図が入ってるファイル]
    
    HTML --> Game[実際に動くゲーム<br/>スマホで確認済み]
