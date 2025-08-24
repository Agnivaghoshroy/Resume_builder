// Global variables
let skillsArray = [];
let educationCount = 1;
let experienceCount = 1;

// DOM elements
const form = document.getElementById('resumeForm');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const skillInput = document.getElementById('skillInput');
const addSkillBtn = document.getElementById('addSkillBtn');
const skillsContainer = document.getElementById('skillsContainer');
const addEducationBtn = document.getElementById('addEducationBtn');
const addExperienceBtn = document.getElementById('addExperienceBtn');
const clearFormBtn = document.getElementById('clearFormBtn');
const downloadBtn = document.getElementById('downloadBtn');
const togglePreview = document.getElementById('togglePreview');
const resumePreview = document.getElementById('resumePreview');
const loadingOverlay = document.getElementById('loadingOverlay');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    clearFormOnLoad(); // Clear form and localStorage on fresh load
    initializeEventListeners();
    updateProgress();
    updatePreview();
});

// Clear form and localStorage on fresh application load
function clearFormOnLoad() {
    // Clear localStorage
    localStorage.removeItem('resumeBuilderData');
    
    // Reset form
    form.reset();
    
    // Clear skills array and container
    skillsArray = [];
    if (skillsContainer) {
        skillsContainer.innerHTML = '';
    }
    
    // Reset counters
    educationCount = 1;
    experienceCount = 1;
    
    // Clear all input fields manually (in case browser autocomplete interferes)
    const allInputs = form.querySelectorAll('input, textarea, select');
    allInputs.forEach(input => {
        input.value = '';
        input.checked = false;
    });
    
    // Hide resume preview initially
    if (resumePreview) {
        resumePreview.classList.add('hidden');
    }
}

// Event Listeners
function initializeEventListeners() {
    // Form input listeners
    form.addEventListener('input', handleFormInput);
    form.addEventListener('change', handleFormInput);
    
    // Skill management
    addSkillBtn.addEventListener('click', addSkill);
    skillInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill();
        }
    });
    
    // Dynamic sections
    addEducationBtn.addEventListener('click', addEducationEntry);
    addExperienceBtn.addEventListener('click', addExperienceEntry);
    
    // Form actions
    clearFormBtn.addEventListener('click', clearForm);
    downloadBtn.addEventListener('click', downloadPDF);
    togglePreview.addEventListener('click', togglePreviewVisibility);
    
    // Auto-resize textareas
    document.querySelectorAll('textarea').forEach(textarea => {
        textarea.addEventListener('input', autoResize);
    });
}

// Handle form input changes
function handleFormInput(e) {
    updateProgress();
    updatePreview();
    
    // Handle current job checkbox
    if (e.target.name === 'currentJob') {
        const endDateInput = e.target.closest('.experience-entry').querySelector('input[name="endDate"]');
        if (e.target.checked) {
            endDateInput.disabled = true;
            endDateInput.value = '';
            endDateInput.style.opacity = '0.5';
        } else {
            endDateInput.disabled = false;
            endDateInput.style.opacity = '1';
        }
    }
}

// Auto-resize textareas
function autoResize(e) {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
}

