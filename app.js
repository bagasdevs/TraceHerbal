/**
 * TraceHerbal - Blockchain Traceability App
 * Shared JavaScript functionality
 */

// ===== UTILITY FUNCTIONS =====
const Utils = {
  // Format number with Indonesian thousand separator
  formatNumber: (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  },

  // Format date to Indonesian locale
  formatDate: (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  },

  // Generate random hash
  generateHash: () => {
    const chars = '0123456789abcdef';
    let hash = '0x';
    for (let i = 0; i < 64; i++) {
      hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return hash;
  },

  // Truncate hash for display
  truncateHash: (hash) => {
    if (!hash) return '';
    return hash.substring(0, 6) + '...' + hash.substring(hash.length - 4);
  },

  // Generate batch number
  generateBatchNumber: () => {
    const date = new Date();
    const year = date.getFullYear();
    const num = String(Math.floor(Math.random() * 999) + 1).padStart(3, '0');
    return `JM${year}-${num}`;
  },

  // Delay function for animations
  delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),

  // Save to localStorage
  save: (key, data) => {
    localStorage.setItem(`traceherbal_${key}`, JSON.stringify(data));
  },

  // Load from localStorage
  load: (key) => {
    const data = localStorage.getItem(`traceherbal_${key}`);
    return data ? JSON.parse(data) : null;
  }
};

// ===== TOAST NOTIFICATIONS =====
const Toast = {
  container: null,

  init: () => {
    if (!document.getElementById('toastContainer')) {
      const container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    Toast.container = document.getElementById('toastContainer');
  },

  show: (message, type = 'success', duration = 3000) => {
    if (!Toast.container) Toast.init();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
      success: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>',
      error: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
      warning: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
      info: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
    };

    toast.innerHTML = `
      <span style="color: var(--${type})">${icons[type] || icons.info}</span>
      <span>${message}</span>
      <button onclick="this.parentElement.remove()" style="background:none;border:none;cursor:pointer;padding:4px;color:var(--text-muted);">×</button>
    `;

    Toast.container.appendChild(toast);
    setTimeout(() => toast.remove(), duration);
  },

  success: (msg) => Toast.show(msg, 'success'),
  error: (msg) => Toast.show(msg, 'error'),
  warning: (msg) => Toast.show(msg, 'warning'),
  info: (msg) => Toast.show(msg, 'info')
};

// ===== MODAL MANAGEMENT =====
const Modal = {
  show: (id) => {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  hide: (id) => {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  hideAll: () => {
    document.querySelectorAll('.modal-backdrop.active').forEach(modal => {
      modal.classList.remove('active');
    });
    document.body.style.overflow = '';
  }
};

// ===== FORM VALIDATION =====
const FormValidator = {
  validate: (form) => {
    let isValid = true;
    const inputs = form.querySelectorAll('[required]');

    inputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.classList.add('error');
        input.classList.remove('success');
      } else {
        input.classList.remove('error');
        input.classList.add('success');
      }
    });

    return isValid;
  },

  validateEmail: (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  validatePhone: (phone) => {
    return /^(\+62|62|0)8[1-9][0-9]{6,10}$/.test(phone.replace(/\s|-/g, ''));
  },

  showError: (input, message) => {
    input.classList.add('error');
    let errorEl = input.parentElement.querySelector('.form-error');
    if (!errorEl) {
      errorEl = document.createElement('p');
      errorEl.className = 'form-error';
      input.parentElement.appendChild(errorEl);
    }
    errorEl.textContent = message;
  },

  clearError: (input) => {
    input.classList.remove('error');
    const errorEl = input.parentElement.querySelector('.form-error');
    if (errorEl) errorEl.remove();
  }
};

// ===== NAVIGATION =====
const Nav = {
  toggle: () => {
    const nav = document.getElementById('navMenu');
    if (nav) nav.classList.toggle('open');
  },

  close: () => {
    const nav = document.getElementById('navMenu');
    if (nav) nav.classList.remove('open');
  },

  setActive: (href) => {
    document.querySelectorAll('.nav-link, .sidebar-link, .mobile-nav-item').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === href) {
        link.classList.add('active');
      }
    });
  }
};

// ===== BLOCKCHAIN SIMULATION =====
const Blockchain = {
  // Simulate submitting to blockchain
  submit: async (data, onProgress) => {
    const steps = [
      'Menyiapkan transaksi...',
      'Menandatangani dengan wallet...',
      'Mengirim ke jaringan Polygon...',
      'Menunggu konfirmasi blok...',
      'Transaksi dikonfirmasi!'
    ];

    for (let i = 0; i < steps.length; i++) {
      if (onProgress) onProgress(steps[i], (i + 1) / steps.length * 100);
      await Utils.delay(500 + Math.random() * 500);
    }

    return {
      hash: Utils.generateHash(),
      blockNumber: Math.floor(Math.random() * 1000000) + 12000000,
      timestamp: new Date().toISOString(),
      status: 'success'
    };
  },

  // Get transaction details
  getTransaction: (hash) => {
    return {
      hash: hash,
      blockNumber: Math.floor(Math.random() * 1000000) + 12000000,
      timestamp: new Date().toISOString(),
      from: '0x7a8f...3d2e',
      to: '0xContract',
      status: 'confirmed',
      gasUsed: '21000',
      network: 'Polygon Mainnet'
    };
  }
};

