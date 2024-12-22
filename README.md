# 📊 Locker.ai アンケート用Webアプリ

## 概要

- [x] **🌙 ダークモード対応** [Figma](https://www.figma.com/design/hsWBflpYMAqzRCIabKZYnJ/Yumemi?node-id=402-1692&t=v4Zz5MpKl4nAQQMe-1)のVariablesとCSS変数を使い、効率的にダークモード対応を行えるカラーパレットを用いました。
- [x] **🤖 GitHub Actions使用** ESLint & Prettierの実行、Vitestのテストの実行、Storybookのインタラクションテストの実行、PlaywrightのE2Eテストの実行をPR毎に自動化しています。

## 技術スタック

- **Next.js<sup>15</sup>** ▲ `app`ルーター
- **Panda CSS** 🐼 トークンとレシピを用いたデザインシステムの構築
- **Drizzle** 🌧️ 型安全なORM
- **Zod** 💎 スキーマとバリデータの定義
- **Storybook** 📕 アクセシビリティやインタラクションテストの実行と見た目の確認
- **Vitest** ⚡ ユニットテストの実行
- **Playwright** 🎭 E2Eテストの実行
- **Turborepo** ⚙️ モノレポのビルドやリントのキャッシュ管理

## データベース

詳細は`apps/web/src/db/schema.ts`を参照してください。

### テーブル: annotation

| カラム名  | データ型        | 制約                         | 説明                                       |
| --------- | --------------- | ---------------------------- | ------------------------------------------ |
| id        | UUID            | Primary Key, Default(UUIDv4) | アノテーションの一意識別子                 |
| email     | VARCHAR(255)    |                              | 遺失物の画像を書いた人のメールアドレス     |
| imageId   | VARCHAR(255)    | Not Null                     | 遺失物の画像の拡張子を除いたファイル名     |
| latency   | REAL            |                              | 報告日時と推定紛失日時の差 (単位: 日)      |
| annotator | Enum(human, ai) | Not Null, Default('human')   | 説明文書を書いた者の分類                   |
| label     | VARCHAR(255)    | Not Null                     | Open Image Dataset v7由来の画像のラベル    |
| inquiry   | TEXT            | Not Null                     | 説明文書                                   |
| duration  | REAL            |                              | 説明文書を書くのにかかった時間 (単位: 秒)  |
| quick     | BOOLEAN         | Not Null                     | 10秒間だけ画像が表示される収集方法かどうか |
| createdAt | TIMESTAMP       | Not Null, Default(Now)       | アノテーションの登録日時                   |

---

### テーブル: vote

| カラム名      | データ型          | 制約                                 | 説明                          |
| ------------- | ----------------- | ------------------------------------ | ----------------------------- |
| id            | UUID              | Primary Key, Default(UUIDv4)         | 投票の一意識別子              |
| email         | VARCHAR(255)      | Not Null                             | 投票した人のメールアドレス    |
| annotation    | UUID              | Foreign Key(annotation.id), Not Null | 投票対象のアノテーションのID  |
| authorization | Enum(grant, deny) | Not Null                             | 是認または否認                |
| duration      | REAL              | Not Null                             | 回答までの所要時間 (単位: 秒) |
| createdAt     | TIMESTAMP         | Not Null, Default(Now)               | 投票結果の登録日時            |

---

### テーブル: redeem

| カラム名     | データ型               | 制約                         | 説明                                   |
| ------------ | ---------------------- | ---------------------------- | -------------------------------------- |
| id           | UUID                   | Primary Key, Default(UUIDv4) | 謝礼受け取りの一意識別子               |
| email        | VARCHAR(255)           | Not Null                     | 謝礼を受け取る人のメールアドレス       |
| secret       | VARCHAR(255)           | Not Null                     | 謝礼受け取り用の秘密文字列             |
| type         | Enum(annotation, vote) | Not Null                     | 謝礼の種類 (アノテーションまたは投票)  |
| lastResentAt | TIMESTAMP              | Not Null, Default(Now)       | 最後に受け取りメールが再送信された日時 |
| confirmedAt  | TIMESTAMP              |                              | 謝礼の受け取りが確認された日時         |
| requestedAt  | TIMESTAMP              | Not Null, Default(Now)       | 謝礼の受け取りが申請された日時         |

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
