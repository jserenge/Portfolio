/* ============================================
   Jeremiah Daniel Serenge - Portfolio JS
   Interactive functionality for data engineering portfolio
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initNavbar();
    initParticles();
    initProjectFilter();
    initContactForm();
    initScrollAnimations();
    initProjectTilt();
    initProjectClicks();
    initFabricInteractions();
    initPowerPlatformCards();
    initBiTabs();
});

/* ============================================
   NAVBAR
   ============================================ */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();
    });

    // Mobile toggle
    const closeMenu = () => {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open navigation');
        document.body.classList.remove('menu-open');
        navToggle.querySelectorAll('span').forEach(span => { span.style.transform = ''; span.style.opacity = ''; });
    };

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const isOpen = navMenu.classList.contains('active');
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
        link.addEventListener('click', () => {
            closeMenu();
        });
    });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
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
    
    // Reduce particles on mobile
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 10 : 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 10;

        particle.style.left = x + '%';
        particle.style.top = y + '%';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.1;

        container.appendChild(particle);
    }
}

/* ============================================
   PROJECT FILTERING
   ============================================ */
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // Filter projects with animation
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        card.style.transition = 'all 0.4s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 400);
                }
            });
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
const projectDocs = {
    'credit-risk': {
        title: 'Production Credit Scoring Architecture',
        file: 'assets/flowcharts/credit_scoring_architecture.html',
        type: 'html',
        fallbackMessage: 'Credit scoring system architecture'
    },
    'mophones': {
        title: 'MoPhones Portfolio - Live Demo',
        type: 'external',
        url: 'https://mophones-ksstnmfcqgr6rjsdpspc8r.streamlit.app/',
        fallbackMessage: 'MoPhones live Streamlit app (opens in new tab)'
    },
    'forecasting': {
        title: 'Sales Forecasting - Architecture',
        file: 'assets/flowcharts/sales_forecasting_architecture.html',
        type: 'html',
        fallbackMessage: 'Sales forecasting system architecture and methodology'
    },
    'chatbot': {
        title: 'Support Copilot RAG Architecture',
        file: 'assets/flowcharts/support-copilot-rag-pipeline',
        type: 'html',
        fallbackMessage: 'Support copilot retrieval-augmented generation architecture'
    },
   'bigdata': {
    title: 'Big Data Pipeline - Diagram',
    file: 'assets/docs/bigdata-pipeline-diagram.html',
    type: 'html',
    fallbackMessage: 'Enterprise big data pipeline architecture diagram'
    },
    'powerbi': {
    title: 'Power BI Dashboards - Screenshots',
    file: 'assets/docs/jd-bi-loan-portfolio-dashboard.html',
    type: 'html',
    fallbackMessage: 'Power BI enterprise dashboard screenshots and walkthrough'
    }
};

// Additional Power Platform prototypes (placeholders - copy HTML prototypes into assets/docs/)
projectDocs['gardaworld-appraisal'] = {
    title: 'GardaWorld Appraisal - Prototype',
    file: 'assets/docs/gardaworld-appraisal-manual-application-screens.html',
    type: 'html',
    fallbackMessage: 'GardaWorld appraisal prototype'
};
projectDocs['employee-meal'] = {
    title: 'Employee Meal Selection - Prototype',
    file: 'assets/docs/dataposit-meals-manual-designed-built.html',
    type: 'html',
    fallbackMessage: 'Employee meal selection prototype'
};
projectDocs['pm-ticket'] = {
    title: 'PM Ticket Follow-up - Prototype',
    file: 'assets/docs/dataposit-ticketing-manual-designed-built.html',
    type: 'html',
    fallbackMessage: 'PM ticket follow-up prototype'
};
projectDocs['garda-journey'] = {
    title: 'Garda Journey Management Automation',
    file: 'assets/docs/gardaworld-journey-management-automation-proposal.html',
    type: 'html',
    fallbackMessage: 'Journey management automation proposal'
};

const flowchartDocs = {
    'etl-pipeline': {
        title: 'Azure ETL Pipeline Architecture',
        file: 'assets/flowcharts/etl-pipeline-architecture.pdf',
        type: 'pdf',
        fallbackMessage: 'End-to-end ETL pipeline from ERP sources to Power BI'
    },
    'ml-lifecycle': {
        title: 'MLOps Lifecycle Diagram',
        file: 'assets/flowcharts/ml-lifecycle.pptx',
        type: 'pptx',
        fallbackMessage: 'Complete ML lifecycle from training to production monitoring'
    },
    'bi-architecture': {
        title: 'Enterprise BI Architecture',
        file: 'assets/flowcharts/bi-architecture.pdf',
        type: 'pdf',
        fallbackMessage: 'Semantic model, DAX layer, and dashboard architecture'
    },
    'copilot-integration': {
        title: 'Copilot + MCP Integration Workflow',
        file: 'assets/flowcharts/copilot-mcp-workflow.pptx',
        type: 'pptx',
        fallbackMessage: 'Microsoft Copilot and MCP server integration workflow'
    }
};

