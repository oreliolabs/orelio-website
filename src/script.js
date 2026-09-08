/**
 * Orelio Wealth Ledger - Website Landing Page Interactions
 */
import './styles.css';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.innerHTML = isOpen
        ? '<span class="material-symbols-outlined">close</span>'
        : '<span class="material-symbols-outlined">menu</span>';
    });

    // Close on link click
    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.innerHTML = '<span class="material-symbols-outlined">menu</span>';
      });
    });
  }

  // 2. Interactive Privacy Toggle in Hero Mockup Card & Slot Machine Effect
  const privacyToggleBtn = document.getElementById('privacy-toggle-btn');
  const networthAmount = document.getElementById('networth-amount');
  const growthBadge = document.getElementById('growth-badge');
  const breakdownValues = document.querySelectorAll('.breakdown-val');

  let isPrivate = false;

  const realNetworth = '₹ 6.13 Cr';
  const realGrowth = '+₹ 18.2 L (+14.2%) this year';
  const realBreakdowns = [
    '₹ 10.21 L', // Stocks
    '₹ 10.08 L', // Mutual Funds
    '₹ 5.87 Cr', // Deposits
    '₹ 8,000'    // Loans
  ];

  // Slot machine roll animation for numbers
  function runSlotMachine(container, targetText = '₹ 6.13 Cr', options = {}) {
    if (!container) return;

    const baseDelay = options.baseDelay ?? 60;
    const digitStagger = options.digitStagger ?? 130;
    const baseDuration = options.baseDuration ?? 950;

    container.setAttribute('aria-label', targetText);
    container.innerHTML = '';

    const chars = targetText.split('');
    let digitIndex = 0;

    chars.forEach((char) => {
      if (/\d/.test(char)) {
        const targetDigit = parseInt(char, 10);
        const reel = document.createElement('span');
        reel.className = 'slot-reel';
        reel.setAttribute('aria-hidden', 'true');

        const track = document.createElement('span');
        track.className = 'slot-track';

        // Stagger cycles: reel 0 spins 2 times, reel 1 spins 3 times, etc.
        const cycles = 2 + (digitIndex % 3);
        const numbers = [];
        for (let c = 0; c < cycles; c++) {
          for (let n = 0; n <= 9; n++) {
            numbers.push(n);
          }
        }
        numbers.push(targetDigit);

        numbers.forEach((num) => {
          const digitEl = document.createElement('span');
          digitEl.className = 'slot-digit';
          digitEl.textContent = num;
          track.appendChild(digitEl);
        });

        reel.appendChild(track);
        container.appendChild(reel);

        const targetIndex = numbers.length - 1;
        const totalItems = numbers.length;
        const delay = baseDelay + digitIndex * digitStagger;
        const duration = baseDuration + digitIndex * 180;

        track.style.transition = `transform ${duration}ms cubic-bezier(0.12, 0.9, 0.25, 1)`;
        track.style.transitionDelay = `${delay}ms`;

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            track.style.transform = `translateY(-${(targetIndex / totalItems) * 100}%)`;
          });
        });

        digitIndex++;
      } else {
        const charEl = document.createElement('span');
        charEl.className = 'slot-char';
        charEl.setAttribute('aria-hidden', 'true');
        if (char === ' ') {
          charEl.innerHTML = '&nbsp;';
        } else {
          charEl.textContent = char;
        }
        container.appendChild(charEl);
      }
    });
  }

  // Play ticker on all numbers in the mockup card
  function playAllSlotMachines() {
    if (isPrivate) return;

    if (networthAmount) {
      runSlotMachine(networthAmount, realNetworth, {
        baseDelay: 40,
        baseDuration: 1050,
        digitStagger: 150
      });
    }

    breakdownValues.forEach((el, index) => {
      if (realBreakdowns[index]) {
        runSlotMachine(el, realBreakdowns[index], {
          baseDelay: 120 + index * 70,
          baseDuration: 850,
          digitStagger: 100
        });
      }
    });
  }

  // Trigger slot machine on initial load / when visible
  let hasPlayedInitial = false;
  const playOnce = () => {
    if (!hasPlayedInitial && !isPrivate) {
      hasPlayedInitial = true;
      playAllSlotMachines();
    }
  };

  const mockupSection = document.querySelector('.hero-mockup-wrapper') || networthAmount;
  if (mockupSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          playOnce();
          observer.disconnect();
        }
      });
    }, { threshold: 0.2 });
    observer.observe(mockupSection);
  } else {
    playOnce();
  }

  // Click to replay slot machine on net worth
  if (networthAmount) {
    networthAmount.setAttribute('title', 'Click to spin all numbers');
    networthAmount.addEventListener('click', () => {
      if (!isPrivate) {
        playAllSlotMachines();
      }
    });
  }

  // Click to replay individual breakdown numbers
  breakdownValues.forEach((el, index) => {
    el.setAttribute('title', 'Click to spin');
    el.addEventListener('click', () => {
      if (!isPrivate && realBreakdowns[index]) {
        runSlotMachine(el, realBreakdowns[index], {
          baseDelay: 40,
          baseDuration: 850,
          digitStagger: 100
        });
      }
    });
  });

  if (privacyToggleBtn) {
    privacyToggleBtn.addEventListener('click', () => {
      isPrivate = !isPrivate;

      if (isPrivate) {
        privacyToggleBtn.innerHTML = `
          <span class="material-symbols-outlined" style="font-size: 16px;">visibility</span>
          <span>Show Numbers</span>
        `;
        if (networthAmount) {
          networthAmount.textContent = '••••••••';
          networthAmount.removeAttribute('aria-label');
        }
        if (growthBadge) growthBadge.innerHTML = '<span class="material-symbols-outlined" style="font-size: 14px;">visibility_off</span> Hidden';
        breakdownValues.forEach((el) => {
          el.textContent = '••••••';
          el.removeAttribute('aria-label');
        });
      } else {
        privacyToggleBtn.innerHTML = `
          <span class="material-symbols-outlined" style="font-size: 16px;">visibility_off</span>
          <span>Hide Numbers</span>
        `;
        playAllSlotMachines();
        if (growthBadge) {
          growthBadge.innerHTML = `
            <span class="material-symbols-outlined" style="font-size: 14px;">trending_up</span>
            ${realGrowth}
          `;
        }
      }
    });
  }

  // 3. FAQ Accordions
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close other items
        faqItems.forEach((other) => {
          if (other !== item) other.classList.remove('active');
        });

        // Toggle current
        item.classList.toggle('active', !isActive);
      });
    }
  });

  // 4. Smooth Anchor Scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // 5. Dark / Light Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const mobileThemeToggle = document.getElementById('mobile-theme-toggle');

  const getTheme = () => document.documentElement.getAttribute('data-theme') || 'light';

  const updateThemeUI = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      themeToggle.setAttribute('title', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
    const mobileText = document.querySelector('.mobile-theme-text');
    if (mobileText) {
      mobileText.textContent = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    }
  };

  let transitionTimeout = null;

  const toggleTheme = () => {
    const current = getTheme();
    const next = current === 'dark' ? 'light' : 'dark';

    // Apply fluid, smooth color dissolve across the page
    document.documentElement.classList.add('theme-transitioning');
    updateThemeUI(next);
    localStorage.setItem('orelio_theme', next);

    clearTimeout(transitionTimeout);
    transitionTimeout = setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 380);
  };

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', toggleTheme);
  }

  // Sync with OS preference if user hasn't explicitly set one
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('orelio_theme')) {
      updateThemeUI(e.matches ? 'dark' : 'light');
    }
  });

  // Initialize accessibility attributes
  updateThemeUI(getTheme());
});

