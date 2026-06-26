# CBFMS: A Visual No-Code Strategy Builder for Financial Markets — Reducing Cognitive Load for Non-Expert Investors

**Shahab Shafiee**  
Department of Computer Science, Sadjad University of Technology  
Mashhad, Iran  
shahabs789@gmail.com

---

## Abstract

Algorithmic trading has demonstrated significant advantages in financial markets, yet its adoption among non-expert investors remains limited due to prohibitive cognitive and technical barriers. Existing platforms such as TradingView Pine Script and MetaTrader MQL require proficiency in domain-specific programming languages, imposing high extraneous cognitive load that suppresses strategy formulation for users without formal programming backgrounds. We present **CBFMS** (Cloud-Based Financial Market Strategy Builder), a web-based visual no-code environment that enables non-programmers to compose and deploy algorithmic trading strategies through direct manipulation of chart-overlaid components. Drawing on cognitive load theory, end-user programming principles, and direct manipulation paradigms, CBFMS decouples strategic intent from implementation syntax. We describe the design of CBFMS, the HCI principles that motivated each design decision, and a set of design guidelines for visual financial interfaces derived from our implementation experience. The system demonstrates that applying cognitive science principles to FinTech interface design can substantially lower the barriers to algorithmic trading for non-expert users — without sacrificing the expressiveness required for meaningful strategy construction.

**Author Keywords:** visual programming; cognitive load; financial markets; no-code; end-user programming; direct manipulation; strategy builder; HCI; FinTech

**ACM CCS Concepts:**
- Human-computer interaction → Visual languages; Interaction paradigms → Direct manipulation
- Information systems → Financial trading systems
- Software and its engineering → End-user programming

---

## 1. Introduction

Financial markets represent one of the most complex information environments individuals interact with regularly. Beyond raw data volume, the domain demands simultaneous reasoning across multiple time scales, indicator relationships, risk parameters, and probabilistic outcomes — a quintessential high cognitive load task [Sweller 1988]. Despite growing retail participation in global markets, the tools available to non-expert investors reflect a fundamental HCI failure: they were designed by and for domain experts, not the broader population of users who increasingly depend on them.

Algorithmic trading — the practice of encoding trading logic as executable rules that operate autonomously — offers clear benefits: elimination of emotional decision-making, consistent execution, and the ability to backtest strategies on historical data. Yet its adoption among non-professionals is strikingly low. The barrier is not motivational. Surveys consistently show that retail investors understand the conceptual value of automated strategies [Ko et al. 2011]. The barrier is cognitive and technical: building even a simple strategy requires mastering a programming language, a domain-specific API, and a mental model that conflates interface and implementation.

Existing solutions fall into two unsatisfying categories. Professional platforms (MetaTrader, NinjaTrader) expose full programming environments — powerful but inaccessible. Consumer applications (Robinhood, eToro) remove automation entirely, offering only manual trading. Neither serves the non-expert investor who understands market logic but cannot code.

We address this gap with **CBFMS**, a cloud-based visual strategy builder grounded in three HCI principles: (1) *cognitive load reduction* through abstraction of implementation syntax [Sweller 1988]; (2) *direct manipulation* of chart-overlaid strategy components [Shneiderman 1983]; and (3) *progressive disclosure* that supports both novice and intermediate users [Norman 2013]. Users interact with a candlestick chart as their primary workspace, dragging indicators from a library panel, composing trigger conditions through a visual logic editor, and subscribing to email alerts when their strategy fires — all without writing a single line of code.

This paper makes three contributions:

1. **A design framework** for visual financial strategy builders grounded in cognitive load theory and end-user programming research.
2. **The CBFMS system**, a fully implemented cloud-based no-code trading strategy builder.
3. **Design guidelines** for visual FinTech interfaces, derived from applying HCI principles to the financial strategy domain.

---

## 2. Related Work

### 2.1 Cognitive Load Theory

