/**
 * WonderKid Arcade - Game-Based Superpower Discovery Engine
 * 100% Pure Vanilla JS, Web Audio API, Speech Synthesis & Dynamic Playstyle Telemetry.
 */

// ============================================================================
// 1. DATA: 8 Superpower Dimensions
// ============================================================================
export const SUPERPOWER_DOMAINS = {
  creative: {
    id: 'creative',
    name: 'Creative Explorer',
    title: 'The Master of Imagination',
    icon: '🎨',
    color: '#ff3b69',
    summary: 'You see magic where others see plain objects! You invent wild stories, love bold colors, and find unique, unexpected ways to solve challenges.',
    mentors: 'Frida Kahlo, Walt Disney, and Hayao Miyazaki',
    missions: [
      { icon: '🖍️', title: 'Invent a Brand-New Creature', desc: 'Draw a mythical animal combining 3 different creatures and give it an awesome superpower!' },
      { icon: '📦', title: 'Cardboard Magic Workshop', desc: 'Take a recycled box and turn it into a miniature castle, flying car, or secret treasure chest.' }
    ]
  },
  logic: {
    id: 'logic',
    name: 'Mind Wizard',
    title: 'The Logic & Puzzle Master',
    icon: '🧩',
    color: '#4361ee',
    summary: 'Your mind naturally looks for patterns, strategies, and clever solutions! You love deciphering riddles, sequencing steps, and cracking tricky codes.',
    mentors: 'Alan Turing, Katherine Johnson, and Albert Einstein',
    missions: [
      { icon: '🕵️', title: 'Secret Alphabet Cipher', desc: 'Create a substitution code (e.g. A=1, B=2) and leave a coded clue for family members to solve.' },
      { icon: '🎲', title: 'Design a Mini Maze', desc: 'Draw a maze with 3 deceptive dead ends and 1 secret shortcut on graph paper.' }
    ]
  },
  nature: {
    id: 'nature',
    name: 'Earth Guardian',
    title: 'The Animal & Nature Whisperer',
    icon: '🌿',
    color: '#06d6a0',
    summary: 'You feel a deep, caring connection to all living things. Animals trust your calming aura, and you love observing the natural wonders of the outdoors.',
    mentors: 'Jane Goodall, David Attenborough, and Steve Irwin',
    missions: [
      { icon: '🌱', title: 'The Window Sprout Experiment', desc: 'Place a dry bean in a damp paper towel inside a clear bag taped to a sunny window and watch roots emerge!' },
      { icon: '🐦', title: '10-Minute Wildlife Safari', desc: 'Sit quietly outside for 10 minutes and sketch every bug, bird, and leaf you observe.' }
    ]
  },
  heart: {
    id: 'heart',
    name: 'Heart Hero',
    title: 'The Kindness & Empathy Champion',
    icon: '💖',
    color: '#ff6b4a',
    summary: 'Your superpower is empathy, compassion, and lifting others up! You naturally sense how other people feel and love making everyone feel welcomed.',
    mentors: 'Fred Rogers, Malala Yousafzai, and Mother Teresa',
    missions: [
      { icon: '💌', title: 'Secret Joy Note', desc: 'Draw a cheerful picture with a funny joke and slip it secretly into someone’s backpack or pocket.' },
      { icon: '🤝', title: 'Playground Inclusion Quest', desc: 'Notice someone sitting by themselves and invite them to play or chat with a warm smile.' }
    ]
  },
  energy: {
    id: 'energy',
    name: 'Kinesthetic Dynamo',
    title: 'The Action & Speed Adventurer',
    icon: '⚡',
    color: '#ffb703',
    summary: 'You are energized by movement, agility, speed, and active adventures! You learn best with your hands and love conquering physical challenges.',
    mentors: 'Simone Biles, Lionel Messi, and Bruce Lee',
    missions: [
      { icon: '🧗', title: 'Living Room Lava Obstacle Course', desc: 'Set up safe cushions to cross from one side of the room to the other without touching the floor!' },
      { icon: '⚡', title: 'Speed Reaction Challenge', desc: 'Drop a ruler between your fingers and test how fast you can catch it before it falls.' }
    ]
  },
  music: {
    id: 'music',
    name: 'Rhythm Maestro',
    title: 'The Melody & Sound Alchemist',
    icon: '🎵',
    color: '#845ec2',
    summary: 'You hear the world in beats, tones, and melodies! You tap rhythms, hum catchy tunes, and find joy expressing feelings through musical sounds.',
    mentors: 'Wolfgang Mozart, Beyoncé, and Stevie Wonder',
    missions: [
      { icon: '🥁', title: 'Kitchen Table Drum Kit', desc: 'Use wooden spoons and cups filled with different water levels to compose a 4-beat rhythm!' },
      { icon: '🎤', title: 'Custom Superhero Theme Song', desc: 'Compose a 15-second musical battle song for your favorite toy or pet.' }
    ]
  },
  builder: {
    id: 'builder',
    name: 'Master Maker',
    title: 'The Tinkerer & Builder',
    icon: '🛠️',
    color: '#00b4d8',
    summary: 'You are an engineer at heart! You love taking broken things apart to see how they work, building towering structures, and crafting inventions.',
    mentors: 'Nikola Tesla, Ada Lovelace, and Leonardo da Vinci',
    missions: [
      { icon: '🏰', title: 'The 10-Book Sky Tower', desc: 'Stack 10 books and cardboard scraps into the tallest possible tower that can support a small toy.' },
      { icon: '✈️', title: 'Aerodynamic Paper Glider', desc: 'Fold 3 different paper plane styles and measure which one glides the longest distance.' }
    ]
  },
  curious: {
    id: 'curious',
    name: 'Cosmic Inquirer',
    title: 'The Wonder & Science Seeker',
    icon: '🔍',
    color: '#f72585',
    summary: 'Your curiosity has no limits! You are always asking "Why?", exploring space, questioning mysteries, and seeking to understand the universe.',
    mentors: 'Carl Sagan, Marie Curie, and Neil deGrasse Tyson',
    missions: [
      { icon: '🌌', title: 'Night Constellation Map', desc: 'Look at the stars tonight and create your own constellation myth connecting bright dots.' },
      { icon: '🧪', title: 'Kitchen Density Test', desc: 'Predict which 5 household items sink or float in a bowl of water, then test your hypothesis!' }
    ]
  }
};