// Progress calculation
function updateProgress() {
    const formData = new FormData(form);
    const requiredFields = ['fullName', 'email', 'phone', 'summary'];
    const totalFields = requiredFields.length + skillsArray.length + getEducationCount() + getExperienceCount();
    
    let filledFields = 0;
    
    // Check required fields
    requiredFields.forEach(field => {
        if (formData.get(field) && formData.get(field).trim() !== '') {
            filledFields++;
        }
    });
    
    // Check skills
    filledFields += skillsArray.length;
    
    // Check education entries
    const educationEntries = document.querySelectorAll('.education-entry');
    educationEntries.forEach(entry => {
        const degree = entry.querySelector('input[name="degree"]').value;
        const institution = entry.querySelector('input[name="institution"]').value;
        if (degree.trim() !== '' || institution.trim() !== '') {
            filledFields++;
        }
    });
    
    // Check experience entries
    const experienceEntries = document.querySelectorAll('.experience-entry');
    experienceEntries.forEach(entry => {
        const jobTitle = entry.querySelector('input[name="jobTitle"]').value;
        const company = entry.querySelector('input[name="company"]').value;
        if (jobTitle.trim() !== '' || company.trim() !== '') {
            filledFields++;
        }
    });
    
    const percentage = Math.min(Math.round((filledFields / Math.max(totalFields, 1)) * 100), 100);
    
    progressBar.style.width = percentage + '%';
    progressText.textContent = percentage + '% Complete';
    
    // Add completion animation
    if (percentage === 100) {
        progressBar.style.background = 'linear-gradient(90deg, #2ecc71, #27ae60)';
        progressText.style.color = '#27ae60';
        progressText.innerHTML = '<i class="fas fa-check"></i> 100% Complete!';
    } else {
        progressBar.style.background = 'linear-gradient(90deg, #4CAF50, #45a049)';
        progressText.style.color = '#666';
        progressText.textContent = percentage + '% Complete';
    }
}

// Skills management
function addSkill() {
    const skillText = skillInput.value.trim();
    if (skillText === '' || skillsArray.includes(skillText)) {
        skillInput.focus();
        return;
    }
    
    skillsArray.push(skillText);
    renderSkills();
    skillInput.value = '';
    skillInput.focus();
    updateProgress();
    updatePreview();
}

function removeSkill(skillText) {
    skillsArray = skillsArray.filter(skill => skill !== skillText);
    renderSkills();
    updateProgress();
    updatePreview();
}

function renderSkills() {
    skillsContainer.innerHTML = '';
    skillsArray.forEach(skill => {
        const skillTag = document.createElement('div');
        skillTag.className = 'skill-tag';
        skillTag.innerHTML = `
            ${skill}
            <button type="button" class="remove-skill" onclick="removeSkill('${skill}')">
                <i class="fas fa-times"></i>
            </button>
        `;
        skillsContainer.appendChild(skillTag);
    });
}

// Education management
function addEducationEntry() {
    educationCount++;
    const container = document.getElementById('educationContainer');
    const newEntry = document.createElement('div');
    newEntry.className = 'education-entry';
    newEntry.innerHTML = `
        <div class="input-row">
            <div class="input-group">
                <label>Degree</label>
                <input type="text" name="degree" placeholder="e.g., Bachelor of Science">
            </div>
            <div class="input-group">
                <label>Institution</label>
                <input type="text" name="institution" placeholder="University/College name">
            </div>
        </div>
        <div class="input-row">
            <div class="input-group">
                <label>Start Year</label>
                <input type="number" name="startYear" min="1950" max="2030">
            </div>
            <div class="input-group">
                <label>End Year</label>
                <input type="number" name="endYear" min="1950" max="2030">
            </div>
            <div class="input-group">
                <label>GPA (Optional)</label>
                <input type="text" name="gpa" placeholder="3.8/4.0">
            </div>
        </div>
        <button type="button" class="remove-btn" onclick="removeEducation(this)">
            <i class="fas fa-trash"></i>
        </button>
    `;
    
    container.appendChild(newEntry);
    
    // Add event listeners to new inputs
    newEntry.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', handleFormInput);
    });
    
    updateProgress();
}

function removeEducation(button) {
    const entry = button.closest('.education-entry');
    entry.style.animation = 'slideInUp 0.3s ease reverse';
    setTimeout(() => {
        entry.remove();
        updateProgress();
        updatePreview();
    }, 300);
}

function getEducationCount() {
    return document.querySelectorAll('.education-entry').length;
}

