# CBFMS — Algorithm Processor

> Part of the **Cloud-Based Financial Market Strategy Builder (CBFMS)** thesis project.
> B.Sc. Computer Science — Sadjad University of Technology · Grade: 19.5 / 20

## Overview

The Algorithm Processor is the execution engine of CBFMS. It receives trading strategy definitions — encoded as directed acyclic graphs (DAGs) of indicator nodes and condition edges — and evaluates them continuously against live market data. When a user-defined condition fires, it triggers the notification pipeline.

Strategies are never stored as code. They are structured JSON objects authored by the CBFMS client, evaluated here, and surfaced as plain-English email alerts — keeping the entire system code-free from the user's perspective.

## Responsibilities

- Parse and validate strategy DAGs from the frontend
- Compute technical indicators (RSI, EMA, MACD, Bollinger Bands, etc.) against OHLCV streams
- Evaluate trigger conditions on configurable polling intervals (1 min to 1 day)
- Emit notification events to the email dispatch layer

## Tech Stack

| Layer | Tech |
|-------|------|
| Runtime | Node.js |
| Market data | REST + WebSocket |
| Strategy format | JSON DAG |
| Communication | REST API |

## Related Repositories

| Repo | Role |
|------|------|
| [client](../client) | React SPA — visual strategy builder UI |
| [userProfile](../userProfile) | Auth, strategy persistence, notification preferences |
| [Documentation](../Documentation) | System design docs + CHI 2026 paper |

## Academic Paper

> **Shafiee, S.** (2024). *CBFMS: A Visual No-Code Strategy Builder for Financial Markets — Reducing Cognitive Load for Non-Expert Investors.* Prepared for ACM CHI 2026.
