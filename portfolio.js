// Portfolio Display JavaScript
let allProjects = [];
let currentFilter = 'all';

// Load all data on page load
document.addEventListener('DOMContentLoaded', () => {
    loadPortfolioData();
    setupEventListeners();
});

function loadPortfolioData() {
    loadProfile();
    loadProjects();
    loadCertificates();
    loadGallery();
}

// ===== PROFILE LOADING =====
function loadProfile() {
    const profile = PortfolioStorage.getProfile();

    // Update navigation
    document.getElementById('navName').textContent = profile.name;

    // Update hero section
    document.getElementById('heroName').textContent = profile.name;
    document.getElementById('heroTitle').textContent = profile.title;
    document.getElementById('heroBio').textContent = profile.bio;

    // Update hero image
    const heroImage = document.getElementById('heroImage');
    if (profile.profileImage) {
        heroImage.src = profile.profileImage;
        heroImage.style.display = 'block';
    } else {
        heroImage.style.display = 'none';
    }

    // Update social links
    const socialContainer = document.getElementById('heroSocial');
    const socialLinks = [];

    if (profile.social.github) {
        socialLinks.push(`<a href="${profile.social.github}" target="_blank" class="social-link" title="GitHub">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    </a>`);
    }

    if (profile.social.linkedin) {
        socialLinks.push(`<a href="${profile.social.linkedin}" target="_blank" class="social-link" title="LinkedIn">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    </a>`);
    }

    if (profile.social.twitter) {
        socialLinks.push(`<a href="${profile.social.twitter}" target="_blank" class="social-link" title="Twitter">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
      </svg>
    </a>`);
    }

    if (profile.social.website) {
        socialLinks.push(`<a href="${profile.social.website}" target="_blank" class="social-link" title="Website">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z"/>
      </svg>
    </a>`);
    }

    socialContainer.innerHTML = socialLinks.join('');

    // Update about section
    document.getElementById('aboutBio').textContent = profile.bio;

    const aboutInfo = [];
    if (profile.email) aboutInfo.push(`<div class="info-item"><strong>Email:</strong> <a href="mailto:${profile.email}">${profile.email}</a></div>`);
    if (profile.phone) aboutInfo.push(`<div class="info-item"><strong>Phone:</strong> ${profile.phone}</div>`);
    if (profile.location) aboutInfo.push(`<div class="info-item"><strong>Location:</strong> ${profile.location}</div>`);

    document.getElementById('aboutInfo').innerHTML = aboutInfo.join('');

    // Update contact section
    const contactInfo = [];
    if (profile.email) contactInfo.push(`<div class="contact-item"><strong>Email:</strong> <a href="mailto:${profile.email}">${profile.email}</a></div>`);
    if (profile.phone) contactInfo.push(`<div class="contact-item"><strong>Phone:</strong> ${profile.phone}</div>`);
    if (profile.location) contactInfo.push(`<div class="contact-item"><strong>Location:</strong> ${profile.location}</div>`);

    document.getElementById('contactInfo').innerHTML = contactInfo.join('');
    document.getElementById('contactSocial').innerHTML = socialLinks.join('');

    // Update footer
    document.getElementById('footerText').textContent = `© ${new Date().getFullYear()} ${profile.name}. All rights reserved.`;
}

// ===== PROJECTS LOADING =====
function loadProjects() {
    allProjects = PortfolioStorage.getProjects() || [];

    // Get unique technologies for filters
    const technologies = new Set();
    allProjects.forEach(project => {
        project.technologies.forEach(tech => technologies.add(tech));
    });

    // Create filter buttons
    const filterContainer = document.getElementById('filterButtons');
    const filters = ['all', ...Array.from(technologies)];

    filterContainer.innerHTML = filters.map(filter =>
        `<button class="filter-btn ${filter === 'all' ? 'active' : ''}" data-filter="${filter}">
      ${filter === 'all' ? 'All' : filter}
    </button>`
    ).join('');

    // Add filter event listeners
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            displayProjects();
        });
    });

    displayProjects();
}

function displayProjects() {
    const container = document.getElementById('projectsGrid');

    let filteredProjects = allProjects;
    if (currentFilter !== 'all') {
        filteredProjects = allProjects.filter(project =>
            project.technologies.includes(currentFilter)
        );
    }

    if (filteredProjects.length === 0) {
        container.innerHTML = '<p class="empty-message">No projects to display yet.</p>';
        return;
    }

    container.innerHTML = filteredProjects.map(project => `
    <div class="project-card">
      ${project.image ? `<img src="${project.image}" alt="${project.title}" class="project-image">` : '<div class="project-no-image">No Image</div>'}
      <div class="project-content">
        <h3>${project.title}</h3>
        ${project.featured ? '<span class="featured-badge">Featured</span>' : ''}
        <p>${project.description}</p>
        <div class="project-tech">
          ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        <div class="project-links">
          ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" class="project-link">Live Demo</a>` : ''}
          ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="project-link">GitHub</a>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

// ===== CERTIFICATES LOADING =====
function loadCertificates() {
    const certificates = PortfolioStorage.getCertificates() || [];
    const container = document.getElementById('certificatesGrid');

    if (certificates.length === 0) {
        container.innerHTML = '<p class="empty-message">No certificates to display yet.</p>';
        return;
    }

    container.innerHTML = certificates.map(cert => `
    <div class="certificate-card">
      ${cert.image ? `<img src="${cert.image}" alt="${cert.title}" class="certificate-image" onclick="openLightbox('${cert.image}')">` : '<div class="certificate-no-image">No Image</div>'}
      <div class="certificate-content">
        <h3>${cert.title}</h3>
        <p class="certificate-issuer">${cert.issuer}</p>
        <p class="certificate-date">${new Date(cert.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
        ${cert.description ? `<p class="certificate-description">${cert.description}</p>` : ''}
        ${cert.credentialUrl ? `<a href="${cert.credentialUrl}" target="_blank" class="certificate-link">View Credential</a>` : ''}
      </div>
    </div>
  `).join('');
}

// ===== GALLERY LOADING =====
function loadGallery() {
    const gallery = PortfolioStorage.getGallery() || [];
    const container = document.getElementById('galleryGrid');

    if (gallery.length === 0) {
        container.innerHTML = '<p class="empty-message">No images to display yet.</p>';
        return;
    }

    container.innerHTML = gallery.map(img => `
    <div class="gallery-item" onclick="openLightbox('${img.src}')">
      <img src="${img.src}" alt="${img.title || 'Gallery image'}">
    </div>
  `).join('');
}

// ===== LIGHTBOX =====
function openLightbox(imageSrc) {
    document.getElementById('lightboxImage').src = imageSrc;
    document.getElementById('lightbox').style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Lightbox close
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('lightbox').addEventListener('click', (e) => {
        if (e.target.id === 'lightbox') {
            closeLightbox();
        }
    });

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}
