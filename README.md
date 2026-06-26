# CBFMS — Cloud-Based Financial Market Strategy Builder

> **B.Sc. Computer Science Thesis** — Sadjad University of Technology · Grade: **19.5 / 20**
> **Shahab Shafiee** · shahabs789@gmail.com

---

## Overview

CBFMS enables **non-expert investors** to compose, deploy, and monitor algorithmic trading strategies through a **visual no-code interface** — without writing any code.

Users drag technical indicators (RSI, EMA, MACD, Bollinger Bands) onto a live candlestick chart, define trigger conditions via a plain-English sentence builder, and receive email alerts when their strategy fires.

The system is grounded in three HCI principles: **cognitive load reduction**, **direct manipulation**, and **progressive disclosure**.

---

## Academic Paper

**[Read the full CHI 2026 paper →](./PAPER.md)**

> **Shafiee, S.** (2024). *CBFMS: A Visual No-Code Strategy Builder for Financial Markets — Reducing Cognitive Load for Non-Expert Investors.* Prepared for ACM CHI 2026.

Key contributions:
- Design framework grounded in Cognitive Load Theory (Sweller 1988)
- Cognitive Dimensions analysis of the visual notation (Green & Petre 1996)
- End-user programming principles applied to FinTech
- Design guidelines for chart-first financial interfaces

---

## Repository Structure

| Directory | Description |
|-----------|-------------|
| [client/](./client/) | React SPA — visual strategy builder canvas + indicator library |
| [algo-processor/](./algo-processor/) | Node.js engine — evaluates strategy DAGs against live market data |
| [user-profile/](./user-profile/) | Auth, strategy persistence, notification preferences |
| [docs/](./docs/) | Original project documentation |

---

## System Architecture

```
+--------------------------------------------------+
|  client/  (React SPA)                            |
|  Candlestick Chart | Indicator Library | Composer |
+------------------------+-------------------------+
                         | Strategy JSON DAG
          +--------------+---------------+
          |                              |
+--------------------+       +----------------------+
| algo-processor/    |       | user-profile/        |
| Strategy evaluation|<------| Auth + persistence   |
| Indicator compute  |       | Notification prefs   |
| Condition trigger  |       +----------------------+
+--------+-----------+
         | Email alert
         v
      User inbox
```

---

## Design Goals

| Goal | HCI Principle |
|------|--------------|
| G1 — Minimize extraneous cognitive load | Sweller (1988) — Cognitive Load Theory |
| G2 — Preserve chart as primary mental model | Hutchins, Hollan & Norman (1985) |
| G3 — Progressive disclosure | Norman (2013) |
| G4 — Immediate, reversible feedback | Shneiderman (1983) — Direct Manipulation |

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React SPA |
| Backend | Node.js microservices |
| Strategy format | JSON DAG (no code exposed to users) |
| Notifications | Email dispatch on strategy trigger |
| Deployment | Cloud-hosted |
