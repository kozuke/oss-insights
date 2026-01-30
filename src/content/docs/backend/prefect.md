---
title: prefect
description: PrefectHQ/prefect の技術スタック・設計パターン分析
---

## 基本情報

| 項目 | 値 |
|------|-----|
| リポジトリ | [PrefectHQ/prefect](https://github.com/PrefectHQ/prefect) |
| スター数 | 21,483 |
| フォーク数 | 2,089 |
| 言語 | Python |
| ライセンス | Apache-2.0 |
| 作成日 | 2018-06-29 |

## 技術スタック

### 言語

| 言語 | 割合 |
|------|------|
| Python | 77.8% |
| TypeScript | 20.9% |
| Vue | 0.5% |
| CSS | 0.2% |
| その他 (Jinja, Dockerfile, Shell, JavaScript, Just, Lua, HTML) | 0.6% |

### フレームワーク・ライブラリ

#### Python (バックエンド/コア)
- **FastAPI** - REST APIサーバー
- **SQLAlchemy 2.0** - ORM (asyncio対応)
- **Pydantic 2.x** - データバリデーション・設定管理
- **Alembic** - データベースマイグレーション
- **aiosqlite / asyncpg** - SQLite・PostgreSQL非同期ドライバ
- **Typer / Click** - CLI構築
- **httpx** - HTTPクライアント
- **OpenTelemetry** - オブザーバビリティ
- **Docker SDK** - コンテナ操作

#### JavaScript/TypeScript (UI)
- **React** - UIフレームワーク (ui-v2)
- **Vite** - ビルドツール
- **TanStack Query/Router/Table** - 状態管理・ルーティング
- **Radix UI** - ヘッドレスUIコンポーネント
- **Biome** - Linter/Formatter
- **Vitest** - テスト
- **Playwright** - E2Eテスト
- **Storybook** - コンポーネントカタログ

### CI/CD (GitHub Actions)

34個のワークフローで構成される大規模CI/CD:

| カテゴリ | ワークフロー |
|----------|------------|
| テスト | `python-tests.yaml`, `integration-tests.yaml`, `k8s-integration-tests.yaml`, `windows-tests.yaml`, `ui-tests.yml`, `ui-v2-e2e-tests.yml`, `markdown-tests.yaml` |
| 静的解析 | `static-analysis.yaml`, `codeql-analysis.yml` |
| ベンチマーク | `benchmarks.yaml`, `codspeed-benchmarks.yaml` |
| リリース | `kickoff-release.yaml`, `nightly-release.yaml`, `python-package.yaml`, `prefect-client-publish.yaml` |
| Docker | `docker-images.yaml`, `prefect-aws-docker-images.yaml` |
| インテグレーション | `integration-package-release.yaml`, `integration-package-tests.yaml` |
| その他 | `labeler.yml`, `stale.yml`, `claude.yml` (AI支援) |

特徴:
- マトリックスビルド: Python 3.10-3.14 × PostgreSQL/SQLite
- 並行制御: PRビルドは後続pushでキャンセル
- パス条件: 関連ファイル変更時のみ実行

### 開発環境

- **uv** - 高速Pythonパッケージマネージャー (推奨)
- **justfile** - タスクランナー (makeの代替)
- **pre-commit** - Git hooks管理
- **nvm** - Node.jsバージョン管理 (UI開発用)
- **Docker** - コンテナ化

## フォルダ構造

```
prefect/
├── src/
│   ├── prefect/           # メインパッケージ
│   │   ├── cli/           # CLIコマンド
│   │   ├── client/        # APIクライアント
│   │   ├── server/        # Prefectサーバー
│   │   ├── blocks/        # ストレージ・シークレット等の抽象化
│   │   ├── deployments/   # デプロイメント管理
│   │   ├── events/        # イベントシステム
│   │   ├── concurrency/   # 並行処理制御
│   │   └── ...
│   └── integrations/      # 公式インテグレーション
├── client/                # prefect-client軽量版パッケージ
├── ui-v2/                 # React製新UI
├── ui/                    # 旧UI (Vue)
├── tests/                 # テストスイート
├── docs/                  # MkDocsドキュメント
├── integration-tests/     # 統合テスト
├── benches/               # ベンチマーク
├── schemas/               # JSONスキーマ
├── scripts/               # ビルド・生成スクリプト
└── tools/                 # 開発ツール
```

## ドキュメント・コミュニティ

### README構成

- ロゴ・バッジ (PyPI, ダウンロード数, スター, Slack, YouTube)
- クイックナビゲーション (Installation, Quickstart, Build/Deploy workflows, Cloud)
- プロジェクト概要・価値提案
- Getting Started (インストール・コード例)
- Prefect Cloud紹介
- prefect-client軽量版の案内
- コミュニティリソース・連絡先

特徴: GitHub Alertsの `[!TIP]` 記法を活用した視覚的に分かりやすい構成

### コントリビューションガイド

`docs/contribute/` 配下にMDXファイルで構成:
- `dev-contribute.mdx` - 開発環境セットアップ、テスト作成
- `docs-contribute.mdx` - ドキュメント貢献
- `contribute-integrations.mdx` - インテグレーション開発
- `develop-a-new-worker-type.mdx` - ワーカー開発
- `styles-practices.mdx` - コードスタイル

### ドキュメント

- **MkDocs Material** - docs.prefect.io
- **Mintlify** - 別途外部ドキュメント (docs/v3)
- **Storybook** - UIコンポーネントドキュメント

## 品質管理

### テスト

| フレームワーク | 用途 |
|--------------|------|
| **pytest** | Pythonユニットテスト |
| **pytest-asyncio** | 非同期テスト |
| **pytest-xdist** | 並列実行 |
| **pytest-cov** | カバレッジ |
| **pytest-timeout** | タイムアウト制御 |
| **moto** | AWSモック |
| **Vitest** | TypeScriptテスト |
| **Playwright** | E2Eテスト |

テスト構成:
- Server Tests / Database & Orchestration Tests / Client Tests / Runner/Worker/CLI Tests に分割
- PostgreSQL 14 と SQLite でマトリックス実行
- Python 3.10-3.14 全バージョンでテスト

### Linter/Formatter

| ツール | 用途 |
|--------|------|
| **Ruff** | Python Linter/Formatter (v0.14.14) |
| **mypy** | Python型チェック (v1.15.0) |
| **codespell** | スペルチェック |
| **Biome** | TypeScript/JavaScript Linter/Formatter |
| **ESLint** | JavaScript Linter (ui-v2) |

### 型チェック

- **mypy** - サーバー/並行処理/イベント/入力モジュール限定で実行
- **pyright** - 開発時の型チェック
- **TypeScript** - UI-v2の型安全性
- **types-*** - サードパーティ型定義 (cachetools, PyYAML, dateparser)

### pre-commit hooks

```yaml
pre-commit:
  - no-commit-to-branch (main保護)
  - ruff-check (lint + auto-fix)
  - ruff-format
  - codespell
  - mypy (特定ディレクトリ)
  - uv-lock (lockfile同期)
  - check-ui-v2 (UIチェック)

pre-push:
  - service-sync-ui-v2-openapi (OpenAPI同期)
```

## リリース・配布

### バージョニング

- **SemVer** 採用 (例: 3.6.15)
- **versioningit** - Git tags からの動的バージョン生成
- **Nightly releases** - 開発版リリース (3.6.14.dev7)
- クリエイティブなリリース名 ("Simply Authful", "A Prefect Server for Every ::1")

### パッケージ公開

| パッケージ | レジストリ |
|-----------|-----------|
| prefect | PyPI |
| prefect-client | PyPI (軽量クライアント版) |
| prefect-ui | npm (private) |
| Docker images | Docker Hub / GHCR |
| Helm chart | Artifact Hub |

### リリース自動化

- `kickoff-release.yaml` - リリースプロセス開始
- `nightly-release.yaml` - ナイトリービルド
- `python-package.yaml` - PyPI公開
- `prefect-client-publish.yaml` - クライアント版公開
- `docker-images.yaml` - Dockerイメージビルド
- `helm-chart-release.yaml` - Helmチャートリリース

## プロジェクト運営

### Issue/PRテンプレート

**Issue Templates** (YAML形式):
- `1_bug_report.yaml` - バグレポート (再現コード・バージョン情報必須)
- `2_feature_enhancement.yaml` - 機能要望
- `config.yml` - Discussions誘導設定

特徴: `prefect version` コマンド出力を要求し、環境情報を標準化

### ラベル運用

| カテゴリ | ラベル例 |
|---------|---------|
| バージョン | `2.x`, `3.x` |
| タイプ | `bug`, `enhancement`, `feature`, `fix` |
| コンポーネント | `api`, `cli`, `docs`, `ui-replatform` |
| 優先度 | `breaking change`, `DONT MERGE` |
| 貢献者向け | `good first issue`, `great writeup`, `exemplary-pr-body` |
| プラットフォーム | `arch:windows` |
| 状態 | `needs:design`, `needs:details` |

### ブランチ戦略

- `main` - 現行開発ブランチ (3.x)
- `2.x` - メンテナンスブランチ
- pre-commitで `main` への直接コミットを禁止

### セキュリティ

- **SECURITY.md** - バグバウンティプログラム案内 (bugbounty@prefect.io)
- **Dependabot** - pip, npm, GitHub Actions, Docker, uv の自動更新
- **CodeQL** - コードセキュリティ分析
- **48時間以内のレスポンス** を約束

## OSSとして参考になるポイント

### 真似したい点

1. **包括的なCI/CD**: 34ワークフローで品質・セキュリティ・リリースを自動化
2. **マルチバージョンサポート**: Python 3.10-3.14、PostgreSQL/SQLiteマトリックス
3. **justfile活用**: makeの代わりにjustを使用し、モダンなタスク実行環境
4. **pre-commit + pre-push分離**: 軽量チェックはcommit時、重いチェック(OpenAPI同期)はpush時
5. **バグバウンティプログラム**: セキュリティレポートへのプロフェッショナルな対応体制
6. **Issue Template**: `prefect version`コマンドでの環境情報収集の標準化
7. **ラベル設計**: `great writeup`, `exemplary-pr-body`で良質な貢献を可視化
8. **軽量クライアント版**: `prefect-client`パッケージでエフェメラル環境向け最適化
9. **AI支援開発**: `claude.yml`ワークフロー、`AGENTS.md`でAI向けコンテキスト提供
10. **クリエイティブなリリース名**: 開発者コミュニティの楽しさを演出

### 改善できそうな点

1. **CONTRIBUTING.md不在**: ルートにCONTRIBUTING.mdがなく、docs配下に分散
2. **旧UI残存**: Vue製ui/とReact製ui-v2/が並存し、移行途中の状態
3. **mypy部分適用**: 全コードではなく特定ディレクトリのみ型チェック

### 自分のOSSに活かせること

1. **Dependabotのグループ化設定**: ESLint関連を1PRにまとめる設計
2. **uv採用**: 高速なPython依存管理で開発体験向上
3. **OpenAPI自動同期**: バックエンド変更時にフロントエンドの型定義を自動更新
4. **AGENTS.md**: AI支援ツール向けのコンテキストファイル配置
5. **pre-commit hooks**: Ruff, codespell, mypy, uv-lockの組み合わせ
6. **ドキュメント分離**: 開発者向けdocs/contributeと利用者向けドキュメントの分離
