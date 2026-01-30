---
title: Peekaboo
description: steipete/Peekaboo の技術スタック・設計パターン分析
---

## 基本情報

| 項目 | 値 |
|------|-----|
| リポジトリ | [steipete/Peekaboo](https://github.com/steipete/Peekaboo) |
| スター数 | 1,589 |
| フォーク数 | 87 |
| 言語 | Swift |
| ライセンス | MIT |
| 作成日 | 2025-05-22 |
| ホームページ | [peekaboo.boo](https://peekaboo.boo) |

## 概要

PeekabooはmacOS向けのCLIツール兼MCPサーバーで、AIエージェントがアプリケーションやシステム全体のスクリーンショットをキャプチャし、ローカルまたはリモートのAIモデルによる視覚的な質問応答を可能にします。v3ではネイティブエージェントフローとマルチスクリーン自動化が追加されています。

### 主な機能
- ピクセル精度のキャプチャ（ウィンドウ、スクリーン、メニューバー）
- 自然言語エージェントによるGUI自動化（see, click, type, scroll, hotkey, menu, window, app, dock, space）
- メニュー・メニューバー探索（構造化JSON出力）
- マルチプロバイダAI対応：GPT-5.1、Claude 4.x、Grok 4-fast、Gemini 2.5、Ollama
- Claude Desktop/Cursor向けMCPサーバー

## 技術スタック

### 言語

| 言語 | 割合 |
|------|------|
| Swift | 97.7% |
| Shell | 1.5% |
| JavaScript | 0.7% |
| TypeScript | 0.1% |
| Ruby | 0.0% |

### フレームワーク・ライブラリ

**Swift Package Manager (Package.swift)**
- **swift-tools-version**: 6.2
- **プラットフォーム**: macOS 14+
- **依存関係**:
  - [AXorcist](https://github.com/steipete/AXorcist.git) v0.1.0 - アクセシビリティ抽象化
  - [swift-algorithms](https://github.com/apple/swift-algorithms) 1.2.1+ - Apple公式アルゴリズム

**npm (package.json)**
- **パッケージ名**: `@steipete/peekaboo`
- **バージョン**: 3.0.0-beta4
- **Node.js**: >=22.0.0
- **対応OS**: darwin (macOS only)
- **対応CPU**: arm64
- **devDependencies**: chrome-devtools-mcp

**サブモジュール**
- AXorcist - アクセシビリティAPI抽象化
- Commander - Swift CLIフレームワーク
- Swiftdansi - ANSIエスケープ処理
- Tachikoma - AIプロバイダ統合
- TauTUI - TUI（ターミナルUI）フレームワーク

### CI/CD (GitHub Actions)

| ワークフロー | 目的 |
|-------------|------|
| `macos-ci.yml` | メインCI（ビルド、テスト、lint） |
| `pages.yml` | GitHub Pagesデプロイ |
| `update-homebrew.yml` | Homebrew Formula自動更新 |
| `commander-multiplatform.yml` | Commanderサブモジュールテスト |

**macos-ci.yml の特徴**:
- macOS最新環境でのビルド
- Xcode 26.2/26.1/26.0/16.4へのフォールバック
- SwiftPMキャッシュ管理
- docs lintチェック
- Bun runtimeセットアップ

### 開発環境

- **Swift**: 6.2（Swift 6 strict concurrency）
- **Xcode**: 16+
- **macOS**: 15.0+ (Sequoia)
- **Node.js**: 22+（npm/pnpmスクリプト用）
- **パッケージマネージャ**: pnpm

## フォルダ構造

```
Peekaboo/
├── Apps/                          # アプリケーション
│   ├── CLI/                       # CLIアプリケーション
│   ├── Mac/                       # macOSアプリケーション
│   ├── PeekabooInspector/         # インスペクターアプリ
│   ├── Playground/                # 開発用Playground
│   ├── Peekaboo.xcworkspace/      # Xcodeワークスペース
│   └── peekaboo                   # ビルド済みバイナリ (universal)
├── Core/                          # コアライブラリ
│   ├── PeekabooAutomationKit/     # 自動化キット
│   ├── PeekabooCore/              # コア機能
│   ├── PeekabooExternalDependencies/
│   ├── PeekabooFoundation/        # 基盤ライブラリ
│   ├── PeekabooProtocols/         # プロトコル定義
│   ├── PeekabooUICore/            # UIコア
│   └── PeekabooVisualizer/        # ビジュアライザー
├── AXorcist/                      # サブモジュール: アクセシビリティ
├── Commander/                     # サブモジュール: CLI
├── Swiftdansi/                    # サブモジュール: ANSI
├── Tachikoma/                     # サブモジュール: AIプロバイダ
├── TauTUI/                        # サブモジュール: TUI
├── docs/                          # ドキュメント
├── Examples/                      # サンプルコード
├── Helpers/                       # ヘルパースクリプト
├── homebrew/                      # Homebrew Formula
├── scripts/                       # ビルド・リリーススクリプト
├── release/                       # リリース関連
├── experiments/                   # 実験的コード
├── assets/                        # 画像・アセット
├── Package.swift                  # ルートSwiftPM
├── package.json                   # npm設定
├── peekaboo-mcp.js               # MCP サーバーエントリ
└── poltergeist.config.json       # Poltergeist設定
```

## ドキュメント・コミュニティ

### README構成

- バナー画像
- バッジ群（npm、ライセンス、macOS、Swift、Node.js、Homebrew、DeepWiki）
- 機能概要（What you get）
- インストール手順（Homebrew、npx）
- クイックスタート（コード例）
- コマンドリファレンステーブル
- モデル・プロバイダ一覧
- Learn moreリンク集
- 開発基礎情報
- ライセンス

### コントリビューションガイド

- CONTRIBUTING.mdは確認できず
- AGENTS.md: AIエージェント向けガイドライン
- CLAUDE.md: Claude Code向け設定

### ドキュメント

**docs/ ディレクトリ**:
- `ARCHITECTURE.md` - アーキテクチャ説明
- `commands/` - 各コマンドの詳細ドキュメント
- `permissions.md` - 権限設定ガイド
- `building.md` - ビルドガイド
- `testing/tools.md` - テストガイド
- `ollama.md` - Ollama/ローカルモデル設定
- `agent-chat.md` - エージェントチャットループ
- `service-api-reference.md` - サービスAPIリファレンス
- GitHub Pages有効（`pages.yml`ワークフロー）

## 品質管理

### テスト

**テスト構成**:
```bash
# 安全なテスト（自動化なし）
pnpm run test:safe

# 自動化テスト
pnpm run test:automation

# ローカルテスト
pnpm run test:automation:local

# 全テスト
pnpm run test:all
```

- Swift Testingフレームワーク
- `PEEKABOO_SKIP_AUTOMATION`フラグで自動化テストをスキップ可能
- `PEEKABOO_INCLUDE_AUTOMATION_TESTS`で自動化テストを有効化
- `--no-parallel`でテスト並列化を無効化（自動化テスト）

### Linter/Formatter

**SwiftLint** (`.swiftlint.yml`):
- Swift 6対応設定
- アナライザールール: `unused_declaration`, `unused_import`
- カスタムルール:
  - `no_direct_ax_in_peekaboo`: PeekabooCoreでの直接AX/CG API使用禁止
  - `no_ui_appservices_import`: UIサービスでのApplicationServices直接インポート禁止
- 除外パス: `.build`, `DerivedData`, サブモジュール
- Reporter: xcode

**SwiftFormat** (`.swiftformat`):
- Swift 6.2対応
- `--self insert`: Swift 6 concurrency対応でself必須
- インデント: 4スペース
- 最大幅: 120文字
- 改行: LF
- サブモジュール除外

**npm scripts**:
```bash
pnpm run lint:swift   # SwiftLint実行
pnpm run format:swift # SwiftFormat実行
```

### 型チェック

- Swift 6.2のStrict Concurrency有効
- `StrictConcurrency` experimental feature
- `ExistentialAny`, `NonisolatedNonsendingByDefault` upcoming features
- `MainActor.self` default isolation（プロトコルターゲット）
- 長い関数・式の警告（デバッグビルド時50ms閾値）

## リリース・配布

### バージョニング

- SemVer採用（3.0.0-beta4形式）
- `version.json`でバージョン管理
- プレリリースタグ（beta）使用

### パッケージ公開

**npm**:
- パッケージ名: `@steipete/peekaboo`
- 公開: `npx -y @steipete/peekaboo`で利用可能

**Homebrew**:
```bash
brew install steipete/tap/peekaboo
```
- 専用tap: `steipete/homebrew-tap`
- `update-homebrew.yml`で自動更新

**GitHub Releases**:
- Universal binary (arm64 + x86_64)
- `peekaboo-macos-universal.tar.gz`
- `checksums.txt`

### リリース自動化

- `scripts/prepare-release.js`: リリース準備スクリプト
- `update-homebrew.yml`: Homebrew Formula自動更新
- `appcast.xml`: Sparkleアップデートフィード（macOSアプリ用）

## プロジェクト運営

### Issue/PRテンプレート

- `.github/`にworkflowsのみ確認
- Issue/PRテンプレートは未確認

### ブランチ戦略

- メインブランチ: `main`
- PRベースの開発
- CI/CDは`main`ブランチとPRで実行

### セキュリティ

- Bridge security: TeamIDホワイトリストによるコード署名検証
- `PEEKABOO_ALLOW_UNSIGNED_SOCKET_CLIENTS`でデバッグ時のみ未署名許可
- macOS Screen Recording + Accessibility権限必須
- `.env`や認証情報の`.gitignore`管理

## ライセンス・法務

### LICENSE

- **MIT License**
- 著作者: Peter Steinberger

## OSSとして参考になるポイント

### 真似したい点

1. **モジュラーアーキテクチャ**: Core/Apps分離、サブモジュール活用で関心の分離が明確
2. **Swift 6対応**: 最新のSwift Concurrency機能を積極採用、厳密な型安全性
3. **複数配布チャネル**: npm、Homebrew、GitHub Releases、macOSアプリと幅広い配布
4. **カスタムSwiftLintルール**: プロジェクト固有のアーキテクチャルールを強制
5. **豊富なドキュメント**: コマンドごとの詳細ドキュメント、アーキテクチャ説明
6. **README構成**: バッジ、機能一覧、コマンドテーブルがわかりやすい
7. **CHANGELOG管理**: Keep a Changelog形式で変更履歴を詳細に記録
8. **AIエージェント対応**: AGENTS.md、CLAUDE.mdでAIツールとの連携を考慮

### 改善できそうな点

1. **CONTRIBUTING.md不在**: コントリビューションガイドラインが見当たらない
2. **Issue/PRテンプレート未確認**: 定型的なテンプレートがあると良い
3. **CODE_OF_CONDUCT.md不在**: 行動規範の明示
4. **SECURITY.md不在**: セキュリティポリシーの明示

### 自分のOSSに活かせること

1. **SwiftPMマルチターゲット構成**: Foundation/Protocols/Kit/Coreの層分け
2. **カスタムlintルール**: アーキテクチャ違反を自動検出
3. **Homebrew自動更新ワークフロー**: リリース時のFormula自動更新
4. **Universal binary配布**: arm64/x86_64両対応
5. **docs/commands/パターン**: コマンドごとの個別ドキュメント
6. **pnpmスクリプトによるSwiftビルド統合**: JSツールチェーンとSwiftの連携
7. **Sparkle + appcast.xml**: macOSアプリの自動アップデート機構
