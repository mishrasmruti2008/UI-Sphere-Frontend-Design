// Sample Session Data for the 3 Days
const sessionsData = {
    1: [
        {
            type: "Keynote",
            typeClass: "type-keynote",
            level: "All Levels",
            time: "09:00 AM - 10:30 AM",
            title: "Grand Opening & Keynote: The Future of Developer Ecosystems",
            desc: "Inauguration by GDG Leads & University Officials followed by a visionary keynote on AI-driven software development.",
            speakerName: "Dr. Ananya Patnaik",
            speakerRole: "Lead Cloud Architect & GDG Mentor",
            speakerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
            location: "Main Auditorium (Auditorium 101)"
        },
        {
            type: "Workshop",
            typeClass: "type-workshop",
            level: "Intermediate",
            time: "11:00 AM - 01:00 PM",
            title: "Hands-on Cloud Run & Serverless Microservices Deployment",
            desc: "Deploy scalable containerized applications instantly with Google Cloud Run and managed PostgreSQL databases.",
            speakerName: "Amitabh Swain",
            speakerRole: "Staff Engineer, Pyron Belgium",
            speakerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
            location: "Lab Complex 3 (Room 204)"
        }
    ],
    2: [
        {
            type: "Hackathon",
            typeClass: "type-hackathon",
            level: "Intermediate",
            time: "10:00 AM Onwards",
            title: "24-Hour AI/ML Hack Sprint Kickoff: Gemini & Firebase",
            desc: "Build innovative multi-modal applications utilizing the Gemini API, vector embeddings, and realtime Firebase databases.",
            speakerName: "Rohan Samal",
            speakerRole: "Senior AI Engineer, Google Cloud",
            speakerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
            location: "Central Convention Hall"
        },
        {
            type: "Workshop",
            typeClass: "type-workshop",
            level: "Beginner",
            time: "02:00 PM - 04:00 PM",
            title: "Cross-Platform Mobile Apps with Flutter & Firebase",
            desc: "Create responsive mobile solutions with smooth animations, state management, and cloud authentication.",
            speakerName: "Priyanka Mishra",
            speakerRole: "GDE - Flutter & Mobile Lead",
            speakerAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
            location: "Auditorium 101"
        }
    ],
    3: [
        {
            type: "Competition",
            typeClass: "type-competition",
            level: "Advanced",
            time: "10:00 AM - 01:00 PM",
            title: "Code Finals: Competitive Programming & Hackathon Pitching",
            desc: "Top shortlisted teams present their working prototypes to a panel of expert judges for the 2,50,000+ prize pool.",
            speakerName: "Dr. Ananya Patnaik",
            speakerRole: "Principal Cloud Architect",
            speakerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
            location: "Main Auditorium"
        },
        {
            type: "Keynote",
            typeClass: "type-keynote",
            level: "All Levels",
            time: "03:30 PM - 05:00 PM",
            title: "Valedictory Ceremony, Awards & Closing Keynote",
            desc: "Celebration of winners, distribution of Google Developer swags, certificates, and closing remarks by university officials.",
            speakerName: "GDG ITER Core Team",
            speakerRole: " organizers & Student Leads",
            speakerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
            location: "Main Auditorium"
        }
    ]
};

let currentDay = 1;
let currentFilter = 'all';
let searchQuery = '';

// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const htmlRoot = document.documentElement;
const dayTabs = document.querySelectorAll('.day-tab');
const filterChips = document.querySelectorAll('.filter-chip');
const sessionSearch = document.getElementById('sessionSearch');
const sessionsContainer = document.getElementById('sessionsContainer');

const registrationModal = document.getElementById('registrationModal');
const openModalBtns = document.querySelectorAll('.open-modal-btn');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelModalBtn = document.getElementById('cancelModalBtn');
const registrationForm = document.getElementById('registrationForm');
const modalTrackSelect = document.getElementById('modalTrackSelect');

// Theme Switcher Logic
themeToggle.addEventListener('click', () => {
    const currentTheme = htmlRoot.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlRoot.setAttribute('data-theme', newTheme);
    themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
});

// Render Schedule Sessions
function renderSessions() {
    const daySessions = sessionsData[currentDay] || [];
    
    const filtered = daySessions.filter(session => {
        const matchesFilter = currentFilter === 'all' || session.type.toLowerCase() === currentFilter.toLowerCase();
        const matchesSearch = session.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              session.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              session.speakerName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
        sessionsContainer.innerHTML = `<div style="text-align: center; padding: 3rem; color: var(--text-muted);">No sessions found matching your criteria.</div>`;
        return;
    }

    sessionsContainer.innerHTML = filtered.map(session => `
        <div class="session-card">
            <div class="session-meta-top">
                <span class="type-chip ${session.typeClass}">${session.type}</span>
                <span class="level-chip">${session.level}</span>
                <span class="session-time"><i class="fa-regular fa-clock"></i> ${session.time}</span>
            </div>
            <h3>${session.title}</h3>
            <p>${session.desc}</p>
            <div class="session-details-footer">
                <div class="speaker-info-inline">
                    <img src="${session.speakerAvatar}" alt="${session.speakerName}" class="speaker-avatar">
                    <div class="speaker-text">
                        <h4>${session.speakerName}</h4>
                        <p>${session.speakerRole}</p>
                    </div>
                </div>
                <div class="session-location">
                    <i class="fa-solid fa-location-dot venue-pin"></i> ${session.location}
                </div>
                <div class="session-actions">
                    <button class="btn-secondary" onclick="alert('Session added to calendar!')"><i class="fa-regular fa-calendar"></i> Add to Calendar</button>
                    <button class="btn-primary open-modal-btn" data-track="${session.title}"><i class="fa-solid fa-sparkles"></i> Register Track &gt;</button>
                </div>
            </div>
        </div>
    `).forEachModalBinding; // bound via listener refresh
    
    bindModalTriggers();
}

// Day Tab Switching
dayTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        dayTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentDay = tab.getAttribute('data-day');
        renderSessions();
    });
});

// Filter Chips Switching
filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentFilter = chip.getAttribute('data-filter');
        renderSessions();
    });
});

// Search Input Listener
sessionSearch.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderSessions();
});

// Live Countdown Timer (Ticks Seconds)
function updateCountdown() {
    const secElem = document.getElementById('seconds');
    if (secElem) {
        let currentSec = parseInt(secElem.textContent, 10);
        currentSec = currentSec > 0 ? currentSec - 1 : 59;
        secElem.textContent = String(currentSec).padStart(2, '0');
    }
}
setInterval(updateCountdown, 1000);

// Registration Modal Management
function bindModalTriggers() {
    document.querySelectorAll('.open-modal-btn').forEach(btn => {
        btn.removeEventListener('click', handleOpenModal);
        btn.addEventListener('click', handleOpenModal);
    });
}

function handleOpenModal(e) {
    const trackName = e.currentTarget.getAttribute('data-track');
    if (trackName && modalTrackSelect) {
        modalTrackSelect.value = trackName;
    }
    registrationModal.classList.add('active');
}

function closeModal() {
    registrationModal.classList.remove('active');
}

closeModalBtn.addEventListener('click', closeModal);
cancelModalBtn.addEventListener('click', closeModal);
registrationModal.addEventListener('click', (e) => {
    if (e.target === registrationModal) closeModal();
});

registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('🎉 Registration successful! Your free digital pass has been generated and sent to your email.');
    closeModal();
    registrationForm.reset();
});

// Initial Render
renderSessions();