// ===== QR CODE GENERATOR =====
const QRCode = {
  generate: (data, size = 256) => {
    // Simple QR code SVG generator (placeholder pattern)
    const modules = 25;
    const cellSize = size / modules;
    let svg = `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">`;
    svg += `<rect width="${size}" height="${size}" fill="white"/>`;

    // Position detection patterns
    const drawFinder = (x, y) => {
      svg += `<rect x="${x}" y="${y}" width="${7 * cellSize}" height="${7 * cellSize}" fill="#1a5f2a"/>`;
      svg += `<rect x="${x + cellSize}" y="${y + cellSize}" width="${5 * cellSize}" height="${5 * cellSize}" fill="white"/>`;
      svg += `<rect x="${x + 2 * cellSize}" y="${y + 2 * cellSize}" width="${3 * cellSize}" height="${3 * cellSize}" fill="#1a5f2a"/>`;
    };

    drawFinder(0, 0);
    drawFinder((modules - 7) * cellSize, 0);
    drawFinder(0, (modules - 7) * cellSize);

    // Generate pseudo-random data pattern based on input
    const seed = data.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    for (let i = 8; i < modules - 8; i++) {
      for (let j = 8; j < modules - 8; j++) {
        if ((seed + i * j) % 3 === 0) {
          svg += `<rect x="${i * cellSize}" y="${j * cellSize}" width="${cellSize}" height="${cellSize}" fill="#1a5f2a"/>`;
        }
      }
    }

    // Logo in center
    const logoSize = 5 * cellSize;
    const logoPos = (size - logoSize) / 2;
    svg += `<circle cx="${size / 2}" cy="${size / 2}" r="${logoSize / 2 + 2}" fill="white"/>`;
    svg += `<circle cx="${size / 2}" cy="${size / 2}" r="${logoSize / 2 - 2}" fill="#1a5f2a"/>`;

    svg += '</svg>';
    return svg;
  },

  download: (batchId, format = 'png') => {
    Toast.success(`QR Code ${batchId} berhasil diunduh!`);
  }
};

// ===== DATA STORE (Mock Database) =====
const Store = {
  // Raw materials
  rawMaterials: [
    { id: 1, name: 'Kunyit', supplier: 'Tani Makmur', location: 'Magelang', qty: 25, unit: 'kg', date: '2025-01-10', hash: '0x4b2c...8f1a' },
    { id: 2, name: 'Asam Jawa', supplier: 'CV Rempah Jaya', location: 'Wonogiri', qty: 15, unit: 'kg', date: '2025-01-09', hash: '0x7e3d...2c5b' },
    { id: 3, name: 'Jahe Merah', supplier: 'Supplier A', location: 'Boyolali', qty: 50, unit: 'kg', date: '2025-01-11', hash: '0x6d2a...4e8f' }
  ],

  // Products
  products: [
    { id: 1, name: 'Jamu Kunyit Asam', batches: 12, image: 'kunyit' },
    { id: 2, name: 'Wedang Jahe', batches: 8, image: 'jahe' },
    { id: 3, name: 'Beras Kencur', batches: 4, image: 'kencur' }
  ],

  // Batches
  batches: [
    { id: 'JM2025-015', product: 'Jamu Kunyit Asam', qty: 500, unit: 'sachet', date: '2025-01-13', status: 'completed', hash: '0x7a8f...3d2e' },
    { id: 'JM2025-014', product: 'Wedang Jahe', qty: 300, unit: 'sachet', date: '2025-01-12', status: 'completed', hash: '0x9e3d...2c5b' },
    { id: 'JM2025-013', product: 'Beras Kencur', qty: 200, unit: 'sachet', date: '2025-01-10', status: 'completed', hash: '0x3c5b...7d9e' }
  ],

  // Transactions
  transactions: [
    { id: 1, type: 'production', desc: 'Batch JM2025-015', detail: 'Jamu Kunyit Asam - 500 unit', date: '2025-01-13 10:30', hash: '0x7a8f...3d2e', status: 'success' },
    { id: 2, type: 'material', desc: 'Kunyit 25 kg', detail: 'Supplier: Tani Makmur', date: '2025-01-13 09:15', hash: '0x4b2c...8f1a', status: 'success' },
    { id: 3, type: 'qr', desc: 'Generate 200 QR', detail: 'Batch JM2025-014', date: '2025-01-12 16:45', hash: '0x9e3d...2c5b', status: 'success' }
  ],

  // User data
  user: {
    name: 'Jamu Sehat UMKM',
    owner: 'Ahmad Setiawan',
    location: 'Tidar Selatan, Magelang',
    phone: '+62 812-3456-7890',
    email: 'jamusehat@email.com',
    points: 1250,
    level: 'Gold',
    levelProgress: 80,
    badges: ['pioneer', 'century', 'punctual']
  },

  // Add new raw material
  addRawMaterial: (material) => {
    material.id = Store.rawMaterials.length + 1;
    material.hash = Utils.truncateHash(Utils.generateHash());
    material.date = new Date().toISOString().split('T')[0];
    Store.rawMaterials.unshift(material);
    Store.addTransaction('material', `${material.name} ${material.qty} ${material.unit}`, `Supplier: ${material.supplier}`, material.hash);
    return material;
  },

  // Add new batch
  addBatch: (batch) => {
    batch.hash = Utils.truncateHash(Utils.generateHash());
    batch.date = new Date().toISOString().split('T')[0];
    batch.status = 'completed';
    Store.batches.unshift(batch);
    Store.addTransaction('production', `Batch ${batch.id}`, `${batch.product} - ${batch.qty} ${batch.unit}`, batch.hash);
    return batch;
  },

  // Add transaction
  addTransaction: (type, desc, detail, hash) => {
    Store.transactions.unshift({
      id: Store.transactions.length + 1,
      type: type,
      desc: desc,
      detail: detail,
      date: new Date().toLocaleString('id-ID'),
      hash: hash,
      status: 'success'
    });
  },

  // Update points
  addPoints: (points) => {
    Store.user.points += points;
    Store.user.levelProgress = Math.min(100, Store.user.levelProgress + (points / 15));
  }
};

