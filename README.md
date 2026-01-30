# OSS Insights

人気OSSリポジトリの技術スタック・設計パターンを分析し、自分のOSS開発に活かすためのナレッジベースです。

## サイト構成

```
src/content/docs/
├── index.mdx           # トップページ
├── frontend/           # フロントエンドフレームワーク (React, Vue, Angular等)
├── backend/            # バックエンドフレームワーク (Express, FastAPI等)
├── cli/                # CLIツール、開発者向けツール
├── infra/              # Infrastructure (Docker, Kubernetes, Terraform等)
└── summary/            # 比較表、まとめ
```

## 開発

```bash
# 依存関係インストール
npm install

# 開発サーバー起動 (http://localhost:4321)
npm run dev

# ビルド
npm run build
```

## デプロイ

Vercelに接続し、mainブランチへのpushで自動デプロイされます。

## 分析ファイルの追加

`/analyze-oss-repo` skillで生成されたMarkdownファイルを適切なカテゴリディレクトリに配置してください。

ファイルには以下のfrontmatterが必要です：

```yaml
---
title: リポジトリ名
description: 簡単な説明
---
```
