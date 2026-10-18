const WA_NUMBER = '201212515179';

const themeToggleBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const htmlElement = document.documentElement;

function applyTheme(theme) {
    const safeTheme = theme === 'dark' ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', safeTheme);
    if (themeIcon) {
        themeIcon.classList.toggle('fa-moon', safeTheme === 'light');
        themeIcon.classList.toggle('fa-sun', safeTheme === 'dark');
    }
    if (themeToggleBtn) {
        const label = safeTheme === 'dark' ? 'الوضع الفاتح' : 'الوضع الداكن';
        themeToggleBtn.title = label;
        themeToggleBtn.setAttribute('aria-label', label);
    }
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
        const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(nextTheme);
        localStorage.setItem('xiptv-theme', nextTheme);
    });
}
applyTheme(localStorage.getItem('xiptv-theme') || 'light');

const menuToggle = document.getElementById('menuToggle');
const header = document.querySelector('header');
if (menuToggle && header) {
    menuToggle.addEventListener('click', () => {
        const open = header.classList.toggle('nav-open');
        menuToggle.setAttribute('aria-expanded', String(open));
    });
    document.querySelectorAll('.site-nav a').forEach((link) => {
        link.addEventListener('click', () => header.classList.remove('nav-open'));
    });
}

const progressBar = document.querySelector('.scroll-progress span');
function updateProgress() {
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const width = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${width}%`;
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

function toggleAccordion(headerEl) {
    const item = headerEl.parentElement;
    const isActive = item.classList.contains('active');
    document.querySelectorAll('.accordion-item').forEach((acc) => acc.classList.remove('active'));
    if (!isActive) item.classList.add('active');
}
window.toggleAccordion = toggleAccordion;

document.querySelectorAll('.faq-item button').forEach((btn) => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const open = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach((faq) => {
            faq.classList.remove('active');
            faq.querySelector('button')?.setAttribute('aria-expanded', 'false');
        });
        if (!open) {
            item.classList.add('active');
            btn.setAttribute('aria-expanded', 'true');
        }
    });
});

const prices = {
    egypt: { m3: '200', m6: '350', m12: '500', unit: 'ج.م', symbol: 'ج.م' },
    intl: { m3: '15', m6: '20', m12: '30', unit: '$', symbol: '$' }
};

function setRegion(region) {
    const data = prices[region] || prices.egypt;
    document.getElementById('btnEgypt')?.classList.toggle('active', region === 'egypt');
    document.getElementById('btnIntl')?.classList.toggle('active', region === 'intl');
    document.getElementById('btnEgypt')?.setAttribute('aria-pressed', String(region === 'egypt'));
    document.getElementById('btnIntl')?.setAttribute('aria-pressed', String(region === 'intl'));

    const setPrice = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = `${value} <span>${data.unit}</span>`;
    };
    setPrice('price-3m', data.m3);
    setPrice('price-6m', data.m6);
    setPrice('price-12m', data.m12);

    const messages = {
        egypt: {
            m3: 'السلام عليكم، أريد الاشتراك في باقة 3 أشهر (200 ج.م)',
            m6: 'السلام عليكم، أريد الاشتراك في باقة 6 أشهر (350 ج.م)',
            m12: 'السلام عليكم، أريد الاشتراك في الباقة المميزة 12 شهر (500 ج.م)'
        },
        intl: {
            m3: 'السلام عليكم، أريد الاشتراك في باقة 3 أشهر ($15)',
            m6: 'السلام عليكم، أريد الاشتراك في باقة 6 أشهر ($20)',
            m12: 'السلام عليكم، أريد الاشتراك في الباقة المميزة 12 شهر ($30)'
        }
    };
    const msg = messages[region] || messages.egypt;
    const setLink = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    };
    setLink('btn-3m-link', msg.m3);
    setLink('btn-6m-link', msg.m6);
    setLink('btn-12m-link', msg.m12);
}
window.setRegion = setRegion;

const tickerKeywords = [
    { text: 'اشتراك X IPTV', msg: 'السلام عليكم، أريد الاشتراك في X IPTV' },
    { text: 'تجديد سيرفر إكس', msg: 'السلام عليكم، أريد تجديد اشتراك سيرفر إكس' },
    { text: 'تجربة 24 ساعة', msg: 'السلام عليكم، أريد تجربة مجانية 24 ساعة لسيرفر X IPTV' },
    { text: 'باقات وأسعار', msg: 'السلام عليكم، أريد معرفة أسعار X IPTV' },
    { text: 'Smart TV', msg: 'السلام عليكم، أريد طريقة تشغيل X IPTV على Smart TV' },
    { text: 'موبايل وTV Box', msg: 'السلام عليكم، أريد طريقة تشغيل X IPTV على الموبايل' },
    { text: 'دعم فني', msg: 'السلام عليكم، محتاج دعم فني بخصوص X IPTV' },
    { text: 'كن موزعاً', msg: 'السلام عليكم، أريد أن أصبح موزعاً لسيرفر X IPTV' }
];

function buildTicker() {
    const track = document.getElementById('tickerTrack');
    if (!track) return;
    const itemsHTML = tickerKeywords.map((k, i) => {
        const link = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(k.msg)}`;
        const accent = i % 2 === 0 ? 'accent-red' : 'accent-gold';
        return `<a href="${link}" class="ticker-item ${accent}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-whatsapp"></i>${k.text}</a>`;
    }).join('');
    track.innerHTML = itemsHTML + itemsHTML;
}
buildTicker();

