---
title: ccusage
description: ryoppippi/ccusage の技術スタック・設計パターン分析
---

## 基本情報

| 項目 | 値 |
|------|-----|
| リポジトリ | [ryoppippi/ccusage](https://github.com/ryoppippi/ccusage) |
| スター数 | 10,242 |
| フォーク数 | 336 |
| 言語 | TypeScript |
| ライセンス | MIT |
| 作成日 | 2025-05-29 |
| ホームページ | [ccusage.com](https://ccusage.com/) |

## 概要

ccusageはClaude Code/Codex CLIの使用量を分析するCLIツール。ローカルのJSONLファイルからトークン使用量とコストを解析し、日別・月別・セッション別のレポートを提供。非常に小さなバンドルサイズで高速に動作し、Claude Code利用者のコスト管理に広く使われている。

## 技術スタック

### 言語

| 言語 | バイト数 | 用途 |
|------|----------|------|
| TypeScript | 617,623 | メインコード |
| JavaScript | 3,834 | 設定ファイル |
| Nix | 1,050 | 開発環境 |
| Shell | 68 | スクリプト |

### フレームワーク・ライブラリ

**CLIフレームワーク**
- `gunshi` - CLIコマンドフレームワーク
- `picocolors` - ターミナルカラー出力
- `ansi-escapes` - ターミナル制御
- `string-width` - 文字幅計算

**データ処理**
- `valibot` - スキーマ検証
- `fast-sort` - 高速ソート
- `es-toolkit` - ユーティリティ関数
- `tinyglobby` - Glob パターンマッチング

**エラーハンドリング**
- `@praha/byethrow` - Result型による関数型エラーハンドリング

**その他**
- `get-stdin` - 標準入力処理
- `nano-spawn` - プロセス生成
- `p-limit` - 並行処理制限
- `pretty-ms` - 時間フォーマット
- `xdg-basedir` - XDGディレクトリ

**関連パッケージ（ccusageファミリー）**
- `@ccusage/codex` - OpenAI Codex使用量分析
- `@ccusage/opencode` - OpenCode使用量分析
- `@ccusage/pi` - Pi-agent使用量分析
- `@ccusage/amp` - Amp使用量分析
- `@ccusage/mcp` - MCPサーバー統合

### CI/CD (GitHub Actions)

| ワークフロー | 説明 |
|-------------|------|
| `ci.yaml` | メインCI（lint、test、typecheck、spell-check、schema-check） |
| `release.yaml` | npmパッケージ公開、GitHub Releases作成 |
| `check-pr-title.yaml` | PRタイトルのConventional Commits形式チェック |

**CI特徴**
- **ARM Runner** (`ubuntu-24.04-arm`) - 高速CI実行
- **Nix環境** - 再現性の高いビルド環境
- **pkg-pr-new** - PRごとにパッケージをプレビュー公開
- **typos** - スペルチェック
- **スキーマ検証** - JSON Schema生成の自動チェック

### 開発環境

**Nix Flake**
- `flake.nix` で開発環境を定義
- `direnv` による自動ロード
- pnpm, typos, jq, git, ghを統合

**エディタ連携**
- `CLAUDE.md` / `AGENTS.md` - Claude CodeとGitHub Copilot用のガイダンス
- `.mcp.json` - MCP設定
- `@gunshi/docs`, `@praha/byethrow-docs` - LLM向けスキル

## フォルダ構造

```
ccusage/
├── .claude/              # Claude Code設定
├── .github/
│   ├── actions/          # Reusable actions
│   ├── workflows/        # GitHub Actions
│   ├── renovate.json     # Renovate設定
│   └── FUNDING.yaml      # スポンサー設定
├── .githooks/
│   └── pre-commit        # lint-staged実行
├── apps/
│   ├── ccusage/          # メインCLI
│   ├── codex/            # OpenAI Codex対応
│   ├── opencode/         # OpenCode対応
│   ├── pi/               # Pi-agent対応
│   ├── amp/              # Amp対応
│   └── mcp/              # MCPサーバー
├── docs/                 # VitePressドキュメント
├── packages/
│   ├── internal/         # 内部共有パッケージ
│   └── terminal/         # ターミナルUI
├── eslint.config.js      # ESLint設定
├── flake.nix             # Nix開発環境
├── package.json          # ルートpackage.json
├── pnpm-workspace.yaml   # pnpmワークスペース
├── typos.toml            # スペルチェック設定
├── CLAUDE.md             # Claude Codeガイダンス
└── AGENTS.md             # AIエージェントガイダンス
```

**apps/ccusage/src/ 構造**
```
src/
├── commands/             # CLIサブコマンド
├── _config-loader-tokens.ts
├── _consts.ts
├── _daily-grouping.ts
├── _date-utils.ts
├── _jq-processor.ts
├── _json-output-types.ts
├── _macro.ts
├── _pricing-fetcher.ts
├── _project-names.ts
├── _session-blocks.ts
├── _shared-args.ts
├── _token-utils.ts
├── _types.ts
├── _utils.ts
├── calculate-cost.ts
├── data-loader.ts
├── debug.ts
├── index.ts              # エントリポイント
└── logger.ts
```

## ドキュメント・コミュニティ

### README構成

- **ロゴ・ヘッダー**: SVGロゴとセンター配置タイトル
- **バッジ**: Socket, npm version, npm downloads, install size, DeepWiki, Awesome Claude Code
- **スクリーンショット**: 使用イメージ
- **製品ファミリー**: 関連ツール一覧（codex, opencode, pi, amp, mcp）
- **インストール方法**: npx/bunx/pnpm dlx/deno対応
- **使用方法**: コマンド例とオプション
- **機能一覧**: 詳細な機能説明
- **開発環境セットアップ**: Nixベースの手順
- **スポンサー**: YouTube紹介動画、GitHub Sponsors画像
- **Star History**: グラフ表示

### コントリビューションガイド

明示的なCONTRIBUTING.mdはないが、`CLAUDE.md`と`AGENTS.md`に詳細なガイドラインあり:
- コミットメッセージ形式（Conventional Commits）
- コードスタイル（ESLint、タブインデント、ダブルクォート）
- エラーハンドリング（@praha/byethrow推奨）
- テストガイドライン（in-source testing）
- 命名規則

### ドキュメント

- **公式サイト**: [ccusage.com](https://ccusage.com/)
- **VitePress**: `docs/`ディレクトリでVitePressベースのドキュメント
- **TypeDoc**: API自動生成ドキュメント
- **Wrangler**: Cloudflare Workersでホスティング

## 品質管理

### テスト

| 項目 | 内容 |
|------|------|
| フレームワーク | vitest |
| パターン | in-source testing（`import.meta.vitest`） |
| モックデータ | `fs-fixture` によるディレクトリシミュレーション |
| タイムゾーン | `TZ=UTC` 環境変数でテスト実行 |
| 対象モデル | Claude 4 Sonnet/Opus（LiteLLM価格データ連携） |

**in-sourceテストの例**
```typescript
if (import.meta.vitest != null) {
  describe('calculateCost', () => {
    it('should calculate cost correctly', () => {
      // テストコード
    });
  });
}
```

### Linter/Formatter

| ツール | 用途 | 設定 |
|--------|------|------|
| ESLint | TypeScript lint | `eslint.config.js` + `@ryoppippi/eslint-config` |
| oxfmt | TypeScript format | `.oxfmtrc.jsonc` |
| typos | スペルチェック | `typos.toml` |

### 型チェック

- **TypeScript strict mode** - 厳格な型チェック
- **tsgo** - TypeScriptネイティブコンパイラ（`@typescript/native-preview`）
- **bundler module resolution**
- `skipLibCheck: true`

### Pre-commit Hooks

- `.githooks/pre-commit` - Git hooks
- `lint-staged` - ステージファイルのみフォーマット
- `git config --local core.hooksPath .githooks` でフック設定

## リリース・配布

### バージョニング

- **SemVer**: `18.0.5`（現在）
- `bumpp` - バージョンバンプツール
- モノレポ全体で統一バージョン管理

### パッケージ公開

| パッケージ | レジストリ | 説明 |
|-----------|-----------|------|
| `ccusage` | npm | メインCLI |
| `@ccusage/codex` | npm | Codex対応 |
| `@ccusage/opencode` | npm | OpenCode対応 |
| `@ccusage/pi` | npm | Pi-agent対応 |
| `@ccusage/amp` | npm | Amp対応 |
| `@ccusage/mcp` | npm | MCPサーバー |

- **Provenance**: `--provenance` フラグで署名付き公開
- **pkg-pr-new**: PRごとのプレビューパッケージ

### リリース自動化

- **タグトリガー**: `v*` タグでリリースワークフロー起動
- **changelogithub**: GitHubリリースノート自動生成
- **clean-pkg-json**: パッケージ公開用JSONクリーンアップ

## プロジェクト運営

### Issue/PRテンプレート

明示的なテンプレートファイルはないが、`CLAUDE.md`にPRタイトル規則を明記

### ラベル運用

自動ラベル設定なし（Renovate PRは自動マージ対象外）

### ブランチ戦略

- `main` - メインブランチ
- タグベースリリース
- PRマージ後に自動デプロイ

### セキュリティ

- **Dependabot代替**: Renovate Bot
  - Nixサポート有効
  - カスタム設定で依存関係更新を管理
- **Socket Badge**: サプライチェーンセキュリティ表示
- **npm provenance**: パッケージ署名

### 依存関係管理

- **pnpm workspaces** + **pnpm catalog** で依存関係を中央管理
- **devDependencies only**: バンドルするため全てdevDependenciesに配置
- **devEngines**: Node.js ^24.11.0, Bun ^1.3.2

## ライセンス・法務

- **MIT License**
- 著作権: `2025 ryoppippi`
- CLA: なし

## OSSとして参考になるポイント

### 真似したい点

1. **CLAUDE.md / AGENTS.md**: Claude CodeやGitHub Copilot向けの詳細なガイダンスファイル。AIアシスタントとの協業を前提にした開発体制
2. **in-source testing**: テストを実装ファイル内に書くパターン。テストと実装の近接性が高く、メンテナンスしやすい
3. **Nix Flake開発環境**: 再現性の高い開発環境をflake.nixで定義。direnvで自動ロード
4. **pkg-pr-new**: PRごとにパッケージをプレビュー公開。レビュー前に動作確認可能
5. **小さなバンドルサイズへのこだわり**: install sizeバッジを掲げ、パッケージサイズを重視
6. **LLM向けドキュメント統合**: `@gunshi/docs`, `@praha/byethrow-docs` などLLM用のスキルドキュメントを依存関係に含める
7. **oxfmt採用**: Prettierより高速な新しいフォーマッター
8. **Result型エラーハンドリング**: `@praha/byethrow`による関数型エラーハンドリングの標準化
9. **命名規則の徹底**: 内部ファイルはアンダースコアプレフィックス（`_types.ts`）
10. **製品ファミリー展開**: ccusageをベースに複数のツール（codex, opencode, pi, amp）に展開

### 改善できそうな点

1. **CONTRIBUTING.md**: 明示的なコントリビューションガイドがない（CLAUDE.mdに内包）
2. **CODE_OF_CONDUCT.md**: 行動規範ファイルがない
3. **Issue/PRテンプレート**: テンプレートファイルがない
4. **SECURITY.md**: セキュリティポリシーファイルがない

### 自分のOSSに活かせること

1. **CLAUDE.md / AGENTS.md パターン**: AIエージェントと協業するための詳細なコンテキストファイルを用意する
2. **in-source testing**: vitestの`import.meta.vitest`を使って実装ファイル内にテストを書く
3. **Nix Flake + direnv**: 再現性の高い開発環境を簡単にセットアップ可能に
4. **devDependencies only戦略**: バンドルするCLIでは全てdevDependenciesに配置
5. **pnpm catalog**: モノレポでの依存関係バージョンの一元管理
6. **pkg-pr-new統合**: CIでPRごとにパッケージをプレビュー公開
7. **changelogithub**: GitHub Releasesの自動生成
8. **tsgo (TypeScript native)**: 高速な型チェックのためのネイティブコンパイラ
9. **oxfmt**: Prettierの代替として高速なフォーマッター
10. **バンドルサイズバッジ**: packagephobia.comのバッジでサイズを可視化