Cognitive load theory (CLT), introduced by Sweller [1988], distinguishes three components of mental effort during learning and problem-solving: *intrinsic load* (inherent task complexity), *extraneous load* (unnecessary complexity introduced by poor interface design), and *germane load* (productive effort directed toward schema formation). The central prescriptive claim of CLT is that well-designed systems minimize extraneous load, leaving cognitive resources available for intrinsic processing [Paas et al. 2003].

In the context of algorithmic trading, the intrinsic load is already high — users must reason about indicator logic, market conditions, and risk simultaneously. Code-based tools dramatically increase extraneous load by requiring users to also manage syntax, API documentation, and debugging workflows. CBFMS is explicitly designed to minimize extraneous load: all implementation details are abstracted behind visual components, leaving users free to focus on strategy logic.

Miller's [1956] foundational work on working memory capacity (7 ± 2 chunks) informs our indicator panel design — the library is organized into semantic categories of ≤ 7 items, reducing visual search load. These principles have been validated in interface design contexts ranging from programming education [Green and Petre 1996] to medical software [Norman 2013].

### 2.2 Visual Programming Languages

Visual programming languages (VPLs) represent programming constructs through graphical rather than textual notations. Myers [1990] provided an early taxonomy distinguishing systems by their primary representation: dataflow, constraint-based, form-based, and direct-manipulation paradigms. CBFMS falls primarily in the direct-manipulation and dataflow categories — indicators are placed on a canvas (direct manipulation) and connected through logical operators (dataflow).

Green and Petre's [1996] Cognitive Dimensions (CD) framework provides a structured vocabulary for evaluating visual notations across dimensions including *visibility* (can the user see relevant state?), *hidden dependencies* (are non-obvious relationships exposed?), and *error-proneness* (does the notation invite mistakes?). We apply the CD framework to analyze CBFMS in Section 4.1 and use it to motivate specific design decisions. For instance, our real-time chart overlay — which renders strategy triggers as colored regions directly on the price chart — directly addresses the CD dimension of *closeness of mapping*, ensuring that the visual representation is spatially consistent with the user's mental model of price movement.

### 2.3 End-User Programming

Ko et al. [2011] define end-user programming (EUP) as programming performed by people whose primary goal is not software development but task accomplishment. Scaffidi, Shaw, and Myers [2005] estimated that over 55 million Americans engage in some form of EUP — dwarfing the professional developer population by an order of magnitude. Nardi [1993] argued that the key to successful EUP is designing systems that meet users at the boundary of their existing domain expertise, rather than requiring them to acquire programming expertise as a prerequisite.

CBFMS is fundamentally an EUP system for the finance domain. Our target users are domain experts (they understand RSI, moving averages, Bollinger Bands) but not programming experts. This framing shapes every design decision: indicators are named using financial vocabulary, not variable names; conditions are expressed as market predicates ("RSI crosses above 30"), not Boolean expressions; and the notification system uses email — a medium users already manage — rather than webhooks or API callbacks.

### 2.4 Direct Manipulation

Shneiderman [1983] identified three defining properties of direct manipulation interfaces: continuous representation of the objects of interest, physical actions rather than syntax, and rapid, incremental, reversible operations. These properties collectively reduce the *gulf of execution* — the gap between what a user wants to do and how to express it to the system — as theorized by Hutchins, Hollan, and Norman [1985].

Chart-based financial applications are natural candidates for direct manipulation: the primary object of interest (the price chart) is always visible, and user intent (place indicator on chart) maps naturally to physical actions (drag and drop). CBFMS extends this foundation by ensuring that all strategy authoring operations are reversible (indicators can be removed or reconfigured), incremental (strategies can be built one indicator at a time), and immediately reflected in the chart view.

### 2.5 HCI in Financial Interfaces

Financial interfaces occupy a distinctive position in HCI research: they combine high information density, high decision stakes, and heterogeneous user expertise. Tversky and Kahneman [1974] documented systematic cognitive biases — anchoring, availability, loss aversion — that affect financial decision-making. Interface design cannot eliminate these biases, but it can structure information presentation to reduce their influence [Norman 2013].

