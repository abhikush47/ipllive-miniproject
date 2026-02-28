import styles from './page.module.css';

export default function About() {
  const team = [
    { name: 'Raja Kumar Sah', role: 'Project Lead & Frontend', icon: '👨‍💼' },
    { name: 'Shomya Sarraf', role: 'Backend & ML Engineer', icon: '👨‍💻' },
    { name: 'Abhishek Kushwaha', role: 'Data Engineer', icon: '📊' },
    { name: 'Harshit Mehta', role: 'ML & Model Training', icon: '🤖' },
    { name: 'Sonu Yadav', role: 'QA & Testing', icon: '✅' },
    { name: 'Ashish Das', role: 'DevOps & Deployment', icon: '⚙️' },
  ];

  return (
    <div className={styles.about}>
      {/* Header Section */}
      <section className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>About IPL Predictor</h1>
          <p className={styles.subtitle}>
            An AI-powered project built by 6 students to predict IPL match winners
          </p>
        </div>
      </section>

      {/* Project Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionContent}>
            <div className={styles.sectionText}>
              <h2 className={styles.sectionTitle}>The Project</h2>
              <p>
                IPL Live Match Win Predictor is a machine learning-powered application that predicts the probability of each team winning an Indian Premier League (IPL) match in real-time. Using historical data from over 1000 IPL matches, our model achieves 98% accuracy in predicting match outcomes.
              </p>
              <p>
                The project combines advanced machine learning techniques, comprehensive data analysis, and a modern web interface to provide cricket enthusiasts with data-driven predictions during live matches.
              </p>
            </div>
            <div className={styles.stats}>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>1000+</div>
                <div className={styles.statText}>IPL Matches Analyzed</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>98%</div>
                <div className={styles.statText}>Prediction Accuracy</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>6</div>
                <div className={styles.statText}>Team Members</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className={styles.techSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Technologies Used</h2>
          <div className={styles.techGrid}>
            <div className={styles.techCard}>
              <div className={styles.techIcon}>⚛️</div>
              <h3>Next.js & React</h3>
              <p>Modern frontend framework for building responsive UI</p>
            </div>
            <div className={styles.techCard}>
              <div className={styles.techIcon}>🐍</div>
              <h3>Python & Flask</h3>
              <p>Backend API server for predictions and data processing</p>
            </div>
            <div className={styles.techCard}>
              <div className={styles.techIcon}>🤖</div>
              <h3>Scikit-learn</h3>
              <p>Machine learning models for win prediction</p>
            </div>
            <div className={styles.techCard}>
              <div className={styles.techIcon}>📊</div>
              <h3>Pandas & NumPy</h3>
              <p>Data analysis and manipulation libraries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={styles.teamSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Team</h2>
          <p className={styles.teamSubtitle}>
            Meet the 6 students behind IPL Predictor
          </p>
          <div className={styles.teamGrid}>
            {team.map((member, index) => (
              <div key={index} className={styles.teamCard}>
                <div className={styles.memberIcon}>{member.icon}</div>
                <h3 className={styles.memberName}>{member.name}</h3>
                <p className={styles.memberRole}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Key Features</h2>
          <div className={styles.featuresList}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>⚡</div>
              <div>
                <h3>Real-Time Predictions</h3>
                <p>Get instant predictions as the match progresses</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>📊</div>
              <div>
                <h3>Historical Analysis</h3>
                <p>Comprehensive analysis of 1000+ matches</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>🎯</div>
              <div>
                <h3>High Accuracy</h3>
                <p>98% prediction accuracy rate</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>🌐</div>
              <div>
                <h3>Web Interface</h3>
                <p>Beautiful and responsive web application</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
