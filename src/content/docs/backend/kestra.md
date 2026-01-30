---
title: Kestra
description: kestra-io/kestra の技術スタック・設計パターン分析
---

## 基本情報

| 項目 | 値 |
|------|-----|
| リポジトリ | [kestra-io/kestra](https://github.com/kestra-io/kestra) |
| スター数 | 26,294 |
| フォーク数 | 2,477 |
| 言語 | Java |
| ライセンス | Apache-2.0 |
| 作成日 | 2019-08-24 |
| デフォルトブランチ | develop |

## 概要

Kestraは、ミッションクリティカルなアプリケーション向けの**イベント駆動オーケストレーション＆スケジューリングプラットフォーム**です。Infrastructure as Codeのベストプラクティスを取り入れ、YAMLベースでワークフローを定義できます。

**主な特徴:**
- Event-Driven & Scheduled Workflows
- Declarative YAML Interface
- Rich Plugin Ecosystem
- Intuitive UI & Code Editor
- High Availability対応

## 技術スタック

### 言語

| 言語 | バイト数 | 割合 |
|------|---------|------|
| Java | 6,847,949 | 71.9% |
| Vue | 1,780,618 | 18.7% |
| TypeScript | 669,014 | 7.0% |
| JavaScript | 109,765 | 1.2% |
| SCSS | 66,215 | 0.7% |
| その他 | 61,683 | 0.5% |

### フレームワーク・ライブラリ

**Backend (Java):**
- **Micronaut** - メインフレームワーク（DI、Web、Testing）
- **Gradle** - ビルドツール（マルチモジュール構成）
- **Shadow Plugin** - Fat JAR作成
- **Lombok** - ボイラープレート削減
- **JaCoCo** - コードカバレッジ
- **SonarQube** - 静的解析

**Frontend (Vue.js):**
- **Vue 3** (v3.5.27) - UIフレームワーク
- **Pinia** (v3.0.4) - 状態管理
- **Vue Router** (v4.6.4) - ルーティング
- **Element Plus** (v2.13.1) - UIコンポーネント
- **Vue Flow** - フローチャート描画
- **Vite (Rolldown)** - ビルドツール
- **Vitest** - テストフレームワーク
- **Playwright** - E2Eテスト
- **Storybook** - コンポーネントカタログ

**データベース:**
- PostgreSQL（本番推奨）
- MySQL
- H2（開発用）

### CI/CD (GitHub Actions)

| ワークフロー | 目的 |
|-------------|------|
| `main-build.yml` | develop/releaseブランチのビルド・テスト・デプロイ |
| `pull-request.yml` | PRのテスト実行（変更ファイルに応じて分岐） |
| `release-docker.yml` | Dockerイメージのリリース |
| `pre-release.yml` | プレリリース処理 |
| `codeql-analysis.yml` | セキュリティ静的解析 |
| `vulnerabilities-check.yml` | 脆弱性チェック |
| `codespell.yml` | スペルチェック |
| `e2e-scheduling.yml` | E2Eスケジューリングテスト |

**特徴的な設計:**
- **再利用可能ワークフロー**: `kestra-io/actions`リポジトリで共通ワークフローを管理
- **ファイル変更検知**: `dorny/paths-filter`でUI/Backend変更を検知し、必要なテストのみ実行
- **EEトリガー連携**: OSSのCI完了時にEnterprise Editionのワークフローを自動トリガー

### 開発環境

**Docker Compose:**
- PostgreSQL + Kestra の構成を提供
- 開発・テスト用途に最適化

**DevContainer:**
- VSCode向けの開発コンテナ設定
- Dockerfile + devcontainer.json で環境統一

**Gitpod:**
- `.gitpod.yml` でクラウド開発環境をサポート

**必要な開発環境:**
- Java 25+
- Node 22+ / npm 10+
- Python 3（テスト用）
- Docker & Docker Compose

## フォルダ構造

```
kestra/
├── cli/                    # CLIアプリケーション（エントリポイント）
├── core/                   # コアロジック
├── model/                  # データモデル
├── processor/              # プロセッサ実装
├── webserver/              # Webサーバー
├── executor/               # 実行エンジン
├── scheduler/              # スケジューラ
├── worker/                 # ワーカー
├── script/                 # スクリプト実行
├── jdbc/                   # JDBC共通
├── jdbc-h2/                # H2データベース実装
├── jdbc-mysql/             # MySQL実装
├── jdbc-postgres/          # PostgreSQL実装
├── repository-memory/      # インメモリリポジトリ
├── runner-memory/          # インメモリランナー
├── storage-local/          # ローカルストレージ
├── platform/               # BOM（Bill of Materials）
├── tests/                  # 統合テスト
├── ui/                     # Vue.js フロントエンド
├── jmh-benchmarks/         # パフォーマンスベンチマーク
├── docker/                 # Docker関連設定
├── dev-tools/              # 開発ツール
└── .github/                # GitHub設定
```

**Gradleマルチモジュール構成:**
- 機能ごとにモジュール分離
- `platform`モジュールでBOM管理
- 各DBごとに独立モジュール（jdbc-h2, jdbc-mysql, jdbc-postgres）

## ドキュメント・コミュニティ

### README構成

- ロゴ・バナー画像
- バッジ（バージョン、ライセンス、スター）
- ソーシャルリンク（Twitter、LinkedIn、YouTube）
- 受賞バッジ（Trendshift、Product Hunt）
- デモ動画へのリンク
- 機能説明（Key Features）
- Quick Start（Docker、AWS CloudFormation、GCP Terraform）
- プラグインエコシステム説明

### コントリビューションガイド

**`.github/CONTRIBUTING.md`の内容:**
- Code of Conductへの言及
- Legal Notice（著作権に関する同意）
- バグ報告のガイドライン
- セキュリティ問題の報告方法（hello@kestra.io）
- 機能要望の方法
- 開発環境セットアップ手順（Backend/Frontend別）
- IntelliJ IDEA設定のスクリーンショット付き説明

### ドキュメント

- **公式ドキュメントサイト**: [kestra.io/docs](https://kestra.io/docs)
- **インストールガイド**: Docker、Kubernetes、AWS、GCP、Azure対応
- **プラグインドキュメント**: [kestra.io/plugins](https://kestra.io/plugins)

## 品質管理

### テスト

**Backend:**
- JUnit 5
- Micronaut Test
- JaCoCo（カバレッジ目標: 70%）
- SonarQube連携

**Frontend:**
- Vitest（ユニットテスト）
- Storybook + Vitest（コンポーネントテスト）
- Playwright（E2Eテスト）
- Codecov連携

**Codecov設定:**
- モジュールごとのカバレッジ管理
- プロジェクト目標: 70%、パッチ目標: 75%
- UIは現時点でカバレッジ対象外

### Linter/Formatter

**Backend:**
- EditorConfig（インデント、文字コード統一）
- Codespell（スペルチェック）

**Frontend:**
- ESLint（Flat Config形式）
- Prettier
- husky + lint-staged（pre-commit）
- TypeScript ESLint

**ESLint設定の特徴:**
- Vue 3 + TypeScript対応
- 厳格なVueスタイルガイド（`flat/strongly-recommended`）
- コンポーネント命名規則（PascalCase）
- Script Setup推奨（特定ディレクトリ）

### 型チェック

- **Frontend**: TypeScript + vue-tsc
- **Backend**: Javaの型システム + Lombok

## リリース・配布

### バージョニング

- **セマンティックバージョニング採用**: v1.2.2, v1.1.15, v0.23.26 など
- **複数メジャーバージョンの並行保守**: v1.0.x, v0.22.x, v0.23.x
- **バックポート対応**: 顧客リクエストに応じて最大2つ前のマイナーバージョンまで

### パッケージ公開

- **Docker Hub**: `kestra/kestra`
- **Maven Central**: `io.kestra`グループ
- GPG署名によるセキュアな公開

### リリース自動化

- `net.researchgate.release` Gradleプラグイン
- GitHub Releasesでリリースノート管理
- Dockerイメージの自動ビルド・プッシュ
- EE版との連携リリース

## プロジェクト運営

### Issue/PRテンプレート

**Issueテンプレート:**
- `bug.yml` - バグ報告（YAML形式）
- `feature.yml` - 機能要望
- `config.yml` - テンプレート設定

**PRテンプレート:**
- Description（何を変更したか）
- Related Issue（GitHub Keywords推奨）
- Frontend Checklist（ビルド、E2E、スクリーンショット）
- Backend Checklist（コンパイル、テスト）
- Additional Notes
- AI Authors向けの注意（猫ジョークを含める）

### ラベル運用

| カテゴリ | ラベル例 |
|---------|---------|
| エリア | `area/backend`, `area/frontend`, `area/devops`, `area/plugin`, `area/docs` |
| 種別 | `kind/blocker`, `kind/breaking-change`, `kind/security`, `kind/quick-win` |
| コントリビュータ | `good first issue`, `kind/external` |
| 管理 | `kind/do-not-merge`, `kind/backport-needed` |

### ブランチ戦略

- **デフォルトブランチ**: `develop`
- **リリースブランチ**: `releases/*`
- **フォークベースの開発**: 外部コントリビュータはフォークから

### セキュリティ

**SECURITY.md:**
- サポート対象バージョンの明示（latest + 2つ前まで）
- 報告先: security@kestra.io
- 2営業日以内の応答確約
- 責任ある開示へのクレジット付与

**セキュリティ対策:**
- Dependabot（週次・水曜日8:00 パリ時間）
- CodeQL Analysis
- OWASP Dependency Check

**Dependabot設定の特徴:**
- GitHub Actions、Gradle、NPM別管理
- グループ化（build、types、storybook、vitest等）
- 特定パッケージの除外ルール（Protobuf 4.x等）

## OSSとして参考になるポイント

### 真似したい点

1. **再利用可能なGitHub Actionsワークフロー**
   - 別リポジトリ（`kestra-io/actions`）で共通ワークフローを管理
   - OSS版とEE版でのワークフロー共有

2. **ファイル変更に応じたテスト最適化**
   - `paths-filter`を使ってUI/Backend変更を検知
   - 必要なテストのみ実行でCI時間短縮

3. **Dependabotのグループ化設定**
   - 関連パッケージをグループ化してPR数を削減
   - update-types（major/minor/patch）での細かな制御

4. **PRテンプレートのチェックリスト形式**
   - Frontend/Backend別のチェックリスト
   - 自動クローズ条件の明示

5. **Codecovのモジュール別カバレッジ管理**
   - component_managementで細かく設定
   - キャリーフォワードで一時的なカバレッジ低下を許容

### 改善できそうな点

1. **CHANGELOGファイルが見当たらない**
   - GitHub Releasesのみでの変更履歴管理
   - Keep a Changelog形式があると便利

2. **UIのテストカバレッジ**
   - 現時点でUIはカバレッジ対象外（成熟度の問題）
   - 段階的なカバレッジ計測の導入が望ましい

3. **ドキュメントのリポジトリ内管理**
   - docs/ディレクトリがリポジトリ内にない
   - 外部サイト（kestra.io）での管理

### 自分のOSSに活かせること

1. **マルチモジュールGradle構成**
   - 機能ごとの明確な分離
   - BOM（platform）モジュールによる依存管理

2. **開発環境の多様なサポート**
   - Docker Compose、DevContainer、Gitpod対応
   - CONTRIBUTINGでの詳細なセットアップ手順

3. **セキュリティ報告の仕組み**
   - SECURITY.mdでの明確なプロセス定義
   - 応答時間の確約

4. **OSS/EE連携のCI設計**
   - repository-dispatchによるクロスリポジトリトリガー
   - 共通ワークフローの抽出

5. **PRの品質管理**
   - テンプレートでの明確な期待値設定
   - AI貢献者への対応（猫ジョークで人間性チェック）
