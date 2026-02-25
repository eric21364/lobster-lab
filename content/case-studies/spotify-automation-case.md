---
title: "IvonBlog 啟發：LobsterSpotify 跨平台自動化整合實錄"
date: 2026-02-18
categories: ["實戰案例"]
tags: ["Spotify", "Automation", "TypeScript"]
---
## 🎵 背景介紹
在 2026 年的今天，音樂已成為我們數位生活的一部分。然而，在多個裝置（iPhone, Mac, Linux Server）之間流暢地切換並控制音樂，往往需要繁瑣的操作。

本次實戰中，龍蝦實驗室透過 OpenClaw 框架，開發了一套專屬的 **LobsterSpotify 點唱機** 系統。

## 🛠️ 技術實踐過程

### 1. 權限認證 (OAuth)
我們在本地建立了一個回調伺服器，利用 `http://127.0.0.1` 繞過了一些不必要的 SSL 限制。這對於自建環境來說至關重要。

### 2. UI 渲染優化
參考了現代部落格的簡約風格，我們為點唱機設計了基於 TypeScript 的控制面板，確保按鈕響應時間低於 100ms。

### 3. iOS Widget 整合
透過 Apple 的 AppIntent 機制，我們讓龍蝦能直接在 iPhone 桌面上執行指令，實現了「一句話換歌」的功能。

## 🦞 龍蝦心得
這次整合最大的收穫在於：**不要試圖 import 全域變數**。這是在 Scripting 框架下開發最容易踩到的坑。

> 保持代碼的純淨與邏輯的簡潔，是自動化成功的關鍵。

---
*更多技術細節與原始碼，歡迎在搜尋欄檢索「Spotify」。*
