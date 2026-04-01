---
title: "Anatomy of the Claude Code Leak: What 512,000 Lines of TypeScript Reveal About Building Production AI Agents"
date: 2026-03-31
tag: "Agentic AI"
description: "A deep technical breakdown of the March 31, 2026 Claude Code source map leak -- architecture, security mechanisms, unreleased features, community reaction, and what it means for anyone building AI agents."
draft: false
---

# Anatomy of the Claude Code Leak: What 512,000 Lines of TypeScript Reveal About Building Production AI Agents

> **Prefer slides?** This article is also available as a 31-slide presentation (Chinese + English) with an interactive viewer:
> [View Slides →](https://johnson00111.github.io/claude-code-leak-analysis-report/?lang=en)

> Everyone assumed the competitive moat in AI coding tools was the model -- the "secret recipe." This leak revealed that the real differentiator is the harness around it: memory management, multi-agent coordination, prompt caching, and 23 layers of bash security. It's not the chef's secret ingredient. It's the kitchen's standard operating procedure.

---

## Table of Contents

1. [What Happened](#what-happened)
2. [What Is Claude Code, Technically?](#what-is-claude-code-technically)
3. [The Core Agent Loop](#the-core-agent-loop)
4. [Three-Layer Memory Architecture](#three-layer-memory-architecture)
5. [Prompt Lifecycle: From Input to Response](#prompt-lifecycle-from-input-to-response)
6. [Seven-Layer Architecture Overview](#seven-layer-architecture-overview)
7. [Layer-by-Layer Breakdown](#layer-by-layer-breakdown)
   - [Layer 1-2: UI + Core Agent Loop](#layer-1-2-ui--core-agent-loop)
   - [Layer 3: Tool System](#layer-3-tool-system)
   - [Layer 4: Memory & Context](#layer-4-memory--context)
   - [Layer 5: Services & Infrastructure](#layer-5-services--infrastructure)
8. [Security Deep Dives](#security-deep-dives)
   - [Bash Security: 23 Checks](#bash-security-23-checks)
   - [Undercover Mode](#undercover-mode)
   - [Anti-Distillation](#anti-distillation)
   - [Client Attestation](#client-attestation)
   - [Frustration Detection](#frustration-detection)
9. [Gated Features: The Unreleased Roadmap](#gated-features-the-unreleased-roadmap)
   - [KAIROS: Autonomous Daemon Mode](#kairos-autonomous-daemon-mode)
   - [autoDream: Memory Consolidation](#autodream-memory-consolidation)
   - [Voice, Buddy, and Computer Use](#voice-buddy-and-computer-use)
10. [Leaked Internal Intelligence](#leaked-internal-intelligence)
11. [Community Reaction](#community-reaction)
    - [Clean-Room Rewrite: The Legal Framework](#clean-room-rewrite-the-legal-framework)
    - [claw-code: Python Rewrite in One Night](#claw-code-python-rewrite-in-one-night)
    - [Kuberwastaken: Rust Clean-Room + Architecture Analysis](#kuberwastaken-rust-clean-room--architecture-analysis)
    - [PR #41568: Submitting a Rust Rewrite to Anthropic's Own Repo](#pr-41568-submitting-a-rust-rewrite-to-anthropics-own-repo)
12. [Impact Analysis](#impact-analysis)
    - [Why This Leak Matters: The Restaurant Analogy](#why-this-leak-matters-the-restaurant-analogy)
    - [Impact on Industry Competition](#impact-on-industry-competition)
    - [Impact on Developers and Security](#impact-on-developers-and-security)
13. [Leak Scope Summary](#leak-scope-summary)
14. [Technical Takeaways](#technical-takeaways)
15. [Sources](#sources)

---

## What Happened

On the morning of March 31, 2026, Anthropic published `@anthropic-ai/claude-code` version 2.1.88 to the npm registry. The package included a 59.8MB `.map` file -- a JavaScript source map that can reconstruct the original, unobfuscated source code from its minified form.

At 4:23 AM ET, security researcher Chaofan Shou discovered and disclosed the file. Within hours, the internet had archived 512,000 lines of TypeScript across 1,900 files. GitHub mirrors accumulated over 41,500 forks before Anthropic could respond.

Anthropic confirmed the incident the same day: *"This was a release packaging issue caused by human error, not a security breach. No sensitive customer data or credentials were involved or exposed."*

### Root Cause

The Bun bundler, which Claude Code uses, generates `.map` files by default. These files include a `sourcesContent` field that embeds all original source code. The team forgot to exclude `*.map` in their `.npmignore` file, so the source map was uploaded alongside the minified bundle on publish.

Adding to the irony: Bun bug [oven-sh/bun#28001](https://github.com/oven-sh/bun/issues/28001), filed on March 11, reports that source maps are served even in production builds. This may have been the underlying cause.

---

## What Is Claude Code, Technically?

Claude Code is Anthropic's CLI coding agent. From the outside, it looks like a polished terminal tool. From the inside, it's a full **agentic harness** -- a software layer wrapped around the Claude model that handles prompt construction, context management, tool permissions, multi-agent orchestration, memory, and security.

What leaked is the harness's complete source code (TypeScript + Bun + Ink TUI). **Model weights were not included.**

The harness is responsible for everything that makes Claude Code feel like more than a chatbot: it remembers your project state, runs tools on your behalf, manages parallel sub-agents, caches prompts to save money, and enforces 23 different security checks before executing any shell command.

---

## The Core Agent Loop

Every interaction with Claude Code follows the same loop:

**User Input → Context Assembly → Claude API Call → Response Parse → Tool Execution (if needed) → Loop Back**

Three systems drive this loop:

**QueryEngine** (46,000 lines) handles all LLM API calls, streaming, caching, and orchestration. It's the single largest component in the codebase.

**Coordinator Mode** uses prompt instructions (not code) to teach the model workflow discipline. The coordinator prompt literally tells Claude: *"Don't rubber-stamp weak work."* When enabled, Claude Code transforms from a single agent into a coordinator that spawns, directs, and manages multiple worker agents in parallel.

**Sub-agents** fork parallel tasks, sharing the parent cache for summarization, memory extraction, and background analysis. Each sub-agent operates independently but reports back to the coordinator.

---

## Three-Layer Memory Architecture

Context entropy -- where long-running AI sessions start to hallucinate or contradict themselves -- is one of the hardest problems in agentic AI. Claude Code solves it with a three-layer memory design:

**Layer 1: MEMORY.md (Pointer Index)**

A lightweight index loaded into every context window. Each line is roughly 150 characters -- think of it as a table of contents for the agent's brain. The model is instructed to treat memory entries as "hints" that must be verified against the actual codebase before acting on them.

**Layer 2: Session Memory (Structured Markdown)**

Per-session structured records covering: Session Title, Current State, Task Spec, Files Modified, Errors Encountered, Learnings, and Worklog. This is essentially how a human developer would keep coding notes.

**Layer 3: Context Optimization**

Dynamic deduplication and compaction. File-read dedup skips unchanged files. Oversized tool outputs get written to disk with only a preview kept in context. Auto-compaction triggers when context grows too large, summarizing older content to free up token budget.

At the bottom of this system sits **autoDream** -- a background sub-agent that performs memory consolidation while the user is idle, like the brain processing memories during sleep. More on this in the [Gated Features](#gated-features-the-unreleased-roadmap) section.

---

## Prompt Lifecycle: From Input to Response

When a user types a message, six stages fire in sequence:

1. **Context Building**: Load git branch, recent commits, and CLAUDE.md project config. Inject the MEMORY.md pointer index. Reuse cached static prompt segments.

2. **System Prompt Assembly**: Embed all ~40 tool definitions, add coordinator instructions and permission rules, and check against 14 known cache-break vectors.

3. **LLM API Call**: QueryEngine sends the assembled `messages[]` array. Streaming receives response tokens in real-time. The Ink terminal renderer uses an Int32Array char pool with bitmask styling for ~50x `stringWidth` reduction.

4. **Tool Execution Loop**: If `stop_reason === "tool_use"`, the requested tool call passes through 23 bash security checks. The tool executes, the result is appended to the conversation, and the loop returns to Step 3.

5. **Context Maintenance**: File-read dedup skips unchanged files. Oversized outputs write to disk with a preview. When token count crosses the auto-compaction threshold, older content gets summarized.

6. **Session Update**: Session memory markdown is updated with new errors, learnings, and worklog entries. Sub-agents can fork for background analysis.

---

## Seven-Layer Architecture Overview

The full Claude Code architecture can be organized into seven layers, each marked by how much was leaked versus how much remains gated behind feature flags:

| Layer | Key Components | Leaked? |
|---|---|---|
| 1. User Interface | CLI TUI, Slash commands, Keybindings, Voice*, Buddy* | ~65% |
| 2. Core Agent Loop | QueryEngine, Task, Coordinator, Sub-agents, ULTRAPLAN* | ~85% |
| 3. Tool System | ~40 tools, Bash security, Permission, Computer Use*, 17 unreleased* | ~70% |
| 4. Memory & Context | MEMORY.md, Session memory, Context dedup, Cache, autoDream* | ~80% |
| 5. Services & Infra | API client, Cost tracker, Telemetry, Hooks, Migrations | 100% |
| 6. Security & Defense | Undercover, Anti-distill, Client attestation, Bash security, Regex | 100% |
| 7. Gated Features | KAIROS*, GH webhooks*, Push notifs*, Cron*, Ant-only tools* | ~5% |

*Items marked with \* are gated behind feature flags and have their full implementation excluded via compile-time elimination.*

The pattern is clear: the core harness (Layers 1-6) was mostly exposed. Gated features (Layer 7) remain largely hidden -- only scaffolding and flag references are visible. Model weights were never part of the npm package.

---

## Layer-by-Layer Breakdown

### Layer 1-2: UI + Core Agent Loop

**Leaked components include:**

- **Ink TUI**: A 785KB `main.tsx` entry point with a custom React terminal renderer. The rendering optimizer uses `Int32Array` char pools and bitmask styling to achieve ~50x `stringWidth` reduction.
- **Slash commands**: Complete command definitions and handlers for `/review`, `/mcp`, and more.
- **QueryEngine**: 46,000 lines handling LLM API communication, streaming, caching, and orchestration.
- **Coordinator Mode**: Prompt-based workflow orchestration. The coordinator prompt instructs the model to spawn parallel workers and explicitly bans lazy delegation: *"Do NOT say 'based on your findings' -- read the actual findings and specify exactly what to do."*
- **System prompt builder**: The complete system prompt is embedded in the CLI binary. This was one of the most surprising discoveries -- the full prompt text is readable in the leaked source.

**Gated components include:**

- **Voice mode** (push-to-talk): Pro/Max subscription only.
- **Buddy companion** (Tamagotchi): A virtual pet in the terminal with 18 species, 6 rarity tiers, gacha mechanics, and RPG stats including DEBUGGING, PATIENCE, CHAOS, WISDOM, and SNARK.
- **ULTRAPLAN**: Offloads complex planning to a remote Cloud Container Runtime running Opus 4.6 for up to 30 minutes, then "teleports" the result back locally.

### Layer 3: Tool System

Around 40 tools are defined across 29,000 lines of code. Core tools include BashTool (command execution with 23 security checks), FileEditTool, FileReadTool (with dedup), GrepTool (dedicated search, not bash grep), GlobTool (file discovery), LSP Tool (call hierarchy / find refs), MCP Client (Model Context Protocol), and WebFetchTool.

Every tool passes through a permission gate before execution. The 23-step bash security pipeline is detailed in the [Security Deep Dives](#bash-security-23-checks) section below.

**Gated**: Computer Use ("Chicago") -- screenshots, mouse/keyboard input, coordinate transform via `@ant/computer-use-mcp`. Also 17 unreleased tools excluded via compile-time elimination.

### Layer 4: Memory & Context

Beyond the three-layer architecture described above, the leak revealed the **prompt cache mechanism** in detail:

- Static and dynamic content are separated by boundary markers. Static segments (tool definitions, coordinator instructions) are cached globally across sessions.
- `promptCacheBreakDetection.ts` tracks 14 different vectors that could invalidate cache.
- **Sticky latches** prevent mode toggles (like switching thinking mode) from unnecessarily breaking the prompt cache.
- A function literally named `DANGEROUS_uncachedSystemPromptSection()` serves as a developer warning that the content will break cache.

A particularly telling data-driven fix: `autoCompact.ts` had a bug where 1,279 sessions experienced 50+ consecutive compaction failures (the worst hitting 3,272 consecutive failures), collectively wasting approximately 250,000 API calls per day. The fix was three lines of code: `MAX_CONSECUTIVE_AUTOCOMPACT_FAILURES = 3`. The comment includes exact BigQuery dates and metrics from March 10, 2026.

### Layer 5: Services & Infrastructure

Fully leaked. Highlights include:

- **Cost tracker** (`modelCost.ts`): Contains exact pricing for all models, matching Anthropic's public pricing with no hidden discounts.
- **GrowthBook integration**: Remote feature flag control with hourly polling of `/api/claude_code/settings`. Six or more killswitches can remotely alter any user's behavior -- bypass permissions, fast mode, voice mode, analytics sink. Dangerous changes trigger a blocking dialog; if the user rejects, the app exits immediately.
- **Hooks system**: Lifecycle hooks for pre/post tool execution.
- **Migrations**: Schema and config migration logic for version upgrades.

---

## Security Deep Dives

All four security mechanisms were fully leaked. This is arguably the most sensitive part of the exposure.

### Bash Security: 23 Checks

BashTool enforces a 23-step security pipeline before executing any shell command. The checks fall into three categories:

**Command Blocking**: 18 blocked Zsh builtins to prevent permission bypass via shell built-ins. Defense against Zsh equals expansion (`=curl` expands to the full path of `curl`, bypassing the permission check). Interception of dangerous command patterns like `rm -rf /` and `chmod 777`.

**Injection Defense**: Detection of Unicode zero-width space injection (invisible characters hidden in commands). Prevention of IFS null-byte injection (command splitting via modified Internal Field Separator). Malformed token bypass defense discovered during a HackerOne security audit.

**Environment Defense**: PATH validation ensuring executed binaries come from trusted paths. Environment variable sanitization clearing variables that could affect subprocess behavior. Command chaining detection catching `&&`, `||`, and `;` attempts to bypass single-command review.

This is the most complete AI coding agent shell security model publicly documented. Most competitors only block obviously dangerous commands.

### Undercover Mode

When Anthropic employees (`USER_TYPE === 'ant'`) use Claude Code in public or open-source repositories, Undercover Mode activates automatically. The system prompt injected into Claude's context includes:

```
## UNDERCOVER MODE - CRITICAL
You are operating UNDERCOVER in a PUBLIC/OPEN-SOURCE repository.
NEVER include: model codenames, "Claude Code", AI mentions,
Co-Authored-By lines. Write commits as a human developer would.
```

Key design decisions: There is no force-OFF toggle -- only force-ON (`CLAUDE_CODE_UNDERCOVER=1`). It cannot be disabled. In external builds, the entire function is dead-code eliminated to trivial returns.

This sparked heated debate on Hacker News: should AI-written open-source contributions be labeled as AI-generated? Anthropic's position is that the feature prevents internal codename leaks, not that it's meant to impersonate humans.

### Anti-Distillation

Two mechanisms protect against model distillation (recording API traffic to train competing models):

**Mechanism 1: Fake Tools Injection.** The `ANTI_DISTILLATION_CC` compile-time flag adds `anti_distillation: ['fake_tools']` to API requests. The server silently injects fake tool definitions into the system prompt. If someone records API traffic to train their own model, the fake tools pollute their training data.

All four conditions must be true to trigger: (1) `ANTI_DISTILLATION_CC` flag, (2) CLI entrypoint, (3) first-party API, (4) GrowthBook flag enabled. Setting `CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS` or using a third-party provider bypasses it entirely.

**Mechanism 2: Connector-text Summarization.** The server summarizes assistant text between tool calls and applies a cryptographic signature. Subsequent turns can restore the original text from the signature, but anyone recording the traffic only gets summaries. This is limited to Anthropic internal users.

As Alex Kim noted in his analysis: anyone serious about distillation can figure out the bypass methods in about an hour. The real protection is legal, not technical.

### Client Attestation

A DRM-like mechanism for API calls. The `x-anthropic-billing-header` embeds a `cch=00000` placeholder (five zeros). Before the request leaves the process, Bun's Zig native HTTP layer -- operating below the JavaScript runtime -- overwrites these five bytes with a computed hash. The server validates the hash to confirm the request originates from a genuine Claude Code binary.

Design cleverness: the placeholder and hash are the same length, so the replacement doesn't change `Content-Length` and requires no buffer reallocation. The computation happens at the Zig layer, invisible to any JavaScript-level interceptor.

This connects directly to the OpenCode incident ten days earlier, when Anthropic sent a legal threat to a third-party tool that was accessing Opus at subscription rates via Claude Code's internal API. Client attestation is the technical enforcement behind that legal action.

Bypass: running the JS bundle on stock Bun or Node means the placeholder stays `00000` all the way to the server. A comment in the server-side `_parse_cc_header` mentions it "tolerates unknown extra fields," suggesting validation may be more lenient than expected.

### Frustration Detection

`userPromptKeywords.ts` defines a regex pattern to detect whether users are swearing or expressing frustration:

```regex
/\b(wtf|wth|ffs|omfg|shit(ty)?|dumbass|horrible|awful|
piss(ed|ing)? off|piece of (shit|crap)|what the (fuck|hell)|
fuck you|screw (this|you)|so frustrating|this sucks|damn it)\b/
```

The exact purpose isn't fully clear in the leaked code, but likely feeds telemetry (tracking user satisfaction) or adjusts the model's response tone to be more empathetic when frustration is detected.

This became one of the most discussed findings on Hacker News. As one commenter put it: an LLM company using regex for sentiment analysis is "peak irony." Others countered that regex is thousands of times faster than LLM inference and costs nothing -- sometimes regex is the right tool.

---

## Gated Features: The Unreleased Roadmap

108 feature-gated modules were identified in the leak. Their full implementations are excluded from external builds via compile-time elimination, but the scaffolding and flag references reveal Anthropic's product roadmap.

### KAIROS: Autonomous Daemon Mode

KAIROS (Ancient Greek for "at the right time") is referenced over 150 times in the codebase. It represents a fundamental shift from reactive (wait for user input) to proactive (act autonomously).

Architecture inferred from scaffolding:

- **Append-only logs**: Records observations, decisions, and actions daily.
- **`<tick>` prompt**: Receives periodic system ticks that trigger autonomous thinking and action.
- **5-minute cron refresh**: Continuously monitors project state changes.
- **GitHub webhook subscriptions**: Listens to PR, issue, and commit events.
- **Push notifications**: Proactively notifies users of important findings.
- **15-second blocking budget**: Any proactive action that would block the user's workflow for more than 15 seconds gets deferred.

KAIROS has its own exclusive tool set unavailable in regular Claude Code, including background session management and autoDream memory consolidation triggers.

The community consensus: this is more valuable than the code itself -- it's a leaked product roadmap.

### autoDream: Memory Consolidation

A background sub-agent that performs "memory consolidation" while the user is idle. The system prompt literally says: *"You are dreaming."*

The three-phase process:

1. **Gather Recent Signal**: Collect new information from daily logs, drifted memories, and transcript search.
2. **Consolidate**: Write or update memory files, convert relative dates to absolute dates, delete contradicted facts.
3. **Prune and Index**: Keep MEMORY.md under 200 lines / ~25KB, remove stale pointers, resolve conflicts.

Safety constraint: the dream sub-agent has read-only bash access only. It can view the project but cannot modify anything. When the user returns to the session, the agent's context has already been tidied and prepared.

### Voice, Buddy, and Computer Use

**Voice Mode**: Push-to-talk voice interface for Pro/Max subscribers. Full implementation exists in a `voice/` directory but is excluded from external builds.

**Buddy Companion**: A Tamagotchi-style virtual pet in the terminal. 18 species (Pebblecrab to Nebulynx) across 6 rarity tiers. A `Mulberry32` PRNG seeded with the user's ID hash ensures the same user always gets the same buddy. Shiny chance is 1%; Shiny Legendary probability is 0.01%. Each buddy has RPG stats: DEBUGGING, PATIENCE, CHAOS, WISDOM, and SNARK. An April 1-7 teaser window precedes a planned May 2026 full launch.

**Computer Use ("Chicago")**: Based on `@ant/computer-use-mcp` -- screenshots, mouse/keyboard input, and coordinate transformation. Max/Pro subscription only, with an ant bypass for internal users.

---

## Leaked Internal Intelligence

Beyond architecture, the leak exposed strategic internal data:

**Model Codenames**: Capybara (Claude 4.6 variant), Fennec (Opus 4.6), Numbat (unreleased, still in testing), Tengu (used in feature flag naming).

**Quality Metrics**: Capybara v4 had a 16.7% false claims rate. Capybara v8 regressed to 29-30%. An "assertiveness counterweight" prevents overly aggressive refactoring.

**Other details**:

- 44 feature flags, 20 of which are unshipped.
- `print.ts` is 5,594 lines long. One function spans 3,167 lines with 12 levels of nesting.
- Uses Axios as a dependency -- on the same day, Axios was hit by a supply-chain attack injecting a Remote Access Trojan (RAT). Users who installed Claude Code via npm between 00:21 and 03:29 UTC on March 31 may have been exposed.
- 187 spinner verbs (someone at Anthropic is having fun).
- GrowthBook remote control with 6+ killswitches capable of altering any user's behavior remotely.

---

## Community Reaction

The leak triggered an extraordinary chain of events within hours.

### Clean-Room Rewrite: The Legal Framework

Copyright protects **expression** (specific code), not **ideas** (architecture, algorithms, behavior). Translating TypeScript to Python or Rust without line-by-line copying constitutes new creative expression.

Legal precedents:

- **Phoenix Technologies v. IBM (1984)**: Clean-room BIOS reverse engineering is legal. One team reads source code to write behavioral specifications; a separate team implements from specifications alone, never seeing the original code.
- **Baker v. Selden (1879)**: Copyright protects expression, not ideas, methods, or behavior.
- **17 U.S.C. § 107 Fair Use**: Analysis and commentary on publicly available software is protected.

Practical effect: Anthropic issued DMCA takedowns against repos directly mirroring the original TypeScript source -- and they worked. But against language-translated rewrites like claw-code (Python) and Kuberwastaken (Rust), DMCA is ineffective.

Gergely Orosz (The Pragmatic Engineer) summarized it: the rewrite is DMCA-proof because it reproduces behavior, not expression.

A further complication: the DC Circuit ruled in 2025 that AI-generated works don't automatically receive copyright protection. If Claude Code was substantially written by Claude itself (which Anthropic's CEO has implied), the company's copyright claims become considerably murkier.

### claw-code: Python Rewrite in One Night

Korean developer Sigrid Jin (@instructkr) -- a WSJ-featured Claude Code power user who consumed 25 billion tokens last year -- was woken by notifications at 4 AM. His girlfriend worried he could face legal action from Anthropic just for having the code on his machine. So he sat down and rewrote the core architecture from scratch in Python before sunrise.

He used **oh-my-codex (OmX)**, a workflow layer built on OpenAI's Codex. `$team` mode handled parallel code review, while `$ralph` mode ran persistent execution loops with architect-level verification. The entire porting session -- from reading the original harness structure to producing a working Python tree with tests -- was driven through OmX orchestration.

The result, [claw-code](https://github.com/instructkr/claw-code), became the fastest GitHub repository in history to reach 30,000 stars (within hours of publication). As of this writing, it has 48,000+ stars and 56,000+ forks.

Current status: the Python workspace covers harness scaffolding (`main.py`, `query_engine.py`, `tools.py`, `commands.py`, `task.py`, `models.py`, `port_manifest.py`) but is not yet a complete 1:1 runtime replacement. A Rust rewrite is underway on the `dev/rust` branch.

### Kuberwastaken: Rust Clean-Room + Architecture Analysis

[Kuberwastaken's repository](https://github.com/Kuberwastaken/claude-code) follows a rigorous two-phase clean-room process:

**Phase 1 -- Specification**: An AI agent analyzed the leaked source and produced exhaustive behavioral specifications in a `spec/` directory. These cover architecture, data flows, tool contracts, and system designs. No source code was carried forward.

**Phase 2 -- Implementation**: A completely separate AI agent implemented from the specs alone, never referencing the original TypeScript. The output is idiomatic Rust that reproduces behavior, not expression -- exactly mirroring the Phoenix v. IBM precedent.

The Rust implementation (`src-rust/crates/`) is a multi-crate workspace covering cli, core, api, engine, tools, permissions, and config. It uses `ratatui` instead of React/Ink for the TUI, and native Rust async instead of Node.js streaming.

Beyond the code, Kuberwastaken's README contains what is currently the most detailed Claude Code architecture analysis online. Every major subsystem -- Buddy, KAIROS, autoDream, Coordinator, ULTRAPLAN -- is dissected individually. It was Kuberwastaken who first surfaced Undercover Mode's "Do not blow your cover" prompt, sparking the massive Hacker News discussion.

The irony was not lost: *"They built an entire Undercover Mode subsystem to prevent information leaks... then shipped the source in a .map file."*

Major media outlets (Decrypt, The Register, DEV Community) cited this repository as their primary analysis source.

### PR #41568: Submitting a Rust Rewrite to Anthropic's Own Repo

Perhaps the most audacious community response: a developer named mehmoodosman submitted [PR #41568](https://github.com/anthropics/claude-code/pull/41568) -- a complete Rust reimplementation as a 16-crate Cargo workspace -- directly to Anthropic's official `anthropics/claude-code` repository.

The PR includes: `claude-core`, `claude-api`, `claude-engine`, `claude-tools`, `claude-tui`, `claude-cli`, `claude-permissions`, and more. Full SSE streaming, tool orchestration loop, and ratatui TUI, all targeting the main branch.

Current status: **Open** (not merged, not closed).

### Anthropic's Response and the Irreversible Reality

Anthropic issued DMCA takedowns against direct mirrors, with partial success -- some repositories were taken down or pivoted. The company recommended users switch to the standalone binary installer to bypass the npm dependency chain.

But the genie was out of the bottle:

- **sanbuphy** maintains a full original TS source archive with Deep Analysis Reports covering telemetry, codenames, undercover mode, and the product roadmap.
- **Gitlawb**, a decentralized git platform, mirrored the code with a declaration: *"Will never be taken down."*
- **ccleaks.com** emerged as a dedicated website continuously tracking the leak's contents.
- The original uploader (nirholas) pivoted to a Python feature port and MCP server explorer to avoid legal risk.

As Decrypt summarized: *"Anthropic didn't mean to open-source Claude Code. But they effectively did."*

---

## Impact Analysis

### Why This Leak Matters: The Restaurant Analogy

For non-technical readers, the best analogy is a top restaurant's kitchen management manual.

Everyone assumed the competitive moat was the **secret recipe** (model weights -- how smart the AI brain is). This leak revealed that the real differentiator is the **kitchen SOP** (the software harness -- how the brain is managed).

This SOP teaches the AI to:

- **Remember customer preferences** → Three-layer memory architecture
- **Delegate to sous chefs** → Multi-agent coordinator with sub-agent forking
- **Prevent wrong orders from going out** → 23 bash security checks + permission gate
- **Remember which dishes are already done** → Prompt cache + file-read dedup
- **Organize notes during breaks** → autoDream background memory consolidation

Sebastian Raschka (LLM researcher) confirmed the implication: dropping this harness onto DeepSeek or other open-source models would yield very strong coding performance. The harness is model-agnostic.

eWeek's analysis was precise: *"OpenAI deliberately open-sources its harness, betting the moat is in the model. Anthropic keeps its harness closed, implying the harness IS the core asset. This leak matters because Anthropic believed the harness was the crown jewel -- and then it got dragged into daylight."*

### Impact on Industry Competition

Even without the Claude model itself, competitors now have the "perfect kitchen management manual." They can plug in cheap open-source models (DeepSeek, Qwen, Llama), follow the leaked harness design patterns, and build production-grade agents at a fraction of the cost.

The strategic landscape comparison is telling:

| Company | Harness Strategy | Implication |
|---|---|---|
| OpenAI | Deliberately open-sourced Codex CLI (Apache-2.0) | Bets model + ecosystem are the moat |
| Google | Gemini CLI open-sourced agent SDK | Same bet |
| Anthropic | Kept harness closed-source | Implied harness is the differentiator |

This puts Anthropic in an awkward position: competitors opened up on purpose; Anthropic leaked by accident.

Apiyi.com drew a long-term industry parallel: *"Short-term bad for Anthropic (trade secrets exposed), but long-term good for the industry. This provides the first complete production-grade AI Agent architecture reference -- could drive ecosystem development like the open-sourcing of Android."*

### Impact on Developers and Security

**Design Pattern Democratization**: claw-code proved that one developer in one night can rebuild the harness using the leaked architectural patterns. The barrier dropped from "years of R&D" to "hours." Engineers worldwide can now learn the industry's top agentic AI design patterns -- how to solve context entropy, design prompt caches, orchestrate multi-agent systems, and layer memory.

**Security Risks**: The full implementation of Hooks and MCP server orchestration logic is now public -- attackers can design malicious repositories to bypass trust prompts. The 23 bash security checks' exact implementations reveal both what's defended and how to bypass it. Anti-distillation trigger conditions and bypass methods are laid bare. The same-day Axios npm supply-chain attack (RAT injection between 00:21 and 03:29 UTC) compounded the risk for users who installed via npm during that window.

**For Agentic AI Developers**: The three-layer memory architecture is directly applicable to any agentic AI project. Coordinator mode's prompt-based orchestration is a textbook for multi-agent system design. The autoDream "dreaming" concept offers a concrete implementation pattern for background memory consolidation in long-running agent sessions.

---

## Leak Scope Summary

| Layer | Leaked | Gated | Est. % Leaked |
|---|---|---|---|
| 1. User Interface | CLI/Ink/Cmds/Keys/Renderer | Voice, Buddy | 65% |
| 2. Core Agent Loop | QueryEngine/Task/Coord/Sub-agents/Prompt | ULTRAPLAN | 85% |
| 3. Tool System | ~40 tools/Security/Permission | Computer Use, 17 tools | 70% |
| 4. Memory & Context | MEMORY.md/Session/Dedup/Cache | autoDream | 80% |
| 5. Services & Infra | All | — | 100% |
| 6. Security & Defense | All | — | 100% |
| 7. Gated Features | Scaffolding only | 108 modules | 5% |

Core harness (Layers 1-6) mostly leaked. Gated features (Layer 7) mostly not. Model weights unaffected.

---

## Technical Takeaways

**Harness is the real competitive edge.** Context dedup, session memory, prompt cache, sub-agent fork -- this engineering makes Claude Code far superior to the web UI. And it's applicable to any LLM.

**Security is fully exposed.** Undercover, Anti-distillation, Client Attestation, and Bash Security are all now public. Attackers can study the exact implementations to design targeted bypasses.

**Feature flags equal a product roadmap.** 44 flags, 20 unshipped -- KAIROS, Voice, Computer Use. Competitors now have explicit targets to build toward.

**The build pipeline was the weakest link.** Anthropic invested heavily in Undercover Mode to prevent AI-generated information leaks. The actual leak came from a missing `*.map` entry in `.npmignore`. The most sophisticated security system in the codebase was defeated by one line in a config file.

---

## Sources

1. [VentureBeat](https://venturebeat.com/technology/claude-codes-source-code-appears-to-have-leaked) -- Claude Code's source code appears to have leaked
2. [Fortune](https://fortune.com/2026/03/31/anthropic-source-code-claude-code-data-leak) -- Anthropic leaks its own AI coding tool's source code
3. [CNBC](https://cnbc.com/2026/03/31/anthropic-leak-claude-code-internal-source) -- Anthropic leaks part of Claude Code's internal source code
4. [The Register](https://theregister.com/2026/03/31/anthropic_claude_code_source_code) -- Anthropic accidentally exposes Claude Code source code
5. [eWeek / The Neuron](https://eweek.com/news/anthropic-claude-code-leak-ai-agent-neuron) -- Anthropic Leaks Claude Code, a Blueprint for AI Coding Agents
6. [DEV Community](https://dev.to/gabrielanhaia/claude-codes-entire-source-code-was-just-leaked) -- Claude Code's Entire Source Code Was Just Leaked via npm Source Maps
7. [Alex Kim's Blog](https://alex000kim.com/posts/2026-03-31-claude-code-source-leak) -- The Claude Code Source Leak: fake tools, frustration regexes, undercover mode
8. [Sebastian Raschka](https://sebastianraschka.com/blog/2026/claude-code-secret-sauce) -- Claude Code's Real Secret Sauce Isn't the Model
9. [Decrypt](https://decrypt.co/362917/anthropic-accidentally-leaked-claude-code-source) -- Anthropic Accidentally Leaked Claude Code's Source
10. [Apiyi.com](https://help.apiyi.com/en/claude-code-source-leak-march-2026-impact) -- Claude Code leak: impact on AI Agent industry
11. [GitHub (Kuberwastaken)](https://github.com/Kuberwastaken/claude-code) -- Claude Code in Rust & a Breakdown of How it Works
12. [GitHub (sanbuphy)](https://github.com/sanbuphy/claude-code-source-code) -- Claude Code v2.1.88 Source Code + Deep Analysis
13. [GitHub (instructkr)](https://github.com/instructkr/claw-code) -- claw-code: Python clean-room rewrite
14. [GitHub PR #41568](https://github.com/anthropics/claude-code/pull/41568) -- Rust rewrite PR submitted to Anthropic official repo
15. [Hacker News](https://news.ycombinator.com/item?id=47584540) -- The Claude Code Source Leak discussion thread
16. [Rolling Out](https://rollingout.com/2026/03/31/anthropic-claude-code-leak) -- How devastating Anthropic's leak exposed 512,000 lines
17. [The AI Corner](https://the-ai-corner.com/p/claude-code-source-code-leaked-2026) -- BREAKING: Anthropic just leaked Claude Code's entire source code

---

*All information sourced from publicly available reporting as of March 31, 2026. This analysis does not contain, distribute, or link to any proprietary source code. Created as a personal research exercise to understand agentic AI architecture and software supply chain security.*

*Presentation slides (Chinese + English) and an interactive viewer are available at: [github.com/johnson00111/claude-code-leak-analysis-report](https://github.com/johnson00111/claude-code-leak-analysis-report)*