// Experience management
function addExperienceEntry() {
    experienceCount++;
    const container = document.getElementById('experienceContainer');
    const newEntry = document.createElement('div');
    newEntry.className = 'experience-entry';
    newEntry.innerHTML = `
        <div class="input-row">
            <div class="input-group">
                <label>Job Title</label>
                <input type="text" name="jobTitle" placeholder="e.g., Software Developer">
            </div>
            <div class="input-group">
                <label>Company</label>
                <input type="text" name="company" placeholder="Company name">
            </div>
        </div>
        <div class="input-row">
            <div class="input-group">
                <label>Start Date</label>
                <input type="month" name="startDate">
            </div>
            <div class="input-group">
                <label>End Date</label>
                <input type="month" name="endDate">
            </div>
            <div class="input-group checkbox-group">
                <label>
                    <input type="checkbox" name="currentJob"> Currently working here
                </label>
            </div>
        </div>
        <div class="input-group">
            <label>Description</label>
            <textarea name="jobDescription" rows="3" placeholder="Describe your responsibilities and achievements..."></textarea>
        </div>
        <button type="button" class="remove-btn" onclick="removeExperience(this)">
            <i class="fas fa-trash"></i>
        </button>
    `;
    
    container.appendChild(newEntry);
    
    // Add event listeners to new inputs
    newEntry.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', handleFormInput);
        input.addEventListener('change', handleFormInput);
        if (input.tagName === 'TEXTAREA') {
            input.addEventListener('input', autoResize);
        }
    });
    
    updateProgress();
}

function removeExperience(button) {
    const entry = button.closest('.experience-entry');
    entry.style.animation = 'slideInUp 0.3s ease reverse';
    setTimeout(() => {
        entry.remove();
        updateProgress();
        updatePreview();
    }, 300);
}

function getExperienceCount() {
    return document.querySelectorAll('.experience-entry').length;
}

// Update resume preview
function updatePreview() {
    updatePersonalInfo();
    updateSummary();
    updateSkillsPreview();
    updateEducationPreview();
    updateExperiencePreview();
}

function updatePersonalInfo() {
    const formData = new FormData(form);
    
    // Update name
    const nameElement = document.getElementById('previewName');
    const name = formData.get('fullName') || 'Your Name';
    nameElement.textContent = name;
    
    // Update contact info
    updateContactInfo('previewEmail', formData.get('email'), 'fas fa-envelope');
    updateContactInfo('previewPhone', formData.get('phone'), 'fas fa-phone');
    updateContactInfo('previewLocation', formData.get('location'), 'fas fa-map-marker-alt');
    updateContactInfo('previewWebsite', formData.get('website'), 'fas fa-globe');
}

function updateContactInfo(elementId, value, iconClass) {
    const element = document.getElementById(elementId);
    if (value && value.trim() !== '') {
        element.innerHTML = `<i class="${iconClass}"></i> ${value}`;
        element.style.display = 'flex';
    } else {
        element.innerHTML = '';
        element.style.display = 'none';
    }
}

function updateSummary() {
    const formData = new FormData(form);
    const summary = formData.get('summary');
    const summaryElement = document.getElementById('previewSummary');
    const summarySection = document.getElementById('summarySection');
    
    if (summary && summary.trim() !== '') {
        summaryElement.textContent = summary;
        showSection(summarySection);
    } else {
        hideSection(summarySection);
    }
}

function updateSkillsPreview() {
    const skillsList = document.getElementById('previewSkills');
    const skillsSection = document.getElementById('skillsSection');
    
    if (skillsArray.length > 0) {
        skillsList.innerHTML = '';
        skillsArray.forEach(skill => {
            const skillElement = document.createElement('span');
            skillElement.className = 'skill-item';
            skillElement.textContent = skill;
            skillsList.appendChild(skillElement);
        });
        showSection(skillsSection);
    } else {
        hideSection(skillsSection);
    }
}

