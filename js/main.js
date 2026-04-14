/* ========================================
   华复兴科技转化 hfx_v2 - Main JavaScript
   GitHub Pages: relative paths only
   ======================================== */
(function () {
    'use strict';

    const LANG_KEY = 'hfx_v2_lang';
    let currentLang = localStorage.getItem(LANG_KEY) || 'zh';
    const langMap = { zh: 'zh-CN', tw: 'zh-TW', en: 'en' };

    function switchLanguage(lang) {
        if (!langMap[lang]) return;
        currentLang = lang;
        localStorage.setItem(LANG_KEY, lang);
        document.documentElement.lang = langMap[lang];

        document.querySelectorAll('[data-zh]').forEach(function (el) {
            var text = el.getAttribute('data-' + lang);
            if (text !== null) el.textContent = text;
        });

        var titleEl = document.querySelector('title');
        if (titleEl && titleEl.hasAttribute('data-' + lang)) {
            document.title = titleEl.getAttribute('data-' + lang);
        }

        document.querySelectorAll('[data-zh-placeholder]').forEach(function (el) {
            var ph = el.getAttribute('data-' + lang + '-placeholder');
            if (ph !== null) el.placeholder = ph;
        });

        document.querySelectorAll('select option[data-zh]').forEach(function (option) {
            var text = option.getAttribute('data-' + lang);
            if (text !== null) option.textContent = text;
        });

        document.querySelectorAll('.lang-btn').forEach(function (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
    }

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
        btn.addEventListener('click', function () { switchLanguage(this.getAttribute('data-lang')); });
    });
    switchLanguage(currentLang);

    var navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function () {
        navbar.classList.toggle('scrolled', window.pageYOffset > 20);
    }, { passive: true });

    var navToggle = document.getElementById('navToggle');
    var navLinks = document.getElementById('navLinks');
    navToggle.addEventListener('click', function () {
        this.classList.toggle('open');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navToggle.classList.remove('open');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    var sections = document.querySelectorAll('section[id]');
    function updateActiveNav() {
        var scrollY = window.pageYOffset + 120;
        sections.forEach(function (section) {
            var top = section.offsetTop, height = section.offsetHeight, id = section.getAttribute('id');
            var link = navLinks.querySelector('a[href="#' + id + '"]');
            if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + height);
        });
    }
    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                var offset = navbar.offsetHeight + 16;
                window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
            }
        });
    });

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
        document.querySelectorAll('.animate-on-scroll').forEach(function (el) { observer.observe(el); });
    } else {
        document.querySelectorAll('.animate-on-scroll').forEach(function (el) { el.classList.add('visible'); });
    }

    ['.about-grid', '.services-grid', '.advantages-grid', '.team-grid', '.advisors-grid'].forEach(function (sel) {
        var c = document.querySelector(sel);
        if (c) c.querySelectorAll('.animate-on-scroll').forEach(function (card, i) { card.style.transitionDelay = (i * 0.1) + 's'; });
    });
    document.querySelectorAll('.process .step.animate-on-scroll').forEach(function (step, i) { step.style.transitionDelay = (i * 0.15) + 's'; });

    var backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', function () {
        backToTop.classList.toggle('visible', window.pageYOffset > 500);
    }, { passive: true });
    backToTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

    var CONTACT_EMAIL = 'meinetbosekampf@gmail.com';
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var name = contactForm.querySelector('[name="name"]').value.trim();
            var email = contactForm.querySelector('[name="email"]').value.trim();
            if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
            var org = (contactForm.querySelector('[name="organization"]') || {}).value;
            org = (org || '').trim();
            var serviceEl = contactForm.querySelector('[name="service"]');
            var serviceText = '';
            if (serviceEl && serviceEl.options && serviceEl.selectedIndex >= 0) {
                serviceText = serviceEl.options[serviceEl.selectedIndex].text.trim();
            }
            var message = (contactForm.querySelector('[name="message"]') || {}).value;
            message = (message || '').trim();
            var subject = '[华复兴] 咨询 — ' + name;
            var body = [
                '您好，',
                '',
                '我想咨询华复兴科技转化（深圳）有限公司的服务。',
                '',
                '【姓名】' + name,
                '【联系邮箱】' + email,
                '【机构/公司】' + (org || '—'),
                '【感兴趣的服务】' + (serviceText || '—'),
                '',
                '【留言】',
                message || '—',
                ''
            ].join('\n');
            var href = 'mailto:' + CONTACT_EMAIL +
                '?subject=' + encodeURIComponent(subject) +
                '&body=' + encodeURIComponent(body);
            if (href.length > 1800) {
                href = 'mailto:' + CONTACT_EMAIL +
                    '?subject=' + encodeURIComponent(subject) +
                    '&body=' + encodeURIComponent(body.slice(0, 1200) + '\n\n…(正文过长已截断，请补充后发送)');
            }
            window.location.href = href;
        });
    }
})();