Information overload is a persistent challenge in trading interfaces. Professional platforms often display dozens of simultaneous indicators, each drawing on limited attentional resources. Research on dashboard design consistently demonstrates that reducing the number of simultaneously visible elements improves decision quality [Miller 1956]. CBFMS addresses this through progressive disclosure: the indicator library is hidden by default, and only the indicators a user has explicitly added are rendered on the chart.

---

## 3. CBFMS System Design

The CBFMS system is the primary contribution of this paper. We describe its design goals, architecture, and interface in detail, with explicit traceability from each design decision to its HCI motivation.

### 3.1 Design Goals

Our design process began with a requirements analysis grounded in HCI theory. Four primary design goals emerged:

- **G1 — Minimize Extraneous Cognitive Load:** Abstract all implementation syntax (loops, conditionals, variable declarations) behind visual components. Users should never encounter code.
- **G2 — Preserve Mental Model Integrity:** The chart is the user's primary mental model of the market. All strategy components should be rendered *on* the chart, not in separate panels.
- **G3 — Enable Progressive Disclosure:** Support incremental strategy construction. A user should be able to add one indicator and immediately see its effect, without committing to a complete strategy structure.
- **G4 — Provide Immediate, Reversible Feedback:** Every action (add indicator, set parameter, define condition) should produce an immediate visual response. Every action should be undoable.

These goals map directly to established HCI frameworks: G1 corresponds to CLT's extraneous load reduction [Sweller 1988]; G2 to the CD dimension of closeness of mapping [Green and Petre 1996]; G3 to progressive disclosure as theorized by Norman [2013]; and G4 to direct manipulation principles [Shneiderman 1983].

### 3.2 System Architecture

CBFMS is a cloud-based web application with four principal components:

**Frontend (React SPA):** A single-page application implementing the visual strategy builder canvas. The candlestick chart is rendered via a high-performance charting library; indicator overlays are composited on top. The drag-and-drop indicator library occupies a collapsible side panel. The condition composer appears as a floating modal anchored to indicator components on the chart.

**Algorithm Processor (Node.js microservice):** Receives strategy definitions as structured JSON (not code) and evaluates them against streaming market data. Strategies are represented as directed acyclic graphs of indicator nodes and condition edges, enabling efficient incremental re-evaluation.

**User Profile Service:** Manages authentication, strategy persistence, and notification preferences. Users can save, name, and share strategy templates.

**Notification Engine:** Polls the algorithm processor on a configurable schedule (1-minute to daily granularity). When a strategy's trigger condition evaluates to true, the engine dispatches an email notification containing the asset, triggered condition, and current price context.

This architecture cleanly separates strategy *authoring* (frontend) from strategy *execution* (algorithm processor), enabling the visual interface to evolve independently of execution semantics.

### 3.3 Visual Strategy Builder Interface

The primary workspace is a full-width candlestick chart displaying the selected asset at the user's chosen time granularity (1m to 1W). Three interaction zones surround the chart:

**Indicator Library Panel (left):** Contains 24 indicators organized into four semantic categories: Trend (MA, EMA, MACD), Momentum (RSI, Stochastic, CCI), Volatility (Bollinger Bands, ATR, Standard Deviation), and Volume (OBV, VWAP). Each indicator is represented by a named tile with a one-line description. Dragging a tile onto the chart instantiates the indicator with default parameters and renders it as an overlay.

The four-category organization reflects Miller's [1956] working memory constraint: each category contains ≤ 7 items, ensuring the panel can be scanned without exceeding typical chunk-processing capacity. Category labels use financial vocabulary ("Momentum," "Volatility") rather than mathematical vocabulary ("Oscillators," "Derivatives") to align with the user's existing domain schema — a direct application of Nardi's [1993] EUP principle of meeting users at their domain boundary.

