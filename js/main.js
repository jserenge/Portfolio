/* ============================================
   Jeremiah Daniel Serenge - Portfolio JS
   Refactored for unified UX, accessibility, and performance
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initNavbar();
    initParticles();
    initUnifiedFiltering(); // Replaces separate filter, bi-tabs, and power platform inits
    initContactForm();
    initScrollAnimations();
    initProjectTilt();
    initAccessibleCards(); // Centralized accessibility for clickable cards
    initModals();
});

/* ============================================
   NAVBAR
   ============================================ */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect (throttled for performance)
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNavLink();
    }, 16));

    // Mobile toggle
    const closeMenu = () => {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open navigation');
        document.body.classList.remove('menu-open');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    };

    navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', String(isOpen));
        navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
        document.body.classList.toggle('menu-open', isOpen);

        // Animate hamburger to X
        const spans = navToggle.querySelectorAll('span');
        if (isOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    document.addEventListener('keydown', event => { 
        if (event.key === 'Escape') {
            closeMenu();
            closeModal();
        }
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

/* ============================================
   PARTICLE ANIMATION
   ============================================ */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 10 : 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
        particle.style.animationDelay = (Math.random() * 10) + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        container.appendChild(particle);
    }
}

/* ============================================
   UNIFIED PORTFOLIO FILTERING
   (Consolidates Projects, BI, Power Apps, Fabric into one seamless experience)
   ============================================ */
function initUnifiedFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    // Target all portfolio items regardless of specific subsection
    const portfolioItems = document.querySelectorAll('.project-card, .dashboard-card, .pp-card, .flowchart-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            portfolioItems.forEach((item) => {
                const category = item.getAttribute('data-category');
                const isMatch = filter === 'all' || category === filter;

                if (isMatch) {
                    item.style.display = 'block';
                    // Reset animation for smooth re-entry
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        item.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400);
                }
            });
        });
    });
}

/* ============================================
   ACCESSIBLE INTERACTIVE CARDS
   (Ensures all clickable cards work with keyboard and screen readers)
   ============================================ */
function initAccessibleCards() {
    const interactiveCards = document.querySelectorAll('.project-card, .dashboard-card, .pp-card, .flowchart-card');
    
    interactiveCards.forEach(card => {
        // Make accessible
        if (!card.hasAttribute('tabindex')) card.setAttribute('tabindex', '0');
        if (!card.hasAttribute('role')) card.setAttribute('role', 'button');
        
        // Ensure aria-label exists for screen readers
        const title = card.querySelector('h3, h4')?.textContent || 'Project details';
        if (!card.hasAttribute('aria-label')) {
            card.setAttribute('aria-label', `View details for ${title}`);
        }

        // Keyboard support (Enter and Space)
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
}

/* ============================================
   PROJECT CARD 3D TILT
   ============================================ */
function initProjectTilt() {
    if (window.matchMedia('(prefers-reduced-motion: reduce), (hover: none)').matches) return;

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('pointermove', event => {
            const bounds = card.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width;
            const y = (event.clientY - bounds.top) / bounds.height;
            const rotateY = (x - 0.5) * 6;
            const rotateX = (0.5 - y) * 5;

            card.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            card.style.setProperty('--glare-x', `${x * 100}%`);
            card.style.setProperty('--glare-y', `${y * 100}%`);
            card.classList.add('is-tilting');
        });

        card.addEventListener('pointerleave', () => {
            card.style.transform = '';
            card.classList.remove('is-tilting');
        });
    });
}

/* ============================================
   MODAL / DOCUMENT VIEWER
   ============================================ */
