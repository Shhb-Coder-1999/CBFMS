# CBFMS — User Profile Service

> Part of the **Cloud-Based Financial Market Strategy Builder (CBFMS)** thesis project.
> B.Sc. Computer Science — Sadjad University of Technology · Grade: 19.5 / 20

## Overview

The User Profile Service manages all user-scoped state in CBFMS: authentication, saved strategies, and notification preferences. It acts as the persistence layer between the client SPA and the algorithm processor.

## Responsibilities

- User registration and authentication
- CRUD for saved trading strategies (stored as JSON DAGs)
- Notification subscription management (asset, strategy, polling interval, email)
- Strategy template sharing between users

## Data Model

```
User
 +-- id, email, created_at
 +-- strategies[]
      +-- id, name, asset, timeframe
      +-- nodes[]    (Vue Flow nodes — indicator components)
      +-- edges[]    (Vue Flow edges — condition links)
      +-- notification  (enabled, interval, last_fired)
```

## Related Repositories

| Repo | Role |
|------|------|
| [client/](../client/) | Vue 3 + Quasar SPA — visual strategy builder |
| [algo-processor/](../algo-processor/) | Strategy execution engine |
| [docs/](../docs/) | System design docs + CHI 2026 paper |

## Academic Paper

> **Shafiee, S.** (2024). *CBFMS: A Visual No-Code Strategy Builder for Financial Markets — Reducing Cognitive Load for Non-Expert Investors.* Prepared for ACM CHI 2026.
> [Read the paper](../PAPER.md)
