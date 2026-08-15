import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import GradientDescentExplorer from '@site/src/components/viz/GradientDescentExplorer';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import styles from './index.module.css';

const STATS = [
  { value: '28', label: 'sections, foundations to frontier' },
  { value: '300+', label: 'in-depth pages, each with math, code, and a chart' },
  { value: 'Live', label: 'interactive visualizations, growing every batch' },
];

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={styles.heroGlow} />
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/docs/intro">
            Start Learning →
          </Link>
          <Link
            className={clsx('button button--lg', styles.secondaryButton)}
            to="/docs/visual-lab/overview">
            Try It Live
          </Link>
        </div>
        <div className={styles.statRow}>
          {STATS.map((s) => (
            <div key={s.label} className={styles.stat}>
              <div className={styles.statValue}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

function LiveDemo() {
  return (
    <section className={styles.demoSection}>
      <div className="container">
        <div className={styles.demoIntro}>
          <span className={styles.eyebrow}>Not a screenshot</span>
          <Heading as="h2">This is a live page, not a static one</Heading>
          <p className={styles.demoText}>
            Every concept on this site gets a math derivation, from-scratch code, and a
            generated chart — and a growing set of them get this too: a real, running
            visualization you can click and drag, right here, right now.
          </p>
        </div>
        <GradientDescentExplorer />
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="One platform to master AI — math, machine learning, deep learning, agents, ML system design, and databases. With real, in-browser interactive visualizations.">
      <HomepageHeader />
      <main>
        <LiveDemo />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
