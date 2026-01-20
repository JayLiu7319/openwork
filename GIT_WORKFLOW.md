# Git 工作流程说明

本项目 fork 自上游仓库 `different-ai/openwork`，用于独立开发和维护自定义功能。

## 远程仓库配置

- **upstream**（上游）：`https://github.com/different-ai/openwork.git` - 原始项目仓库
- **origin**（个人远程）：`https://github.com/JayLiu7319/openwork.git` - 个人 fork 仓库

## 分支结构

- `my-dev` - 个人主开发分支，用于合并所有功能特性
- `feat/*` - 功能开发分支（如 `feat/i18n`、`feat/xxx`）
- `fix/*` - 问题修复分支
- `chore/*` - 日常维护分支

## 开发流程

### 1. 开发新功能
```bash
git checkout my-dev
git checkout -b feat/功能名称
# 开发、测试、提交
git push origin feat/功能名称
```

### 2. 合并功能到主分支
```bash
git checkout my-dev
git merge feat/功能名称
git push origin my-dev
```

### 3. 同步上游更新
```bash
git fetch upstream
git checkout my-dev
git merge upstream/dev
git push origin my-dev
```

## 注意事项

- 所有新功能开发都从 `my-dev` 分支创建
- 定期从 `upstream/dev` 同步上游更新，保持代码最新
- 每个功能使用独立的 feature 分支，完成后合并到 `my-dev`
- 推送代码到 `origin`（个人仓库），而非 `upstream`（上游仓库）
