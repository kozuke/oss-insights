---
title: Apache Airflow
description: apache/airflow の技術スタック・設計パターン分析
---

## 基本情報

| 項目 | 値 |
|------|-----|
| リポジトリ | [apache/airflow](https://github.com/apache/airflow) |
| スター数 | 44,073 |
| フォーク数 | 16,379 |
| 言語 | Python |
| ライセンス | Apache-2.0 |
| 作成日 | 2015-04-13 |
| 説明 | Apache Airflow - A platform to programmatically author, schedule, and monitor workflows |

## 技術スタック

### 言語

| 言語 | バイト数 | 割合 |
|------|----------|------|
| Python | 48,076,064 | 92.1% |
| TypeScript | 3,121,565 | 6.0% |
| JavaScript | 344,532 | 0.7% |
| Shell | 233,531 | 0.4% |
| Go | 157,246 | 0.3% |
| Dockerfile | 127,646 | 0.2% |
| その他 | 156,000+ | 0.3% |

### フレームワーク・ライブラリ

**バックエンド (Python)**
- **FastAPI**: REST API サーバー (v0.128.0+)
- **SQLAlchemy**: ORM / データベース抽象化 (v2.0.36+)
- **Alembic**: データベースマイグレーション (v1.13.1+)
- **Pydantic**: データバリデーション (v2.11.0+)
- **Jinja2**: テンプレートエンジン (v3.1.5+)
- **Celery**: 分散タスクキュー（プロバイダー経由）
- **OpenTelemetry**: オブザーバビリティ/トレーシング (v1.27.0+)

**フロントエンド (TypeScript/React)**
- **React**: UIフレームワーク
- **TypeScript**: 型安全なJS
- **Vite**: ビルドツール
- **ESLint/Prettier**: リンター/フォーマッター
- **OpenAPI生成**: API クライアント自動生成

**Go SDK**
- Go言語によるクライアントSDK
- Justfile によるタスクランナー
- mockery によるモック生成

### ビルドシステム

- **Hatchling**: Python パッケージビルド
- **uv**: 高速パッケージマネージャー
- **prek**: pre-commit hooks 管理ツール

### CI/CD (GitHub Actions)

29個のワークフローファイルによる包括的なCI/CDパイプライン：

| ワークフロー | 用途 |
|-------------|------|
| `ci-amd-arm.yml` | メインCI（AMD64/ARM64マルチアーキテクチャ） |
| `run-unit-tests.yml` | ユニットテスト実行 |
| `test-providers.yml` | プロバイダーテスト |
| `helm-tests.yml` | Helmチャートテスト |
| `k8s-tests.yml` | Kubernetesテスト |
| `ui-e2e-tests.yml` | UI E2Eテスト |
| `airflow-e2e-tests.yml` | Airflow E2Eテスト |
| `codeql-analysis.yml` | セキュリティ分析 |
| `generate-constraints.yml` | 依存関係制約生成 |
| `publish-docs-to-s3.yml` | ドキュメント公開 |
| `release_dockerhub_image.yml` | DockerHub公開 |

**CI特徴:**
- AMD64/ARM64 マルチアーキテクチャビルド
- 選択的テスト実行（変更ファイルに基づく）
- 並列テスト実行
- Docker イメージキャッシュ
- 複数Pythonバージョン対応 (3.10, 3.11, 3.12, 3.13)

### 開発環境

- **Breeze**: Airflow専用開発ツール（Docker/docker-compose ベース）
- **devcontainer**: VS Code/GitHub Codespaces 対応
- **Gitpod**: クラウド開発環境対応

## フォルダ構造

```
airflow/
├── airflow-core/           # コアパッケージ
│   ├── src/airflow/        # メインソースコード
│   │   ├── api_fastapi/    # FastAPI ベース REST API
│   │   ├── ui/             # React フロントエンド
│   │   └── ...
│   └── tests/              # テスト（unit/integration/system）
├── task-sdk/               # タスクSDK（独立パッケージ）
├── providers/              # 80+ プロバイダー（外部連携）
│   ├── amazon/
│   ├── google/
│   ├── microsoft/
│   └── ...
├── chart/                  # Helm チャート
├── clients/                # クライアントSDK
│   └── python/
├── go-sdk/                 # Go SDK
├── docs/                   # ドキュメント
├── dev/                    # 開発ツール
│   └── breeze/             # Breeze開発環境ツール
├── contributing-docs/      # コントリビュートガイド（21章構成）
├── scripts/                # CI/ビルドスクリプト
└── .github/
    ├── workflows/          # 29個のGitHub Actions
    └── ISSUE_TEMPLATE/     # 7種類のIssueテンプレート
```

## ドキュメント・コミュニティ

### README構成

- ライセンス・PyPI・Docker・コミュニティバッジ
- ビルドステータス（main/3.x/2.x）
- プロジェクト概要と原則
- 目次（doctoc自動生成）
- インストール方法
- セマンティックバージョニング説明
- Python/Kubernetesバージョンサポート
- コントリビューション案内
- スポンサー情報

### コントリビューションガイド

**21章構成の包括的ガイド** (`contributing-docs/`):

1. プロジェクト内の役割
2. コミュニケーション方法
3. クイックスタート（初心者向け/一般向け）
4. コントリビュート方法
5. プルリクエスト
6. 開発環境
7. ローカルvirtualenv
8. 静的コードチェック
9. テスト
10. Gitワークフロー
11. ドキュメントビルド
12. プロバイダーディストリビューション
13. 依存関係とextras
14. メタデータDB更新
15. Node環境セットアップ
16. APIエンドポイント追加
17. アーキテクチャ図
18. コントリビューションワークフロー
19. Execution APIバージョニング
20. Airflowコンポーネントデバッグ
21. Keycloakクライアント設定

### ドキュメント

- **公式ドキュメント**: https://airflow.apache.org/docs/
- **Read the Docs設定**: `.readthedocs.yml`
- **docs/配下**: Sphinxベースドキュメント
- **S3へのドキュメント公開**: GitHub Actions経由

## 品質管理

### テスト

**テスト構成:**
- `airflow-core/tests/unit/`: ユニットテスト
- `airflow-core/tests/integration/`: 統合テスト
- `airflow-core/tests/system/`: システムテスト
- `kubernetes-tests/`: Kubernetesテスト
- `helm-tests/`: Helmチャートテスト
- `docker-tests/`: Dockerイメージテスト
- `airflow-e2e-tests/`: E2Eテスト
- `ui-e2e-tests/`: UIのE2Eテスト

**テストフレームワーク:**
- pytest
- pytest-asyncio
- time-machine（時間モック）

**カバレッジ:**
- Codecov統合
- 65-90%のカバレッジレンジ
- main + 多数のstableブランチ監視
- パッチ単位のカバレッジチェック

### Linter/Formatter

**pre-commit hooks** (`.pre-commit-config.yaml`):

| ツール | 用途 |
|--------|------|
| `insert-license` | ライセンスヘッダー挿入（SQL/RST/CSS/JS/TS/Shell等） |
| `doctoc` | Markdown/RST目次自動生成 |
| `blacken-docs` | ドキュメント内Pythonコードのフォーマット |
| `check-merge-conflict` | マージコンフリクトチェック |
| `yamllint` | YAML構文チェック |
| `flynt` | f-string変換 |
| `codespell` | スペルチェック |
| `zizmor` | GitHub Actions構文チェック |
| `ruff` | Python高速リンター（ESLint相当） |
| `eslint` | TypeScript/JSリンター |
| `prettier` | フロントエンドコードフォーマット |

### 型チェック

- **Python**: mypy（`dev/airflow_mypy/`配下に設定）
- **TypeScript**: tsc（UI用）
- **Pydantic v2**: ランタイム型バリデーション

## リリース・配布

### バージョニング

- **SemVer**: セマンティックバージョニング採用
- **現行バージョン**: 3.2.0（2026年1月時点）
- **ブランチ戦略**: main + v3-x-stable/v3-x-test, v2-x-stable/v2-x-test

### パッケージ公開

| 配布先 | パッケージ名 |
|--------|-------------|
| PyPI | apache-airflow, apache-airflow-core, apache-airflow-task-sdk |
| PyPI | apache-airflow-providers-* (80+プロバイダー) |
| DockerHub | apache/airflow |
| Artifact Hub | apache-airflow (Helm chart) |

### リリース自動化

- **GitHub Releases**: タグベースリリース
- **専用リリースドキュメント**:
  - `README_RELEASE_AIRFLOW.md`
  - `README_RELEASE_PROVIDERS.md`
  - `README_RELEASE_HELM_CHART.md`
  - `README_RELEASE_PYTHON_CLIENT.md`
  - `README_RELEASE_AIRFLOWCTL.md`

### 制約ファイル

- `constraints/`配下に依存関係制約
- CI で自動生成 (`generate-constraints.yml`)

## プロジェクト運営

### Issue/PRテンプレート

**7種類のIssueテンプレート** (`.github/ISSUE_TEMPLATE/`):
1. `1-airflow_bug_report.yml`: Airflowバグ報告
2. `2-feature_request.yml`: 機能リクエスト
3. `3-airflow_providers_bug_report.yml`: プロバイダーバグ報告
4. `4-airflow_helmchart_bug_report.yml`: Helmチャートバグ報告
5. `5-airflow_doc_issue_report.yml`: ドキュメント問題報告
6. `6-free_form.yml`: 自由形式
7. `config.yml`: テンプレート設定

**PRテンプレート**: `.github/PULL_REQUEST_TEMPLATE.md`

### ラベル運用

- `affected_version:*`: 影響バージョン（2.0〜3.1, main_branch）
- `AIP-*`: Airflow Improvement Proposal（設計ドキュメント）

### ブランチ戦略

- `main`: 開発ブランチ
- `v3-x-stable`: 3.xリリースブランチ
- `v3-x-test`: 3.xテストブランチ
- `v2-x-stable`: 2.xリリースブランチ（LTS）
- `providers-*/v*`: プロバイダー専用ブランチ

### セキュリティ

- **SECURITY.md**: 脆弱性報告ガイドライン
- **報告先**: security@airflow.apache.org
- **Dependabot**: pip/npm依存関係の自動更新
- **CodeQL**: セキュリティスキャン

### ガバナンス

- **GOVERNANCE.md**: ASF PMC準拠のガバナンス
- **COMMITTERS.rst**: コミッター/メンテナー選出プロセス
- **CODE_OF_CONDUCT.md**: ASF行動規範への参照

## ライセンス・法務

- **LICENSE**: Apache License 2.0
- **NOTICE**: Apache Software Foundation著作権表示
- **ライセンスヘッダー**: 全ソースファイルに挿入（pre-commitで強制）
- **CLA**: Apache CLAが必要

## OSSとして参考になるポイント

### 真似したい点

1. **圧倒的に詳細なコントリビューションガイド**: 21章構成で初心者から上級者まで網羅
2. **多層的なテスト戦略**: unit/integration/system/e2e/Helm/k8s/UIと全レイヤーをカバー
3. **豊富なIssueテンプレート**: 7種類のテンプレートで報告品質を担保
4. **pre-commit hooks の徹底**: ライセンスヘッダー、目次自動生成、スペルチェック等
5. **マルチアーキテクチャCI**: AMD64/ARM64両対応のビルド
6. **選択的テスト実行**: 変更ファイルに応じたテスト最適化
7. **プロバイダーの分離**: 80+のプロバイダーを独立パッケージとして管理
8. **Breeze開発ツール**: プロジェクト専用の開発環境ツール
9. **AIP (Airflow Improvement Proposal)**: 設計ドキュメントによる意思決定
10. **複数SDKの提供**: Python API + Go SDK

### 改善できそうな点

1. **リポジトリサイズ**: 非常に大きく、クローンに時間がかかる
2. **複雑な依存関係**: 80+プロバイダーの管理は複雑
3. **ドキュメント分散**: docs/, contributing-docs/, dev/など複数箇所に分散

### 自分のOSSに活かせること

1. **段階的なコントリビューションガイド**: 初心者向け(`03a_contributors_quick_start_beginners.rst`)と一般向けを分ける
2. **Issueテンプレートのカテゴリ分け**: バグ/機能/ドキュメントで分類
3. **pre-commit でのライセンスヘッダー自動挿入**: `insert-license` hookの活用
4. **doctocによる目次自動生成**: Markdown/RSTの可読性向上
5. **Codecovの詳細設定**: ブランチ別・パッチ別のカバレッジ監視
6. **選択的CIの実装**: 変更ファイルに応じたテスト最適化でCI時間短縮
7. **GOVERNANCE.md**: プロジェクトのガバナンス方針の明文化
8. **COMMITTERS.rst**: メンテナー選出プロセスの透明化