**Parameter Panel (right, contextual):** Appears when a user selects an indicator on the chart. Exposes configurable parameters (period length, source price, color) as labeled sliders and dropdowns. Changes propagate immediately to the chart overlay, providing direct feedback (G4). This panel implements the CD principle of *immediate feedback* and reduces the *viscosity* of parameter adjustment — a key friction point in code-based tools where changing a single parameter requires locating, editing, and re-executing a line of code.

**Condition Composer (modal):** Triggered by clicking the "Set Alert" button on any indicator. Presents a visual sentence builder: `[Indicator A] [operator] [Indicator B or value]`. Operators are expressed in market language ("crosses above," "is greater than," "stays below for N candles"). The composed condition is displayed as a plain-English summary beneath the chart, giving users an auditable record of their strategy logic in terms they can reason about.

This three-panel layout was validated through paper prototype testing with five participants prior to implementation. Initial designs placed the condition composer in a separate screen; feedback confirmed that separating the chart from the condition builder violated G2 — users lost their spatial reference to the chart when defining conditions. The modal-on-chart design emerged from this iteration, directly motivated by Hutchins et al.'s [1985] principle of minimizing the gulf of evaluation between action and feedback.

### 3.4 Algorithm Notification System

Once a user has composed a strategy (one or more conditions), they subscribe to email notifications via a toggle in the condition composer. The notification engine evaluates the strategy against new market data at the configured polling interval and sends an alert email when the condition fires.

The email template includes: asset name and current price, the triggered condition expressed in plain English (not code), a screenshot of the chart at the moment of trigger, and a direct link back to the strategy in CBFMS. This design ensures that the notification itself is actionable without requiring the user to re-establish context upon returning to the application — directly addressing the attention management concerns raised by Tversky and Kahneman [1974] regarding reactive financial decisions.

The plain-English condition rendering in the email deserves emphasis as a design decision. A code-based system would deliver a notification such as `RSI(14) < 30 AND Close > EMA(50)`. CBFMS renders this as *"RSI (14-period) dropped below 30 while the price is above the 50-day moving average."* This preserves the user's ability to reason about why the alert fired without requiring them to decode a formula — an application of G1 (minimize extraneous load) to the post-interaction phase of the user journey.

---

## 4. Discussion

### 4.1 Design Analysis via Cognitive Dimensions

The Cognitive Dimensions framework [Green and Petre 1996] provides a structured lens for evaluating CBFMS's visual notation beyond the four goals stated in §3.1.

**Closeness of mapping** — the degree to which the notation resembles the domain it represents — is high in CBFMS. Indicators are rendered directly on the price chart, exactly where a financial analyst would mentally place them. This contrasts sharply with code-based tools, where a Moving Average is an abstract function call with no spatial relationship to the chart it describes.

**Viscosity** — the resistance of a notation to change — is substantially reduced. Modifying an indicator's period in Pine Script requires identifying the correct variable in code, changing its value, and re-executing the script. In CBFMS, the same change is a slider drag with immediate visual feedback. This reduction in viscosity is particularly consequential for strategy refinement — the iterative process of adjusting parameters to fit a market hypothesis — which is the primary workflow of non-expert investors.

**Error-proneness** is reduced by eliminating the syntactic surface entirely. The most common error category in Pine Script for novice users — syntax errors that produce no output, offering no feedback about what went wrong — is architecturally impossible in CBFMS. All user actions produce valid strategy representations by construction.

**Hidden dependencies** remain a partial concern: when a user changes the period of an indicator that appears in a saved condition, the condition silently updates. This is correct behavior, but the dependency is non-obvious. Future iterations should surface such relationships explicitly through visual highlighting when parameter changes would affect existing conditions.

### 4.2 The Expressiveness-Simplicity Tradeoff

The fundamental tension in no-code system design is that the same abstraction that lowers barriers for novices imposes a ceiling on expert expressiveness. This tradeoff is well-documented in the VPL literature [Myers 1990; Green and Petre 1996] and does not have a universal resolution. CBFMS's current design optimizes for the novice end of the spectrum — a deliberate choice given the target population.

