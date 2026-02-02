// Admin Panel JavaScript
let currentEditingProjectId = null;
let currentEditingCertificateId = null;

// Authentication
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.getElementById('loginPassword').value;
    const storedPassword = PortfolioStorage.getAdminPassword();

    if (password === storedPassword) {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        loadAllData();
    } else {
        alert('Incorrect password!');
    }
});

function logout() {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('loginPassword').value = '';
}

// Navigation
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const section = btn.dataset.section;

        // Update active nav button
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update active section
        document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
        document.getElementById(`${section}Section`).classList.add('active');
    });
});

// Load all data
function loadAllData() {
    loadProfile();
    loadProjects();
    loadCertificates();
    loadGallery();
    updateStorageInfo();
}

// Update storage info
function updateStorageInfo() {
    const size = PortfolioStorage.getStorageSize();
    document.getElementById('storageInfo').textContent = `Storage: ${size} KB`;
}

// ===== PROFILE MANAGEMENT =====
function loadProfile() {
    const profile = PortfolioStorage.getProfile();
    const form = document.getElementById('profileForm');

    form.elements.name.value = profile.name;
    form.elements.title.value = profile.title;
    form.elements.bio.value = profile.bio;
    form.elements.email.value = profile.email || '';
    form.elements.phone.value = profile.phone || '';
    form.elements.location.value = profile.location || '';
    form.elements.github.value = profile.social.github || '';
    form.elements.linkedin.value = profile.social.linkedin || '';
    form.elements.twitter.value = profile.social.twitter || '';
    form.elements.website.value = profile.social.website || '';

    if (profile.profileImage) {
        document.getElementById('profileImagePreview').innerHTML =
            `<img src="${profile.profileImage}" alt="Profile">`;
    }
}

document.getElementById('profileImageInput')?.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (file) {
        const compressed = await PortfolioStorage.compressImage(file, 400, 0.8);
        document.getElementById('profileImagePreview').innerHTML =
            `<img src="${compressed}" alt="Profile">`;
    }
});

document.getElementById('profileForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;

    const profile = {
        name: form.elements.name.value,
        title: form.elements.title.value,
        bio: form.elements.bio.value,
        email: form.elements.email.value,
        phone: form.elements.phone.value,
        location: form.elements.location.value,
        social: {
            github: form.elements.github.value,
            linkedin: form.elements.linkedin.value,
            twitter: form.elements.twitter.value,
            website: form.elements.website.value
        }
    };

    const imagePreview = document.getElementById('profileImagePreview').querySelector('img');
    if (imagePreview) {
        profile.profileImage = imagePreview.src;
    } else {
        profile.profileImage = PortfolioStorage.getProfile().profileImage || '';
    }

    PortfolioStorage.saveProfile(profile);
    updateStorageInfo();
    alert('Profile saved successfully!');
});

// ===== PROJECTS MANAGEMENT =====
function loadProjects() {
    const projects = PortfolioStorage.getProjects() || [];
    const container = document.getElementById('projectsList');

    if (projects.length === 0) {
        container.innerHTML = '<p class="empty-state">No projects yet. Click "Add Project" to get started!</p>';
        return;
    }

    container.innerHTML = projects.map(project => `
    <div class="item-card">
      ${project.image ? `<img src="${project.image}" alt="${project.title}">` : '<div class="no-image">No Image</div>'}
      <div class="item-content">
        <h3>${project.title}</h3>
        <p>${project.description.substring(0, 100)}${project.description.length > 100 ? '...' : ''}</p>
        <div class="item-meta">
          <span>${project.technologies.join(', ')}</span>
          ${project.featured ? '<span class="badge">Featured</span>' : ''}
        </div>
        <div class="item-actions">
          <button onclick="editProject(${project.id})" class="btn-edit">Edit</button>
          <button onclick="deleteProject(${project.id})" class="btn-delete">Delete</button>
        </div>
      </div>
    </div>
  `).join('');
}

function showProjectModal() {
    currentEditingProjectId = null;
    document.getElementById('projectModalTitle').textContent = 'Add Project';
    document.getElementById('projectForm').reset();
    document.getElementById('projectImagePreview').innerHTML = '';
    document.getElementById('projectModal').style.display = 'flex';
}