const portfolioDocs = {
    // Data Engineering & ML
    'credit-risk': { title: 'Production Credit Scoring Architecture', file: 'assets/flowcharts/credit_scoring_architecture.html', type: 'html', fallback: 'Credit scoring system architecture' },
    'mophones': { title: 'MoPhones Portfolio - Live Demo', type: 'external', url: 'https://mophones-ksstnmfcqgr6rjsdpspc8r.streamlit.app/', fallback: 'MoPhones live Streamlit app' },
    'forecasting': { title: 'Sales Forecasting - Architecture', file: 'assets/flowcharts/sales_forecasting_architecture.html', type: 'html', fallback: 'Sales forecasting system architecture' },
    'chatbot': { title: 'Support Copilot RAG Architecture', file: 'assets/flowcharts/support-copilot-rag-pipeline.html', type: 'html', fallback: 'Support copilot RAG architecture' },
    'bigdata': { title: 'Big Data Pipeline - Diagram', file: 'assets/docs/bigdata-pipeline-diagram.html', type: 'html', fallback: 'Enterprise big data pipeline architecture' },
    
    // BI Dashboards
    'powerbi': { title: 'Power BI Dashboards - Screenshots', file: 'assets/docs/jd-bi-loan-portfolio-dashboard.html', type: 'html', fallback: 'Power BI enterprise dashboard walkthrough' },
    'loan-portfolio': { title: 'Loan Portfolio Dashboard', file: 'assets/docs/jd-bi-loan-portfolio-dashboard (1).html', type: 'html', fallback: 'Comprehensive loan portfolio analytics dashboard' },
    'sales-analytics': { title: 'Sales Analytics Dashboard', file: 'assets/docs/sales-analytics.html', type: 'html', fallback: 'Sales performance and analytics dashboard' },
    'hr-management': { title: 'HR Management Dashboard', file: 'assets/docs/hr-management-dashboard.html', type: 'html', fallback: 'Human resources management and analytics dashboard' },
    'servicedesk': { title: 'Service Desk Performance Review', file: 'assets/docs/servicedesk-performance-review.html', type: 'html', fallback: 'IT service desk performance and SLA dashboard' },
    
    // Power Apps & Prototypes
    'gardaworld-appraisal': { title: 'GardaWorld Appraisal - Prototype', file: 'assets/docs/gardaworld-appraisal-manual-application-screens.html', type: 'html', fallback: 'GardaWorld appraisal prototype' },
    'employee-meal': { title: 'Employee Meal Selection - Prototype', file: 'assets/docs/dataposit-meals-manual-designed-built.html', type: 'html', fallback: 'Employee meal selection prototype' },
    'pm-ticket': { title: 'PM Ticket Follow-up - Prototype', file: 'assets/docs/dataposit-ticketing-manual-designed-built.html', type: 'html', fallback: 'PM ticket follow-up prototype' },
    'garda-journey': { title: 'Garda Journey Management Automation', file: 'assets/docs/gardaworld-journey-management-automation-proposal.html', type: 'html', fallback: 'Journey management automation proposal' },

    // Flowcharts / Diagrams (PDF/PPTX)
    'etl-pipeline': { title: 'Azure ETL Pipeline Architecture', file: 'assets/flowcharts/etl-pipeline-architecture.pdf', type: 'pdf', fallback: 'End-to-end ETL pipeline from ERP to Power BI' },
    'ml-lifecycle': { title: 'MLOps Lifecycle Diagram', file: 'assets/flowcharts/ml-lifecycle.pptx', type: 'pptx', fallback: 'Complete ML lifecycle from training to production' },
    'bi-architecture': { title: 'Enterprise BI Architecture', file: 'assets/flowcharts/bi-architecture.pdf', type: 'pdf', fallback: 'Semantic model, DAX layer, and dashboard architecture' },
    'copilot-integration': { title: 'Copilot + MCP Integration Workflow', file: 'assets/flowcharts/copilot-mcp-workflow.pptx', type: 'pptx', fallback: 'Microsoft Copilot and MCP server integration workflow' }
};
function initModals() {
    const modal = document.getElementById('docModal');
    if (modal) {
        // Close modal on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-overlay')) {
                closeModal();
            }
        });
    }

    // Attach openModal to any element with data-doc or data-project
    document.querySelectorAll('[data-doc], [data-project]').forEach(el => {
        el.addEventListener('click', (e) => {
            if (e.target.closest('a') || e.target.closest('button')) return;
            
            const docId = el.getAttribute('data-doc') || el.getAttribute('data-project');
            if (portfolioDocs[docId]) {
                showDocumentViewer(portfolioDocs[docId]);
            } else {
                showToast('Details coming soon.');
            }
        });
    });
}

function showDocumentViewer(doc) {
    const modal = document.getElementById('docModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDownload = document.getElementById('modalDownload');
    const docViewer = document.getElementById('docViewer');

    if (!modal || !modalTitle || !docViewer) return;

    modalTitle.textContent = doc.title;
    modalDownload.href = doc.file || doc.url || '#';
    modalDownload.style.display = 'inline-flex'; // Ensure download button is visible

    // External links open in new tab immediately
    if (doc.type === 'external' && doc.url) {
        window.open(doc.url, '_blank', 'noopener,noreferrer');
        showToast('Opening external demo in a new tab...');
        return;
    }

    // HTML and PDF viewing
    if (doc.type === 'pdf' || doc.type === 'html') {
        docViewer.innerHTML = `
            <iframe src="${doc.file}" type="${doc.type === 'pdf' ? 'application/pdf' : 'text/html'}" title="${doc.title}" loading="lazy"></iframe>
            <div class="doc-fallback" style="text-align: center; padding: 20px; background: var(--bg-card); border-top: 1px solid var(--border);">
                <p style="margin-bottom: 12px; color: var(--text-secondary); font-size: 0.9rem;">
                    <i class="fas fa-info-circle"></i> Having trouble viewing? Mobile browsers may restrict embedded files.
                </p>
                <a href="${doc.file}" target="_blank" rel="noopener" class="btn btn-primary">
                    <i class="fas fa-external-link-alt"></i> Open in New Tab
                </a>
            </div>
        `;
    } else {
        // PPTX or other unsupported formats
        docViewer.innerHTML = `
            <div class="doc-placeholder">
                <i class="fas fa-file-powerpoint" style="font-size: 4rem; color: var(--primary); margin-bottom: 20px;"></i>
                <h4>PowerPoint Presentation</h4>
                <p>${doc.fallback}</p>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 8px;">
                    <i class="fas fa-info-circle"></i> 
                    For best viewing, download and open in PowerPoint or Google Slides.
                </p>
                <a href="${doc.file}" download class="btn btn-primary" style="margin-top: 16px;">
                    <i class="fas fa-download"></i> Download Presentation
                </a>
            </div>
        `;
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('docModal');
    const docViewer = document.getElementById('docViewer');
    
    if (!modal) return;

    modal.classList.remove('active');
    document.body.style.overflow = '';

    // Clear iframe after animation to stop memory leaks/audio playback
    setTimeout(() => {
        if (docViewer) docViewer.innerHTML = '';
    }, 300);
}

/* ============================================
   CONTACT FORM
   ============================================ */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate submission (Replace with Formspree/EmailJS action in HTML)
        setTimeout(() => {
            showToast('Thank you! Your message has been sent successfully.');
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.expertise-card, .project-card, .dashboard-card, .pp-card, .timeline-item, .flowchart-card, .contact-item');

    animateElements.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Parallax effect for hero section
window.addEventListener('scroll', throttle(() => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.scrollY;
        const parallax = hero.querySelector('.hero-bg');
        if (parallax && scrolled < window.innerHeight) {
            parallax.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }
}, 16));