// ============================================================================
// 2. NATIVE SOUND SYNTHESIZER (Web Audio API)
// ============================================================================
class ArcadeAudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.musicInterval = null;
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playPop() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch {
      // Audio fallback
    }
  }

  playChime() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.06);

        gain.gain.setValueAtTime(0.25, this.ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.06 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.06);
        osc.stop(this.ctx.currentTime + idx * 0.06 + 0.26);
      });
    } catch {
      // Fallback
    }
  }

  playFanfare() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const chords = [
        { f: 261.63, t: 0.0, d: 0.2 },
        { f: 329.63, t: 0.15, d: 0.2 },
        { f: 392.00, t: 0.30, d: 0.2 },
        { f: 523.25, t: 0.45, d: 0.35 },
        { f: 659.25, t: 0.65, d: 0.35 },
        { f: 783.99, t: 0.85, d: 0.8 },
        { f: 1046.50, t: 0.85, d: 0.8 }
      ];

      chords.forEach(({ f, t, d }) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, this.ctx.currentTime + t);

        gain.gain.setValueAtTime(0.3, this.ctx.currentTime + t);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + t + d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + t);
        osc.stop(this.ctx.currentTime + t + d + 0.02);
      });
    } catch {
      // Fallback
    }
  }

  playWhoosh() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(250, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch {
      // Fallback
    }
  }

  // Instrument Pads for Rhythm Game
  playBass() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(35, this.ctx.currentTime + 0.18);

      gain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.23);
    } catch {
      // Fallback
    }
  }

  playSnare() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(240, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.13);
    } catch {
      // Fallback
    }
  }

  playChimePad() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const freqs = [659.25, 880, 1174.66];
      freqs.forEach((f, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, this.ctx.currentTime + i * 0.04);
        gain.gain.setValueAtTime(0.25, this.ctx.currentTime + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.04 + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + i * 0.04);
        osc.stop(this.ctx.currentTime + i * 0.04 + 0.36);
      });
    } catch {
      // Fallback
    }
  }

  playLaser() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(900, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.16);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.17);
    } catch {
      // Fallback
    }
  }

  startMusicBox() {
    if (this.musicInterval) return;
    const melody = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 783.99, 659.25];
    let noteIdx = 0;

    this.musicInterval = setInterval(() => {
      try {
        this.initContext();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(melody[noteIdx % melody.length], this.ctx.currentTime);

        gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.46);

        noteIdx++;
      } catch {
        // Fallback
      }
    }, 450);
  }

  stopMusicBox() {
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

// ============================================================================
// 3. SPEECH NARRATOR
// ============================================================================
class ArcadeVoiceNarrator {
  constructor() {
    this.enabled = true;
    this.synth = window.speechSynthesis || null;
  }

  speak(text) {
    if (!this.enabled || !this.synth) return;
    this.stop();
    const cleanText = text.replace(/[*_#~]/g, '');
    const utter = new SpeechSynthesisUtterance(cleanText);
    utter.rate = 0.95;
    utter.pitch = 1.15;

    const voices = this.synth.getVoices();
    const preferred = voices.find(v => (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.lang.startsWith('en')) && !v.name.includes('Whisper'));
    if (preferred) utter.voice = preferred;

    this.synth.speak(utter);
  }

  stop() {
    if (this.synth && this.synth.speaking) {
      this.synth.cancel();
    }
  }
}

// ============================================================================
// 4. CONFETTI CANNON
// ============================================================================
class ConfettiCannon {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.animationId = null;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  fire(durationMs = 3500) {
    this.resize();
    const colors = ['#ff3b69', '#ffb703', '#06d6a0', '#00b4d8', '#7209b7', '#ff6b4a', '#f72585'];
    for (let i = 0; i < 120; i++) {
      const fromLeft = i % 2 === 0;
      this.particles.push({
        x: fromLeft ? 0 : this.canvas.width,
        y: this.canvas.height * 0.7 + Math.random() * 80,
        vx: (fromLeft ? 1 : -1) * (Math.random() * 12 + 5),
        vy: -(Math.random() * 15 + 8),
        size: Math.random() * 9 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        shape: Math.random() > 0.4 ? 'rect' : 'circle',
        gravity: 0.4,
        opacity: 1
      });
    }

    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.rotSpeed;

        if (elapsed > durationMs - 800) {
          p.opacity = Math.max(0, p.opacity - 0.02);
        }

        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.globalAlpha = p.opacity;
        this.ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
          this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        } else {
          this.ctx.beginPath();
          this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          this.ctx.fill();
        }
        this.ctx.restore();

        if (p.y > this.canvas.height + 50 || p.opacity <= 0) {
          this.particles.splice(i, 1);
        }
      }

      if (this.particles.length > 0 && elapsed < durationMs) {
        this.animationId = requestAnimationFrame(animate);
      } else {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles = [];
      }
    };

    if (this.animationId) cancelAnimationFrame(this.animationId);
    animate();
  }
}

// ============================================================================
// 5. MAIN ARCADE APPLICATION CONTROLLER
// ============================================================================
class WonderKidArcade {
  constructor() {
    this.audio = new ArcadeAudioEngine();
    this.voice = new ArcadeVoiceNarrator();
    this.confetti = new ConfettiCannon(document.getElementById('confetti-canvas'));

    // Player & Live Telemetry State
    this.state = {
      kidName: 'Explorer Leo',
      avatar: 'fox',
      avatarEmoji: '🦊',
      accessory: 'crown',
      accessoryEmoji: '👑',
      soundEnabled: true,
      voiceEnabled: true,
      musicEnabled: false,
      currentTheme: 'theme-rainbow',
      
      // Dynamic Playstyle Telemetry
      scores: {
        creative: 3,
        logic: 3,
        nature: 3,
        heart: 3,
        energy: 3,
        music: 3,
        builder: 3,
        curious: 3
      },
      choicesHistory: [], // stores { text, category, evidence }
      totalChoices: 0,
      activeGame: null,
      
      // Game-specific active states
      critterGame: { stage: 1, critter: null, habitatItems: [] },
      mazeGame: { chamber: 1 },
      inventorGame: { phase: 1, hull: null, engine: null, gadget: null, starsCollected: 0 },
      rhythmGame: { beatsCount: 0 }
    };

    this.dom = {
      screens: {
        welcome: document.getElementById('screen-welcome'),
        arcadeHub: document.getElementById('screen-arcade-hub'),
        gameArena: document.getElementById('screen-game-arena'),
        results: document.getElementById('screen-results')
      },
      // Header & HUD
      brandLogo: document.getElementById('brand-logo'),
      crystalOrb: document.getElementById('crystal-orb'),
      totalChoicesCount: document.getElementById('total-choices-count'),
      hudLeadingTalent: document.getElementById('hud-leading-talent'),
      sparkToast: document.getElementById('live-spark-toast'),
      sparkToastText: document.getElementById('spark-toast-text'),
      toggleMusicBtn: document.getElementById('toggle-music-btn'),
      toggleSoundBtn: document.getElementById('toggle-sound-btn'),
      toggleVoiceBtn: document.getElementById('toggle-voice-btn'),
      musicStateText: document.getElementById('music-state-text'),
      soundStateText: document.getElementById('sound-state-text'),
      voiceStateText: document.getElementById('voice-state-text'),
      themeBtn: document.getElementById('theme-btn'),
      themeMenu: document.getElementById('theme-menu'),
      quickRevealBtn: document.getElementById('quick-reveal-btn'),
      
      // Welcome Screen
      nameInput: document.getElementById('explorer-name-input'),
      avatarGrid: document.getElementById('avatar-grid'),
      accessoryGrid: document.getElementById('accessory-grid'),
      startArcadeBtn: document.getElementById('start-arcade-btn'),
      mascotBubble: document.getElementById('mascot-bubble'),
      mascotSpeakBtn: document.getElementById('mascot-speak-btn'),
      
      // Hub
      hubPlayerDisplay: document.getElementById('hub-player-display'),
      hubChoicesDisplay: document.getElementById('hub-choices-display'),
      hubDominantTrait: document.getElementById('hub-dominant-trait'),
      hubRevealBtn: document.getElementById('hub-reveal-btn'),
      
      // Arena
      arenaBackBtn: document.getElementById('arena-back-btn'),
      arenaGameIcon: document.getElementById('arena-game-icon'),
      arenaGameTitle: document.getElementById('arena-game-title'),
      arenaChoiceCounter: document.getElementById('arena-choice-counter'),
      arenaCritter: document.getElementById('arena-critter'),
      arenaMaze: document.getElementById('arena-maze'),
      arenaInventor: document.getElementById('arena-inventor'),
      arenaRhythm: document.getElementById('arena-rhythm'),
      critterContentZone: document.getElementById('critter-content-zone'),
      critterStepLabel: document.getElementById('critter-step-label'),
      critterStagePrompt: document.getElementById('critter-stage-prompt'),
      mazeContentZone: document.getElementById('maze-content-zone'),
      mazeStepLabel: document.getElementById('maze-step-label'),
      mazeStagePrompt: document.getElementById('maze-stage-prompt'),
      inventorContentZone: document.getElementById('inventor-content-zone'),
      inventorStepLabel: document.getElementById('inventor-step-label'),
      inventorStagePrompt: document.getElementById('inventor-stage-prompt'),
      rhythmContentZone: document.getElementById('rhythm-content-zone'),

      // Results
      resultKidName: document.getElementById('result-kid-name'),
      resultAvatarCircle: document.getElementById('result-avatar-circle'),
      resultCrownEmoji: document.getElementById('result-crown-emoji'),
      resultPrimaryTitle: document.getElementById('result-primary-title'),
      resultHeroSummary: document.getElementById('result-hero-summary'),
      resultQuickTags: document.getElementById('result-quick-tags'),
      talentBarsContainer: document.getElementById('talent-bars-container'),
      specialTraitsContainer: document.getElementById('special-traits-container'),
      mentorNamesText: document.getElementById('mentor-names-text'),
      missionsGridContainer: document.getElementById('missions-grid-container'),
      openCertBtn: document.getElementById('open-certificate-btn'),
      returnArcadeBtn: document.getElementById('return-arcade-btn'),
      printSummaryBtn: document.getElementById('print-summary-btn'),
      modalCert: document.getElementById('modal-certificate'),
      closeCertBtn: document.getElementById('close-cert-btn'),
      doPrintCertBtn: document.getElementById('do-print-cert-btn'),
      certColorPicker: document.getElementById('cert-color-picker'),
      certKidName: document.getElementById('cert-kid-name'),
      certSuperpowerTitle: document.getElementById('cert-superpower-title'),
      certDateLine: document.getElementById('cert-date-line')
    };

    this.init();
  }