function updateEducationPreview() {
    const educationContainer = document.getElementById('previewEducation');
    const educationSection = document.getElementById('educationSection');
    const educationEntries = document.querySelectorAll('.education-entry');
    
    educationContainer.innerHTML = '';
    let hasEducation = false;
    
    educationEntries.forEach(entry => {
        const degree = entry.querySelector('input[name="degree"]').value;
        const institution = entry.querySelector('input[name="institution"]').value;
        const startYear = entry.querySelector('input[name="startYear"]').value;
        const endYear = entry.querySelector('input[name="endYear"]').value;
        const gpa = entry.querySelector('input[name="gpa"]').value;
        
        if (degree.trim() !== '' || institution.trim() !== '') {
            hasEducation = true;
            const educationItem = document.createElement('div');
            educationItem.className = 'education-item';
            
            let dateRange = '';
            if (startYear || endYear) {
                dateRange = `${startYear || '?'} - ${endYear || 'Present'}`;
            }
            
            let gpaText = '';
            if (gpa.trim() !== '') {
                gpaText = ` | GPA: ${gpa}`;
            }
            
            educationItem.innerHTML = `
                <h4>${degree || 'Degree'}</h4>
                <div class="institution">${institution || 'Institution'}</div>
                <div class="date">${dateRange}${gpaText}</div>
            `;
            
            educationContainer.appendChild(educationItem);
        }
    });
    
    if (hasEducation) {
        showSection(educationSection);
    } else {
        hideSection(educationSection);
    }
}

function updateExperiencePreview() {
    const experienceContainer = document.getElementById('previewExperience');
    const experienceSection = document.getElementById('experienceSection');
    const experienceEntries = document.querySelectorAll('.experience-entry');
    
    experienceContainer.innerHTML = '';
    let hasExperience = false;
    
    experienceEntries.forEach(entry => {
        const jobTitle = entry.querySelector('input[name="jobTitle"]').value;
        const company = entry.querySelector('input[name="company"]').value;
        const startDate = entry.querySelector('input[name="startDate"]').value;
        const endDate = entry.querySelector('input[name="endDate"]').value;
        const currentJob = entry.querySelector('input[name="currentJob"]').checked;
        const description = entry.querySelector('textarea[name="jobDescription"]').value;
        
        if (jobTitle.trim() !== '' || company.trim() !== '') {
            hasExperience = true;
            const experienceItem = document.createElement('div');
            experienceItem.className = 'experience-item';
            
            let dateRange = '';
            if (startDate || endDate || currentJob) {
                const start = startDate ? formatDate(startDate) : '?';
                const end = currentJob ? 'Present' : (endDate ? formatDate(endDate) : '?');
                dateRange = `${start} - ${end}`;
            }
            
            experienceItem.innerHTML = `
                <h4>${jobTitle || 'Job Title'}</h4>
                <div class="company">${company || 'Company'}</div>
                <div class="date">${dateRange}</div>
                ${description.trim() !== '' ? `<div class="description">${description}</div>` : ''}
            `;
            
            experienceContainer.appendChild(experienceItem);
        }
    });
    
    if (hasExperience) {
        showSection(experienceSection);
    } else {
        hideSection(experienceSection);
    }
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

function showSection(section) {
    section.style.display = 'block';
    setTimeout(() => {
        section.classList.add('visible');
    }, 10);
}

function hideSection(section) {
    section.classList.remove('visible');
    setTimeout(() => {
        section.style.display = 'none';
    }, 500);
}

// Form actions
function clearForm() {
    if (confirm('Are you sure you want to clear all form data? This action cannot be undone.')) {
        // Clear localStorage
        localStorage.removeItem('resumeBuilderData');
        
        // Reset form
        form.reset();
        
        // Clear skills
        skillsArray = [];
        renderSkills();
        
        // Clear all input fields manually
        const allInputs = form.querySelectorAll('input, textarea, select');
        allInputs.forEach(input => {
            input.value = '';
            input.checked = false;
        });
        
        // Reset dynamic sections to have only one entry each
        const educationContainer = document.getElementById('educationContainer');
        const experienceContainer = document.getElementById('experienceContainer');
        
        educationContainer.innerHTML = `
            <div class="education-entry">
                <div class="input-row">
                    <div class="input-group">
                        <label>Degree</label>
                        <input type="text" name="degree" placeholder="e.g., Bachelor of Science">
                    </div>
                    <div class="input-group">
                        <label>Institution</label>
                        <input type="text" name="institution" placeholder="University/College name">
                    </div>
                </div>
                <div class="input-row">
                    <div class="input-group">
                        <label>Start Year</label>
                        <input type="number" name="startYear" min="1950" max="2030">
                    </div>
                    <div class="input-group">
                        <label>End Year</label>
                        <input type="number" name="endYear" min="1950" max="2030">
                    </div>
                    <div class="input-group">
                        <label>GPA (Optional)</label>
                        <input type="text" name="gpa" placeholder="3.8/4.0">
                    </div>
                </div>
                <button type="button" class="remove-btn" onclick="removeEducation(this)">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        experienceContainer.innerHTML = `
            <div class="experience-entry">
                <div class="input-row">
                    <div class="input-group">
                        <label>Job Title</label>
                        <input type="text" name="jobTitle" placeholder="e.g., Software Developer">
                    </div>
                    <div class="input-group">
                        <label>Company</label>
                        <input type="text" name="company" placeholder="Company name">
                    </div>
                </div>
                <div class="input-row">
                    <div class="input-group">
                        <label>Start Date</label>
                        <input type="month" name="startDate">
                    </div>
                    <div class="input-group">
                        <label>End Date</label>
                        <input type="month" name="endDate">
                    </div>
                    <div class="input-group checkbox-group">
                        <label>
                            <input type="checkbox" name="currentJob"> Currently working here
                        </label>
                    </div>
                </div>
                <div class="input-group">
                    <label>Description</label>
                    <textarea name="jobDescription" rows="3" placeholder="Describe your responsibilities and achievements..."></textarea>
                </div>
                <button type="button" class="remove-btn" onclick="removeExperience(this)">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        // Re-add event listeners
        form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', handleFormInput);
            input.addEventListener('change', handleFormInput);
            if (input.tagName === 'TEXTAREA') {
                input.addEventListener('input', autoResize);
            }
        });
        
        educationCount = 1;
        experienceCount = 1;
        
        updateProgress();
        updatePreview();
        
        // Show success message
        const originalText = clearFormBtn.innerHTML;
        clearFormBtn.innerHTML = '<i class="fas fa-check"></i> Cleared!';
        clearFormBtn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
        
        setTimeout(() => {
            clearFormBtn.innerHTML = originalText;
            clearFormBtn.style.background = 'linear-gradient(135deg, #95a5a6, #7f8c8d)';
        }, 2000);
    }
}