let currentSlide = 0;
let sliderTimer = null;
const slides = document.querySelectorAll('.promo-slider .slide');
const dotsWrap = document.getElementById('sliderDots');
const sliderProgress = document.getElementById('sliderProgressBar');

function playProgressBar() {
    if (!sliderProgress) return;
    sliderProgress.classList.remove('animate');
    void sliderProgress.offsetWidth;
    sliderProgress.classList.add('animate');
}

function showSlide(index) {
    slides.forEach((s) => s.classList.remove('active'));
    document.querySelectorAll('.dot').forEach((d) => d.classList.remove('active'));
    slides[index].classList.add('active');
    const dot = dotsWrap ? dotsWrap.children[index] : null;
    if (dot) dot.classList.add('active');
    currentSlide = index;
    playProgressBar();
}

function goToSlide(index) {
    clearInterval(sliderTimer);
    showSlide(index);
    startSliderTimer();
}
window.goToSlide = goToSlide;

function startSliderTimer() {
    sliderTimer = setInterval(() => goToSlide((currentSlide + 1) % slides.length), 4500);
}

document.querySelector('.slider-nav.prev')?.addEventListener('click', () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
});
document.querySelector('.slider-nav.next')?.addEventListener('click', () => {
    goToSlide((currentSlide + 1) % slides.length);
});

if (slides.length) {
    if (dotsWrap) {
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', 'الانتقال للشريحة ' + (i + 1));
            dot.addEventListener('click', () => goToSlide(i));
            dotsWrap.appendChild(dot);
        });
    }
    playProgressBar();
    startSliderTimer();
}

function animateCounters() {
    document.querySelectorAll('[data-count]').forEach((el) => {
        const target = Number(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        const prefix = el.getAttribute('data-prefix') || '';
        const duration = 1400;
        const start = performance.now();
        const format = (n) => Math.floor(n).toLocaleString('en-US');
        const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = `${prefix}${format(target * eased)}${suffix}`;
            if (p < 1) requestAnimationFrame(tick);
            else el.textContent = `${prefix}${format(target)}${suffix}`;
        };
        requestAnimationFrame(tick);
    });
}

const stats = document.querySelector('.stats-section');
if (stats) {
    const once = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            once.disconnect();
        }
    }, { threshold: 0.35 });
    once.observe(stats);
}

const toast = document.getElementById('toast');
function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1800);
}

document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
        const value = btn.getAttribute('data-copy');
        try {
            await navigator.clipboard.writeText(value);
            showToast('تم نسخ الكود');
        } catch {
            showToast(value);
        }
    });
});
