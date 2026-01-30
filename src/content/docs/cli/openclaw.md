---
title: OpenClaw
description: openclaw/openclaw の技術スタック・設計パターン分析
---

## 基本情報

| 項目 | 値 |
|------|-----|
| リポジトリ | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| スター数 | 113,289 |
| フォーク数 | 16,015 |
| 言語 | TypeScript |
| ライセンス | MIT |
| 作成日 | 2025-11-24 |
| ホームページ | [openclaw.ai](https://openclaw.ai) |

## 概要

OpenClawは個人向けAIアシスタントCLIツール。WhatsApp、Telegram、Slack、Discord、iMessage、Signal、Microsoft Teamsなど多数のメッセージングプラットフォームに対応し、macOS/iOS/Androidのネイティブアプリも提供。ユーザー自身のデバイスで動作し、プライバシーを重視した設計。

## 技術スタック

### 言語

| 言語 | 割合 |
|------|------|
| TypeScript | 82.7% |
| Swift | 13.4% |
| Kotlin | 1.9% |
| Shell | 0.8% |
| CSS | 0.5% |
| JavaScript | 0.4% |
| Python | 0.3% |

### フレームワーク・ライブラリ

**コアランタイム**
- **Node.js 22.12.0+** - 最新LTS必須（セキュリティ上の理由）
- **pnpm** - パッケージマネージャー（monorepo対応）
- **TypeScript 5.9** - 型安全性

**AI/LLM関連**
- `@mariozechner/pi-agent-core` - エージェントコア
- `@mariozechner/pi-ai` - AI統合
- `@mariozechner/pi-coding-agent` - コーディングエージェント
- `@agentclientprotocol/sdk` - ACP SDK
- `node-llama-cpp` - ローカルLLM（optional）
- `@aws-sdk/client-bedrock` - AWS Bedrock対応

**メッセージングチャネル**
- `@whiskeysockets/baileys` - WhatsApp
- `grammy` / `@grammyjs/*` - Telegram
- `@slack/bolt` - Slack
- `@buape/carbon` - Discord
- `@line/bot-sdk` - LINE

**UI/TUI**
- `@mariozechner/pi-tui` - ターミナルUI
- `@clack/prompts` - CLIプロンプト
- `commander` - CLIコマンドパーサー
- `chalk` - カラー出力
- `qrcode-terminal` - QRコード表示
- `lit` - Web Components（Control UI）

**メディア処理**
- `sharp` - 画像処理
- `pdfjs-dist` - PDF処理
- `node-edge-tts` - TTS
- `playwright-core` - ブラウザ自動化

**その他**
- `hono` / `express` - HTTPサーバー
- `ws` - WebSocket
- `zod` - スキーマ検証
- `chokidar` - ファイル監視
- `sqlite-vec` - ベクトル検索

### CI/CD (GitHub Actions)

| ワークフロー | 説明 |
|-------------|------|
| `ci.yml` | メインCI（lint、test、build、macOS/Swiftチェック） |
| `docker-release.yml` | Dockerイメージリリース |
| `install-smoke.yml` | インストールスモークテスト |
| `auto-response.yml` | Issue/PR自動応答 |
| `labeler.yml` | 自動ラベル付け |
| `workflow-sanity.yml` | ワークフロー健全性チェック |

**CI特徴**
- **Blacksmith Runner** (`blacksmith-4vcpu-ubuntu-2404`) - 高速CI
- **マトリックスビルド** - 複数タスクを並列実行
- **サブモジュールリトライ** - ネットワーク障害対応
- **corepackによるpnpmセットアップ**

### 開発環境

**Linter/Formatter**
- `oxlint` - 高速TypeScript linter（type-aware）
- `oxfmt` - TypeScript formatter
- `swiftlint` - Swift linter
- `swiftformat` - Swift formatter
- `shellcheck` - シェルスクリプト linter
- `actionlint` - GitHub Actions linter
- `zizmor` - GitHub Actions security audit

**Pre-commit Hooks**
- `.pre-commit-config.yaml` による統合
- `detect-secrets` - シークレット検出
- 複数言語（TypeScript/Swift/Shell/YAML）対応

**テスト**
- `vitest` - テストフレームワーク
- 複数設定ファイル（unit/e2e/live/extensions/gateway）
- カバレッジ閾値: 70%
- Dockerベースのe2eテスト

**開発コマンド**
```bash
pnpm dev            # 開発サーバー
pnpm build          # ビルド
pnpm test           # ユニットテスト
pnpm test:e2e       # E2Eテスト
pnpm lint           # TypeScript lint
pnpm lint:swift     # Swift lint
```

## フォルダ構造

```
openclaw/
├── .agent/               # AI agent設定
├── .github/
│   ├── ISSUE_TEMPLATE/   # Issue templates
│   ├── workflows/        # GitHub Actions
│   ├── dependabot.yml    # 依存関係更新
│   └── labeler.yml       # 自動ラベル
├── apps/
│   ├── android/          # Android app (Kotlin)
│   ├── ios/              # iOS app (Swift)
│   ├── macos/            # macOS app (Swift)
│   └── shared/           # 共有コード (OpenClawKit)
├── docs/                 # Mintlify docs
├── extensions/           # ブラウザ拡張機能
├── packages/             # モノレポパッケージ
├── patches/              # pnpm patches
├── scripts/              # ビルド/テストスクリプト
├── skills/               # AIスキル定義
├── src/                  # メインソースコード
│   ├── agents/           # AIエージェント
│   ├── channels/         # メッセージングチャネル
│   ├── cli/              # CLIエントリポイント
│   ├── commands/         # CLIコマンド
│   ├── config/           # 設定管理
│   ├── gateway/          # Gatewayサーバー
│   ├── hooks/            # フックシステム
│   ├── plugins/          # プラグインシステム
│   └── ...
├── test/                 # テスト
├── ui/                   # Control UI (Web)
├── vendor/               # ベンダーコード
├── Dockerfile            # メインDockerfile
├── docker-compose.yml    # Docker Compose
├── fly.toml              # Fly.io設定
├── package.json          # npm設定
├── pnpm-workspace.yaml   # pnpm workspace
├── tsconfig.json         # TypeScript設定
└── vitest.*.config.ts    # テスト設定
```

## ドキュメント・コミュニティ

### README構成

- ロゴ/ヘッダー画像
- バッジ（CI、リリース、Discord、ライセンス）
- 製品概要とチャネル一覧
- ドキュメントリンク集
- クイックスタート
- モデル設定ガイド
- インストール手順
- 開発チャネル説明（stable/beta/dev）
- ソースからのビルド手順

### コントリビューションガイド

**CONTRIBUTING.md**
- メンテナー一覧（GitHub/X連絡先付き）
- 貢献方法（バグ修正/新機能/質問）
- PR前チェックリスト
- **AI/Vibe-Coded PRs歓迎** - AIツールで作成したPRを明示的に歓迎
- 現在の優先事項とロードマップ

### ドキュメント

- **公式ドキュメント**: [docs.openclaw.ai](https://docs.openclaw.ai)（Mintlify）
- **DeepWiki**: 技術詳細ドキュメント
- `docs/` ディレクトリ内にMintlify形式のドキュメント
- チャネル別セットアップガイド
- デプロイガイド（Docker, Fly.io, Render, DigitalOcean, GCP, Oracle Cloud等）

## 品質管理

### テスト

| 種類 | 設定ファイル | 説明 |
|------|-------------|------|
| Unit | `vitest.unit.config.ts` | ユニットテスト |
| E2E | `vitest.e2e.config.ts` | E2Eテスト |
| Live | `vitest.live.config.ts` | 本番API連携テスト |
| Extensions | `vitest.extensions.config.ts` | 拡張機能テスト |
| Gateway | `vitest.gateway.config.ts` | Gatewayテスト |

**Dockerテスト**
- `pnpm test:docker:all` - 全Dockerテスト
- オンボーディング、ネットワーク、QR、プラグイン等のシナリオ

### Linter/Formatter

| ツール | 対象 | 設定ファイル |
|--------|------|-------------|
| oxlint | TypeScript | `.oxlintrc.json` |
| oxfmt | TypeScript | `.oxfmtrc.jsonc` |
| swiftlint | Swift | `.swiftlint.yml` |
| swiftformat | Swift | `.swiftformat` |
| shellcheck | Shell | `.shellcheckrc` |

### 型チェック

- TypeScript strict mode
- `tsconfig.json` で厳格な型チェック設定
- `skipLibCheck: true` で外部ライブラリは除外

### セキュリティツール

- `detect-secrets` - シークレット検出（pre-commit + CI）
- `zizmor` - GitHub Actions security audit
- `.secrets.baseline` - 既知の安全なパターンのベースライン

## リリース・配布

### バージョニング

- **CalVer形式**: `YYYY.M.D`（例: `2026.1.29`）
- パッチリリース: `YYYY.M.D-<patch>`
- ベータ: `YYYY.M.D-beta.N`

### パッケージ公開

- **npm**: `openclaw` パッケージ
  - `latest` - 安定版
  - `beta` - ベータ版
  - `dev` - 開発版
- **GitHub Releases**: バイナリ配布
- **Docker Hub**: コンテナイメージ

### リリース自動化

- GitHub Actionsによる自動リリース
- `docker-release.yml` でDockerイメージ自動公開
- `appcast.xml` でmacOSアプリの自動更新（Sparkle）

### CHANGELOG

- **Keep a Changelog**形式を独自拡張
- セクション: Changes, Breaking, Fixes
- 各変更にPR番号とコントリビューター名を記載
- ステータス表示（stable/beta）

## プロジェクト運営

### Issue/PRテンプレート

**Issue Templates**
- `bug_report.md` - バグ報告
- `feature_request.md` - 機能リクエスト
- `config.yml` - Issue作成時の設定

### ラベル運用

- `labeler.yml` による自動ラベル付け
- パス別の自動分類

### ブランチ戦略

- `main` - メインブランチ
- 3チャネル運用: stable / beta / dev
- タグベースのリリース

### セキュリティ

**SECURITY.md**
- 脆弱性報告先（メール）
- Node.jsバージョン要件（セキュリティパッチ考慮）
- Dockerセキュリティガイダンス
- `detect-secrets` の使用方法

**Dependabot**
- npm/GitHub Actions/Swift/Gradle の4エコシステム対応
- グループ化（production/development）
- Cooldown期間: 7日
- PR数制限あり

## ライセンス・法務

- **MIT License**
- 著作権表示: `LICENSE` ファイル
- CLA: なし

## OSSとして参考になるポイント

### 真似したい点

1. **マルチプラットフォーム対応**: TypeScript CLIを中心に、Swift (macOS/iOS)、Kotlin (Android)、Webを統合した設計
2. **AI/Vibe-Coded PRs歓迎**: AIツールで作成したPRを明示的に歓迎する姿勢は今後のOSS運営として先進的
3. **複数チャネル運用**: stable/beta/devの3チャネルでユーザーに選択肢を提供
4. **豊富なデプロイオプション**: Docker, Fly.io, Render, DigitalOcean, GCP等、多様なデプロイ先ガイド
5. **detect-secrets統合**: pre-commitとCIの両方でシークレット検出を実行
6. **GitHub Actions security audit**: zizmorによるワークフローのセキュリティ監査
7. **CalVerバージョニング**: 日付ベースのバージョンで更新頻度が明確
8. **メンテナー情報の明示**: GitHub/X両方の連絡先を公開し、アクセシビリティを高める

### 改善できそうな点

1. **CONTRIBUTINGの詳細化**: 開発環境セットアップ手順がREADMEに分散
2. **CODE_OF_CONDUCT.md**: 行動規範ファイルが見当たらない
3. **Changelogの自動生成**: 手動管理のため、conventional commitsベースの自動化も検討可能

### 自分のOSSに活かせること

1. **pre-commit-config.yaml**: 複数言語対応のpre-commit hookテンプレートとして参考になる
2. **Dependabotのグループ化設定**: production/developmentを分けてPRを管理しやすく
3. **複数vitest設定**: テストの種類ごとに設定ファイルを分離する構成
4. **oxlint/oxfmt採用**: ESLint/Prettierより高速な新しいツールチェーン
5. **セキュリティドキュメント**: SECURITY.mdでNode.jsバージョン要件やDockerセキュリティガイダンスを明示
