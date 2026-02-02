// Storage utility for portfolio data management
const PortfolioStorage = {
    // Keys for localStorage
    KEYS: {
        PROFILE: 'portfolio_profile',
        PROJECTS: 'portfolio_projects',
        CERTIFICATES: 'portfolio_certificates',
        GALLERY: 'portfolio_gallery',
        ADMIN_PASSWORD: 'portfolio_admin_password'
    },

    // Default data structures
    getDefaultProfile: () => ({
        name: 'Your Name',
        title: 'Your Title',
        bio: 'Tell us about yourself...',
        profileImage: '',
        email: '',
        phone: '',
        location: '',
        social: {
            github: '',
            linkedin: '',
            twitter: '',
            website: ''
        }
    }),

    getDefaultProject: () => ({
        id: Date.now(),
        title: '',
        description: '',
        image: '',
        technologies: [],
        liveUrl: '',
        githubUrl: '',
        featured: false,
        createdAt: new Date().toISOString()
    }),

    getDefaultCertificate: () => ({
        id: Date.now(),
        title: '',
        issuer: '',
        date: '',
        image: '',
        credentialUrl: '',
        description: '',
        createdAt: new Date().toISOString()
    }),

    // Initialize storage with default data
    initialize: function () {
        if (!this.getProfile()) {
            this.saveProfile(this.getDefaultProfile());
        }
        if (!this.getProjects()) {
            this.saveProjects([]);
        }
        if (!this.getCertificates()) {
            this.saveCertificates([]);
        }
        if (!this.getGallery()) {
            this.saveGallery([]);
        }
        if (!this.getAdminPassword()) {
            this.saveAdminPassword('admin123'); // Default password
        }
    },

    // Profile methods
    getProfile: function () {
        const data = localStorage.getItem(this.KEYS.PROFILE);
        return data ? JSON.parse(data) : null;
    },

    saveProfile: function (profile) {
        localStorage.setItem(this.KEYS.PROFILE, JSON.stringify(profile));
    },

    // Projects methods
    getProjects: function () {
        const data = localStorage.getItem(this.KEYS.PROJECTS);
        return data ? JSON.parse(data) : null;
    },

    saveProjects: function (projects) {
        localStorage.setItem(this.KEYS.PROJECTS, JSON.stringify(projects));
    },

    addProject: function (project) {
        const projects = this.getProjects() || [];
        projects.unshift(project);
        this.saveProjects(projects);
        return project;
    },

    updateProject: function (id, updatedProject) {
        const projects = this.getProjects() || [];
        const index = projects.findIndex(p => p.id === id);
        if (index !== -1) {
            projects[index] = { ...projects[index], ...updatedProject };
            this.saveProjects(projects);
            return projects[index];
        }
        return null;
    },

    deleteProject: function (id) {
        const projects = this.getProjects() || [];
        const filtered = projects.filter(p => p.id !== id);
        this.saveProjects(filtered);
    },

    // Certificates methods
    getCertificates: function () {
        const data = localStorage.getItem(this.KEYS.CERTIFICATES);
        return data ? JSON.parse(data) : null;
    },

    saveCertificates: function (certificates) {
        localStorage.setItem(this.KEYS.CERTIFICATES, JSON.stringify(certificates));
    },

    addCertificate: function (certificate) {
        const certificates = this.getCertificates() || [];
        certificates.unshift(certificate);
        this.saveCertificates(certificates);
        return certificate;
    },

    updateCertificate: function (id, updatedCertificate) {
        const certificates = this.getCertificates() || [];
        const index = certificates.findIndex(c => c.id === id);
        if (index !== -1) {
            certificates[index] = { ...certificates[index], ...updatedCertificate };
            this.saveCertificates(certificates);
            return certificates[index];
        }
        return null;
    },

    deleteCertificate: function (id) {
        const certificates = this.getCertificates() || [];
        const filtered = certificates.filter(c => c.id !== id);
        this.saveCertificates(filtered);
    },

    // Gallery methods
    getGallery: function () {
        const data = localStorage.getItem(this.KEYS.GALLERY);
        return data ? JSON.parse(data) : null;
    },

    saveGallery: function (gallery) {
        localStorage.setItem(this.KEYS.GALLERY, JSON.stringify(gallery));
    },

    addGalleryImage: function (image) {
        const gallery = this.getGallery() || [];
        gallery.unshift(image);
        this.saveGallery(gallery);
        return image;
    },

    deleteGalleryImage: function (id) {
        const gallery = this.getGallery() || [];
        const filtered = gallery.filter(img => img.id !== id);
        this.saveGallery(filtered);
    },

    // Admin password methods
    getAdminPassword: function () {
        return localStorage.getItem(this.KEYS.ADMIN_PASSWORD);
    },

    saveAdminPassword: function (password) {
        localStorage.setItem(this.KEYS.ADMIN_PASSWORD, password);
    },

    // Utility methods
    exportData: function () {
        return {
            profile: this.getProfile(),
            projects: this.getProjects(),
            certificates: this.getCertificates(),
            gallery: this.getGallery(),
            exportedAt: new Date().toISOString()
        };
    },

    importData: function (data) {
        if (data.profile) this.saveProfile(data.profile);
        if (data.projects) this.saveProjects(data.projects);
        if (data.certificates) this.saveCertificates(data.certificates);
        if (data.gallery) this.saveGallery(data.gallery);
    },

    clearAllData: function () {
        Object.values(this.KEYS).forEach(key => {
            if (key !== this.KEYS.ADMIN_PASSWORD) {
                localStorage.removeItem(key);
            }
        });
        this.initialize();
    },

    // Check storage usage
    getStorageSize: function () {
        let total = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                total += localStorage[key].length + key.length;
            }
        }
        return (total / 1024).toFixed(2); // Return size in KB
    },

    // Image compression utility
    compressImage: function (file, maxWidth = 1200, quality = 0.8) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;

                    if (width > maxWidth) {
                        height = (height * maxWidth) / width;
                        width = maxWidth;
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    canvas.toBlob(
                        (blob) => {
                            const reader = new FileReader();
                            reader.readAsDataURL(blob);
                            reader.onloadend = () => {
                                resolve(reader.result);
                            };
                        },
                        'image/jpeg',
                        quality
                    );
                };
                img.onerror = reject;
            };
            reader.onerror = reject;
        });
    }
};

// Initialize storage on load
if (typeof window !== 'undefined') {
    PortfolioStorage.initialize();
}
