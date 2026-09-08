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

  // 2. Interactive Profile Selector in Hero Mockup Card & Slot Machine Effect
  const profileDropdownWrapper = document.getElementById('profile-dropdown-wrapper');
  const profileDropdownBtn = document.getElementById('profile-dropdown-btn');
  const profileBtnLabel = document.getElementById('profile-btn-label');
  const profileItems = document.querySelectorAll('.profile-dropdown-item');

  const networthAmount = document.getElementById('networth-amount');
  const growthBadge = document.getElementById('growth-badge');
  const breakdownValues = document.querySelectorAll('.breakdown-val');
  const statusLabel = document.getElementById('status-label');
  const mockupAvatar = document.getElementById('mockup-avatar');
  const mockupUserName = document.getElementById('mockup-user-name');
  const mockupUser = document.querySelector('.mockup-user');

  // Profile data for dynamic ticker switching
  const profiles = {
    all: {
      label: 'My Family (2)',
      name: 'Family Portfolio',
      avatar: 'F',
      avatarClass: 'avatar-family',
      status: 'Family Portfolio',
      showUser: true,
      networth: '₹ 6.13 Cr',
      growth: '+₹ 18.2 L (+14.2%) this year',
      breakdowns: ['₹ 10.21 L', '₹ 10.08 L', '₹ 5.87 Cr', '₹ 8,000'],
      graphLine: 'M -2,86 C 110,86 200,48 302,14',
      graphArea: 'M -2,86 C 110,86 200,48 302,14 L 302,100 L -2,100 Z'
    },
    self: {
      label: 'Self (Vikram)',
      name: 'Vikram Menon',
      avatar: 'V',
      avatarClass: 'avatar-self',
      status: 'Self Portfolio',
      showUser: true,
      networth: '₹ 4.82 Cr',
      growth: '+₹ 14.5 L (+13.8%) this year',
      breakdowns: ['₹ 8.15 L', '₹ 7.60 L', '₹ 4.66 Cr', '₹ 8,000'],
      graphLine: 'M -2,86 C 105,86 210,52 302,18',
      graphArea: 'M -2,86 C 105,86 210,52 302,18 L 302,100 L -2,100 Z'
    },
    spouse: {
      label: 'Spouse (Meera)',
      name: 'Meera Menon',
      avatar: 'M',
      avatarClass: 'avatar-spouse',
      status: 'Spouse Portfolio',
      showUser: true,
      networth: '₹ 1.31 Cr',
      growth: '+₹ 3.7 L (+15.9%) this year',
      breakdowns: ['₹ 2.06 L', '₹ 2.48 L', '₹ 1.21 Cr', '₹ 0'],
      graphLine: 'M -2,86 C 120,86 195,40 302,10',
      graphArea: 'M -2,86 C 120,86 195,40 302,10 L 302,100 L -2,100 Z'
    }
  };

  let currentProfileKey = 'all';

  // Dynamic Sparkline Sweep Reveal Animation
  function animateSparkline(data) {
    const graphWrapper = document.querySelector('.networth-graph-wrapper');
    const graphLinePath = document.getElementById('graph-line-path');
    const graphAreaPath = document.getElementById('graph-area-path');

    if (graphLinePath && data.graphLine) {
      graphLinePath.setAttribute('d', data.graphLine);
    }
    if (graphAreaPath && data.graphArea) {
      graphAreaPath.setAttribute('d', data.graphArea);
    }

    if (!graphWrapper) return;

    // Reset clip-path for smooth sweep reveal from left to right
    graphWrapper.style.transition = 'none';
    graphWrapper.style.clipPath = 'inset(0 100% 0 0)';

    // Force reflow
    void graphWrapper.offsetWidth;

    // Smoothly reveal full graph from left to right across container
    graphWrapper.style.transition = 'clip-path 1.1s cubic-bezier(0.16, 1, 0.3, 1)';
    graphWrapper.style.clipPath = 'inset(0 0% 0 0)';
  }

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
  function playAllSlotMachines(profileKey = currentProfileKey) {
    const data = profiles[profileKey] || profiles.all;

    if (networthAmount) {
      runSlotMachine(networthAmount, data.networth, {
        baseDelay: 40,
        baseDuration: 1050,
        digitStagger: 150
      });
    }

    if (growthBadge) {
      growthBadge.innerHTML = `
        <span class="material-symbols-outlined" style="font-size: 14px;">trending_up</span>
        ${data.growth}
      `;
    }

    if (mockupUser) {
      if (data.showUser) {
        mockupUser.classList.remove('is-hidden');
      } else {
        mockupUser.classList.add('is-hidden');
      }
    }

    if (statusLabel && data.status) {
      statusLabel.textContent = data.status;
    }

    if (mockupAvatar && data.avatar) {
      mockupAvatar.textContent = data.avatar;
      mockupAvatar.setAttribute('aria-label', data.name || '');
      mockupAvatar.classList.remove('avatar-family', 'avatar-self', 'avatar-spouse');
      if (data.avatarClass) {
        mockupAvatar.classList.add(data.avatarClass);
      }
    }

    if (mockupUserName && data.name) {
      mockupUserName.textContent = data.name;
    }

    // Animate sparkline synchronized with ticker
    animateSparkline(data);

    breakdownValues.forEach((el, index) => {
      if (data.breakdowns[index]) {
        runSlotMachine(el, data.breakdowns[index], {
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
    if (!hasPlayedInitial) {
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

  // Replay slot machine on net worth click
  if (networthAmount) {
    networthAmount.setAttribute('title', 'Click to spin all numbers');
    networthAmount.addEventListener('click', () => {
      playAllSlotMachines();
    });
  }

  // Replay individual breakdown numbers on click
  breakdownValues.forEach((el, index) => {
    el.setAttribute('title', 'Click to spin');
    el.addEventListener('click', () => {
      const data = profiles[currentProfileKey] || profiles.all;
      if (data.breakdowns[index]) {
        runSlotMachine(el, data.breakdowns[index], {
          baseDelay: 40,
          baseDuration: 850,
          digitStagger: 100
        });
      }
    });
  });

  // Profile Dropdown Interactivity
  if (profileDropdownBtn && profileDropdownWrapper) {
    profileDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = profileDropdownWrapper.classList.toggle('open');
      profileDropdownBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!profileDropdownWrapper.contains(e.target)) {
        profileDropdownWrapper.classList.remove('open');
        profileDropdownBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Profile item selection
    profileItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const profileKey = item.dataset.profile;
        if (!profileKey || !profiles[profileKey]) return;

        currentProfileKey = profileKey;

        // Update active class
        profileItems.forEach((p) => {
          p.classList.toggle('active', p === item);
          p.setAttribute('aria-selected', p === item ? 'true' : 'false');
        });

        // Update button label
        if (profileBtnLabel) {
          profileBtnLabel.textContent = profiles[profileKey].label;
        }

        // Close dropdown
        profileDropdownWrapper.classList.remove('open');
        profileDropdownBtn.setAttribute('aria-expanded', 'false');

        // Spin all numbers to selected member's portfolio!
        playAllSlotMachines(profileKey);
      });
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

  // Terminal Quickstart Clone Command Copy
  const copyCloneBtn = document.getElementById('copy-clone-btn');
  if (copyCloneBtn) {
    copyCloneBtn.addEventListener('click', async () => {
      const cloneCommands = 'git clone https://github.com/oreliolabs/orelio.git\ncd orelio && bun install\nbun run dev';
      try {
        await navigator.clipboard.writeText(cloneCommands);
        copyCloneBtn.classList.add('copied');
        copyCloneBtn.innerHTML = `
          <span class="material-symbols-outlined copy-icon">check</span>
          <span class="copy-text">Copied!</span>
        `;
        setTimeout(() => {
          copyCloneBtn.classList.remove('copied');
          copyCloneBtn.innerHTML = `
            <span class="material-symbols-outlined copy-icon">content_copy</span>
            <span class="copy-text">Copy</span>
          `;
        }, 2200);
      } catch (err) {
        console.error('Failed to copy to clipboard', err);
      }
    });
  }

  // Scroll to Top Floating Button
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  if (scrollTopBtn) {
    const toggleScrollTop = () => {
      if (window.scrollY > 450) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', toggleScrollTop, { passive: true });
    toggleScrollTop();

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Initialize accessibility attributes
  updateThemeUI(getTheme());
});