The expressiveness ceiling manifests concretely: users cannot currently express multi-asset correlation conditions ("alert when BTC moves but only if ETH is also rising") or time-of-day constraints ("only trigger between 9:30–11:00 AM"). These are meaningful omissions for intermediate investors.

A productive direction for future work is an *escape hatch* — a code view that exposes the strategy as executable Python or Pine Script, allowing users to transition from visual authoring to programmatic refinement as their expertise grows. This mirrors the approach taken by successful EUP environments such as Excel, which exposes formulas as a stepping stone toward VBA macros [Nardi 1993]. The visual representation would function as a learning scaffold: users build strategies visually until they are comfortable enough with the underlying logic to extend it in code.

### 4.3 Mental Model Alignment as a Design Principle

A central design decision — using the chart as the primary authoring canvas rather than a separate form or programming environment — deserves articulation as a transferable design principle for FinTech HCI.

Financial traders, regardless of expertise level, develop strong spatial mental models of price history. The chart is not a representation of the market for these users; it *is* their model of the market. When strategy authoring is separated from the chart (as in code editors, spreadsheet-based tools, or form-driven strategy builders), users must maintain two separate mental models simultaneously: the chart's spatial representation and the tool's abstract representation. This dual-model burden imposes exactly the kind of extraneous cognitive load [Sweller 1988] that suppresses strategy reasoning.

By situating all authoring affordances within the chart workspace, CBFMS reduces the gulf of execution [Hutchins et al. 1985] not by building a better interface to an abstract representation, but by eliminating the abstraction gap entirely. The principle generalizes: for any FinTech application where users have established spatial mental models (portfolio allocation charts, risk heatmaps, order flow visualizations), situating interaction affordances *within* those visualizations should be the default design choice rather than the exception.

---

## 5. Limitations and Future Work

The current CBFMS implementation carries several limitations that scope future work.

**Expressiveness ceiling.** As discussed in §4.2, the no-code paradigm constrains strategy complexity. Multi-asset conditions, time-based constraints, and custom indicator arithmetic are not currently expressible. An escape hatch to a code view is the most direct mitigation.

**Mobile support.** CBFMS is designed for desktop browsers. Retail investors increasingly interact with financial applications on smartphones, and touch-based direct manipulation of chart overlays introduces interaction design challenges — particularly for fine-grained operations like dragging indicators to specific price levels — that are not addressed in this work.

**Condition discoverability.** Paper prototype testing revealed that the "Set Alert" button, the entry point to the condition composer, was not sufficiently salient. Several testers attempted to right-click on indicators (a learned behavior from other chart applications) expecting a context menu. This affordance gap should be addressed through onboarding flows, visual treatment (e.g., a highlighted indicator state on first use), or surface-level interaction hints.

**Real-time execution.** The current notification engine polls at configurable intervals rather than subscribing to a real-time market data stream. For high-frequency strategies (sub-minute conditions), this polling architecture introduces latency that may render alerts stale by the time they are delivered. A WebSocket-based execution layer is planned.

Future extensions under active development include:

- **LLM-powered natural language interface:** Users describe strategies in plain English; an LLM translates intent to the CBFMS visual representation. This would further lower barriers while preserving the visual verification affordance — users can inspect and correct the translated strategy before activating it.
- **Collaborative strategy editing:** Shared workspaces enabling strategy co-construction, relevant to investment clubs and educational settings.
- **Integrated backtesting:** Embedding historical performance simulation directly in the canvas, enabling users to evaluate strategy logic on historical data before deployment.

---

## 6. Conclusion

CBFMS demonstrates that the principles developed in the HCI literature on cognitive load, visual programming, and end-user programming translate meaningfully to the FinTech domain. By grounding every design decision in an explicit HCI framework — and by treating the user's pre-existing mental model of the chart as a first-class design artifact — we built a no-code strategy builder that removes the primary barriers to algorithmic trading for non-expert investors without sacrificing the conceptual expressiveness required for genuine strategy construction.

