// Firebase Storage utility for portfolio data management
// This mirrors the PortfolioStorage API but uses Firebase Firestore and Storage

const FirebaseStorage = {
    // Collection names in Firestore
    COLLECTIONS: {
        PROFILE: 'profile',
        PROJECTS: 'projects',
        CERTIFICATES: 'certificates',
        GALLERY: 'gallery',
        SETTINGS: 'settings'
    },

    // Check if Firebase is available
    isAvailable: function () {
        return typeof window.db !== 'undefined' && window.db !== null;
    },

    // Profile methods
    getProfile: async function () {
        if (!this.isAvailable()) {
            console.warn('Firebase not available, using localStorage');
            return PortfolioStorage.getProfile();
        }

        try {
            const doc = await db.collection(this.COLLECTIONS.PROFILE).doc('main').get();
            if (doc.exists) {
                return doc.data();
            }
            return PortfolioStorage.getDefaultProfile();
        } catch (error) {
            console.error('Error getting profile:', error);
            return PortfolioStorage.getProfile();
        }
    },

    saveProfile: async function (profile) {
        if (!this.isAvailable()) {
            return PortfolioStorage.saveProfile(profile);
        }

        try {
            await db.collection(this.COLLECTIONS.PROFILE).doc('main').set(profile);
            console.log('✅ Profile saved to Firebase');
            return profile;
        } catch (error) {
            console.error('Error saving profile:', error);
            return PortfolioStorage.saveProfile(profile);
        }
    },

    // Projects methods
    getProjects: async function () {
        if (!this.isAvailable()) {
            return PortfolioStorage.getProjects();
        }

        try {
            const snapshot = await db.collection(this.COLLECTIONS.PROJECTS)
                .orderBy('createdAt', 'desc')
                .get();

            const projects = [];
            snapshot.forEach(doc => {
                projects.push({ id: doc.id, ...doc.data() });
            });
            return projects;
        } catch (error) {
            console.error('Error getting projects:', error);
            return PortfolioStorage.getProjects();
        }
    },

    addProject: async function (project) {
        if (!this.isAvailable()) {
            return PortfolioStorage.addProject(project);
        }

        try {
            const projectData = {
                ...project,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            const docRef = await db.collection(this.COLLECTIONS.PROJECTS).add(projectData);
            console.log('✅ Project added to Firebase');
            return { id: docRef.id, ...projectData };
        } catch (error) {
            console.error('Error adding project:', error);
            return PortfolioStorage.addProject(project);
        }
    },

    updateProject: async function (id, updatedProject) {
        if (!this.isAvailable()) {
            return PortfolioStorage.updateProject(id, updatedProject);
        }

        try {
            await db.collection(this.COLLECTIONS.PROJECTS).doc(id).update(updatedProject);
            console.log('✅ Project updated in Firebase');
            return { id, ...updatedProject };
        } catch (error) {
            console.error('Error updating project:', error);
            return PortfolioStorage.updateProject(id, updatedProject);
        }
    },

    deleteProject: async function (id) {
        if (!this.isAvailable()) {
            return PortfolioStorage.deleteProject(id);
        }

        try {
            await db.collection(this.COLLECTIONS.PROJECTS).doc(id).delete();
            console.log('✅ Project deleted from Firebase');
        } catch (error) {
            console.error('Error deleting project:', error);
            return PortfolioStorage.deleteProject(id);
        }
    },

    // Certificates methods
    getCertificates: async function () {
        if (!this.isAvailable()) {
            return PortfolioStorage.getCertificates();
        }

        try {
            const snapshot = await db.collection(this.COLLECTIONS.CERTIFICATES)
                .orderBy('createdAt', 'desc')
                .get();

            const certificates = [];
            snapshot.forEach(doc => {
                certificates.push({ id: doc.id, ...doc.data() });
            });
            return certificates;
        } catch (error) {
            console.error('Error getting certificates:', error);
            return PortfolioStorage.getCertificates();
        }
    },

    addCertificate: async function (certificate) {
        if (!this.isAvailable()) {
            return PortfolioStorage.addCertificate(certificate);
        }

        try {
            const certData = {
                ...certificate,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            const docRef = await db.collection(this.COLLECTIONS.CERTIFICATES).add(certData);
            console.log('✅ Certificate added to Firebase');
            return { id: docRef.id, ...certData };
        } catch (error) {
            console.error('Error adding certificate:', error);
            return PortfolioStorage.addCertificate(certificate);
        }
    },

    updateCertificate: async function (id, updatedCertificate) {
        if (!this.isAvailable()) {
            return PortfolioStorage.updateCertificate(id, updatedCertificate);
        }

        try {
            await db.collection(this.COLLECTIONS.CERTIFICATES).doc(id).update(updatedCertificate);
            console.log('✅ Certificate updated in Firebase');
            return { id, ...updatedCertificate };
        } catch (error) {
            console.error('Error updating certificate:', error);
            return PortfolioStorage.updateCertificate(id, updatedCertificate);
        }
    },

    deleteCertificate: async function (id) {
        if (!this.isAvailable()) {
            return PortfolioStorage.deleteCertificate(id);
        }

        try {
            await db.collection(this.COLLECTIONS.CERTIFICATES).doc(id).delete();
            console.log('✅ Certificate deleted from Firebase');
        } catch (error) {
            console.error('Error deleting certificate:', error);
            return PortfolioStorage.deleteCertificate(id);
        }
    },

    // Gallery methods
    getGallery: async function () {
        if (!this.isAvailable()) {
            return PortfolioStorage.getGallery();
        }

        try {
            const snapshot = await db.collection(this.COLLECTIONS.GALLERY)
                .orderBy('createdAt', 'desc')
                .get();

            const gallery = [];
            snapshot.forEach(doc => {
                gallery.push({ id: doc.id, ...doc.data() });
            });
            return gallery;
        } catch (error) {
            console.error('Error getting gallery:', error);
            return PortfolioStorage.getGallery();
        }
    },

    addGalleryImage: async function (image) {
        if (!this.isAvailable()) {
            return PortfolioStorage.addGalleryImage(image);
        }

        try {
            const imageData = {
                ...image,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            const docRef = await db.collection(this.COLLECTIONS.GALLERY).add(imageData);
            console.log('✅ Gallery image added to Firebase');
            return { id: docRef.id, ...imageData };
        } catch (error) {
            console.error('Error adding gallery image:', error);
            return PortfolioStorage.addGalleryImage(image);
        }
    },

    deleteGalleryImage: async function (id) {
        if (!this.isAvailable()) {
            return PortfolioStorage.deleteGalleryImage(id);
        }

        try {
            await db.collection(this.COLLECTIONS.GALLERY).doc(id).delete();
            console.log('✅ Gallery image deleted from Firebase');
        } catch (error) {
            console.error('Error deleting gallery image:', error);
            return PortfolioStorage.deleteGalleryImage(id);
        }
    },

    // Admin password methods
    getAdminPassword: async function () {
        if (!this.isAvailable()) {
            return PortfolioStorage.getAdminPassword();
        }

        try {
            const doc = await db.collection(this.COLLECTIONS.SETTINGS).doc('admin').get();
            if (doc.exists) {
                return doc.data().password;
            }
            return 'admin123'; // Default password
        } catch (error) {
            console.error('Error getting admin password:', error);
            return PortfolioStorage.getAdminPassword();
        }
    },

    saveAdminPassword: async function (password) {
        if (!this.isAvailable()) {
            return PortfolioStorage.saveAdminPassword(password);
        }

        try {
            await db.collection(this.COLLECTIONS.SETTINGS).doc('admin').set({ password });
            console.log('✅ Admin password saved to Firebase');
        } catch (error) {
            console.error('Error saving admin password:', error);
            return PortfolioStorage.saveAdminPassword(password);
        }
    },

    // Firebase Storage - Upload image to Firebase Storage
    uploadImage: async function (file, folder = 'images') {
        if (!this.isAvailable()) {
            // Fall back to base64 encoding
            return await PortfolioStorage.compressImage(file);
        }

        try {
            const timestamp = Date.now();
            const filename = `${folder}/${timestamp}_${file.name}`;
            const storageRef = storage.ref(filename);

            // Upload file
            const snapshot = await storageRef.put(file);

            // Get download URL
            const downloadURL = await snapshot.ref.getDownloadURL();
            console.log('✅ Image uploaded to Firebase Storage');
            return downloadURL;
        } catch (error) {
            console.error('Error uploading image:', error);
            // Fall back to base64
            return await PortfolioStorage.compressImage(file);
        }
    },

    // Delete image from Firebase Storage
    deleteImage: async function (imageUrl) {
        if (!this.isAvailable() || !imageUrl.includes('firebase')) {
            return; // Can't delete non-Firebase images
        }

        try {
            const imageRef = storage.refFromURL(imageUrl);
            await imageRef.delete();
            console.log('✅ Image deleted from Firebase Storage');
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    },

    // Migration utility - Move localStorage data to Firebase
    migrateFromLocalStorage: async function () {
        if (!this.isAvailable()) {
            alert('Firebase is not configured. Please add your Firebase credentials first.');
            return false;
        }

        try {
            console.log('🔄 Starting migration from localStorage to Firebase...');

            // Migrate profile
            const profile = PortfolioStorage.getProfile();
            if (profile) {
                await this.saveProfile(profile);
                console.log('✅ Profile migrated');
            }

            // Migrate projects
            const projects = PortfolioStorage.getProjects();
            if (projects && projects.length > 0) {
                for (const project of projects) {
                    await this.addProject(project);
                }
                console.log(`✅ ${projects.length} projects migrated`);
            }

            // Migrate certificates
            const certificates = PortfolioStorage.getCertificates();
            if (certificates && certificates.length > 0) {
                for (const certificate of certificates) {
                    await this.addCertificate(certificate);
                }
                console.log(`✅ ${certificates.length} certificates migrated`);
            }

            // Migrate gallery
            const gallery = PortfolioStorage.getGallery();
            if (gallery && gallery.length > 0) {
                for (const image of gallery) {
                    await this.addGalleryImage(image);
                }
                console.log(`✅ ${gallery.length} gallery images migrated`);
            }

            // Migrate admin password
            const password = PortfolioStorage.getAdminPassword();
            if (password) {
                await this.saveAdminPassword(password);
                console.log('✅ Admin password migrated');
            }

            console.log('✅ Migration completed successfully!');
            alert('Migration completed! Your data is now stored in Firebase.');
            return true;
        } catch (error) {
            console.error('❌ Migration error:', error);
            alert('Migration failed: ' + error.message);
            return false;
        }
    },

    // Export data (for backup)
    exportData: async function () {
        if (!this.isAvailable()) {
            return PortfolioStorage.exportData();
        }

        try {
            const [profile, projects, certificates, gallery] = await Promise.all([
                this.getProfile(),
                this.getProjects(),
                this.getCertificates(),
                this.getGallery()
            ]);

            return {
                profile,
                projects,
                certificates,
                gallery,
                exportedAt: new Date().toISOString(),
                source: 'firebase'
            };
        } catch (error) {
            console.error('Error exporting data:', error);
            return PortfolioStorage.exportData();
        }
    }
};

// Make available globally
window.FirebaseStorage = FirebaseStorage;
