// Hand-curated metadata for the 7 top-level sidebar groups (see sidebars.js),
// keyed by the group's generated-index page href. Rendered by the swizzled
// DocCategoryGeneratedIndexPage. Time estimates are an honest range derived
// from page count x a realistic 15-25 min/page for this site's technical
// density -- not a false-precision single number, and not a fixed weekly
// cohort pace (this isn't a scheduled course).

// `folders` lists each group's doc directories (see sidebars.js) -- used to
// attribute a marked-understood permalink back to its top-level group by
// prefix match, since Docusaurus doesn't expose the full sidebar tree
// outside of doc pages (LearningPathMap renders on the homepage).
export const SECTION_META = {
  '/docs/category/foundations': {
    label: 'Foundations',
    pageCount: 17,
    difficulty: 'Beginner',
    prerequisites: 'None — this is the entry point.',
    leadsTo: 'Models',
    folders: ['cs-fundamentals', 'python-engineering', 'mathematics-for-ai'],
  },
  '/docs/category/models': {
    label: 'Models',
    pageCount: 76,
    difficulty: 'Intermediate → Advanced',
    prerequisites: 'Foundations',
    leadsTo: 'Agents & Applications, Systems & Infrastructure',
    folders: ['machine-learning', 'deep-learning', 'computer-vision', 'nlp', 'speech-audio', 'llms-genai', 'graph-ml', 'reinforcement-learning'],
  },
  '/docs/category/agents--applications': {
    label: 'Agents & Applications',
    pageCount: 15,
    difficulty: 'Advanced',
    prerequisites: 'Models — especially LLMs & GenAI',
    leadsTo: 'Systems & Infrastructure',
    folders: ['agents', 'ai-for-science', 'domain-applications'],
  },
  '/docs/category/systems--infrastructure': {
    label: 'Systems & Infrastructure',
    pageCount: 42,
    difficulty: 'Advanced',
    prerequisites: 'Models',
    leadsTo: 'Safety & Evaluation',
    folders: ['ml-system-design', 'mlops', 'databases', 'frameworks'],
  },
  '/docs/category/safety--evaluation': {
    label: 'Safety & Evaluation',
    pageCount: 17,
    difficulty: 'Advanced',
    prerequisites: 'Models, Systems & Infrastructure',
    leadsTo: 'Research & Build',
    folders: ['ai-evaluation', 'ai-security', 'ai-safety', 'interpretability'],
  },
  '/docs/category/research--build': {
    label: 'Research & Build',
    pageCount: 24,
    difficulty: 'Advanced',
    prerequisites: 'Models',
    leadsTo: 'Career',
    folders: ['research-engineering', 'build-from-scratch', 'projects', 'visual-lab'],
  },
  '/docs/category/career': {
    label: 'Career',
    pageCount: 10,
    difficulty: 'All levels',
    prerequisites: 'Whatever you have covered so far',
    leadsTo: '— you are interview-ready.',
    folders: ['interview-prep', 'roadmaps', 'resources'],
  },
};

/** "4-7 hrs (17 pages)" -- a 15-25 min/page range, not false precision. */
export function timeEstimate(pageCount) {
  const lo = Math.round((pageCount * 15) / 60) || 1;
  const hi = Math.round((pageCount * 25) / 60) || 1;
  return `${lo}-${hi} hrs (${pageCount} pages)`;
}
