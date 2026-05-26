// =====================================================================
// main.js — Entry point of the application
// Handles SPA navigation and initial view rendering
// =====================================================================

// View and navigation link IDs
const VIEWS = {
    LOGIN: 'login-view',
    REGISTER: 'register-view',
    RESET: 'reset-view',
    WORKER: 'worker-view',
    NEW_PASSWORD: 'new-password-view'
};

const NAV_LINKS = {
    GO_TO_REGISTER: 'go-to-register',
    FORGOT_PASSWORD: 'forgot-password-link',
    RESET_BACK: 'loginback-link',
    REGISTER_BACK: 'register-loginback-link'
};

// Read token from URL — used for password reset flow
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

// Shows only the requested view and hides all others
export function showView(viewId) {
    const views = document.querySelectorAll('.view');
    views.forEach(view => {
        view.classList.toggle('view--active', view.id === viewId);
    });
}

// Binds navigation links to showView()
function setupNavigation() {
    const links = [
        { id: NAV_LINKS.GO_TO_REGISTER, view: VIEWS.REGISTER },
        { id: NAV_LINKS.FORGOT_PASSWORD, view: VIEWS.RESET },
        { id: NAV_LINKS.RESET_BACK, view: VIEWS.LOGIN },
        { id: NAV_LINKS.REGISTER_BACK, view: VIEWS.LOGIN }
    ];

    links.forEach(link => {
        const el = document.getElementById(link.id);
        if (el) {
            el.addEventListener('click', e => {
                e.preventDefault();
                showView(link.view);
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (token) {
        showView(VIEWS.NEW_PASSWORD);
    } else {
        showView(VIEWS.LOGIN);
    }
    setupNavigation();
});