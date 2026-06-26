# CBFMS — Client

> Part of the **Cloud-Based Financial Market Strategy Builder (CBFMS)** thesis project.
> B.Sc. Computer Science — Sadjad University of Technology · Grade: 19.5 / 20

## Overview

The CBFMS client is a **Vue 3 + Quasar SPA** implementing a visual no-code strategy builder for financial markets. Non-expert investors compose algorithmic trading strategies using a node-based visual flowchart canvas, view live candlestick charts, and subscribe to email alerts — without writing any code.

The interface is grounded in three HCI principles:
- **Cognitive load reduction** (Sweller 1988) — implementation syntax is fully abstracted
- **Direct manipulation** (Shneiderman 1983) — strategy logic expressed as a visual flow graph
- **Progressive disclosure** (Norman 2013) — indicators reveal parameters on demand

## Key Features

- **Visual flowchart builder** (Vue Flow) — strategy nodes connected by edges, no code required
- **Candlestick charts** (KlineCharts + ApexCharts + TradingView widgets) — live price data
- **Client-side ML** (TensorFlow.js) — on-device signal processing and pattern detection
- **Market data** via Polygon.io API
- **Persistent state** with Pinia + pinia-plugin-persistedstate

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Vue 3 + Quasar 2 |
| Visual strategy builder | Vue Flow (`@vue-flow/core`) |
| Candlestick charts | KlineCharts + ApexCharts + trading-vue-js |
| Market data widgets | vue-tradingview-widgets |
| Market data API | Polygon.io (`@polygon.io/client-js`) |
| ML | TensorFlow.js |
| State management | Pinia + pinia-plugin-persistedstate |
| Build tool | Vite (`@quasar/app-vite`) |
| Package manager | Yarn |

## Related Repositories

| Repo | Role |
|------|------|
| [algo-processor/](../algo-processor/) | Strategy execution engine |
| [user-profile/](../user-profile/) | Auth, strategy persistence, notification preferences |
| [docs/](../docs/) | System design docs + CHI 2026 paper |

## Academic Paper

> **Shafiee, S.** (2024). *CBFMS: A Visual No-Code Strategy Builder for Financial Markets — Reducing Cognitive Load for Non-Expert Investors.* Prepared for ACM CHI 2026.
