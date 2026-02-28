import Link from 'next/link';
import Features from './components/features/page';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1 className={styles.title}>
                Predict IPL Match <span className={styles.highlight}>Winners</span> with AI
              </h1>
              <p className={styles.subtitle}>
                Advanced machine learning model trained on historical IPL data to accurately predict match outcomes in real-time
              </p>
              <div className={styles.ctaGroup}>
                <Link href="/predictor" className={styles.primaryBtn}>
                  Start Predicting
                </Link>
                <Link href="/about" className={styles.secondaryBtn}>
                  Learn More
                </Link>
              </div>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>98%</div>
                  <div className={styles.statLabel}>Accuracy Rate</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>1000+</div>
                  <div className={styles.statLabel}>Matches Analyzed</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>6</div>
                  <div className={styles.statLabel}>ML Engineers</div>
                </div>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.floatingCard}>
                <div className={styles.cardContent}>
                  <div className={styles.cricketBall}>🏏</div>
                  <p className={styles.prediction}>Live Prediction</p>
                  <div className={styles.probability}>
                    <div className={styles.probText}>65%</div>
                  </div>
                </div>
              </div>
              <div className={styles.floatingCard + ' ' + styles.card2}>
                <div className={styles.cardContent}>
                  <p className={styles.dataPoint}>Mumbai Indians</p>
                  <p className={styles.dataValue}>8/10 Strength</p>
                </div>
              </div>
              <div className={styles.floatingCard + ' ' + styles.card3}>
                <div className={styles.cardContent}>
                  <p className={styles.dataPoint}>Match Status</p>
                  <p className={styles.dataValue}>Live • 5 Overs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Ready to Predict?</h2>
          <p className={styles.ctaDescription}>
            Get started with our AI-powered IPL match win predictor today
          </p>
          <Link href="/predictor" className={styles.ctaButton}>
            Launch Predictor
          </Link>
        </div>
      </section>
    </div>
  );
}
