---
sidebar_position: 2
---

# Agents — Roadmap

How LLMs go from answering questions to taking actions, using tools, and coordinating with each other.

## 1. Agent Fundamentals
- [ ] What makes something an "agent" vs a single LLM call
- [ ] Tool use / function calling — how models decide to call tools and parse results
- [ ] Designing tools: naming, descriptions, argument schemas
- [ ] Agent memory: short-term (context) vs long-term (persisted) memory

## 2. Agent Architectures
- [ ] ReAct (Reasoning + Acting) loop
- [ ] Plan-and-Execute pattern
- [ ] Reflection / self-critique loops
- [ ] Single-agent vs multi-agent systems
- [ ] Sub-agents and orchestrator patterns

## 3. Protocols
- [ ] **MCP (Model Context Protocol)** — standardizing how agents connect to tools and data sources
  - [ ] MCP servers vs clients
  - [ ] Resources, tools, and prompts in MCP
- [ ] **A2A (Agent-to-Agent)** — how independent agents discover and communicate with each other
  - [ ] Agent cards / capability discovery
  - [ ] Task delegation between agents

## 4. Multi-Agent Systems
- [ ] Coordination patterns: hierarchical, peer-to-peer, blackboard
- [ ] Shared state and conflict resolution
- [ ] When multi-agent actually beats a single well-prompted agent (and when it doesn't)

## 5. Common Problems & SOTA Solutions
- [ ] **Agent loses context over long tasks** → memory systems, summarization, external state stores
- [ ] **Agent gets stuck in loops** → step limits, reflection checkpoints, human-in-the-loop escalation
- [ ] **Tool-calling hallucination** (calling tools that don't exist, malformed args) → strict schemas, validation, retries
- [ ] **Runaway cost/latency in multi-agent chains** → caching, cheaper models for sub-tasks, parallelization

## Further practice
- [amitshekhariitbhu/ai-engineering-interview-questions — AI Agents and Agentic Systems](https://github.com/amitshekhariitbhu/ai-engineering-interview-questions) (Apache-2.0)
- [alirezadir/Agentic-AI-Systems](https://github.com/alirezadir/Agentic-AI-Systems) (referenced from AIMLInterviews, MIT) — dedicated agentic systems chapter