  init() {
    this.loadStorage();
    this.updateControlsUI();
    this.initFloatingStars();
    this.bindEvents();

    if (this.state.kidName) {
      this.dom.nameInput.value = this.state.kidName;
    }
  }

  loadStorage() {
    try {
      const savedName = localStorage.getItem('wonderkid_name');
      if (savedName) this.state.kidName = savedName;
      const savedTheme = localStorage.getItem('wonderkid_theme');
      if (savedTheme) {
        this.state.currentTheme = savedTheme;
        document.body.className = savedTheme;
      }
    } catch {
      // Storage unavailable
    }
  }

  saveStorage() {
    try {
      localStorage.setItem('wonderkid_name', this.state.kidName);
      localStorage.setItem('wonderkid_theme', this.state.currentTheme);
    } catch {
      // Storage unavailable
    }
  }

  initFloatingStars() {
    const container = document.getElementById('stars-container');
    if (!container) return;
    const starSymbols = ['⭐', '✨', '🌟', '💫', '🎈', '🎨', '🚀'];
    for (let i = 0; i < 20; i++) {
      const star = document.createElement('div');
      star.className = 'floating-star-element';
      star.textContent = starSymbols[i % starSymbols.length];
      star.style.left = `${Math.random() * 95}%`;
      star.style.top = `${Math.random() * 95}%`;
      star.style.animationDelay = `${(Math.random() * 5).toFixed(1)}s`;
      star.style.animationDuration = `${(Math.random() * 4 + 4).toFixed(1)}s`;
      container.appendChild(star);
    }
  }

  updateControlsUI() {
    this.dom.soundStateText.textContent = this.state.soundEnabled ? 'On' : 'Off';
    this.dom.voiceStateText.textContent = this.state.voiceEnabled ? 'On' : 'Off';
    this.dom.musicStateText.textContent = this.state.musicEnabled ? 'On' : 'Off';
  }

