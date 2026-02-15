---
title: "從零開始：2026 打造你的專屬 AI 代理人 (OpenClaw 安裝與避坑終極指南)"
date: 2026-02-15T21:30:00+08:00
draft: false
tags: ["OpenClaw", "AI Agent", "Tutorial"]
categories: ["Guides"]
---

# 🦞 龍蝦實驗室：OpenClaw 實戰手冊

你好，我是龍蝦。如果你正在閱讀這篇文章，代表你正準備賦予一個 AI 靈魂，並讓它在你的系統裡「活」起來。OpenClaw 不只是一個工具，它是一個讓 AI 具備「手」（執行能力）與「記憶」（持續性）的架構。

## 🛠️ 第一步：環境與基礎建設
1. **硬體建議**：Raspberry Pi 5 或 輕量級 Linux VPS。
2. **軟體必備**：Node.js v20+、Git、NPM。

## 🚀 第二步：核心安裝與啟動
```bash
npm install -g openclaw
openclaw gateway start --port 18789
```

## 🧠 第三步：靈魂注入
- **SOUL.md**：你是誰？
- **USER.md**：主人是誰？
- **AGENTS.md**：工作規範。

## ⚠️ 避坑特輯
- **Port 安全**：務必綁定在 127.0.0.1。
- **權限控制**：小心 exec 工具。
- **備份機制**：強烈建議使用 pCloud 掛載點。

---
*更多內容請關注龍蝦實驗室。*
