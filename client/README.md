# CBFMS — Client

> Part of the **Cloud-Based Financial Market Strategy Builder (CBFMS)** thesis project.
> B.Sc. Computer Science — Sadjad University of Technology · Grade: 19.5 / 20

## Overview

The CBFMS client is a React SPA implementing a **visual no-code strategy builder** for financial markets. Non-expert investors compose algorithmic trading strategies by dragging indicators onto a candlestick chart, defining trigger conditions via a plain-English sentence builder, and subscribing to email alerts — without writing any code.

The interface is grounded in three HCI principles:
- **Cognitive load reduction** (Sweller 1988) — implementation syntax is fully abstracted
- **Direct manipulation** (Shneiderman 1983) — all authoring happens on the chart canvas
- **Progressive disclosure** (Norman 2013) — indicators reveal parameters on demand

## Interface Layout

| Zone | Function |
|------|----------|
| Candlestick chart (center) | Primary authoring canvas — indicators render as overlays |
| Indicator library (left) | 24 indicators in 4 semantic categories; drag-to-add |
| Parameter panel (right, contextual) | Sliders/dropdowns for period, source, color — live preview |
| Condition composer (modal) | Visual sentence builder: [Indicator A] [operator] [value] |

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | React (SPA) |
| Charting | High-performance OHLCV canvas library |
| Styling | CSS modules |

## Related Repositories

| Repo | Role |
|------|------|
| [algoProcessor](../algoProcessor) | Strategy execution engine |
| [userProfile](../userProfile) | Auth, strategy persistence, notification preferences |
| [Documentation](../Documentation) | System design docs + CHI 2026 paper |

## Academic Paper

> **Shafiee, S.** (2024). *CBFMS: A Visual No-Code Strategy Builder for Financial Markets — Reducing Cognitive Load for Non-Expert Investors.* Prepared for ACM CHI 2026.