// ===== PAGE INITIALIZERS =====
const Pages = {
  // Initialize based on current page
  init: () => {
    Toast.init();

    // Close nav on click outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.navbar') && !e.target.closest('.hamburger')) {
        Nav.close();
      }
    });

    // Close modals on backdrop click
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) Modal.hideAll();
      });
    });

    // Initialize page-specific features
    const path = window.location.pathname;
    if (path.includes('producer-dashboard')) Pages.initProducerDashboard();
    if (path.includes('raw-material')) Pages.initRawMaterialForm();
    if (path.includes('production-form')) Pages.initProductionForm();
    if (path.includes('qr-generator')) Pages.initQRGenerator();
    if (path.includes('verify')) Pages.initVerify();
    if (path.includes('login')) Pages.initLogin();
    if (path.includes('register')) Pages.initRegister();
  },

  initProducerDashboard: () => {
    // Animate points counter
    const pointsDisplay = document.querySelector('.points-display');
    if (pointsDisplay) {
      let current = 0;
      const target = Store.user.points;
      const increment = target / 30;
      const animate = () => {
        current += increment;
        if (current < target) {
          pointsDisplay.textContent = Utils.formatNumber(Math.floor(current));
          requestAnimationFrame(animate);
        } else {
          pointsDisplay.textContent = Utils.formatNumber(target);
        }
      };
      animate();
    }
  },

  initRawMaterialForm: () => {
    const form = document.getElementById('rawMaterialForm');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!FormValidator.validate(form)) {
          Toast.error('Mohon lengkapi semua field yang wajib diisi');
          return;
        }

        Modal.show('loadingModal');
        const result = await Blockchain.submit({});
        Modal.hide('loadingModal');
        Modal.show('successModal');

        Store.addPoints(50);
        Toast.success('Data berhasil disimpan! +50 poin');
      });
    }
  },

  initProductionForm: () => {
    // Step wizard is handled inline in the HTML
  },

  initQRGenerator: () => {
    const qrContainer = document.querySelector('.qr-preview');
    const batchSelect = document.getElementById('batchSelect');
    
    if (qrContainer && batchSelect) {
      const updateQR = () => {
        const batch = batchSelect.value || 'JM2025-015';
        qrContainer.innerHTML = QRCode.generate(batch, 256);
      };
      updateQR();
      batchSelect.addEventListener('change', updateQR);
    }
  },

  initVerify: () => {
    // Handled inline in verify.html
  },

  initLogin: () => {
    // Handled inline in login.html
  },

  initRegister: () => {
    // Handled inline in register.html
  }
};

// ===== GLOBAL FUNCTIONS =====
// These are called from HTML onclick attributes
function toggleNav() {
  Nav.toggle();
}

function showToast(message, type) {
  Toast.show(message, type);
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    Toast.success('Disalin ke clipboard!');
  });
}

// ===== INITIALIZE ON DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
  Pages.init();
});

// Export for use in other scripts
window.TraceHerbal = {
  Utils,
  Toast,
  Modal,
  FormValidator,
  Nav,
  Blockchain,
  QRCode,
  Store,
  Pages
};
