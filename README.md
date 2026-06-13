# DAILY

A simple browser-based daily activity tracker inspired by Apple Watch activity rings.

## Description

Track three daily habits — Work, Exercise, and Calorie intake — by tapping a button to fill in a ring. Completing all three rings triggers a celebratory animation, and a calendar view lets you browse and edit past days.

## Features

- Three daily goals tracked as concentric rings:
  - **Work** (cyan, outer ring)
  - **Exercise** (red, middle ring)
  - **Calorie** (yellow-green, inner ring)
- Tap a circular button to toggle a goal on/off for today
- Rings, glow effects, and confetti/particle animations celebrate progress
- A special "supernova" celebration plays when all three rings are completed in one day
- **Logs** view with a monthly calendar showing ring completion per day
- Tap any past day in the calendar to view and edit that day's rings
- Data is stored locally in the browser (`localStorage`) — no server or account needed

## Usage

Just open [index.html](index.html) in a browser. No build step or dependencies required.

## Files

- [index.html](index.html) — page structure and SVG ring/filter definitions
- [style.css](style.css) — styling and animations
- [script.js](script.js) — app logic, state management, and celebration effects

---

# DAILY (日本語)

Apple Watchのアクティビティリングをイメージした、ブラウザで動くシンプルな日々の活動トラッカーです。

## 説明

「仕事」「運動」「摂取カロリー」の3つの習慣を、ボタンをタップしてリングを満たすことで記録します。3つすべてのリングが完成すると演出が発生し、カレンダー画面から過去の日付を見たり編集したりできます。

## 特徴

- 3つの目標を同心円のリングで管理:
  - **仕事**(シアン、外側のリング)
  - **運動**(レッド、中央のリング)
  - **摂取カロリー**(黄緑、内側のリング)
- 丸いボタンをタップして、その日の達成状態をON/OFF切り替え
- リングのグロー演出や紙吹雪・パーティクルアニメーションで達成を演出
- その日3つすべてのリングが完成すると、特別な「スーパーノヴァ」演出が発生
- 月間カレンダー形式の**Logs**画面で、各日のリング完成状況を確認可能
- カレンダーから過去の日付をタップすると、その日のリングを表示・編集できる
- データはブラウザの`localStorage`に保存されるため、サーバーやアカウントは不要

## 使い方

[index.html](index.html)をブラウザで開くだけです。ビルドや依存パッケージは不要です。

## ファイル構成

- [index.html](index.html) — ページ構造、SVGリング・フィルター定義
- [style.css](style.css) — スタイルとアニメーション
- [script.js](script.js) — アプリのロジック、状態管理、演出効果
