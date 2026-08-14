import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Foundations to Frontier',
    description: (
      <>
        Start from the math underneath AI — linear algebra, calculus,
        probability — and build all the way up to deep learning, agents, and
        state-of-the-art architectures.
      </>
    ),
  },
  {
    title: 'Problems and Their SOTA Solutions',
    description: (
      <>
        Every topic is framed around real problems in ML and what the
        current state-of-the-art solution looks like, not just theory in
        isolation.
      </>
    ),
  },
  {
    title: 'Systems, Not Just Models',
    description: (
      <>
        Learn ML system design, databases (SQL, vector, graph), agent
        protocols like MCP and A2A, and the frameworks used to ship AI in
        production.
      </>
    ),
  },
];

function Feature({title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
