# 📊 Locker.ai アンケート用Webアプリ

## 概要

- [x] **🌙 ダークモード対応** [Figma](https://www.figma.com/design/hsWBflpYMAqzRCIabKZYnJ/Yumemi?node-id=402-1692&t=v4Zz5MpKl4nAQQMe-1)のVariablesとCSS変数を使い、効率的にダークモード対応を行えるカラーパレットを用いました。
- [x] **🤖 GitHub Actions使用** ESLint & Prettierの実行、Vitestのテストの実行、Storybookのインタラクションテストの実行、PlaywrightのE2Eテストの実行をPR毎に自動化しています。

## 技術スタック

- **Next.js<sup>15</sup>** ▲ `app`ルーター
- **Panda CSS** 🐼 トークンとレシピを用いたデザインシステムの構築
- **Zod** 💎 スキーマとバリデータの定義
- **Storybook** 📕 アクセシビリティやインタラクションテストの実行と見た目の確認
- **Vitest** ⚡ ユニットテストの実行
- **Playwright** 🎭 E2Eテストの実行
- **Turborepo** ⚙️ モノレポのビルドやリントのキャッシュ管理

## 環境構築の手順

### 依存関係のインストール

Node.jsとpnpmのバージョン管理にprototoolsを使用しています。まずは、以下のコマンドを実行するか、`.prototools`に記述されているバージョンのものを手動でインストールしてください。

```sh
proto use
pnpm i
pnpm lefthook install # コミット時チェックのGitフック管理ツールのインストール (初回のみ)
pnpm playwright install --with-deps # StorybookのインタラクションテストのCLI実行 & E2Eテストの実行に必要
```

### 環境変数の設定

#### 各種タスクの実行

このモノレポ内の各パッケージに対して、Turborepo `turbo`を用いてキャッシュを効かせながら効率的にタスクを実行できます。
`pnpm`の`--filter -F`フラグと同じ構文で、実行対象のパッケージを狭めることができます。

```sh
pnpm turbo build # 全てのパッケージをビルド
pnpm turbo -F web build # Next.jsのパッケージのみビルド
pnpm turbo -F web dev # Next.jsの開発サーバーを起動
pnpm turbo lint # 全てのパッケージをリント
pnpm turbo test # 全てのパッケージのテストを実行
pnpm turbo sb:test # Storybookのインタラクションテストを実行
pnpm turbo playwright:test # E2Eテストを実行
```