function openModal(projectId) {
    const doc = projectDocs[projectId];
    if (!doc) return;

    showDocumentViewer(doc);
}

function openFlowchart(chartId) {
    const doc = flowchartDocs[chartId];
    if (!doc) return;

    showDocumentViewer(doc);
}

function showDocumentViewer(doc) {
    const modal = document.getElementById('docModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDownload = document.getElementById('modalDownload');
    const docViewer = document.getElementById('docViewer');

    modalTitle.textContent = doc.title;
    modalDownload.href = doc.file;

    // External links are opened in a new tab.
    if (doc.type === 'external' && doc.url) {
        window.open(doc.url, '_blank', 'noopener');
        return;
    }

    // GitHub Pages can display both PDFs and standalone HTML diagrams in an iframe.
    if (doc.type === 'pdf' || doc.type === 'html') {
        docViewer.innerHTML = `
            <iframe src="${doc.file}" type="${doc.type === 'pdf' ? 'application/pdf' : 'text/html'}" title="${doc.title}">
                <div class="doc-placeholder">
                    <i class="fas fa-project-diagram"></i>
                    <h4>Architecture Diagram</h4>
                    <p>${doc.fallbackMessage}</p>
                    <a href="${doc.file}" target="_blank" rel="noopener" class="btn btn-primary">
                        <i class="fas fa-external-link-alt"></i> Open Diagram
                    </a>
                </div>
            </iframe>
        `;
    } else {
        // For PPTX, show placeholder with download option
        // PPTX cannot be viewed in browser directly without conversion
        docViewer.innerHTML = `
            <div class="doc-placeholder">
                <i class="fas fa-file-powerpoint"></i>
                <h4>PowerPoint Presentation</h4>
                <p>${doc.fallbackMessage}</p>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 8px;">
                    <i class="fas fa-info-circle"></i> 
                    For best viewing, download and open in PowerPoint or Google Slides
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
    modal.classList.remove('active');
    document.body.style.overflow = '';

    // Clear iframe after animation
    setTimeout(() => {
        document.getElementById('docViewer').innerHTML = '';
    }, 300);
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

/* ============================================
   SMOOTH SCROLL
   ============================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ============================================
   CONTACT FORM
   ============================================ */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Since this is a static site, we'll show a toast with the data
        // In production, you could integrate with Formspree, Netlify Forms, or EmailJS
        showToast('Thank you for reaching out! This is a static demo - integrate with Formspree or EmailJS for live submissions.');

        // Log to console for debugging
        console.log('Form submission:', formData);

        // Reset form
        form.reset();
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
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
    const animateElements = document.querySelectorAll('.expertise-card, .project-card, .timeline-item, .flowchart-card, .contact-item');

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

/* ============================================
   NEW: Project Click Handlers & Sections
   ============================================ */
function initProjectClicks() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Ignore clicks on interactive children
            if (e.target.closest('a') || e.target.closest('button')) return;

            const link = card.dataset.link;
            const doc = card.dataset.doc || card.dataset.project;

            if (link) {
                window.open(link, '_blank', 'noopener');
                return;
            }

            if (doc) {
                openModal(doc);
                return;
            }

            showToast('No live demo or case study available yet.');
        });

        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
}

function initFabricInteractions() {
    const nodes = document.querySelectorAll('.fabric-node');
    if (!nodes) return;

    nodes.forEach(node => {
        node.addEventListener('click', () => {
            const title = node.querySelector('h4')?.textContent || 'Detail';
            const desc = node.getAttribute('data-tooltip') || '';
            const modalTitle = document.getElementById('modalTitle');
            const docViewer = document.getElementById('docViewer');
            modalTitle.textContent = title;
            docViewer.innerHTML = `
                <div class="doc-placeholder">
                    <h4 style="margin-bottom:8px;">${title}</h4>
                    <p style="color:var(--text-secondary);">${desc}</p>
                </div>
            `;
            document.getElementById('modalDownload').href = '#';
            document.getElementById('docModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
}

function initPowerPlatformCards() {
    document.querySelectorAll('.pp-card').forEach(card => {
        card.tabIndex = 0;
        card.addEventListener('click', () => {
            const doc = card.dataset.doc;
            if (doc) openModal(doc);
        });
        card.addEventListener('keydown', (e) => { if (e.key === 'Enter') card.click(); });
    });
}

function initBiTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.dashboard-panel');
    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            // Show corresponding panel
            const cat = tab.dataset.cat;
            panels.forEach(p => {
                if (p.dataset.cat === cat) {
                    p.classList.add('active');
                    p.style.display = 'block';
                } else {
                    p.classList.remove('active');
                    p.style.display = 'none';
                }
            });
        });
    });
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

// Debounce function for performance
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

// Throttle function for scroll events
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

// Add parallax effect to hero section
window.addEventListener('scroll', throttle(() => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.scrollY;
        const parallax = hero.querySelector('.hero-bg');
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }
}, 16));
