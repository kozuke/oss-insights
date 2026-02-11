---
title: dagster
description: dagster-io/dagster の技術スタック・設計パターン分析
---

## 基本情報

| 項目 | 値 |
|------|-----|
| リポジトリ | [dagster-io/dagster](https://github.com/dagster-io/dagster) |
| スター数 | 14,930 |
| フォーク数 | 1,971 |
| 言語 | Python |
| ライセンス | Apache-2.0 |
| 作成日 | 2018-04-30 |

## 概要

Dagsterはデータアセットの開発、本番運用、監視のためのオーケストレーションプラットフォームです。データパイプラインの構築、スケジューリング、監視を統合的に管理できます。

**主なトピック**: analytics, dagster, data-engineering, data-integration, data-orchestrator, data-pipelines, data-science, etl, metadata, mlops, orchestration, python, scheduler, workflow, workflow-automation

## 技術スタック

### 言語

| 言語 | バイト数 | 割合 |
|------|---------|------|
| Python | 29,272,206 | 81.1% |
| TypeScript | 6,188,674 | 17.1% |
| LookML | 329,353 | 0.9% |
| Jupyter Notebook | 77,845 | 0.2% |
| JavaScript | 68,843 | 0.2% |
| CSS | 58,564 | 0.2% |
| その他 | 145,021 | 0.4% |

### フレームワーク・ライブラリ

**バックエンド (Python)**
- コアフレームワーク: 独自フレームワーク（dagster）
- Web: dagster-webserver（GraphQL API）
- 型チェック: Pyright
- Linter/Formatter: Ruff
- テスト: pytest, tox
- パッケージ管理: uv

**フロントエンド (TypeScript/React)**
- UI: React 18
- 状態管理: 独自実装
- スタイル: CSS
- ビルド: Webpack
- テスト: Jest
- Linter: ESLint

**ドキュメント**
- フレームワーク: Docusaurus 3.9
- 検索: docusaurus-lunr-search
- API docs: Sphinx

### CI/CD

**Buildkite（メイン）**
- `.buildkite/` ディレクトリで独自のビルドシステムを構築
- 大規模なテストスイートを並列実行
- `buildkite-shared/` で共有設定を管理
- `dagster-buildkite` パッケージでビルドロジックを抽象化

**GitHub Actions（補助）**
- `build-docs.yml`: Vercelへのドキュメントデプロイ
- `build-storybook-core.yml`, `build-storybook-ui.yml`: Storybookビルド
- `automate-stale-issues.yml`: Stale Issue自動管理
- `check-docs.yml`: ドキュメントの検証
- `build-integration-registry.yml`: インテグレーション登録

**Azure Pipelines**
- `azure-pipelines.yml` で一部のCIを実行

### 開発環境

- **uv**: Pythonパッケージ管理（pipの代替）
- **Makefile**: 開発タスクの自動化
- **pre-commit**: コード品質チェック
- **GitPod**: `.gitpod.yml` でクラウド開発環境をサポート
- **VS Code**: `.vscode/` で設定を提供
- **tox**: Python環境の分離テスト

## フォルダ構造

```
dagster/
├── .buildkite/           # Buildkite CI設定
│   ├── buildkite-shared/ # 共有設定
│   ├── dagster-buildkite/# ビルドロジック
│   └── hooks/            # フック
├── .claude/              # Claude AI設定
├── .github/              # GitHub設定
│   ├── workflows/        # GitHub Actions
│   └── ISSUE_TEMPLATE/   # Issueテンプレート
├── config/               # 設定ファイル
├── docs/                 # Docusaurusドキュメント
│   ├── docs/             # ドキュメントコンテンツ
│   └── sphinx/           # API docs (Sphinx)
├── examples/             # サンプルプロジェクト
│   ├── docs_snippets/    # ドキュメント用コード例
│   ├── project_fully_featured/ # フル機能サンプル
│   └── ...               # 各種チュートリアル
├── helm/                 # Helmチャート
│   └── dagster/          # Kubernetes用Helmチャート
├── integration_tests/    # インテグレーションテスト
├── js_modules/           # フロントエンド
│   └── dagster-ui/       # React UIアプリ
│       └── packages/     # モノレポ構成
│           ├── app-oss/  # OSSアプリ
│           ├── ui-core/  # UIコアロジック
│           └── ui-components/ # UIコンポーネント
├── python_modules/       # Pythonパッケージ
│   ├── dagster/          # コアパッケージ
│   ├── dagster-graphql/  # GraphQL API
│   ├── dagster-webserver/# Webサーバー
│   ├── dagster-pipes/    # Pipes（外部プロセス連携）
│   └── libraries/        # インテグレーションライブラリ
│       ├── dagster-aws/
│       ├── dagster-dbt/
│       ├── dagster-k8s/
│       └── ... (70+ライブラリ)
├── marketplace/          # マーケットプレイス関連
├── scripts/              # ユーティリティスクリプト
├── pyproject.toml        # Python設定（pyright等）
├── Makefile              # 開発タスク
└── uv.lock               # uvロックファイル
```

## ドキュメント・コミュニティ

### README構成

- プロジェクト概要
- インストール方法
- クイックスタートへのリンク
- ドキュメントサイトへの誘導
- コミュニティリンク（Slack、GitHub Discussions）

### コントリビューションガイド

`docs/docs/about/contributing.md` に詳細なガイドを提供:
- 環境セットアップ手順（uv, Node.js, yarn）
- `make dev_install` による開発環境構築
- コードスタイルガイドライン（Ruff, Pyright）
- UI開発のワークフロー
- テスト実行方法

### ドキュメント

- **メインサイト**: Docusaurus 3.9で構築
- **APIドキュメント**: Sphinxで生成
- **開発者向け**: `CLAUDE.md` でAI支援開発向けの詳細ガイド
- **バージョニング**: docusaurusのバージョニング機能を活用
- **検索**: Lunr searchを統合
- **Vale**: 文章の品質チェック

## 品質管理

### テスト

**pytest**
- `python_modules/dagster/dagster_tests/` にコアテスト
- `integration_tests/` でインテグレーションテスト
- マーカー: `unit`, `integration`, `e2e`, `slow`
- タイムアウト: 240秒

**tox**
- Python環境の分離テスト
- `tox -e py39-pytest` でバージョン指定実行

**Jest**
- `js_modules/dagster-ui/` でフロントエンドテスト

### Linter/Formatter

**Ruff（Python）**
- フォーマット、リント、インポートソートを統合
- `make ruff` で一括実行
- **必須**: コード変更後は常に実行

**ESLint/Prettier（TypeScript）**
- `yarn lint` で実行
- `.prettierrc.js` で設定

### 型チェック

**Pyright（Python）**
- `typeCheckingMode = "standard"`
- Python 3.10以上をターゲット
- `make pyright` または `make quick_pyright`（差分のみ）

**TypeScript**
- `yarn tsgo` で型チェック

### pre-commit hooks

```yaml
hooks:
  - id: ruff-format      # フォーマット
  - id: ruff-lint        # リント
  - id: pyright          # 型チェック（push時のみ）
```

## リリース・配布

### バージョニング

- **Core**: 1.12.x（例: 1.12.14）
- **Libraries**: 0.28.x（例: 0.28.14）
- コアとライブラリで別バージョン管理
- SemVerに準拠

### パッケージ公開

**PyPI**
- `dagster`: コアパッケージ
- `dagster-graphql`: GraphQL API
- `dagster-webserver`: Webサーバー
- 70以上のインテグレーションライブラリ

**Helm**
- `helm/dagster/` でKubernetes用Helmチャートを提供

### リリースノート

**CHANGES.md**
- Keep a Changelog形式に準拠
- セクション: New, Bugfixes, Documentation, Dagster Plus
- コントリビューターへのクレジット（Thanks, @username!）

**GitHub Releases**
- タグベースのリリース
- リリースノートは自動生成ではなく手動で記述

### リリース頻度

- 週1-2回のリリースサイクル
- 2026年1-2月: 1.12.10 → 1.12.14

## プロジェクト運営

### Issue/PRテンプレート

**Issueテンプレート（YAML形式）**
- `report_bug.yml`: バグ報告
- `report_documentation_issue.yml`: ドキュメント問題
- `request_a_feature.yml`: 機能リクエスト
- `config.yml`: テンプレート設定

**PRテンプレート**
```markdown
## Summary & Motivation
## How I Tested These Changes
## Changelog
```

### ラベル運用

- `type: bug`: バグ報告

### ブランチ戦略

- **デフォルトブランチ**: `master`
- **リリースブランチ**: `release-*`
- PRベースの開発フロー

### セキュリティ

**Dependabot**
- npm: daily（PRリミット0＝自動作成なし）
- pip: daily（PRリミット0）
- `examples/`, `pyright/` を除外

## OSSとして参考になるポイント

### 真似したい点

1. **CLAUDE.md の活用**
   - AI支援開発のための詳細なガイドを提供
   - パッケージ位置、開発ワークフロー、コーディング規約を文書化
   - 環境変数 `$DAGSTER_GIT_REPO_DIR` で絶対パスを抽象化

2. **包括的なインテグレーションライブラリ**
   - 70以上の公式インテグレーション（AWS, GCP, dbt, Airflow等）
   - 統一された命名規則（`dagster-{service}`）
   - 各ライブラリに `CONTRIBUTING.md` を配置

3. **モノレポ構成の工夫**
   - Python: `python_modules/` 配下に集約
   - TypeScript: `js_modules/dagster-ui/packages/` でワークスペース管理
   - 共有設定を明確に分離

4. **開発者体験の重視**
   - `make dev_install` でワンコマンドセットアップ
   - GitPod対応でクラウド開発可能
   - VS Code設定の共有

5. **ドキュメント品質管理**
   - Valeによる文章チェック
   - docs_snippetsでコード例をテスト対象に

### 改善できそうな点

1. **CIシステムの複雑さ**
   - Buildkite + GitHub Actions + Azure Pipelinesと分散
   - 新規コントリビューターには理解が難しい可能性

2. **CONTRIBUTINGの分散**
   - ルートにはなく`docs/docs/about/contributing.md`に配置
   - 発見しにくい可能性

3. **PRリミット0のDependabot**
   - セキュリティアップデートも手動対応になる

### 自分のOSSに活かせること

1. **CLAUDE.mdやCONTEXT.mdの導入**
   - AI支援開発時代に備えた開発者ガイド
   - パッケージ構造のマップを提供

2. **pre-commitでの段階的チェック**
   - 軽いチェック（format, lint）はpre-commitで
   - 重いチェック（pyright）はpre-pushで

3. **統合ライブラリの設計パターン**
   - 命名規則の統一
   - 各ライブラリ独立してもコア依存は明確に

4. **Makefileによるタスク抽象化**
   - `make ruff`, `make pyright`など開発者が覚えやすいコマンド
   - 複雑なセットアップを隠蔽

5. **豊富なexamplesディレクトリ**
   - ユースケースごとの完全なサンプル
   - ドキュメントと連携したスニペット管理