The broader contribution of this work is not the system itself but the design framework that produced it: ground FinTech interface design in cognitive science; distinguish carefully between intrinsic complexity (market logic, which cannot be simplified away) and extraneous complexity (syntax and abstraction gaps, which can and should be eliminated); and design interaction affordances to be spatially continuous with the user's existing domain representation. We believe this framework is directly generalizable to other high-stakes, expert-domain applications — healthcare dashboards, scientific instruments, engineering simulations — where non-expert users are currently excluded by unnecessarily high technical barriers imposed by tools designed without HCI principles in mind.

---

## References

[1] Blackwell, A. F., & Green, T. R. G. (2003). Notational systems — the cognitive dimensions of notations framework. In J. M. Carroll (Ed.), *HCI Models, Theories, and Frameworks: Toward a Multidisciplinary Science* (pp. 103–134). Morgan Kaufmann.

[2] Burnett, M. M. (2001). Visual programming. In J. G. Webster (Ed.), *Encyclopedia of Electrical and Electronics Engineering*. John Wiley & Sons.

[3] Green, T. R. G., & Petre, M. (1996). Usability analysis of visual programming environments: A 'cognitive dimensions' framework. *Journal of Visual Languages & Computing*, 7(2), 131–174.

[4] Hutchins, E. L., Hollan, J. D., & Norman, D. A. (1985). Direct manipulation interfaces. *Human–Computer Interaction*, 1(4), 311–338.

[5] Ko, A. J., Abraham, R., Beckwith, L., Blackwell, A., Burnett, M., Erwig, M., Scaffidi, C., Lawrance, J., Lieberman, H., Myers, B., Rosson, M. B., Rothermel, G., Shaw, M., & Wiedenbeck, S. (2011). The state of the art in end-user software engineering. *ACM Computing Surveys*, 43(3), Article 21, 1–44.

[6] Miller, G. A. (1956). The magical number seven, plus or minus two: Some limits on our capacity for processing information. *Psychological Review*, 63(2), 81–97.

[7] Myers, B. A. (1990). Taxonomies of visual programming and program visualization. *Journal of Visual Languages & Computing*, 1(1), 97–123.

[8] Nardi, B. A. (1993). *A Small Matter of Programming: Perspectives on End User Computing*. MIT Press.

[9] Norman, D. A. (2013). *The Design of Everyday Things* (Revised and Expanded Edition). Basic Books.

[10] Norman, D. A. (1983). Some observations on mental models. In D. Gentner & A. L. Stevens (Eds.), *Mental Models* (pp. 7–14). Lawrence Erlbaum Associates.

[11] Paas, F., Renkl, A., & Sweller, J. (2003). Cognitive load theory and instructional design: Recent developments. *Educational Psychologist*, 38(1), 1–4.

[12] Scaffidi, C., Shaw, M., & Myers, B. (2005). Estimating the numbers of end users and end user programmers. In *Proceedings of the 2005 IEEE Symposium on Visual Languages and Human-Centric Computing (VL/HCC)* (pp. 207–214). IEEE.

[13] Shneiderman, B. (1983). Direct manipulation: A step beyond programming languages. *Computer*, 16(8), 57–69.

[14] Sweller, J. (1988). Cognitive load during problem solving: Effects on learning. *Cognitive Science*, 12(2), 257–285.

[15] Sweller, J. (1994). Cognitive load theory, learning difficulty, and instructional design. *Learning and Instruction*, 4(4), 295–312.

[16] Tversky, A., & Kahneman, D. (1974). Judgment under uncertainty: Heuristics and biases. *Science*, 185(4157), 1124–1131.

[17] Waszkowski, R. (2019). Low-code platform for automating business processes in manufacturing. *IFAC-PapersOnLine*, 52(10), 376–381.

---

*Manuscript prepared for submission to ACM CHI 2026. Word count: ~6,100 words.*
