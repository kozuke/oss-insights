---
title: CodexBar
description: steipete/CodexBar の技術スタック・設計パターン分析
---

## 基本情報

| 項目 | 値 |
|------|-----|
| リポジトリ | [steipete/CodexBar](https://github.com/steipete/CodexBar) |
| スター数 | 3,430 |
| フォーク数 | 227 |
| 言語 | Swift |
| ライセンス | MIT |
| 作成日 | 2025-11-16 |

## 概要

CodexBarは、macOS 14+向けのメニューバーアプリケーションで、OpenAI Codex、Claude Code、Cursor、Gemini、Copilotなど多数のAIサービスの使用量・クレジット残高をログインなしで表示します。CLIツール（`codexbar`コマンド）も同梱されており、Linux向けのCLIビルドも提供されています。

## 技術スタック

### 言語

| 言語 | 割合 |
|------|------|
| Swift | 97.8% |
| Shell | 2.0% |
| JavaScript | 0.1% |

### フレームワーク・ライブラリ

**Swift Package Manager依存関係:**

| パッケージ | 用途 |
|------------|------|
| [Sparkle](https://github.com/sparkle-project/Sparkle) | 自動アップデート機能 |
| [Commander](https://github.com/steipete/Commander) | CLIコマンド解析 |
| [swift-log](https://github.com/apple/swift-log) | ロギング |
| [swift-syntax](https://github.com/apple/swift-syntax) | Swift マクロサポート |
| [KeyboardShortcuts](https://github.com/sindresorhus/KeyboardShortcuts) | キーボードショートカット |
| [SweetCookieKit](https://github.com/steipete/SweetCookieKit) | ブラウザCookie読み取り |

**プラットフォーム要件:**
- macOS 14+ (Sonoma)
- Swift 6.2 (Swift 6 strict concurrency有効)

### CI/CD (GitHub Actions)

**ワークフロー構成:**

| ファイル | トリガー | 内容 |
|----------|----------|------|
| `ci.yml` | push, pull_request | SwiftFormat/SwiftLintチェック、swift test (macOS + Linux) |
| `release-cli.yml` | release published | Linux CLI (x64/arm64) ビルド・アップロード |
| `upstream-monitor.yml` | schedule (週2回), 手動 | アップストリーム変更の監視・Issue作成 |

**CI特徴:**
- macOS/Linux両対応のマトリックスビルド
- Swift 6.2ツールチェーンの明示的インストール
- 静的Swiftランタイムリンク（Linux CLI）

### 開発環境

```
CodexBar/
├── .github/workflows/     # CI/CDワークフロー
├── .swiftformat           # SwiftFormat設定
├── .swiftlint.yml         # SwiftLint設定
├── Sources/
│   ├── CodexBar/          # メインmacOSアプリ
│   ├── CodexBarCLI/       # CLIツール
│   ├── CodexBarCore/      # 共通コアロジック
│   ├── CodexBarMacros/    # Swiftマクロ
│   ├── CodexBarWidget/    # WidgetKit拡張
│   └── ...
├── Tests/                 # XCTestテスト
├── Scripts/               # ビルド・リリーススクリプト
├── docs/                  # ドキュメント
└── Package.swift          # SwiftPM定義
```

## フォルダ構造

```
CodexBar/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── release-cli.yml
│       └── upstream-monitor.yml
├── Sources/
│   ├── CodexBar/              # メニューバーアプリ本体
│   ├── CodexBarCLI/           # CLIエントリポイント
│   ├── CodexBarClaudeWatchdog/
│   ├── CodexBarClaudeWebProbe/
│   ├── CodexBarCore/          # 共有ビジネスロジック
│   ├── CodexBarMacroSupport/
│   ├── CodexBarMacros/        # Swift 6マクロ
│   └── CodexBarWidget/        # WidgetKit
├── Tests/
│   └── CodexBarTests/
├── TestsLinux/                # Linux固有テスト
├── Scripts/                   # 18個のシェルスクリプト
├── docs/                      # 50+のマークダウン
├── bin/
├── Package.swift
├── Package.resolved
├── CHANGELOG.md
├── AGENTS.md
└── README.md
```

## ドキュメント・コミュニティ

### README構成

- アプリスクリーンショット付きの視覚的な紹介
- Homebrew / GitHub Releases / Linux CLIのインストール方法
- 13種類以上のプロバイダーの詳細説明
- macOS権限の丁寧な説明（Full Disk Access、Keychain等）
- 関連プロジェクト・クレジットの記載

### コントリビューションガイド

**AGENTS.md** がコーディングエージェント向けガイドラインとして機能:
- プロジェクト構造・モジュールの説明
- ビルド・テスト・実行コマンド
- コーディングスタイル・命名規則
- テストガイドライン
- コミット・PRガイドライン
- AI エージェント向け特別な注意事項

### ドキュメント

`docs/`配下に50以上のマークダウンファイル:
- 各プロバイダーの設定ガイド（claude.md, codex.md, cursor.md等）
- アーキテクチャドキュメント
- リリースプロセス（RELEASING.md）
- 開発セットアップガイド

## 品質管理

### テスト

- **フレームワーク**: XCTest + Swift Testing（実験的機能として有効化）
- **構成**: `Tests/CodexBarTests/`（macOS）、`TestsLinux/`（Linux固有）
- **実行**: `swift test --parallel`
- **特殊テスト**: TTY統合テスト、Liveアカウントテスト（環境変数で有効化）

### Linter/Formatter

**SwiftLint** (`.swiftlint.yml`):
- Swift 6互換の設定
- 行長120文字 (warning) / 250文字 (error)
- 関数本体長150行 (warning) / 300行 (error)
- ファイル長1500行 (warning) / 2500行 (error)
- `unused_declaration`, `unused_import`のアナライザールール有効

**SwiftFormat** (`.swiftformat`):
- Swift 6.2対応
- 4スペースインデント
- 120文字最大幅
- `--self insert`（Swift 6 concurrency対応で明示的self）
- `--wraparguments before-first`

### 型チェック

- Swift 6.2ツールチェーン使用
- `.enableUpcomingFeature("StrictConcurrency")`で厳格な並行性チェック
- マクロによる型安全なコード生成

## リリース・配布

### バージョニング

- SemVer準拠（例: 0.18.0-beta.2）
- ベータリリースのサポート
- `version.env`でバージョン管理

### パッケージ公開

| 配布チャネル | 形式 |
|--------------|------|
| GitHub Releases | macOS .app (zip), Linux CLI (tar.gz) |
| Homebrew Cask | `brew install --cask steipete/tap/codexbar` |
| Homebrew Formula | Linux CLI: `brew install steipete/tap/codexbar` |

### リリース自動化

**Scripts/release.sh**による自動化:
- ダーティなgitツリーのチェック
- CHANGELOG検証
- バージョン重複チェック
- ビルド→署名→公証の一連の流れ
- Sparkle appcast生成・検証
- dSYMアーカイブのアップロード

**Sparkle**による自動アップデート:
- Ed25519署名
- `appcast.xml`フィード
- ベータチャンネルサポート

## プロジェクト運営

### Issue/PRテンプレート

Issue/PRテンプレートは未設定ですが、AGENTS.mdにPRガイドラインが記載:
- 短い命令形のコミットメッセージ
- サマリー・実行コマンド・スクリーンショットの記載

### ブランチ戦略

- `main`ブランチのみ（単一ブランチ運用）
- フォーク元（upstream）の監視ワークフロー

### セキュリティ

- SECURITY.mdは未設定
- プライバシーポリシーがREADMEに詳細記載
- ブラウザCookie読み取りはオプトイン
- ファイルシステムスキャンなし（既知のパスのみ読み取り）

## OSSとして参考になるポイント

### 真似したい点

1. **AGENTS.md**: AIコーディングアシスタント向けの詳細なガイドラインは先進的
2. **充実したドキュメント**: 50以上のドキュメントで各プロバイダー・機能を詳細に説明
3. **プライバシー説明**: セキュリティ・プライバシーに関する透明な説明
4. **マルチプラットフォーム対応**: macOSアプリ + Linux CLIの両方をサポート
5. **アップストリーム監視**: フォーク元の変更を自動監視するワークフロー
6. **厳格なコード品質**: SwiftLint + SwiftFormat + Swift 6 strict concurrency
7. **Sparkle自動アップデート**: 成熟した自動アップデート機構の実装

### 改善できそうな点

1. **CONTRIBUTING.md不足**: AGENTS.mdはあるが標準的なCONTRIBUTING.mdがない
2. **Issue/PRテンプレート未設定**: GitHub標準のテンプレートがない
3. **SECURITY.md不足**: セキュリティポリシーが未定義
4. **テストカバレッジ**: カバレッジレポートの設定が見当たらない
5. **ドキュメントサイト**: docs/配下は豊富だが静的サイト生成は未設定

### 自分のOSSに活かせること

1. **AGENTS.md形式のAI向けガイドライン**: Claude Code等のAIツールとの連携を意識した設計
2. **pnpm scriptsによる統一インターフェース**: `pnpm start`, `pnpm check`, `pnpm test`でSwiftプロジェクトを操作
3. **アップストリーム監視ワークフロー**: フォークプロジェクトの同期を自動化
4. **厳格なSwift 6設定**: 最新Swift機能を積極活用するテンプレートとして
5. **Sparkle自動アップデート**: macOSアプリの配布パイプラインの参考に