function closeProjectModal() {
    document.getElementById('projectModal').style.display = 'none';
}

function editProject(id) {
    const projects = PortfolioStorage.getProjects();
    const project = projects.find(p => p.id === id);

    if (!project) return;

    currentEditingProjectId = id;
    document.getElementById('projectModalTitle').textContent = 'Edit Project';
    document.getElementById('projectTitle').value = project.title;
    document.getElementById('projectDescription').value = project.description;
    document.getElementById('projectTechnologies').value = project.technologies.join(', ');
    document.getElementById('projectLiveUrl').value = project.liveUrl || '';
    document.getElementById('projectGithubUrl').value = project.githubUrl || '';
    document.getElementById('projectFeatured').checked = project.featured;

    if (project.image) {
        document.getElementById('projectImagePreview').innerHTML =
            `<img src="${project.image}" alt="${project.title}">`;
    }

    document.getElementById('projectModal').style.display = 'flex';
}

function deleteProject(id) {
    if (confirm('Are you sure you want to delete this project?')) {
        PortfolioStorage.deleteProject(id);
        loadProjects();
        updateStorageInfo();
    }
}

document.getElementById('projectImageInput')?.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (file) {
        const compressed = await PortfolioStorage.compressImage(file, 1200, 0.85);
        document.getElementById('projectImagePreview').innerHTML =
            `<img src="${compressed}" alt="Project">`;
    }
});

document.getElementById('projectForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const project = {
        id: currentEditingProjectId || Date.now(),
        title: document.getElementById('projectTitle').value,
        description: document.getElementById('projectDescription').value,
        technologies: document.getElementById('projectTechnologies').value
            .split(',').map(t => t.trim()).filter(t => t),
        liveUrl: document.getElementById('projectLiveUrl').value,
        githubUrl: document.getElementById('projectGithubUrl').value,
        featured: document.getElementById('projectFeatured').checked,
        createdAt: new Date().toISOString()
    };

    const imagePreview = document.getElementById('projectImagePreview').querySelector('img');
    project.image = imagePreview ? imagePreview.src : '';

    if (currentEditingProjectId) {
        PortfolioStorage.updateProject(currentEditingProjectId, project);
    } else {
        PortfolioStorage.addProject(project);
    }

    closeProjectModal();
    loadProjects();
    updateStorageInfo();
});

// ===== CERTIFICATES MANAGEMENT =====
function loadCertificates() {
    const certificates = PortfolioStorage.getCertificates() || [];
    const container = document.getElementById('certificatesList');

    if (certificates.length === 0) {
        container.innerHTML = '<p class="empty-state">No certificates yet. Click "Add Certificate" to get started!</p>';
        return;
    }

    container.innerHTML = certificates.map(cert => `
    <div class="item-card">
      ${cert.image ? `<img src="${cert.image}" alt="${cert.title}">` : '<div class="no-image">No Image</div>'}
      <div class="item-content">
        <h3>${cert.title}</h3>
        <p><strong>${cert.issuer}</strong> • ${new Date(cert.date).toLocaleDateString()}</p>
        ${cert.description ? `<p>${cert.description}</p>` : ''}
        <div class="item-actions">
          <button onclick="editCertificate(${cert.id})" class="btn-edit">Edit</button>
          <button onclick="deleteCertificate(${cert.id})" class="btn-delete">Delete</button>
        </div>
      </div>
    </div>
  `).join('');
}

function showCertificateModal() {
    currentEditingCertificateId = null;
    document.getElementById('certificateModalTitle').textContent = 'Add Certificate';
    document.getElementById('certificateForm').reset();
    document.getElementById('certificateImagePreview').innerHTML = '';
    document.getElementById('certificateModal').style.display = 'flex';
}

function closeCertificateModal() {
    document.getElementById('certificateModal').style.display = 'none';
}

