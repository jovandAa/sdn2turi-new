// =============================================
// MODERN NAVBAR WITH DROPDOWN - SDN TURI 2
// =============================================

(function() {
    'use strict';
    
    const MOBILE_BREAKPOINT = 768;

    // Helper function to check if mobile
    function isMobile() {
        return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches;
    }

    // Set menu toggle button state
    function setToggleState(button, isOpen) {
        button.classList.toggle('active', isOpen);
        button.setAttribute('aria-expanded', String(isOpen));
        button.textContent = isOpen ? '✕' : '☰';
    }

    // Get direct anchor element from dropdown
    function getDirectAnchor(dropdown) {
        for (const child of dropdown.children) {
            if (child.tagName === 'A') {
                return child;
            }
        }
        return null;
    }

    // Initialize mobile navbar functionality
    function initMobileNavbar(header) {
        const nav = header.querySelector('nav');
        if (!nav) return;

        const menu = nav.querySelector('ul');
        if (!menu) return;

        // Create or get menu toggle button
        let menuToggle = header.querySelector('.menu-toggle');
        if (!menuToggle) {
            menuToggle = document.createElement('button');
            menuToggle.type = 'button';
            menuToggle.className = 'menu-toggle';
            menuToggle.setAttribute('aria-label', 'Toggle menu navigasi');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.textContent = '☰';
            nav.parentNode.insertBefore(menuToggle, nav);
        }

        const dropdowns = Array.from(menu.querySelectorAll('.dropdown'));

        // Close all dropdowns except the specified one
        function closeDropdowns(exception) {
            dropdowns.forEach((dropdown) => {
                if (dropdown !== exception) {
                    dropdown.classList.remove('dropdown-open');
                }
            });
        }

        // Close mobile menu
        function closeMenu() {
            menu.classList.remove('nav-open');
            setToggleState(menuToggle, false);
            closeDropdowns();
        }

        // Open mobile menu
        function openMenu() {
            menu.classList.add('nav-open');
            setToggleState(menuToggle, true);
        }

        // Menu toggle button click handler
        menuToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            if (menu.classList.contains('nav-open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Dropdown click handlers for mobile
        dropdowns.forEach((dropdown) => {
            const trigger = dropdown.querySelector('.dropbtn') || getDirectAnchor(dropdown);
            if (!trigger) return;

            trigger.addEventListener('click', (event) => {
                if (!isMobile()) return;

                event.preventDefault();
                event.stopPropagation();

                const willOpen = !dropdown.classList.contains('dropdown-open');
                closeDropdowns(dropdown);
                dropdown.classList.toggle('dropdown-open', willOpen);

                if (!menu.classList.contains('nav-open')) {
                    openMenu();
                }
            });

            // Close menu when clicking dropdown links on mobile
            const dropdownLinks = dropdown.querySelectorAll('.dropdown-content a');
            dropdownLinks.forEach((link) => {
                link.addEventListener('click', () => {
                    if (isMobile()) {
                        closeMenu();
                    }
                });
            });
        });

        // Close menu when clicking regular nav links on mobile
        menu.querySelectorAll('a').forEach((link) => {
            if (link.classList.contains('dropbtn')) return;

            link.addEventListener('click', () => {
                if (isMobile()) {
                    closeMenu();
                }
            });
        });

        // Close menu when clicking outside on mobile
        document.addEventListener('click', (event) => {
            if (isMobile() && !header.contains(event.target)) {
                closeMenu();
            }
        });

        // Close menu when resizing to desktop
        window.addEventListener('resize', () => {
            if (!isMobile()) {
                closeMenu();
            }
        });
    }

    // Mark active navigation link based on current page
    function markActiveNavLink() {
        const currentPath = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
        
        document.querySelectorAll('nav a[href]').forEach((link) => {
            const href = (link.getAttribute('href') || '').toLowerCase();
            if (!href || href.startsWith('#')) return;
            
            if (href === currentPath) {
                link.classList.add('active');
            }
        });
    }

    // Scroll effect for header
    function initScrollEffect() {
        const header = document.querySelector('header');
        if (!header) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }
        });
    }

    // Scroll reveal animation
    function initScrollReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.feature-card, .activity-card, .contact-item, .section-title').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease-out';
            observer.observe(el);
        });
    }

    // Back to top button
    function initBackToTop() {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.innerHTML = '↑';
        backToTopBtn.setAttribute('aria-label', 'Kembali ke atas');
        backToTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            display: none;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            z-index: 999;
            transition: all 0.3s ease;
        `;

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        backToTopBtn.addEventListener('mouseenter', () => {
            backToTopBtn.style.transform = 'scale(1.1)';
        });

        backToTopBtn.addEventListener('mouseleave', () => {
            backToTopBtn.style.transform = 'scale(1)';
        });

        document.body.appendChild(backToTopBtn);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
    }

    // Initialize everything when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        // Initialize navbar for all headers
        document.querySelectorAll('header').forEach(header => initMobileNavbar(header));
        
        // Mark active links
        markActiveNavLink();
        
        // Initialize scroll effects
        initScrollEffect();
        initScrollReveal();
        
        // Initialize back to top button
        initBackToTop();
    });

})();