function togglePreviewVisibility() {
    const icon = togglePreview.querySelector('i');
    if (resumePreview.classList.contains('hidden')) {
        resumePreview.classList.remove('hidden');
        icon.className = 'fas fa-eye-slash';
        togglePreview.title = 'Hide Preview';
    } else {
        resumePreview.classList.add('hidden');
        icon.className = 'fas fa-eye';
        togglePreview.title = 'Show Preview';
    }
}

// PDF Download functionality
function downloadPDF() {
    const name = document.getElementById('fullName').value || 'Resume';
    const filename = `${name.replace(/\s+/g, '_')}_Resume.pdf`;
    
    // Show loading overlay
    loadingOverlay.classList.add('active');
    
    // Configure PDF options
    const opt = {
        margin: 0.5,
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2,
            useCORS: true,
            letterRendering: true
        },
        jsPDF: { 
            unit: 'in', 
            format: 'letter', 
            orientation: 'portrait' 
        }
    };
    
    // Clone the resume preview for PDF generation
    const resumeClone = resumePreview.cloneNode(true);
    resumeClone.style.boxShadow = 'none';
    resumeClone.style.borderRadius = '0';
    resumeClone.style.padding = '40px';
    resumeClone.style.background = 'white';
    resumeClone.style.maxHeight = 'none';
    resumeClone.style.overflow = 'visible';
    
    // Remove the preview header from clone
    const previewHeader = resumeClone.querySelector('.preview-header');
    if (previewHeader) {
        previewHeader.remove();
    }
    
    // Generate PDF
    html2pdf().set(opt).from(resumeClone).save().then(() => {
        // Hide loading overlay
        loadingOverlay.classList.remove('active');
        
        // Show success message
        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
        downloadBtn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
        
        setTimeout(() => {
            downloadBtn.innerHTML = originalText;
            downloadBtn.style.background = 'linear-gradient(135deg, #9b59b6, #8e44ad)';
        }, 3000);
    }).catch((error) => {
        console.error('PDF generation failed:', error);
        loadingOverlay.classList.remove('active');
        alert('Failed to generate PDF. Please try again.');
    });
}