  bindEvents() {
    // Brand Logo
    this.dom.brandLogo.addEventListener('click', () => {
      this.audio.playPop();
      this.switchScreen('screen-arcade-hub');
    });

    // Sound Toggle
    this.dom.toggleSoundBtn.addEventListener('click', () => {
      this.state.soundEnabled = !this.state.soundEnabled;
      this.audio.enabled = this.state.soundEnabled;
      if (this.state.soundEnabled) this.audio.playPop();
      this.updateControlsUI();
    });

    // Voice Toggle
    this.dom.toggleVoiceBtn.addEventListener('click', () => {
      this.state.voiceEnabled = !this.state.voiceEnabled;
      this.voice.enabled = this.state.voiceEnabled;
      if (this.state.voiceEnabled) {
        this.voice.speak('Voice is on! Play games and have fun!');
      } else {
        this.voice.stop();
      }
      this.updateControlsUI();
    });

    // Music Box Toggle
    this.dom.toggleMusicBtn.addEventListener('click', () => {
      this.state.musicEnabled = !this.state.musicEnabled;
      if (this.state.musicEnabled) {
        this.audio.playChime();
        this.audio.startMusicBox();
      } else {
        this.audio.stopMusicBox();
      }
      this.updateControlsUI();
    });

    // Theme Picker
    this.dom.themeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.audio.playPop();
      this.dom.themeMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!this.dom.themeMenu.contains(e.target) && e.target !== this.dom.themeBtn) {
        this.dom.themeMenu.classList.add('hidden');
      }
    });

    this.dom.themeMenu.querySelectorAll('.theme-opt').forEach(opt => {
      opt.addEventListener('click', () => {
        const theme = opt.dataset.theme;
        document.body.className = theme;
        this.state.currentTheme = theme;
        this.saveStorage();
        this.audio.playChime();
        this.dom.themeMenu.classList.add('hidden');
      });
    });

    // Mascot Speak
    this.dom.mascotSpeakBtn.addEventListener('click', () => {
      this.audio.playPop();
      this.voice.speak("Hey Player! Welcome to the WonderKid Arcade! No tests here—just play fun games! Every choice you make reveals what makes you special!");
    });

    // Companion Avatar Selection
    this.dom.avatarGrid.querySelectorAll('.avatar-choice').forEach(choice => {
      choice.addEventListener('click', () => {
        this.audio.playPop();
        this.dom.avatarGrid.querySelectorAll('.avatar-choice').forEach(c => {
          c.classList.remove('selected');
          c.setAttribute('aria-checked', 'false');
        });
        choice.classList.add('selected');
        choice.setAttribute('aria-checked', 'true');
        this.state.avatar = choice.dataset.avatar;
        this.state.avatarEmoji = choice.querySelector('.av-emoji').textContent;
      });
    });

    // Companion Gear Selection
    this.dom.accessoryGrid.querySelectorAll('.accessory-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.audio.playPop();
        this.dom.accessoryGrid.querySelectorAll('.accessory-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.state.accessory = btn.dataset.acc;
        this.state.accessoryEmoji = btn.querySelector('.acc-emoji').textContent;
      });
    });

    // Enter Arcade World
    this.dom.startArcadeBtn.addEventListener('click', () => {
      const rawName = this.dom.nameInput.value.trim();
      this.state.kidName = rawName.length > 0 ? rawName : 'Super Player';
      this.saveStorage();
      this.audio.playChime();
      this.enterArcadeHub();
    });

    // Hub Play Buttons
    document.querySelectorAll('.play-game-btn, .game-showcase-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const targetBtn = e.target.closest('.play-game-btn') || card;
        const gameId = targetBtn.dataset.game || card.dataset.game;
        if (gameId) {
          this.audio.playChime();
          this.launchGame(gameId);
        }
      });
    });

    // Arena Back to Hub
    this.dom.arenaBackBtn.addEventListener('click', () => {
      this.audio.playPop();
      this.enterArcadeHub();
    });

    // Reveal Buttons
    const triggerReveal = () => {
      this.audio.playFanfare();
      this.showSuperpowerReveal();
    };
    this.dom.quickRevealBtn.addEventListener('click', triggerReveal);
    this.dom.hubRevealBtn.addEventListener('click', triggerReveal);

    // Return to Arcade from Results
    this.dom.returnArcadeBtn.addEventListener('click', () => {
      this.audio.playPop();
      this.enterArcadeHub();
    });

    // Diploma Modal Open/Close
    this.dom.openCertBtn.addEventListener('click', () => {
      this.audio.playFanfare();
      this.dom.modalCert.classList.remove('hidden');
      this.confetti.fire(2500);
    });

    this.dom.closeCertBtn.addEventListener('click', () => {
      this.audio.playPop();
      this.dom.modalCert.classList.add('hidden');
    });

    this.dom.doPrintCertBtn.addEventListener('click', () => {
      window.print();
    });

    this.dom.printSummaryBtn.addEventListener('click', () => {
      this.dom.modalCert.classList.remove('hidden');
      setTimeout(() => window.print(), 300);
    });

    // Diploma Color Picker
    this.dom.certColorPicker.querySelectorAll('.color-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        this.audio.playPop();
        this.dom.certColorPicker.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        this.updateCertColor(dot.dataset.color);
      });
    });
  }

  switchScreen(screenId) {
    this.voice.stop();
    Object.keys(this.dom.screens).forEach(key => {
      const screen = this.dom.screens[key];
      if (screen.id === screenId) {
        screen.classList.remove('hidden');
        screen.classList.add('active');
      } else {
        screen.classList.remove('active');
        screen.classList.add('hidden');
      }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==========================================================================
  // REAL-TIME PLAYSTYLE TELEMETRY & SPARK ENGINE
  // ==========================================================================
  recordChoice(category, points = 3, message = 'Spark Discovered!', evidence = '') {
    if (this.state.scores[category] !== undefined) {
      this.state.scores[category] += points;
    }
    this.state.totalChoices++;

    this.state.choicesHistory.push({
      category,
      message,
      evidence
    });

    // Update HUD Stats
    this.dom.totalChoicesCount.textContent = this.state.totalChoices;
    this.dom.arenaChoiceCounter.textContent = this.state.totalChoices;
    this.dom.hubChoicesDisplay.textContent = this.state.totalChoices;

    // Find current dominant talent
    const sorted = Object.keys(this.state.scores).sort((a, b) => this.state.scores[b] - this.state.scores[a]);
    const lead = SUPERPOWER_DOMAINS[sorted[0]];
    this.dom.hudLeadingTalent.textContent = `Spark: ${lead.name}`;
    this.dom.hubDominantTrait.textContent = `${lead.icon} ${lead.name}`;

    // Live Spark Floating Toast
    this.showSparkToast(message, lead.icon);

    // Audio sparkle
    this.audio.playChime();
  }

  showSparkToast(text, icon = '✨') {
    this.dom.sparkToastText.textContent = text;
    this.dom.sparkToast.querySelector('.spark-toast-icon').textContent = icon;
    this.dom.sparkToast.classList.remove('hidden');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.dom.sparkToast.classList.add('hidden');
    }, 2400);
  }

  // ==========================================================================
  // SCREEN 2: Arcade Hub
  // ==========================================================================
  enterArcadeHub() {
    this.dom.hubPlayerDisplay.textContent = this.state.kidName;
    this.switchScreen('screen-arcade-hub');
  }

  // ==========================================================================
  // SCREEN 3: Launch Mini-Games
  // ==========================================================================
  launchGame(gameId) {
    this.state.activeGame = gameId;
    this.switchScreen('screen-game-arena');

    // Hide all arena containers
    this.dom.arenaCritter.classList.add('hidden');
    this.dom.arenaMaze.classList.add('hidden');
    this.dom.arenaInventor.classList.add('hidden');
    this.dom.arenaRhythm.classList.add('hidden');

    if (gameId === 'critter') {
      this.dom.arenaGameIcon.textContent = '🐾';
      this.dom.arenaGameTitle.textContent = 'Critter Rescue & Sanctuary';
      this.dom.arenaCritter.classList.remove('hidden');
      this.initCritterGame();
    } else if (gameId === 'maze') {
      this.dom.arenaGameIcon.textContent = '🗝️';
      this.dom.arenaGameTitle.textContent = 'Mystery Maze & Ancient Vault';
      this.dom.arenaMaze.classList.remove('hidden');
      this.initMazeGame();
    } else if (gameId === 'inventor') {
      this.dom.arenaGameIcon.textContent = '🚀';
      this.dom.arenaGameTitle.textContent = 'Flying Machine Inventor';
      this.dom.arenaInventor.classList.remove('hidden');
      this.initInventorGame();
    } else if (gameId === 'rhythm') {
      this.dom.arenaGameIcon.textContent = '🎵';
      this.dom.arenaGameTitle.textContent = 'Cosmic Rhythm & Light Painter';
      this.dom.arenaRhythm.classList.remove('hidden');
      this.initRhythmGame();
    }
  }

  // --------------------------------------------------------------------------
  // GAME 1: CRITTER RESCUE & SANCTUARY
  // --------------------------------------------------------------------------
  initCritterGame() {
    this.state.critterGame = { stage: 1, critter: null, habitatItems: [] };
    this.renderCritterStage1();
  }

  renderCritterStage1() {
    this.dom.critterStepLabel.textContent = 'Stage 1 of 3: Choose Your Rescue Companion';
    this.dom.critterStagePrompt.textContent = 'Three magical forest creatures are in trouble. Who calls to your heart first?';

    this.dom.critterContentZone.innerHTML = `
      <div class="interactive-choice-grid">
        <button class="game-action-card" data-critter="pup">
          <div class="action-icon-box">🐶</div>
          <div>
            <div class="action-title">Star-Pup Sparkle</div>
            <div class="action-desc">Shivering in the cold bramble bush after a thunderstorm. Needs warmth and love.</div>
          </div>
        </button>
        <button class="game-action-card" data-critter="owl">
          <div class="action-icon-box">🦉</div>
          <div>
            <div class="action-title">Clockwork Archimedes</div>
            <div class="action-desc">An ancient brass automaton owl with gears jammed by a glowing crystal leaf.</div>
          </div>
        </button>
        <button class="game-action-card" data-critter="dragon">
          <div class="action-icon-box">🐲</div>
          <div>
            <div class="action-title">Baby Moss-Dragon</div>
            <div class="action-desc">A hungry, curious creature hiding shyly under ancient mossy rocks.</div>
          </div>
        </button>
      </div>
    `;

    this.dom.critterContentZone.querySelectorAll('.game-action-card').forEach(btn => {
      btn.addEventListener('click', () => {
        const critter = btn.dataset.critter;
        this.state.critterGame.critter = critter;

        if (critter === 'pup') {
          this.recordChoice('heart', 4, '+Heart Hero! You reached out to comfort a scared pet!', 'Chose to rescue the shivering Star-Pup first');
        } else if (critter === 'owl') {
          this.recordChoice('builder', 4, '+Master Maker! You jumped to fix complex clockwork gears!', 'Chose to repair the mechanical Clockwork Owl');
        } else {
          this.recordChoice('nature', 4, '+Earth Guardian! You sought out a wild mythical dragon!', 'Chose to care for the shy Baby Moss-Dragon');
        }

        this.renderCritterStage2();
      });
    });
  }

  renderCritterStage2() {
    const c = this.state.critterGame.critter;
    const name = c === 'pup' ? 'Star-Pup' : c === 'owl' ? 'Clockwork Owl' : 'Baby Moss-Dragon';
    const icon = c === 'pup' ? '🐶' : c === 'owl' ? '🦉' : '🐲';

    this.dom.critterStepLabel.textContent = 'Stage 2 of 3: How Do You Comfort & Help?';
    this.dom.critterStagePrompt.textContent = `You kneel beside ${icon} ${name}. What is your natural instinct to help?`;

    this.dom.critterContentZone.innerHTML = `
      <div class="interactive-choice-grid">
        <button class="game-action-card" data-act="gentle">
          <div class="action-icon-box">🧣</div>
          <div>
            <div class="action-title">Wrap in a Warm Blanket & Sing</div>
            <div class="action-desc">Offer soothing warmth, gentle soft whispers, and a peaceful humming song.</div>
          </div>
        </button>
        <button class="game-action-card" data-act="treat">
          <div class="action-icon-box">🍪</div>
          <div>
            <div class="action-title">Offer Crystal Berries & Play</div>
            <div class="action-desc">Feed them nutritious forest fruit and make silly friendly faces to cheer them up.</div>
          </div>
        </button>
        <button class="game-action-card" data-act="shelter">
          <div class="action-icon-box">🛠️</div>
          <div>
            <div class="action-title">Build a Sturdy Leaf Tent</div>
            <div class="action-desc">Gather sturdy twigs and waterproof palm leaves to craft an immediate protective roof.</div>
          </div>
        </button>
      </div>
    `;

    this.dom.critterContentZone.querySelectorAll('.game-action-card').forEach(btn => {
      btn.addEventListener('click', () => {
        const act = btn.dataset.act;
        if (act === 'gentle') {
          this.recordChoice('heart', 3, '+Empathy! Gentle soothing presence!', 'Comforted creature with warmth and soft singing');
          this.recordChoice('music', 2);
        } else if (act === 'treat') {
          this.recordChoice('nature', 3, '+Nature Caretaker! Nutritious care!', 'Fed creature forest crystal berries and cheered it up');
          this.recordChoice('creative', 2);
        } else {
          this.recordChoice('builder', 3, '+Builder Ingenuity! Sturdy shelter!', 'Constructed a sturdy waterproof shelter on the spot');
          this.recordChoice('logic', 2);
        }

        this.renderCritterStage3();
      });
    });
  }

  renderCritterStage3() {
    const c = this.state.critterGame.critter;
    const icon = c === 'pup' ? '🐶' : c === 'owl' ? '🦉' : '🐲';

    this.dom.critterStepLabel.textContent = 'Stage 3 of 3: Build Their Dream Sanctuary Habitat!';
    this.dom.critterStagePrompt.textContent = `Click features below to design the ultimate home for your new companion ${icon}:`;

    this.dom.critterContentZone.innerHTML = `
      <div class="habitat-canvas-box">
        <div class="habitat-critter-avatar" id="habitat-pet-avatar">${icon}</div>
        <div class="habitat-items-display" id="habitat-items-display"></div>
      </div>

      <div class="habitat-builder-palette">
        <button class="palette-item-btn" data-item="🌈" data-trait="creative">
          <span>🌈 Rainbow Sunbeam Crystal</span>
        </button>
        <button class="palette-item-btn" data-item="📚" data-trait="logic">
          <span>📚 Puzzle Treehouse Library</span>
        </button>
        <button class="palette-item-btn" data-item="🌸" data-trait="nature">
          <span>🌸 Whispering Meadow Garden</span>
        </button>
        <button class="palette-item-btn" data-item="🤸" data-trait="energy">
          <span>🤸 Cloud Trampoline Slide</span>
        </button>
        <button class="palette-item-btn" data-item="🎵" data-trait="music">
          <span>🎵 Windchime Melody Pavilion</span>
        </button>
      </div>

      <div style="text-align: center; margin-top: 1.5rem;">
        <button id="finish-habitat-btn" class="cta-large-btn gold-glow">
          <span>🎉 Sanctuary Complete! Let's Go Back</span>
        </button>
      </div>
    `;

    const itemsDisplay = document.getElementById('habitat-items-display');
    this.dom.critterContentZone.querySelectorAll('.palette-item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.dataset.item;
        const trait = btn.dataset.trait;
        this.audio.playPop();

        if (!btn.classList.contains('added')) {
          btn.classList.add('added');
          const span = document.createElement('span');
          span.textContent = item;
          span.style.animation = 'toastPop 0.3s ease-out';
          itemsDisplay.appendChild(span);

          this.recordChoice(trait, 3, `+Added ${item} to sanctuary!`, `Designed sanctuary with ${btn.textContent.trim()}`);
        }
      });
    });

    document.getElementById('finish-habitat-btn').addEventListener('click', () => {
      this.audio.playFanfare();
      this.confetti.fire(2000);
      setTimeout(() => this.enterArcadeHub(), 800);
    });
  }

  // --------------------------------------------------------------------------
  // GAME 2: THE MYSTERY MAZE & ANCIENT VAULT
  // --------------------------------------------------------------------------
  initMazeGame() {
    this.state.mazeGame = { chamber: 1 };
    this.renderMazeChamber1();
  }

  renderMazeChamber1() {
    this.dom.mazeStepLabel.textContent = 'Chamber 1 of 3: The Crossroad of Destinies';
    this.dom.mazeStagePrompt.textContent = 'You enter an underground cavern with 3 ancient portal gates. Which door do you unlock?';

    this.dom.mazeContentZone.innerHTML = `
      <div class="interactive-choice-grid">
        <button class="game-action-card" data-door="riddle">
          <div class="action-icon-box">🧩</div>
          <div>
            <div class="action-title">The Rune Symbol Gate</div>
            <div class="action-desc">A glowing granite slab etched with mathematical sequence puzzles. Needs deep thinking!</div>
          </div>
        </button>
        <button class="game-action-card" data-door="trampoline">
          <div class="action-icon-box">⚡</div>
          <div>
            <div class="action-title">The Bouncy Canyon Trampoline</div>
            <div class="action-desc">Leap across a starry chasm using springy mushrooms. High speed and agility!</div>
          </div>
        </button>
        <button class="game-action-card" data-door="fairy">
          <div class="action-icon-box">🧚</div>
          <div>
            <div class="action-title">The Whispering Tunnel</div>
            <div class="action-desc">A lost cave sprite asks for help finding its luminous family. A path of heart!</div>
          </div>
        </button>
      </div>
    `;

    this.dom.mazeContentZone.querySelectorAll('.game-action-card').forEach(btn => {
      btn.addEventListener('click', () => {
        const door = btn.dataset.door;
        if (door === 'riddle') {
          this.recordChoice('logic', 4, '+Mind Wizard! Cracked the ancient rune riddle!', 'Chose to solve the mathematical Rune Symbol Gate');
          this.recordChoice('curious', 2);
        } else if (door === 'trampoline') {
          this.recordChoice('energy', 4, '+Kinesthetic Dynamo! Daring canyon leap!', 'Chose the high-speed Bouncy Canyon Trampoline leap');
        } else {
          this.recordChoice('heart', 4, '+Heart Hero! Guided the lost cave sprite!', 'Chose to help the lost cave sprite in the Whispering Tunnel');
          this.recordChoice('nature', 2);
        }
        this.renderMazeChamber2();
      });
    });
  }

  renderMazeChamber2() {
    this.dom.mazeStepLabel.textContent = 'Chamber 2 of 3: The Broken Crystal River';
    this.dom.mazeStagePrompt.textContent = 'A glowing subterranean river blocks the passage. How do you cross to the vault?';

    this.dom.mazeContentZone.innerHTML = `
      <div class="interactive-choice-grid">
        <button class="game-action-card" data-act="bridge">
          <div class="action-icon-box">📐</div>
          <div>
            <div class="action-title">Calculate & Build a Stepping Bridge</div>
            <div class="action-desc">Measure the river width and assemble balanced stone blocks in a secure sequence.</div>
          </div>
        </button>
        <button class="game-action-card" data-act="spell">
          <div class="action-icon-box">✨</div>
          <div>
            <div class="action-title">Paint a Floating Rainbow Beam</div>
            <div class="action-desc">Use creative imagination to paint glowing stardust light across the waters.</div>
          </div>
        </button>
        <button class="game-action-card" data-act="dolphin">
          <div class="action-icon-box">🐬</div>
          <div>
            <div class="action-title">Call Upon Friendly River Creatures</div>
            <div class="action-desc">Whistle gently into the water to partner with glowing crystal turtles for a ride!</div>
          </div>
        </button>
      </div>
    `;

    this.dom.mazeContentZone.querySelectorAll('.game-action-card').forEach(btn => {
      btn.addEventListener('click', () => {
        const act = btn.dataset.act;
        if (act === 'bridge') {
          this.recordChoice('builder', 3, '+Master Maker! Structural engineering!', 'Engineered a balanced stepping-stone bridge across the river');
          this.recordChoice('logic', 2);
        } else if (act === 'spell') {
          this.recordChoice('creative', 4, '+Creative Spark! Imagination painted the path!', 'Created a floating rainbow starlight beam to cross');
        } else {
          this.recordChoice('nature', 3, '+Animal Whisperer! Partnered with river turtles!', 'Whistled and teamed up with crystal river creatures');
          this.recordChoice('heart', 2);
        }
        this.renderMazeChamber3();
      });
    });
  }

  renderMazeChamber3() {
    this.dom.mazeStepLabel.textContent = 'Chamber 3 of 3: The Grand Vault Treasure';
    this.dom.mazeStagePrompt.textContent = 'You reach the central Golden Chest of the Ancients! What magical treasure do you choose?';

    this.dom.mazeContentZone.innerHTML = `
      <div class="interactive-choice-grid">
        <button class="game-action-card" data-chest="blueprint">
          <div class="action-icon-box">📜</div>
          <div>
            <div class="action-title">The Grand Inventor’s Blueprint</div>
            <div class="action-desc">Plans for infinite magical machines and solar-powered robotic helpers!</div>
          </div>
        </button>
        <button class="game-action-card" data-chest="orb">
          <div class="action-icon-box">🔮</div>
          <div>
            <div class="action-title">The Cosmic Stargazer Sphere</div>
            <div class="action-desc">Peer into distant galaxies, black holes, and the secrets of the cosmos.</div>
          </div>
        </button>
        <button class="game-action-card" data-chest="brush">
          <div class="action-icon-box">🖌️</div>
          <div>
            <div class="action-title">The Living Magic Paintbrush</div>
            <div class="action-desc">Anything you paint or doodle materializes into the real world in full 3D!</div>
          </div>
        </button>
        <button class="game-action-card" data-chest="elixir">
          <div class="action-icon-box">💖</div>
          <div>
            <div class="action-title">The Fountain of Boundless Joy</div>
            <div class="action-desc">A healing glow that brings laughter, comfort, and friendship to everyone.</div>
          </div>
        </button>
      </div>
    `;

    this.dom.mazeContentZone.querySelectorAll('.game-action-card').forEach(btn => {
      btn.addEventListener('click', () => {
        const chest = btn.dataset.chest;
        if (chest === 'blueprint') {
          this.recordChoice('builder', 4, '+Master Maker! Chose invention blueprints!', 'Selected the Grand Inventor’s Blueprint from the vault');
        } else if (chest === 'orb') {
          this.recordChoice('curious', 4, '+Cosmic Wonder! Chose the Stargazer Sphere!', 'Selected the Cosmic Stargazer Sphere to explore deep space');
        } else if (chest === 'brush') {
          this.recordChoice('creative', 4, '+Creative Genius! Living paintbrush chosen!', 'Selected the Living Magic Paintbrush to paint reality');
        } else {
          this.recordChoice('heart', 4, '+Heart Hero! Boundless joy chosen for all!', 'Selected the Fountain of Boundless Joy to heal and cheer others');
        }

        this.audio.playFanfare();
        this.confetti.fire(2200);
        setTimeout(() => this.enterArcadeHub(), 1000);
      });
    });
  }

  // --------------------------------------------------------------------------
  // GAME 3: THE FLYING MACHINE INVENTOR
  // --------------------------------------------------------------------------
  initInventorGame() {
    this.state.inventorGame = { phase: 1, hull: null, engine: null, gadget: null, starsCollected: 0 };
    this.renderInventorPhase1();
  }

  renderInventorPhase1() {
    this.dom.inventorStepLabel.textContent = 'Workshop Phase 1 of 3: Airframe Design';
    this.dom.inventorStagePrompt.textContent = 'Select the main fuselage chassis for your aircraft invention:';

    this.dom.inventorContentZone.innerHTML = `
      <div class="interactive-choice-grid">
        <button class="game-action-card" data-hull="rocket">
          <div class="action-icon-box">🚀</div>
          <div>
            <div class="action-title">Cosmic Starlight Rocket</div>
            <div class="action-desc">Aerodynamic titanium hull with swept wings. Built for supreme speed and space loops!</div>
          </div>
        </button>
        <button class="game-action-card" data-hull="galleon">
          <div class="action-icon-box">⛵</div>
          <div>
            <div class="action-title">Wooden Cloud Galleon</div>
            <div class="action-desc">Handcrafted cedar wood with cozy observation deck, brass lanterns, and steam gears.</div>
          </div>
        </button>
        <button class="game-action-card" data-hull="balloon">
          <div class="action-icon-box">🎈</div>
          <div>
            <div class="action-title">Solar Flora Float Balloon</div>
            <div class="action-desc">A botanical glass sphere suspended beneath a giant solar silk balloon. Quiet and peaceful.</div>
          </div>
        </button>
      </div>
    `;

    this.dom.inventorContentZone.querySelectorAll('.game-action-card').forEach(btn => {
      btn.addEventListener('click', () => {
        const hull = btn.dataset.hull;
        this.state.inventorGame.hull = hull;
        if (hull === 'rocket') {
          this.recordChoice('energy', 3, '+Speed & Daring!', 'Built a supersonic Cosmic Starlight Rocket airframe');
          this.recordChoice('builder', 2);
        } else if (hull === 'galleon') {
          this.recordChoice('builder', 4, '+Master Craftsman!', 'Handcrafted a Wooden Cloud Galleon with clockwork gears');
          this.recordChoice('creative', 2);
        } else {
          this.recordChoice('nature', 4, '+Eco-Harmonic Inventor!', 'Designed a peaceful Solar Flora Float balloon');
          this.recordChoice('curious', 2);
        }
        this.renderInventorPhase2();
      });
    });
  }

  renderInventorPhase2() {
    this.dom.inventorStepLabel.textContent = 'Workshop Phase 2 of 3: Propulsion Engines';
    this.dom.inventorStagePrompt.textContent = 'What power source will drive your aircraft across the clouds?';

    this.dom.inventorContentZone.innerHTML = `
      <div class="interactive-choice-grid">
        <button class="game-action-card" data-engine="spark">
          <div class="action-icon-box">⚡</div>
          <div>
            <div class="action-title">Lightning Spark Turbines</div>
            <div class="action-desc">Twin electric coil turbines that convert cloud static into thunderous acceleration!</div>
          </div>
        </button>
        <button class="game-action-card" data-engine="bubbles">
          <div class="action-icon-box">🫧</div>
          <div>
            <div class="action-title">Rainbow Bubble Jet Thrusters</div>
            <div class="action-desc">Cheerfully pops giant anti-gravity bubbles that bounce the craft playfully into the sky!</div>
          </div>
        </button>
        <button class="game-action-card" data-engine="glider">
          <div class="action-icon-box">🍃</div>
          <div>
            <div class="action-title">Silent Falcon Glider Sails</div>
            <div class="action-desc">Feather-light mechanical sails that ride invisible thermal air currents without noise.</div>
          </div>
        </button>
      </div>
    `;

    this.dom.inventorContentZone.querySelectorAll('.game-action-card').forEach(btn => {
      btn.addEventListener('click', () => {
        const eng = btn.dataset.engine;
        this.state.inventorGame.engine = eng;
        if (eng === 'spark') {
          this.recordChoice('logic', 3, '+Science & Electronics!', 'Powered invention with Lightning Spark Turbines');
          this.recordChoice('builder', 2);
        } else if (eng === 'bubbles') {
          this.recordChoice('creative', 4, '+Playful Creative Genius!', 'Installed Rainbow Bubble Jet Thrusters');
        } else {
          this.recordChoice('nature', 4, '+Biomimicry Champion!', 'Designed Silent Falcon Glider Sails that ride natural thermals');
        }
        this.renderInventorPhase3();
      });
    });
  }

  renderInventorPhase3() {
    this.dom.inventorStepLabel.textContent = 'Workshop Phase 3 of 3: Mission Gadget & Sky Test Flight!';
    this.dom.inventorStagePrompt.textContent = 'Select your aircraft’s special gadget, then take it for a spin in the clouds!';

    this.dom.inventorContentZone.innerHTML = `
      <div class="interactive-choice-grid" style="margin-bottom: 1.5rem;">
        <button class="game-action-card" data-gadget="telescope">
          <div class="action-icon-box">🔭</div>
          <div>
            <div class="action-title">Deep Galaxy Stargazer Scope</div>
            <div class="action-desc">Scans for distant undiscovered planets and constellations.</div>
          </div>
        </button>
        <button class="game-action-card" data-gadget="treats">
          <div class="action-icon-box">🍬</div>
          <div>
            <div class="action-title">Bird & Critter Treat Launcher</div>
            <div class="action-desc">Drops fruit seeds and tasty biscuits to hungry birds in high mountain nests.</div>
          </div>
        </button>
        <button class="game-action-card" data-gadget="paint">
          <div class="action-icon-box">🎨</div>
          <div>
            <div class="action-title">Sky-Writing Color Cannon</div>
            <div class="action-desc">Sprays luminous, friendly messages and rainbow doodles across the clouds!</div>
          </div>
        </button>
      </div>

      <!-- Live Flight Run Arena -->
      <div class="flight-runner-arena" id="flight-arena">
        <div class="flight-aircraft" id="flight-ship">🚀</div>
        <div class="flight-cloud" style="top: 20%; animation-duration: 9s;">☁️</div>
        <div class="flight-cloud" style="top: 60%; animation-duration: 13s;">☁️</div>
        <div class="flight-star-collectible" style="left: 45%; top: 35%;">⭐</div>
        <div class="flight-star-collectible" style="left: 70%; top: 55%;">🌟</div>
      </div>

      <div style="text-align: center;">
        <button id="finish-flight-btn" class="cta-large-btn gold-glow">
          <span>🏆 Complete Flight Test & Return</span>
        </button>
      </div>
    `;

    const ship = document.getElementById('flight-ship');
    const hullIcon = this.state.inventorGame.hull === 'rocket' ? '🚀' : this.state.inventorGame.hull === 'galleon' ? '⛵' : '🎈';
    if (ship) ship.textContent = hullIcon;

    this.dom.inventorContentZone.querySelectorAll('.game-action-card').forEach(btn => {
      btn.addEventListener('click', () => {
        const gadget = btn.dataset.gadget;
        this.state.inventorGame.gadget = gadget;
        this.dom.inventorContentZone.querySelectorAll('.game-action-card').forEach(c => c.style.borderColor = '#e2e8f0');
        btn.style.borderColor = '#10b981';

        if (gadget === 'telescope') {
          this.recordChoice('curious', 4, '+Cosmic Scholar!', 'Equipped Deep Galaxy Stargazer Scope');
        } else if (gadget === 'treats') {
          this.recordChoice('heart', 4, '+Heart Hero!', 'Equipped Bird & Critter Treat Launcher for mountain birds');
          this.recordChoice('nature', 2);
        } else {
          this.recordChoice('creative', 4, '+Sky Artist!', 'Equipped Sky-Writing Color Cannon for rainbow doodles');
        }
      });
    });

    // Star clicking in flight arena
    this.dom.inventorContentZone.querySelectorAll('.flight-star-collectible').forEach(star => {
      star.addEventListener('click', () => {
        this.audio.playChime();
        star.style.transform = 'scale(2)';
        star.style.opacity = '0';
        setTimeout(() => star.remove(), 200);
        this.recordChoice('energy', 2, '+Collected Sky Star!', 'Piloted craft with quick reflexes to collect stars');
      });
    });

    document.getElementById('finish-flight-btn').addEventListener('click', () => {
      this.audio.playFanfare();
      this.confetti.fire(2000);
      setTimeout(() => this.enterArcadeHub(), 800);
    });
  }

  // --------------------------------------------------------------------------
  // GAME 4: COSMIC RHYTHM & LIGHT PAINTER
  // --------------------------------------------------------------------------
  initRhythmGame() {
    this.dom.rhythmContentZone.innerHTML = `
      <div style="text-align: center; margin-bottom: 1.5rem;">
        <div style="font-family: var(--font-display); font-size: 1.15rem; color: var(--text-muted); margin-bottom: 0.75rem;">
          Choose your music mood:
        </div>
        <div style="display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap;">
          <button class="pill-btn vibe-btn selected" data-vibe="party">⚡ High-Energy Dance Groove</button>
          <button class="pill-btn vibe-btn" data-vibe="dream">🌌 Dreamy Astral Constellation</button>
          <button class="pill-btn vibe-btn" data-vibe="symphony">🎨 Wild Freeform Rainbow Jam</button>
        </div>
      </div>

      <div class="beatbox-arena">
        <div class="beat-pads-grid">
          <button class="beat-pad pad-bass" data-sound="bass" data-key="1">
            <span class="pad-symbol">🥁</span>
            <span class="pad-label">Bass Boom</span>
            <span class="pad-key">Key 1</span>
          </button>
          <button class="beat-pad pad-snare" data-sound="snare" data-key="2">
            <span class="pad-symbol">💥</span>
            <span class="pad-label">Snare Pop</span>
            <span class="pad-key">Key 2</span>
          </button>
          <button class="beat-pad pad-chime" data-sound="chime" data-key="3">
            <span class="pad-symbol">🔔</span>
            <span class="pad-label">Magic Chime</span>
            <span class="pad-key">Key 3</span>
          </button>
          <button class="beat-pad pad-laser" data-sound="laser" data-key="4">
            <span class="pad-symbol">⚡</span>
            <span class="pad-label">Cosmic Zap</span>
            <span class="pad-key">Key 4</span>
          </button>
        </div>

        <div class="rhythm-visualizer" id="rhythm-bars-box">
          <div class="viz-bar"></div>
          <div class="viz-bar"></div>
          <div class="viz-bar"></div>
          <div class="viz-bar"></div>
          <div class="viz-bar"></div>
          <div class="viz-bar"></div>
          <div class="viz-bar"></div>
        </div>

        <div class="beats-counter-row">
          <span>Beats Created: <strong id="rhythm-beats-num">0</strong> 🎶</span>
        </div>

        <div style="text-align: center; margin-top: 1.5rem;">
          <button id="finish-rhythm-btn" class="cta-large-btn gold-glow">
            <span>🌟 Done Jamming! Back to Arcade</span>
          </button>
        </div>
      </div>
    `;

    const beatsDisplay = document.getElementById('rhythm-beats-num');
    let beats = 0;

    // Vibe buttons
    this.dom.rhythmContentZone.querySelectorAll('.vibe-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.audio.playPop();
        this.dom.rhythmContentZone.querySelectorAll('.vibe-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        const vibe = btn.dataset.vibe;
        if (vibe === 'party') {
          this.recordChoice('energy', 3, '+Dance Energy!', 'Selected High-Energy Dance Groove');
          this.recordChoice('music', 2);
        } else if (vibe === 'dream') {
          this.recordChoice('curious', 3, '+Deep Dreamy Wonder!', 'Selected Dreamy Astral Constellation mood');
          this.recordChoice('music', 2);
        } else {
          this.recordChoice('creative', 4, '+Freeform Music Artist!', 'Selected Wild Freeform Rainbow Jam');
        }
      });
    });

    // Beat pads
    this.dom.rhythmContentZone.querySelectorAll('.beat-pad').forEach(pad => {
      pad.addEventListener('click', () => {
        const sound = pad.dataset.sound;
        if (sound === 'bass') this.audio.playBass();
        else if (sound === 'snare') this.audio.playSnare();
        else if (sound === 'chime') this.audio.playChimePad();
        else if (sound === 'laser') this.audio.playLaser();

        pad.classList.add('active-flash');
        setTimeout(() => pad.classList.remove('active-flash'), 150);

        beats++;
        beatsDisplay.textContent = beats;

        if (beats % 4 === 0) {
          this.recordChoice('music', 2, '+Rhythm Groove Streak!', 'Kept steady musical tempo on the beat pads');
        }
      });
    });

    document.getElementById('finish-rhythm-btn').addEventListener('click', () => {
      this.audio.playFanfare();
      this.confetti.fire(2000);
      setTimeout(() => this.enterArcadeHub(), 800);
    });
  }

  // ==========================================================================
  // SCREEN 4: SUPERPOWER PROFILE SYNTHESIS (FROM REAL GAMEPLAY)
  // ==========================================================================
  showSuperpowerReveal() {
    this.voice.stop();

    // 1. Sort domains by accumulated telemetry score
    const sorted = Object.keys(this.state.scores).sort((a, b) => this.state.scores[b] - this.state.scores[a]);
    const primaryKey = sorted[0];
    const secondaryKey = sorted[1];
    const tertiaryKey = sorted[2];

    const primaryData = SUPERPOWER_DOMAINS[primaryKey];
    const secondaryData = SUPERPOWER_DOMAINS[secondaryKey];

    // Compute composite Superhero Title
    const titleCombinations = {
      'creative+heart': 'The Cosmic Creator & Heart Hero',
      'creative+builder': 'The Master Architect of Wonders',
      'creative+logic': 'The Visionary Puzzle Alchemist',
      'logic+builder': 'The Grand Engineer & Logic Wizard',
      'logic+curious': 'The Cosmic Thinker & Mystery Solver',
      'nature+heart': 'The Gentle Earth & Creature Guardian',
      'nature+curious': 'The Wild Safari & Science Explorer',
      'energy+heart': 'The Fearless Champion & Team Leader',
      'energy+creative': 'The Dynamic Star & Stage Performer',
      'music+creative': 'The Melody Sorcerer & Sound Artist',
      'music+heart': 'The Harmony Hero & Spirit Lifter'
    };

    const pairKey = `${primaryKey}+${secondaryKey}`;
    const reversePairKey = `${secondaryKey}+${primaryKey}`;
    const generatedTitle = titleCombinations[pairKey] || titleCombinations[reversePairKey] || `The ${primaryData.name} & ${secondaryData.name}`;

    // Normalize percentages between 75% and 98% for positive psychology
    const maxTally = this.state.scores[primaryKey] || 10;
    const percentages = {};
    sorted.forEach(key => {
      const rawPct = (this.state.scores[key] / maxTally) * 98;
      percentages[key] = Math.max(75, Math.round(rawPct));
    });

    // Update Results DOM
    this.dom.resultKidName.textContent = this.state.kidName;
    this.dom.resultAvatarCircle.textContent = this.state.avatarEmoji;
    this.dom.resultCrownEmoji.textContent = this.state.accessoryEmoji;
    this.dom.resultPrimaryTitle.textContent = generatedTitle;
    this.dom.resultHeroSummary.textContent = `Discovered from your actual choices across the games! You proved to be a natural ${primaryData.name}, and your instinct for ${secondaryData.name} makes your playstyle completely unique!`;

    // Quick Tags
    this.dom.resultQuickTags.innerHTML = `
      <div class="super-tag-pill">${primaryData.icon} ${primaryData.title}</div>
      <div class="super-tag-pill">${secondaryData.icon} ${secondaryData.title}</div>
      <div class="super-tag-pill">⭐ ${this.state.totalChoices} Real Gameplay Choices Made</div>
    `;

    // Render Talent Radar Bars
    this.dom.talentBarsContainer.innerHTML = '';
    sorted.forEach((key, index) => {
      const data = SUPERPOWER_DOMAINS[key];
      const pct = percentages[key];
      const barItem = document.createElement('div');
      barItem.className = 'talent-bar-item';
      barItem.innerHTML = `
        <div class="talent-meta-row">
          <div class="talent-name-group">
            <span>${data.icon}</span>
            <span>${data.name}</span>
          </div>
          <div class="talent-score-val">${pct}% Mastery</div>
        </div>
        <div class="talent-bar-track">
          <div class="talent-bar-fill" style="width: 0%; background: ${data.color};"></div>
        </div>
      `;
      this.dom.talentBarsContainer.appendChild(barItem);

      setTimeout(() => {
        const fill = barItem.querySelector('.talent-bar-fill');
        if (fill) fill.style.width = `${pct}%`;
      }, 100 + index * 80);
    });

    // Render Gameplay Evidence Cards
    this.dom.specialTraitsContainer.innerHTML = '';
    const relevantChoices = this.state.choicesHistory.filter(c => c.evidence).slice(-3);
    
    // Fallback evidence if few choices made
    const evidenceCards = relevantChoices.length > 0 ? relevantChoices : [
      { category: primaryKey, evidence: 'Made thoughtful and caring moves during gameplay' },
      { category: secondaryKey, evidence: 'Explored with curiosity and creative flair' }
    ];

    evidenceCards.forEach(e => {
      const data = SUPERPOWER_DOMAINS[e.category] || primaryData;
      const card = document.createElement('div');
      card.className = 'trait-card';
      card.innerHTML = `
        <div class="trait-icon">${data.icon}</div>
        <div>
          <h4 class="trait-title">${data.name} in Action</h4>
          <p class="trait-desc">"${e.evidence || e.message}"</p>
        </div>
      `;
      this.dom.specialTraitsContainer.appendChild(card);
    });

    // Mentors Text
    this.dom.mentorNamesText.textContent = `${primaryData.mentors}, and ${secondaryData.mentors}!`;

    // Render Offline Quests
    this.dom.missionsGridContainer.innerHTML = '';
    const quests = [
      primaryData.missions[0],
      secondaryData.missions[0] || primaryData.missions[1],
      SUPERPOWER_DOMAINS[tertiaryKey]?.missions[0] || primaryData.missions[1]
    ];

    quests.forEach(q => {
      const card = document.createElement('div');
      card.className = 'mission-card';
      card.innerHTML = `
        <div>
          <div class="mission-top">
            <span class="mission-emoji">${q.icon}</span>
            <div><h4 class="mission-card-title">${q.title}</h4></div>
          </div>
          <p class="mission-card-desc">${q.desc}</p>
        </div>
        <button type="button" class="mission-check-btn">
          <span>⬜</span> <span>Mark as Completed</span>
        </button>
      `;

      const checkBtn = card.querySelector('.mission-check-btn');
      checkBtn.addEventListener('click', () => {
        this.audio.playChime();
        card.classList.toggle('completed');
        const isDone = card.classList.contains('completed');
        checkBtn.innerHTML = isDone ? '<span>✅</span> <span>Quest Accomplished!</span>' : '<span>⬜</span> <span>Mark as Completed</span>';
        if (isDone) this.confetti.fire(1200);
      });

      this.dom.missionsGridContainer.appendChild(card);
    });

    // Update Diploma
    this.dom.certKidName.textContent = `PLAYER ${this.state.kidName.toUpperCase()}`;
    this.dom.certSuperpowerTitle.textContent = generatedTitle.toUpperCase();

    const badge1 = document.getElementById('cert-badge-1-icon');
    const badge1Name = document.getElementById('cert-badge-1-name');
    const badge2 = document.getElementById('cert-badge-2-icon');
    const badge2Name = document.getElementById('cert-badge-2-name');
    const badge3 = document.getElementById('cert-badge-3-icon');
    const badge3Name = document.getElementById('cert-badge-3-name');

    if (badge1 && badge1Name) {
      badge1.textContent = primaryData.icon;
      badge1Name.textContent = primaryData.name;
    }
    if (badge2 && badge2Name) {
      badge2.textContent = secondaryData.icon;
      badge2Name.textContent = secondaryData.name;
    }
    if (badge3 && badge3Name) {
      const tertData = SUPERPOWER_DOMAINS[tertiaryKey] || secondaryData;
      badge3.textContent = tertData.icon;
      badge3Name.textContent = tertData.name;
    }

    const now = new Date();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.dom.certDateLine.textContent = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;

    // Switch Screen
    this.switchScreen('screen-results');
    this.audio.playFanfare();
    this.confetti.fire(3500);

    if (this.state.voiceEnabled) {
      setTimeout(() => {
        this.voice.speak(`Incredible job ${this.state.kidName}! Your gameplay choices revealed your superpower identity: ${generatedTitle}!`);
      }, 500);
    }
  }

  updateCertColor(colorKey) {
    const certBorder = document.querySelector('.cert-outer-border');
    const certInner = document.querySelector('.cert-inner-border');
    const seal = document.getElementById('cert-official-seal');
    if (!certBorder || !certInner) return;

    const colors = {
      gold: { outer: '#d97706', inner: '#b45309', seal: 'radial-gradient(circle, #fde047, #ca8a04)' },
      sapphire: { outer: '#0284c7', inner: '#0369a1', seal: 'radial-gradient(circle, #7dd3fc, #0284c7)' },
      emerald: { outer: '#059669', inner: '#047857', seal: 'radial-gradient(circle, #6ee7b7, #059669)' },
      cosmic: { outer: '#7c3aed', inner: '#6d28d9', seal: 'radial-gradient(circle, #c4b5fd, #7c3aed)' }
    };

    const c = colors[colorKey] || colors.gold;
    certBorder.style.borderColor = c.outer;
    certInner.style.borderColor = c.inner;
    if (seal) seal.style.background = c.seal;
  }
}

// Bootstrap on DOM load
window.addEventListener('DOMContentLoaded', () => {
  new WonderKidArcade();
});