function editCertificate(id) {
    const certificates = PortfolioStorage.getCertificates();
    const cert = certificates.find(c => c.id === id);

    if (!cert) return;

    currentEditingCertificateId = id;
    document.getElementById('certificateModalTitle').textContent = 'Edit Certificate';
    document.getElementById('certificateTitle').value = cert.title;
    document.getElementById('certificateIssuer').value = cert.issuer;
    document.getElementById('certificateDate').value = cert.date;
    document.getElementById('certificateDescription').value = cert.description || '';
    document.getElementById('certificateCredentialUrl').value = cert.credentialUrl || '';

    if (cert.image) {
        document.getElementById('certificateImagePreview').innerHTML =
            `<img src="${cert.image}" alt="${cert.title}">`;
    }

    document.getElementById('certificateModal').style.display = 'flex';
}

function deleteCertificate(id) {
    if (confirm('Are you sure you want to delete this certificate?')) {
        PortfolioStorage.deleteCertificate(id);
        loadCertificates();
        updateStorageInfo();
    }
}

document.getElementById('certificateImageInput')?.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (file) {
        const compressed = await PortfolioStorage.compressImage(file, 1200, 0.85);
        document.getElementById('certificateImagePreview').innerHTML =
            `<img src="${compressed}" alt="Certificate">`;
    }
});

document.getElementById('certificateForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const certificate = {
        id: currentEditingCertificateId || Date.now(),
        title: document.getElementById('certificateTitle').value,
        issuer: document.getElementById('certificateIssuer').value,
        date: document.getElementById('certificateDate').value,
        description: document.getElementById('certificateDescription').value,
        credentialUrl: document.getElementById('certificateCredentialUrl').value,
        createdAt: new Date().toISOString()
    };

    const imagePreview = document.getElementById('certificateImagePreview').querySelector('img');
    certificate.image = imagePreview ? imagePreview.src : '';

    if (currentEditingCertificateId) {
        PortfolioStorage.updateCertificate(currentEditingCertificateId, certificate);
    } else {
        PortfolioStorage.addCertificate(certificate);
    }

    closeCertificateModal();
    loadCertificates();
    updateStorageInfo();
});

// ===== GALLERY MANAGEMENT =====
function loadGallery() {
    const gallery = PortfolioStorage.getGallery() || [];
    const container = document.getElementById('galleryList');

    if (gallery.length === 0) {
        container.innerHTML = '<p class="empty-state">No images yet. Click "Add Image" to get started!</p>';
        return;
    }

    container.innerHTML = gallery.map(img => `
    <div class="gallery-item">
      <img src="${img.src}" alt="${img.title || 'Gallery image'}">
      <div class="gallery-overlay">
        <button onclick="deleteGalleryImage(${img.id})" class="btn-delete">Delete</button>
      </div>
    </div>
  `).join('');
}

document.getElementById('galleryImageInput')?.addEventListener('change', async (e) => {
    const files = Array.from(e.target.files);

    for (const file of files) {
        const compressed = await PortfolioStorage.compressImage(file, 1200, 0.85);
        const image = {
            id: Date.now() + Math.random(),
            src: compressed,
            title: file.name,
            createdAt: new Date().toISOString()
        };
        PortfolioStorage.addGalleryImage(image);
    }

    loadGallery();
    updateStorageInfo();
    e.target.value = '';
});

function deleteGalleryImage(id) {
    if (confirm('Are you sure you want to delete this image?')) {
        PortfolioStorage.deleteGalleryImage(id);
        loadGallery();
        updateStorageInfo();
    }
}

// ===== SETTINGS =====
document.getElementById('passwordForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    if (newPassword.length < 6) {
        alert('Password must be at least 6 characters long!');
        return;
    }

    PortfolioStorage.saveAdminPassword(newPassword);
    alert('Password updated successfully!');
    e.target.reset();
});

function exportData() {
    const data = PortfolioStorage.exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

document.getElementById('importFile')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const data = JSON.parse(event.target.result);
            PortfolioStorage.importData(data);
            loadAllData();
            alert('Data imported successfully!');
        } catch (error) {
            alert('Error importing data. Please check the file format.');
        }
    };
    reader.readAsText(file);
    e.target.value = '';
});

function clearAllData() {
    if (confirm('Are you sure you want to clear ALL data? This cannot be undone!')) {
        if (confirm('This will delete all projects, certificates, and gallery images. Are you absolutely sure?')) {
            PortfolioStorage.clearAllData();
            loadAllData();
            alert('All data cleared!');
        }
    }
}

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});
