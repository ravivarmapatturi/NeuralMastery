// Hand-curated metadata for the 7 top-level sidebar groups (see sidebars.js),
// keyed by the group's generated-index page href. Rendered by the swizzled
// DocCategoryGeneratedIndexPage. Time estimates are an honest range derived
// from page count x a realistic 15-25 min/page for this site's technical
// density -- not a false-precision single number, and not a fixed weekly
// cohort pace (this isn't a scheduled course).

export const SECTION_META = {
  '/docs/category/foundations': {
    time: '4-7 hrs (17 pages)',
    difficulty: 'Beginner',
    prerequisites: 'None — this is the entry point.',
    leadsTo: 'Models',
  },
  '/docs/category/models': {
    time: '19-32 hrs (76 pages)',
    difficulty: 'Intermediate → Advanced',
    prerequisites: 'Foundations',
    leadsTo: 'Agents & Applications, Systems & Infrastructure',
  },
  '/docs/category/agents--applications': {
    time: '4-6 hrs (15 pages)',
    difficulty: 'Advanced',
    prerequisites: 'Models — especially LLMs & GenAI',
    leadsTo: 'Systems & Infrastructure',
  },
  '/docs/category/systems--infrastructure': {
    time: '10-17 hrs (42 pages)',
    difficulty: 'Advanced',
    prerequisites: 'Models',
    leadsTo: 'Safety & Evaluation',
  },
  '/docs/category/safety--evaluation': {
    time: '4-7 hrs (17 pages)',
    difficulty: 'Advanced',
    prerequisites: 'Models, Systems & Infrastructure',
    leadsTo: 'Research & Build',
  },
  '/docs/category/research--build': {
    time: '6-10 hrs (24 pages)',
    difficulty: 'Advanced',
    prerequisites: 'Models',
    leadsTo: 'Career',
  },
  '/docs/category/career': {
    time: '2.5-4 hrs (10 pages)',
    difficulty: 'All levels',
    prerequisites: 'Whatever you have covered so far',
    leadsTo: '— you are interview-ready.',
  },
};