// Utility functions
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

// Add smooth scrolling for form navigation
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to download PDF
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        downloadPDF();
    }
    
    // Ctrl/Cmd + R to clear form (with confirmation)
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        clearForm();
    }
});

// Add form validation
function validateForm() {
    const requiredFields = ['fullName', 'email', 'phone', 'summary'];
    let isValid = true;
    
    requiredFields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        const value = field.value.trim();
        
        if (value === '') {
            field.style.borderColor = '#e74c3c';
            field.classList.add('error');
            isValid = false;
        } else {
            field.style.borderColor = '#e1e8ed';
            field.classList.remove('error');
        }
    });
    
    return isValid;
}

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation
function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Add real-time validation
document.getElementById('email').addEventListener('blur', function() {
    if (this.value && !validateEmail(this.value)) {
        this.style.borderColor = '#e74c3c';
        this.title = 'Please enter a valid email address';
    } else {
        this.style.borderColor = '#e1e8ed';
        this.title = '';
    }
});

document.getElementById('phone').addEventListener('blur', function() {
    if (this.value && !validatePhone(this.value)) {
        this.style.borderColor = '#e74c3c';
        this.title = 'Please enter a valid phone number';
    } else {
        this.style.borderColor = '#e1e8ed';
        this.title = '';
    }
});

// Initialize tooltips and help text
function initializeTooltips() {
    const helpTexts = {
        'summary': 'Write a brief 2-3 sentence summary highlighting your key skills and experience.',
        'skillInput': 'Type a skill and press Enter or click the + button to add it.',
        'website': 'Include your portfolio, LinkedIn, or professional website.',
        'gpa': 'Include if 3.5 or higher, otherwise leave blank.'
    };
    
    Object.keys(helpTexts).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.title = helpTexts[id];
        }
    });
}

// Call initialization functions
initializeTooltips();

// Add animation observers for better UX
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe form groups for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.form-group').forEach(group => {
        observer.observe(group);
    });
});

// Auto-save functionality (optional)
function autoSave() {
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    data.skills = skillsArray;
    
    localStorage.setItem('resumeBuilderData', JSON.stringify(data));
}

function loadSavedData() {
    const savedData = localStorage.getItem('resumeBuilderData');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            
            // Load form fields
            Object.keys(data).forEach(key => {
                if (key !== 'skills') {
                    const field = document.getElementById(key) || document.querySelector(`[name="${key}"]`);
                    if (field) {
                        field.value = data[key];
                    }
                }
            });
            
            // Load skills
            if (data.skills && Array.isArray(data.skills)) {
                skillsArray = data.skills;
                renderSkills();
            }
            
            updatePreview();
            updateProgress();
        } catch (error) {
            console.error('Failed to load saved data:', error);
        }
    }
}

// Debounced auto-save - disabled by default for fresh start
// const debouncedAutoSave = debounce(autoSave, 1000);

// Add auto-save to form inputs - disabled by default
// form.addEventListener('input', debouncedAutoSave);

// Load saved data on page load - DISABLED to ensure fresh start
// document.addEventListener('DOMContentLoaded', loadSavedData);
