---
title: takt
description: nrslib/takt の技術スタック・設計パターン分析
---

## 基本情報

| 項目 | 値 |
|------|-----|
| リポジトリ | [nrslib/takt](https://github.com/nrslib/takt) |
| スター数 | 276 |
| フォーク数 | 15 |
| 言語 | TypeScript |
| ライセンス | MIT |
| 作成日 | 2026-01-25 |
| 最終更新 | 2026-02-06 |

## 概要

TAKT (Task Agent Koordination Tool) は、複数のAIエージェント（Claude Code、Codex）をYAML定義のワークフローで協調実行するマルチエージェントオーケストレーションシステム。TAKT自身の開発もTAKTで行われている（dogfooding）。

### 主な特徴
- **YAML定義のワークフロー**: ピース（piece）ファイルでタスク実行フローを定義
- **マルチエージェント対応**: Claude Code と Codex の両方をサポート
- **CI/CD統合**: パイプラインモードでGitHub Actionsなどと連携
- **セッション継続**: 前回の実行コンテキストを引き継ぐ機能

## 技術スタック

### 言語

| 言語 | 割合 |
|------|------|
| TypeScript | 96.5% |
| HTML | 3.2% |
| JavaScript | 0.2% |
| Dockerfile | 0.01% |

### フレームワーク・ライブラリ

#### 本番依存

| ライブラリ | 用途 |
|------------|------|
| @anthropic-ai/claude-agent-sdk | Claude Code SDK |
| @openai/codex-sdk | Codex SDK |
| commander | CLIフレームワーク |
| chalk | ターミナル色付け |
| yaml | YAML パース |
| zod | スキーマバリデーション |
| update-notifier | アップデート通知 |
| wanakana | 日本語処理（ローマ字変換等） |

#### 開発依存

| ライブラリ | 用途 |
|------------|------|
| TypeScript | 型システム |
| ESLint | リンター |
| typescript-eslint | TypeScript用ESLint |
| Vitest | テストフレームワーク |

### CI/CD (GitHub Actions)

| ワークフロー | 説明 |
|--------------|------|
| `auto-tag.yml` | Release PRマージ時に自動タグ作成 & npm publish |
| `takt-action.yml` | Issue/PRコメントで`@takt`メンション時に自動実行 |
| `cleanup-skipped-runs.yml` | スキップされたワークフロー実行を週次クリーンアップ |

**リリース自動化の流れ**:
1. `release/` ブランチからのPRをマージ
2. PRタイトルからバージョン抽出（`Release v0.7.1` 形式）
3. Gitタグ作成・push
4. npm publishを実行（alpha/beta/rcは`next`タグ、それ以外は`latest`）

### 開発環境

| ツール | 設定 |
|--------|------|
| Docker | `Dockerfile` + `docker-compose.yml` |
| Node.js | >= 18.0.0 |
| npm | package-lock.json（ロックファイル） |

## フォルダ構造

```
takt/
├── bin/                  # CLIエントリポイント
│   └── takt              # 実行スクリプト
├── src/
│   ├── __tests__/        # ユニットテスト
│   ├── agents/           # エージェント関連
│   ├── app/
│   │   └── cli/          # CLIアプリケーション
│   ├── core/
│   │   ├── models/       # ドメインモデル
│   │   └── piece/        # ピース実行エンジン
│   ├── features/         # 機能モジュール
│   ├── infra/            # インフラ層
│   ├── shared/           # 共通ユーティリティ
│   └── index.ts          # ライブラリエントリポイント
├── e2e/
│   ├── fixtures/         # テストフィクスチャ
│   ├── helpers/          # テストヘルパー
│   └── specs/            # E2Eテストスペック
├── docs/                 # ドキュメント
├── resources/
│   ├── global/           # グローバル設定
│   ├── project/          # プロジェクト設定
│   └── skill/            # Claude Code Skill用
└── tools/                # 開発ツール
```

### アーキテクチャ

レイヤードアーキテクチャを採用:
- **app**: アプリケーション層（CLI）
- **core**: ドメイン層（ピースエンジン、モデル）
- **infra**: インフラ層（外部サービス連携）
- **shared**: 横断的関心事（i18n、プロンプト）
- **features**: 機能単位のモジュール

## ドキュメント・コミュニティ

### README構成

- バッジ: なし
- 多言語対応: 英語（メイン）+ 日本語（`docs/README.ja.md`）
- セクション:
  - 概念説明（Metaphor）
  - Why TAKT / What TAKT is NOT
  - Requirements / Installation
  - Quick Start
  - 詳細な使い方（Interactive Mode, Pipeline Mode等）
  - API Usage Example
  - CI/CD Integration

### コントリビューションガイド

**CONTRIBUTING.md** の特徴:
- 小さく集中した変更を推奨
- AIによる大量変更への警告（レビュー困難）
- Issue-firstアプローチ
- 開発セットアップ手順

### ドキュメント

| ファイル | 内容 |
|----------|------|
| `docs/pieces.md` | ピース作成ガイド |
| `docs/agents.md` | エージェント設定ガイド |
| `docs/data-flow.md` | データフロー詳細 |
| `docs/data-flow-diagrams.md` | データフロー図 |
| `docs/testing/` | テスト関連ドキュメント |
| `CLAUDE.md` | Claude Code向けプロジェクト説明 |
| `AGENTS.md` | エージェント向け説明 |

## 品質管理

### テスト

| 種類 | 設定 |
|------|------|
| フレームワーク | Vitest |
| ユニットテスト | `src/__tests__/` |
| E2Eテスト | `e2e/specs/` |
| カバレッジ | v8 provider |
| 設定 | 複数vitest.config（unit, e2e mock, e2e provider） |

**E2Eテスト戦略**:
- Mock mode: 実際のAPIを呼ばずにテスト
- Provider mode: Claude/Codex実環境でのテスト
- 分離環境でのテスト実行（`isolated-env` helper）

### Linter/Formatter

```javascript
// eslint.config.js
- @typescript-eslint/recommended
- @typescript-eslint/no-unused-vars（_プレフィックス許可）
- @typescript-eslint/no-explicit-any: error
- ignores: dist/, node_modules/, *.config.js, src/__tests__/
```

### 型チェック

```json
// tsconfig.json
{
  "strict": true,
  "noImplicitAny": true,
  "strictNullChecks": true,
  "noImplicitReturns": true,
  "noFallthroughCasesInSwitch": true,
  "noUncheckedIndexedAccess": true
}
```

TypeScriptのstrict modeをフル活用した堅牢な型チェック設定。

## リリース・配布

### バージョニング

- **SemVer準拠**: MAJOR.MINOR.PATCH
- **プレリリース対応**: alpha, beta, rc, next
- 現行バージョン: 0.7.1

### パッケージ公開

| 項目 | 設定 |
|------|------|
| レジストリ | npm |
| パッケージ名 | `takt` |
| 公開ファイル | `dist/`, `bin/`, `resources/` |
| エントリポイント | `dist/index.js` |
| 型定義 | `dist/index.d.ts` |

### リリース自動化

1. `release/` ブランチを作成
2. `package.json` のバージョン更新
3. PRを作成（タイトル: `Release v0.7.1`）
4. マージ時に自動タグ + npm publish

**npmタグ戦略**:
- 安定版: `latest`
- プレリリース: `next`

### CHANGELOG

[Keep a Changelog](https://keepachangelog.com/) 形式を採用:
- Added / Changed / Fixed / Internal セクション
- バージョンごとに日付記載
- 日本語での詳細な変更説明

## プロジェクト運営

### Issue/PRテンプレート

`.github/` ディレクトリにはワークフローのみ。Issue/PRテンプレートは未設定。

### ブランチ戦略

- **main**: 安定ブランチ
- **release/**: リリース準備ブランチ
- **takt/**: TAKTが自動生成するタスクブランチ

### セキュリティ

**SECURITY.md** の特徴:
- 脆弱性報告手順（非公開で報告）
- 対応タイムライン（7日で確認、14日で評価、30-90日で解決）
- TAKT固有のセキュリティ考慮事項:
  - 信頼されたディレクトリの設定
  - エージェント権限管理
  - セッションログの機密情報注意

### 行動規範

**CODE_OF_CONDUCT.md**: Contributor Covenant ベースの簡潔な行動規範。

## ライセンス・法務

| 項目 | 内容 |
|------|------|
| ライセンス | MIT License |
| 著作者 | nrslib |
| 年 | 2026（推定） |

## OSSとして参考になるポイント

### 真似したい点

1. **Dogfooding**: 自身の開発にTAKTを使用し、実用性を証明
2. **多言語ドキュメント**: 英語メイン + 日本語完備でグローバル対応
3. **CLAUDE.md / AGENTS.md**: AIエージェント向けのプロジェクト説明ファイル（新しいパターン）
4. **E2Eテストの二層構造**: Mock/Provider両対応で開発速度と信頼性を両立
5. **Keep a Changelog形式**: 変更履歴の標準フォーマット採用
6. **リリース自動化**: PRマージからnpm publishまで全自動
7. **TypeScript strict mode フル活用**: 厳格な型チェックで品質担保
8. **セキュリティポリシー**: ツール固有の考慮事項を明記

### 改善できそうな点

1. **Issue/PRテンプレート未設定**: バグ報告や機能要望の定型化が不足
2. **Dependabot設定なし**: 依存関係の自動更新が未設定
3. **バッジなし**: ビルド状態、カバレッジ、npm版などのバッジがREADMEにない
4. **CLA未導入**: 大規模コントリビューション時の法的保護がない

### 自分のOSSに活かせること

1. **AI対応ドキュメント**: CLAUDE.md のようなAIツール向け説明ファイルの作成
2. **YAMLベースのワークフロー定義**: 宣言的な設定による拡張性確保
3. **i18n対応**: 最初から多言語を意識した設計
4. **E2Eテスト戦略**: コストの高いAPI呼び出しはmockで、信頼性確認は実環境で
5. **release/ブランチ戦略**: PR駆動のリリースフローで自動化と可視性を両立
