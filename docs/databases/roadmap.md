---
sidebar_position: 2
---

# Databases — Roadmap

Every AI system needs somewhere to put data — structured, vector, and graph.

## 1. Relational (MySQL, Postgres)
- [ ] Relational model, normalization
- [ ] SQL fundamentals: joins, aggregations, window functions
- [ ] Indexing and query planning
- [ ] Transactions and ACID guarantees
- [ ] When relational is (and isn't) the right tool for ML metadata/feature storage

## 2. Vector Databases
- [ ] What a vector database actually stores and searches (embeddings + approximate nearest neighbor)
- [ ] Distance metrics: cosine, dot product, Euclidean
- [ ] Indexing algorithms: HNSW, IVF, product quantization
- [ ] ChromaDB — local/embedded vector store for prototyping
- [ ] Production-scale options (Pinecone, Weaviate, Milvus, pgvector) and how to choose
- [ ] Hybrid search: combining vector similarity with keyword/metadata filters

## 3. Graph Databases
- [ ] Property graph model: nodes, edges, properties
- [ ] Neo4j and Cypher query language basics
- [ ] When a graph model beats relational (highly connected data, multi-hop queries)
- [ ] GraphRAG — using a knowledge graph to ground LLM retrieval

## Common Problems & SOTA Solutions
- [ ] **Vector search doesn't scale past X million vectors** → approximate indexing (HNSW/IVF), sharding
- [ ] **Pure vector search misses exact keyword matches** → hybrid search + re-ranking
- [ ] **Stale embeddings after content updates** → versioned re-indexing pipelines
- [ ] **Multi-hop reasoning fails with flat vector retrieval** → GraphRAG / knowledge graph augmentation

## Further practice
- [amitshekhariitbhu/ai-engineering-interview-questions — Vector Databases and Embeddings](https://github.com/amitshekhariitbhu/ai-engineering-interview-questions) (Apache-2.0)
- Official docs: [ChromaDB](https://docs.trychroma.com/), [Neo4j](https://neo4j.com/docs/), [Postgres](https://www.postgresql.org/docs/)
