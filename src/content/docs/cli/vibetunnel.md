---
title: VibeTunnel
description: amantus-ai/vibetunnel の技術スタック・設計パターン分析
---

## 基本情報

| 項目 | 値 |
|------|-----|
| リポジトリ | [amantus-ai/vibetunnel](https://github.com/amantus-ai/vibetunnel) |
| スター数 | 3,294 |
| フォーク数 | 216 |
| 言語 | TypeScript (主要), Swift, Shell |
| ライセンス | MIT |
| 作成日 | 2025-06-15 |
| ホームページ | https://vt.sh |

## 概要

VibeTunnelは、ブラウザからMacのターミナルにアクセスできるようにするツール。AIエージェント（Claude Code等）のモニタリングやリモートからのターミナル操作を可能にする。macOSネイティブアプリとnpmパッケージの両方で提供され、Linux環境もサポート。

## 技術スタック

### 言語

| 言語 | 割合 | 用途 |
|------|------|------|
| TypeScript | 50.2% | Webサーバー・クライアント |
| Swift | 33.2% | macOS/iOSネイティブアプリ |
| HTML | 6.8% | Webフロントエンド |
| Shell | 5.1% | ビルドスクリプト・vt CLI |
| JavaScript | 2.3% | ビルドツール |
| Zig | 0.9% | ネイティブvt-fwdコマンド |
| C++/C | 0.8% | node-pty関連 |

### フレームワーク・ライブラリ

#### Web (TypeScript)
- **Express.js 5.x**: HTTPサーバー
- **Lit**: Webコンポーネントフレームワーク
- **ghostty-web**: ターミナルエミュレーター
- **WebSocket (ws)**: リアルタイム通信
- **Zod**: バリデーション
- **node-pty**: 疑似ターミナル制御
- **Monaco Editor**: コードエディタ
- **CodeMirror**: テキストエディタ

#### ネイティブアプリ (Swift)
- **SwiftUI**: UIフレームワーク
- **Sparkle**: 自動アップデート
- **Swift 6.0**: 厳格な並行性チェック対応

#### 開発ツール
- **Biome**: Linter/Formatter
- **oxlint**: 追加Linter
- **Prettier**: コードフォーマッター
- **Vitest**: テストフレームワーク
- **Playwright**: E2Eテスト
- **esbuild**: バンドラー
- **Vite**: 開発サーバー
- **Tailwind CSS v4**: スタイリング
- **Husky + lint-staged**: pre-commitフック
- **pnpm**: パッケージマネージャー
- **SwiftFormat/SwiftLint**: Swift用Linter

### CI/CD (GitHub Actions)

16個のワークフローで構成された包括的なCI/CD:

| ワークフロー | 用途 |
|-------------|------|
| `ci.yml` | メインCI（変更検知で条件分岐） |
| `node.yml` | Node.js テスト・ビルド |
| `mac.yml` | macOSアプリビルド |
| `ios.yml` | iOSアプリビルド |
| `playwright.yml` | E2Eテスト |
| `release.yml` | リリース自動化 |
| `nightly.yml` | ナイトリービルド |
| `claude.yml` | Claude AIコードレビュー |
| `claude-code-review.yml` | Claude AIレビュー |
| `web-ci.yml` | Webパッケージテスト |
| `npm-test.yml` | npm公開テスト |

**特徴的な点**:
- `dorny/paths-filter` で変更ファイルを検知し、必要なジョブのみ実行
- モノレポ対応（web/mac/iosの独立ビルド）
- Claude AIによる自動コードレビュー統合

### 開発環境

- **Node.js 22.12+**: サーバーサイド
- **pnpm 10.x**: パッケージ管理（`packageManager`フィールドで固定）
- **Xcode 16.0+**: ネイティブアプリ開発
- **Docker**: コンテナ環境対応（Dockerfile複数）
- **Apple Silicon (M1+)**: macOSアプリは必須
- **.mcp.json**: MCP（Model Context Protocol）設定

## フォルダ構造

```
vibetunnel/
├── .claude/          # Claude Code設定
├── .github/          # GitHub Actions・Issue/PRテンプレート
│   ├── workflows/    # 16個のCIワークフロー
│   ├── ISSUE_TEMPLATE/
│   └── actions/      # カスタムアクション
├── .grok/            # Grok AI設定
├── .husky/           # Git hooks
├── web/              # TypeScript Webサーバー・クライアント
│   ├── src/
│   │   ├── server/   # Express.jsサーバー
│   │   ├── client/   # Lit Webコンポーネント
│   │   ├── shared/   # 共通コード
│   │   └── types/    # 型定義
│   ├── tests/        # Playwright E2Eテスト
│   ├── bin/          # CLIエントリポイント
│   └── node-pty/     # pty fork/カスタマイズ
├── mac/              # macOSネイティブアプリ（Swift）
│   ├── VibeTunnel/
│   └── VibeTunnelTests/
├── ios/              # iOSアプリ（Swift）
│   ├── Sources/
│   └── VibeTunnelTests/
├── apple/            # 共通Apple設定
│   ├── docs/
│   └── logging/
├── native/           # ネイティブコマンド
│   └── vt-fwd/       # Zig製フォワーダー
├── docs/             # 詳細ドキュメント（50+ファイル）
├── scripts/          # ビルド・ユーティリティスクリプト
├── assets/           # 画像・アイコン
├── CLAUDE.md         # Claude Code用詳細設定
├── AGENT.md          # エージェント設定
├── GEMINI.md         # Gemini AI設定
└── CHANGELOG.md      # 変更履歴
```

## ドキュメント・コミュニティ

### README構成

- バナー画像とバッジ（npm, Homebrew, Discord, Twitter等）
- 目次付きの包括的なドキュメント（約45KB）
- インストール方法（Direct Download, Homebrew, npm）
- クイックスタートガイド
- 詳細な機能説明
- リモートアクセスオプション（Tailscale, ngrok）
- アーキテクチャ説明
- 開発・ビルド手順
- macOSパーミッション説明

### コントリビューションガイド

`docs/CONTRIBUTING.md` に詳細なガイドラインあり:
- 開発環境のセットアップ手順
- 開発ワークフロー（Web/macOS/iOS）
- コードスタイルガイドライン
- Swift 6.0の並行性パターン

### ドキュメント

`docs/` 配下に50以上のMarkdownファイル:
- `ARCHITECTURE.md`: アーキテクチャ詳細
- `TESTING_EXTERNAL_DEVICES.md`: 外部デバイステスト
- `authentication.md`: 認証システム
- `security.md`: セキュリティガイド
- `keyboard-shortcuts.md`: キーボードショートカット
- `git-worktree-follow-mode.md`: Git連携機能
- `push-notification.md`: プッシュ通知実装
- `logging-style-guide.md`: ロギングスタイルガイド
- 外部ドキュメントサイト: https://docs.vibetunnel.sh

### AI設定ファイル

複数のAIコーディングアシスタント向け設定:
- `CLAUDE.md`: Claude Code詳細設定（16KB）
- `AGENT.md`: 一般エージェント設定
- `AGENTS.md`: 追加エージェント設定
- `GEMINI.md`: Gemini CLI設定
- `.mcp.json`: MCP設定

## 品質管理

### テスト

| 種類 | ツール | 対象 |
|------|--------|------|
| ユニットテスト | Vitest | サーバー・クライアント |
| E2Eテスト | Playwright | Web UI |
| カバレッジ | @vitest/coverage-v8 | コードカバレッジ |
| Swiftテスト | XCTest | macOS/iOSアプリ |

**テストコマンド**:
```bash
pnpm test          # ユニットテスト
pnpm test:e2e      # E2Eテスト
pnpm test:coverage # カバレッジ
```

### Linter/Formatter

**TypeScript/JavaScript**:
- **Biome**: メインLinter/Formatter（`biome.json`で詳細設定）
- **oxlint**: 追加の型安全Lint（`.oxlintrc.json`）
- **Prettier**: フォーマット（実験的CLI使用）

**Swift**:
- **SwiftFormat**: コードフォーマット（`.swiftformat`）
- **SwiftLint**: 静的解析（`.swiftlint.yml`）

### 型チェック

- **TypeScript**: 複数tsconfig（server, client, sw, test）
- **@typescript/native-preview**: tsgo使用
- **Zod**: ランタイムバリデーション

### pre-commitフック

Husky + lint-staged:
```json
"lint-staged": {
  "src/**/*.{ts,tsx,js,jsx}": [
    "biome check --write",
    "tsc --noEmit --project tsconfig.server.json",
    "tsc --noEmit --project tsconfig.client.json",
    "tsc --noEmit --project tsconfig.sw.json"
  ],
  "../{ios,mac}/**/*.swift": [
    "cd ../ios && ./scripts/lint.sh",
    "cd ../mac && ./scripts/lint.sh"
  ]
}
```

## リリース・配布

### バージョニング

- **SemVer**: `1.0.0-beta.15` 形式
- **beta/prereleaseサフィックス**: プレリリース管理
- **appcast.xml**: Sparkle用更新フィード

### パッケージ公開

| プラットフォーム | パッケージ |
|-----------------|-----------|
| npm | `vibetunnel` |
| Homebrew | `vibetunnel` (cask) |
| GitHub Releases | macOS/iOSバイナリ |

### リリース自動化

- `release.yml`: GitHub Actions リリースワークフロー
- `nightly.yml`: ナイトリービルド
- **Sparkle**: macOSアプリ自動更新
- **appcast-prerelease.xml**: プレリリースフィード

### CHANGELOG

Keep a Changelog形式:
- カテゴリ分け（Features, Bug Fixes, Technical Improvements）
- コントリビューター明記
- Issue/PR番号リンク
- 日付付きバージョン

## プロジェクト運営

### Issue/PRテンプレート

`.github/ISSUE_TEMPLATE/`:
- `bug_report.md`: バグ報告
- `feature_request.md`: 機能リクエスト

### ブランチ戦略

- **main**: メインブランチ
- PRベースの開発フロー
- GitHub Actionsによる自動チェック

### セキュリティ

- `docs/security.md`: セキュリティガイドライン
- 複数認証モード対応
- localhost-only モード
- Tailscale/ngrok連携
- Dependabot: 有効（3件のアラート）

### コミュニティ

- **Discord**: コミュニティサーバー
- **Twitter**: @vibetunnel
- **GitHub Discussions**: 有効
- **DeepWiki**: ドキュメント連携

## OSSとして参考になるポイント

### 真似したい点

1. **マルチAIアシスタント対応**: CLAUDE.md, AGENT.md, GEMINI.md等、複数のAIコーディングアシスタント向け設定ファイルを用意
2. **包括的なCI/CD**: 16個のワークフローで変更検知による条件分岐、モノレポ対応
3. **充実したドキュメント**: 50以上のドキュメントファイル、外部ドキュメントサイト
4. **品質管理の徹底**: Biome + oxlint + Prettier の複合Lint、lint-stagedでSwiftも含めたpre-commit
5. **モノレポ構成**: web/mac/ios を1リポジトリで管理しつつ独立ビルド
6. **開発体験重視**: Hot reload、カスタムポート設定、詳細な開発ガイド

### 改善できそうな点

1. **SECURITY.md未設置**: セキュリティポリシーはdocs内にあるがルートに未配置
2. **CODE_OF_CONDUCT.md未設置**: 行動規範ファイルなし
3. **Dependabotアラート**: 3件の未解決アラート
4. **テストカバレッジ**: カバレッジ目標・バッジが未表示

### 自分のOSSに活かせること

1. **AI設定ファイルの標準化**: CLAUDE.md等のAIアシスタント向け詳細設定ファイルを用意することで、AIとの協働開発を効率化
2. **paths-filter活用**: モノレポでの条件分岐CIで無駄なビルドを削減
3. **lint-stagedでの複数言語対応**: TypeScriptとSwift両方をpre-commitでチェック
4. **Biome + oxlintの併用**: 高速Lintと型安全Lintの両立
5. **appcast形式の自動更新**: Sparkle連携でデスクトップアプリの自動更新
6. **ドキュメント構造**: 機能ごとに分割された詳細ドキュメント群
