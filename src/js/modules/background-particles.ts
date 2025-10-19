import { Application, Graphics, BlurFilter } from 'pixi.js';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: number;
  vx: number; // x軸の速度
  vy: number; // y軸の速度
}

export default class BackgroundParticles {
  private container: HTMLElement | null = document.querySelector('[data-background-particles]');
  private width: number = window.innerWidth;
  private height: number = window.innerHeight;

  // Pixi.js プロパティ
  private app: Application = new Application();
  private graphics: Graphics = new Graphics();
  private blurFilter: BlurFilter = new BlurFilter();
  private particles: Particle[] = [];

  constructor() {
    this.renderCanvas();
  }

  // canvasエリア追加
  private async renderCanvas() {
    if (!this.container) return;

    await this.app.init({
      width: this.width,
      height: this.height,
      backgroundColor: 0x444341,
      resizeTo: window,
    });

    this.container.appendChild(this.app.canvas);

    this.addParticles();
  }

  // パーティクル追加
  private addParticles() {
    const quantity = 20; // パーティクルの数
    const particleColors = [0xe2e2e2, 0xccc6c6, 0xafa0a0, 0x828282];

    this.particles = [...Array(quantity)].map(_ => {
      return {
        x: Math.floor(Math.random() * this.app.screen.width), // x軸
        y: Math.floor(Math.random() * this.app.screen.height), // y軸
        radius: Math.floor(Math.random() * 4 + 1), // 最大半径を5に設定
        color: particleColors[Math.floor(Math.random() * particleColors.length)], // カラー指定
        vx: (Math.random() - 0.5) * 0.5, // x軸の速度
        vy: (Math.random() - 0.5) * 0.5, // y軸の速度
      };
    });

    this.blurFilter.strength = 3; // ぼかし強度
    this.graphics.filters = [this.blurFilter]; // フィルター適用

    this.app.stage.addChild(this.graphics); // グラフィック追加

    this.app.ticker.add(() => {
      this.particleAnimation();
    });
  }

  // アニメーション設定
  private particleAnimation() {
    this.graphics.clear(); // 初期化

    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      // 画面外に出た時のリセット処理
      if (particle.x < 0 || particle.x > this.app.screen.width) {
        particle.vx *= -1;
      }
      if (particle.y < 0 || particle.y > this.app.screen.height) {
        particle.vy *= -1;
      }

      // 画面外にいかないように調整
      particle.x = Math.max(0, Math.min(this.app.screen.width, particle.x));
      particle.y = Math.max(0, Math.min(this.app.screen.height, particle.y));

      // パーティクル描画
      this.graphics.fill({ color: particle.color });
      this.graphics.circle(particle.x, particle.y, particle.radius);
    });
  }
}
