document.addEventListener('DOMContentLoaded', function() {
    // Плавно скролиране
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Функционалност за превод
    const langButtons = document.querySelectorAll('.language-switcher button');
    let currentLang = localStorage.getItem('selectedLanguage') || 'bg';

    function switchLanguage(lang) {
        currentLang = lang;
        document.documentElement.lang = lang;
        localStorage.setItem('selectedLanguage', lang);

        // Превключване на активния бутон
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.id === `lang-${lang}`) btn.classList.add('active');
        });

        // Превключване на съдържанието
        document.querySelectorAll('[data-lang]').forEach(element => {
            element.style.display = element.dataset.lang === lang ?
                getDefaultDisplay(element.tagName) : 'none';
        });
    }

    // Връща default display стойност за елемента
    function getDefaultDisplay(tag) {
        const elem = document.createElement(tag);
        document.body.appendChild(elem);
        const display = window.getComputedStyle(elem).display;
        document.body.removeChild(elem);
        return display;
    }

    // Инициализация
    switchLanguage(currentLang);

    // Клик събития за бутоните
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.id.split('-')[1];
            switchLanguage(lang);
        });
    });
});

// Хамбургер меню функционалност
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    // Отваряне/затваряне на менюто
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');

        // Забрана за скролване на body при отворено меню
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Затваряне на менюто при клик на линк
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Прехвърляне на функционалността за смяна на език към мобилното меню
    const mobileLangButtons = document.querySelectorAll('.mobile-language-switcher button');
    mobileLangButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.id.split('-')[2];
            switchLanguage(lang);

            // Затваряне на менюто след смяна на езика
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
});

const overlay = document.querySelector('.mobile-menu-overlay');

hamburger.addEventListener('click', function() {
    overlay.classList.toggle('active');
    // ... останалия код
});

overlay.addEventListener('click', function() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    this.classList.remove('active');
    document.body.style.overflow = '';
});