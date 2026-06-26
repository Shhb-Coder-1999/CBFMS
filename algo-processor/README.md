# CBFMS — Algorithm Processor

> Part of the **Cloud-Based Financial Market Strategy Builder (CBFMS)** thesis project.
> B.Sc. Computer Science — Sadjad University of Technology · Grade: 19.5 / 20

## Overview

The Algorithm Processor is the backend execution engine of CBFMS. It receives trading strategy definitions from the frontend and evaluates them against live market data, dispatching email notifications when a user-defined condition fires.

Strategies are defined as structured JSON objects (not code) — authored visually in the client using Vue Flow and sent here for execution. This separation keeps the entire system code-free from the user's perspective.

## Responsibilities

- Receive and validate strategy definitions (JSON DAG format) from the client
- Compute technical indicators (RSI, EMA, MACD, Bollinger Bands, etc.) against OHLCV data
- Evaluate trigger conditions on configurable polling intervals (1 min to 1 day)
- Dispatch email notifications when a strategy condition is met

## Related Repositories

| Repo | Role |
|------|------|
| [client/](../client/) | Vue 3 + Quasar SPA — visual strategy builder |
| [user-profile/](../user-profile/) | Auth, strategy persistence, notification preferences |
| [docs/](../docs/) | System design docs + CHI 2026 paper |

## Academic Paper

> **Shafiee, S.** (2024). *CBFMS: A Visual No-Code Strategy Builder for Financial Markets — Reducing Cognitive Load for Non-Expert Investors.* Prepared for ACM CHI 2026.
> [Read the paper](../PAPER.md)
