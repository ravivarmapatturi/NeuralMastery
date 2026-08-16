// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Neural Mastery',
  tagline: 'One platform to master AI — math, ML, deep learning, agents, and beyond',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  url: 'https://ravivarmapatturi.github.io',
  baseUrl: '/NeuralMastery/',

  // GitHub pages deployment config.
  organizationName: 'ravivarmapatturi', // GitHub username.
  projectName: 'NeuralMastery', // GitHub repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl:
            'https://github.com/ravivarmapatturi/NeuralMastery/tree/main/',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        blog: {
          path: 'news',
          routeBasePath: 'news',
          blogTitle: 'AI News',
          blogDescription:
            'A running, dated roundup of what is actually happening in AI — frontier model releases, funding and acquisitions, research breakthroughs, and industry moves. Every item links straight to its original source; nothing here is original reporting, and no credit for any of it belongs to Neural Mastery.',
          blogSidebarTitle: 'Recent updates',
          blogSidebarCount: 10,
          postsPerPage: 10,
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
            title: 'Neural Mastery — AI News',
            description: 'A dated roundup of AI industry news, always linked back to its original source.',
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      /** @type {import('@easyops-cn/docusaurus-search-local').PluginOptions} */
      ({
        hashed: true,
        indexBlog: true,
        indexPages: false,
        docsRouteBasePath: '/docs',
        blogRouteBasePath: '/news',
        blogDir: 'news',
        highlightSearchTermsOnTargetPage: true,
      }),
    ],
  ],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV',
      crossorigin: 'anonymous',
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Neural Mastery',
        logo: {
          alt: 'Neural Mastery Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Learn',
          },
          {
            to: '/docs/learning-path',
            label: 'Learning Path',
            position: 'left',
          },
          {
            to: '/news',
            label: 'AI News',
            position: 'left',
          },
          {
            href: 'https://www.youtube.com/@neuralmastery',
            label: 'YouTube',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Learn',
            items: [
              {
                label: 'Get Started',
                to: '/docs/intro',
              },
              {
                label: 'AI News',
                to: '/news',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'YouTube',
                href: 'https://www.youtube.com/@neuralmastery',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Neural Mastery. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
