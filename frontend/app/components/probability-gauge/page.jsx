'use client';

import { useEffect, useRef } from 'react';
import styles from './gauge.module.css';

export default function ProbabilityGauge({ probability = 50 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 20;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw gauge background
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 2 * Math.PI);
    ctx.strokeStyle = 'var(--color-card-border)';
    ctx.lineWidth = 20;
    ctx.stroke();

    // Draw colored gauge
    const gaugeAngle = Math.PI + (probability / 100) * Math.PI;
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, '#ef4444'); // Red
    gradient.addColorStop(0.5, '#fbbf24'); // Gold
    gradient.addColorStop(1, '#10b981'); // Green

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, gaugeAngle);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 20;
    ctx.stroke();

    // Draw needle
    const needleAngle = gaugeAngle;
    const needleLength = radius - 10;
    const needleX = centerX + Math.cos(needleAngle) * needleLength;
    const needleY = centerY + Math.sin(needleAngle) * needleLength;

    // Needle shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(needleX, needleY);
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 12, 0, 2 * Math.PI);
    ctx.fillStyle = '#10b981';
    ctx.fill();

    // Draw percentage text
    ctx.shadowColor = 'transparent';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillStyle = '#10b981';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${probability}%`, centerX, centerY + 40);
  }, [probability]);

  return (
    <div className={styles.gauge}>
      <canvas
        ref={canvasRef}
        width={300}
        height={200}
        className={styles.canvas}
      />
      <div className={styles.labels}>
        <span className={styles.labelLow}>Low</span>
        <span className={styles.labelHigh}>High</span>
      </div>
    </div>
  );
}
