---
sidebar_position: 4
---

# Agent Architectures

Different ways to structure the loop between reasoning and acting, each with different tradeoffs between reliability, cost, and how much the agent can handle on its own.

## ReAct (Reasoning + Acting)

The foundational pattern: at each step, the model produces a short reasoning trace ("I need to find X"), then an action (a tool call), observes the result, and loops — reason, act, observe, reason, act, observe — until it has enough information to answer. Interleaving reasoning with action lets the model course-correct based on real results, rather than committing to a full plan upfront that might be wrong. See [Prompt Engineering — ReAct](../llms-genai/prompt-engineering.md#react-reasoning--acting) for the prompting technique this is built on.

## Plan-and-Execute

Instead of interleaving reasoning and action one step at a time, the model first produces a full multi-step plan, then executes each step (possibly with a separate, cheaper model or the same model in a simpler "execution" mode), only returning to re-planning if a step fails or new information changes the picture. Generally more efficient than pure ReAct for tasks with a predictable structure, since it avoids re-reasoning about the whole task at every single step — but less adaptive to surprises mid-task.

## Reflection / Self-Critique

After producing an output (or completing a sub-task), the agent (or a separate call) critiques its own work against the original goal, and revises if needed. Useful for tasks where a first attempt is often flawed but a model is good at spotting flaws when explicitly asked to check — a form of using the same model's judgment as a lightweight quality gate.

## Single-Agent vs. Multi-Agent

A single, well-prompted agent with good tools can handle a surprising amount. Multi-agent systems (see [Multi-Agent Systems](./multi-agent-systems.md)) add value when a task genuinely benefits from specialization — different agents with different tools, instructions, or models for different sub-problems — but they also add coordination overhead, latency, and cost. The practical guidance: start with a single agent, and only split into multiple agents when you hit a concrete limitation (context overload, need for parallelism, need for genuinely different tool access per role).

## Sub-Agents and Orchestrator Patterns

A common middle ground: one **orchestrator** agent breaks a task into sub-tasks and delegates each to a specialized **sub-agent**, then combines their results. The orchestrator doesn't need deep expertise in each sub-task — it just needs to know *which* sub-agent to call and how to combine their outputs, similar in spirit to how a manager delegates without doing the work themselves.

Next: [MCP (Model Context Protocol)](./mcp/overview.md) and [A2A (Agent-to-Agent)](./a2a/overview.md) — the standards that let agents connect to tools and to each other without custom integration for every pair.
