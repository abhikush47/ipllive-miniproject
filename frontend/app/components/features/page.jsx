import styles from './features.module.css';

export default function Features() {
  const features = [
    {
      icon: '⚡',
      title: 'Real-Time Analytics',
      description: 'Get instant predictions as the match progresses with live data updates',
    },
    {
      icon: '🤖',
      title: 'ML Powered',
      description: 'Advanced machine learning models trained on 1000+ IPL matches',
    },
    {
      icon: '📊',
      title: 'Historical Data',
      description: 'Comprehensive analysis of team performance and player statistics',
    },
    {
      icon: '⚙️',
      title: 'Accurate Predictions',
      description: '98% accuracy rate validated against historical match outcomes',
    },
  ];

  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Why Choose Our Predictor?</h2>
          <p className={styles.subtitle}>
            Powered by advanced AI and cricket expertise
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.icon}>{feature.icon}</div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
