# ⚡ オモシロ PORTFOLIO

オモコロ（omocoro）の世界観・パロディ要素を取り入れた、リッチでインタラクティブなWebエンジニア向けポートフォリオサイトです。

## 🌟 特徴
- **オモコロ風コミカルデザイン**: 太枠・ドロップシャドウ・ビビッドカラー・キャッチーなあおり見出し
- **リッチなCDN構成**:
  - [Tailwind CSS](https://tailwindcss.com/) (デザイン・グリッド・レスポンシブ)
  - [Google Fonts](https://fonts.google.com/) (`Dela Gothic One`, `M PLUS Rounded 1c`, `Noto Sans JP`)
  - [Font Awesome](https://fontawesome.com/) (各種アイコン)
  - [Canvas Confetti](https://www.kirilv.com/canvas-confetti/) (紙吹雪演出)
- **スマートフォン完全対応（レスポンシブ）**:
  - スマホ用ハンバーガーメニュー搭載
  - 横スクロール可能なカテゴリ切り替え
  - タップしやすい応援ボタン＆モーダル
  - iOSでズーム暴発しないフォーム設計
- **お楽しみインタラクティブギミック**:
  - 🎉 連打できる「応援イイネ」ボタン（紙吹雪が飛び散ります）
  - 🎲 「今日のWeb開発アイディア無責任ルーレット」
  - 🔍 制作実績のフィルタリング & 詳細モーダルポップアップ
  - ✉️ 送信アニメーション付きお問い合わせフォーム

---

## 🚀 GitHub Pages への公開手順

### 1. GitHub で新しいリポジトリを作成
1. [GitHub](https://github.com/) にログインし、右上の「＋」→ **「New repository」** を選択します。
2. リポジトリ名を入力します（例: `portfolio` や `<あなたのユーザー名>.github.io`）。
3. **Public**（公開）を選択し、**Create repository** をクリックします。

### 2. ローカルから GitHub へプッシュ
ターミナル（PowerShell / Git Bash）で以下のコマンドを実行します：

```bash
# リモートリポジトリのURLを設定（ユーザー名とリポジトリ名を置き換えてください）
git remote add origin https://github.com/<あなたのGitHubユーザー名>/<リポジトリ名>.git

# mainブランチにしてプッシュ
git branch -M main
git push -u origin main
```

### 3. GitHub Pages を有効化
1. 作成した GitHub リポジトリのページを開きます。
2. 上部メニューの **Settings**（設定）をクリックします。
3. 左サイドバーの **Pages** をクリックします。
4. **Build and deployment** の下にある **Branch** 設定で：
   - ブランチ: **`main`** を選択
   - フォルダ: **`/(root)`** を選択
   - **Save** をクリックします。
5. 数分待つと、画面上部に **「Your site is live at https://...」** と公開URLが表示されます！🎉
