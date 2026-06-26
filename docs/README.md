# CBFMS — Documentation

> **Cloud-Based Financial Market Strategy Builder**
> B.Sc. Computer Science Thesis — Sadjad University of Technology · Grade: 19.5 / 20
> **Shahab Shafiee** · shahabs789@gmail.com

---

## What is CBFMS?

CBFMS is a cloud-based web application that enables **non-expert investors** to compose, deploy, and monitor algorithmic trading strategies through a **visual no-code interface** — without writing any code.

Users drag technical indicators onto a live candlestick chart, define trigger conditions using a plain-English sentence builder, and receive email alerts when their strategy fires.

---

## Academic Paper

**[Read the CHI 2026 paper →](./PAPER.md)**

> **Shafiee, S.** (2024). *CBFMS: A Visual No-Code Strategy Builder for Financial Markets — Reducing Cognitive Load for Non-Expert Investors.* Prepared for ACM CHI 2026.

Key HCI contributions:
- Design framework grounded in Cognitive Load Theory (Sweller 1988)
- Cognitive Dimensions analysis (Green & Petre 1996) of the visual notation
- End-user programming principles applied to FinTech
- Design guidelines for chart-first financial interfaces

---

## System Architecture

```
+--------------------------------------------------+
|  client (React SPA)                              |
|  Candlestick Chart | Indicator Library | Composer |
+------------------------+-------------------------+
                         | Strategy JSON DAG
          +--------------+---------------+
          |                              |
+------------------+         +--------------------+
| algoProcessor    |         | userProfile        |
| Strategy eval    |<--------| Auth + persistence |
| Indicator compute|         | Notification prefs |
| Condition trigger|         +--------------------+
+--------+---------+
         | Email alert
         v
      User inbox
```

---

## Repositories

| Repo | Role |
|------|------|
| [client](../client) | React SPA — visual strategy builder UI |
| [algoProcessor](../algoProcessor) | Node.js strategy execution engine |
| [userProfile](../userProfile) | Auth, persistence, notification preferences |
| [Documentation](../Documentation) | This repo — design docs + CHI 2026 paper |

---

## Design Goals

| Goal | HCI Principle |
|------|--------------|
| G1 — Minimize extraneous cognitive load | Sweller (1988) — CLT |
| G2 — Preserve chart as primary mental model | Hutchins et al. (1985) |
| G3 — Progressive disclosure | Norman (2013) |
| G4 — Immediate, reversible feedback | Shneiderman (1983) |
