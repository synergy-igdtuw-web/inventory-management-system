// Mock database initialization
const defaultInventory = [
  { id: 1, name: 'Stopwatch', totalQty: 6, available: 6 },
  { id: 2, name: 'Chess Board', totalQty: 3, available: 3 },
  { id: 3, name: 'Basketball (Size 6)', totalQty: 2, available: 2 },
  { id: 4, name: 'Sign Plate', totalQty: 2, available: 2 },
  { id: 5, name: 'Football (Size 5)', totalQty: 4, available: 4 },
  { id: 6, name: "Banner 5'x8'", totalQty: 1, available: 1 },
  { id: 7, name: 'Gold Medals', totalQty: 66, available: 66 },
  { id: 8, name: 'Silver Medals', totalQty: 66, available: 66 },
  { id: 9, name: 'Stickers', totalQty: 150, available: 150 },
  { id: 10, name: 'Pump', totalQty: 2, available: 2 },
  { id: 11, name: 'Marking Powder', totalQty: 50, available: 50 },
  { id: 12, name: 'Flag', totalQty: 12, available: 12 },
  { id: 13, name: 'Mementos for Dignitaries / Trophies', totalQty: 3, available: 3 },
  { id: 14, name: 'Mementos for Executives / Trophies', totalQty: 4, available: 4 },
  { id: 15, name: 'Mementos for Cores / Trophies', totalQty: 20, available: 20 },
  { id: 16, name: 'Mementos for Students / Trophies', totalQty: 8, available: 8 },
  { id: 17, name: 'ID Cards', totalQty: 367, available: 367 },
  { id: 18, name: 'Booklets', totalQty: 30, available: 30 },
  { id: 19, name: 'Letter Heads', totalQty: 200, available: 200 },
  { id: 20, name: 'Color Prints', totalQty: 2, available: 2 },
  { id: 21, name: 'Rubber Balls (red)', totalQty: 6, available: 6 },
  { id: 22, name: 'Wicket Keeper Gloves (pair)', totalQty: 1, available: 1 },
  { id: 23, name: 'Aerosensa 2 Shuttle Box', totalQty: 9, available: 9 },
  { id: 24, name: 'Mavis 350 Shuttle Box', totalQty: 3, available: 3 },
  { id: 25, name: 'Badminton Net', totalQty: 2, available: 2 },
  { id: 26, name: 'Portable Goal Posts', totalQty: 2, available: 2 },
  { id: 27, name: 'Cones', totalQty: 12, available: 12 },
  { id: 28, name: 'Dumbbells 2kg (set)', totalQty: 2, available: 2 },
  { id: 29, name: 'Dumbbells 3kg (set)', totalQty: 2, available: 2 },
  { id: 30, name: 'Batons', totalQty: 6, available: 6 },
  { id: 31, name: 'Hurdles', totalQty: 6, available: 6 },
  { id: 32, name: 'Skipping Rope (plastic)', totalQty: 3, available: 3 },
  { id: 33, name: 'Skipping Rope (rope)', totalQty: 1, available: 1 },
  { id: 34, name: 'Measuring Tape 10m', totalQty: 2, available: 2 },
  { id: 35, name: 'Resistance Band', totalQty: 6, available: 6 },
  { id: 36, name: 'Foam Roller', totalQty: 1, available: 1 },
  { id: 37, name: 'Chuna (kg)', totalQty: 10, available: 10 },
  { id: 38, name: 'Table Tennis Net', totalQty: 1, available: 1 },
  { id: 39, name: 'Table Tennis Balls 3-star (set of 12)', totalQty: 12, available: 12 },
  { id: 40, name: 'Table Tennis Rackets', totalQty: 2, available: 2 }
];

function initDatabase() {
    if (!localStorage.getItem('synergy_inventory')) {
        localStorage.setItem('synergy_inventory', JSON.stringify(defaultInventory));
    }
    if (!localStorage.getItem('synergy_logs')) {
        localStorage.setItem('synergy_logs', JSON.stringify([]));
    }
    if (!localStorage.getItem('synergy_shifts')) {
        localStorage.setItem('synergy_shifts', JSON.stringify([]));
    }
    if (!localStorage.getItem('synergy_volunteer_apps')) {
        localStorage.setItem('synergy_volunteer_apps', JSON.stringify([]));
    }
    if (!localStorage.getItem('synergy_volunteers')) {
        localStorage.setItem('synergy_volunteers', JSON.stringify([]));
    }
    if (!localStorage.getItem('synergy_users')) {
        localStorage.setItem('synergy_users', JSON.stringify([
            { username: 'advisor', password: 'password123', role: 'admin', title: 'Sports Advisor' },
            { username: 'president', password: 'password123', role: 'admin', title: 'President' },
            { username: 'gensec', password: 'password123', role: 'admin', title: 'General Secretary' }
        ]));
    }
    if (!localStorage.getItem('synergy_notices')) {
        localStorage.setItem('synergy_notices', JSON.stringify([{
            id: 1,
            title: 'VOLUNTEER NOTICE — Sports Equipment Duty',
            body: `Synergy is looking for student volunteers to help manage sports equipment issuance for the semester.
<br><br>
<b>Responsibility:</b> Volunteers are required to be present <b>outside the Sports Room</b> for <b>1–2 full days per semester</b> (or as assigned in shifts) to issue and collect sports equipment to students.
<br><br>
<b>How to Register:</b> Fill out the Student Volunteer Form from the Inventory Portal homepage. Once approved by the President, you will receive a Volunteer Number and Password to log in.
<br><br>
<i>For queries, contact the Sports Incharge or Synergy Core Team.</i>`,
            date: new Date().toISOString()
        }]));
    }
}

// Authentication
function getAuth() {
    return JSON.parse(localStorage.getItem('synergy_auth') || 'null');
}

function login(username, password, role) {
    if (role === 'admin') {
        const users = JSON.parse(localStorage.getItem('synergy_users') || '[]');
        const user = users.find(u => u.username === username && u.password === password && u.role === 'admin');
        if (user) {
            localStorage.setItem('synergy_auth', JSON.stringify({ loggedIn: true, role: 'admin', username: username, title: user.title }));
            return true;
        }
    } else if (role === 'student') {
        const volunteers = getVolunteers();
        const volunteer = volunteers.find(v => v.volunteerId === username && v.password === password);
        if (volunteer) {
            localStorage.setItem('synergy_auth', JSON.stringify({ loggedIn: true, role: 'student', username: username, name: volunteer.name }));
            return true;
        }
    }
    return false;
}

function logout() {
    localStorage.removeItem('synergy_auth');
    window.location.href = 'inventory-login.html';
}

function checkAuthGuard(requiredRole) {
    const auth = getAuth();
    if (!auth || !auth.loggedIn) {
        window.location.href = 'inventory-login.html';
        return null;
    }
    if (requiredRole && auth.role !== requiredRole) {
        window.location.href = 'inventory-login.html';
        return null;
    }
    
    // Update UI with user info
    $(document).ready(function() {
        if ($('#user-display-name').length) {
            $('#user-display-name').text(auth.role === 'admin' ? auth.title : auth.name);
        }
    });
    
    return auth;
}

// Utilities for Toast
function showToast(message, type = 'success') {
    const bgClass = type === 'success' ? 'bg-success' : (type === 'danger' ? 'bg-danger' : 'bg-warning');
    const toastHtml = `
    <div class="toast align-items-center text-white ${bgClass} border-0" role="alert" aria-live="assertive" aria-atomic="true" style="position: fixed; top: 80px; right: 20px; z-index: 1050; min-width: 250px;">
      <div class="d-flex">
        <div class="toast-body">
          ${message}
        </div>
        <button type="button" class="ml-2 mb-1 close text-white" data-dismiss="toast" aria-label="Close" style="background: none; border: none; padding: 10px;">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>`;
    
    const $toast = $(toastHtml);
    $('body').append($toast);
    $toast.toast({ delay: 3000 }).toast('show');
    setTimeout(() => {
        $toast.remove();
    }, 3500);
}

// Data Access functions
function getInventory() {
    return JSON.parse(localStorage.getItem('synergy_inventory') || '[]');
}

function saveInventory(inventory) {
    localStorage.setItem('synergy_inventory', JSON.stringify(inventory));
}

function getLogs() {
    return JSON.parse(localStorage.getItem('synergy_logs') || '[]');
}

function saveLogs(logs) {
    localStorage.setItem('synergy_logs', JSON.stringify(logs));
}

function getShifts() {
    return JSON.parse(localStorage.getItem('synergy_shifts') || '[]');
}

function saveShifts(shifts) {
    localStorage.setItem('synergy_shifts', JSON.stringify(shifts));
}

function getVolunteerApps() {
    return JSON.parse(localStorage.getItem('synergy_volunteer_apps') || '[]');
}

function saveVolunteerApps(apps) {
    localStorage.setItem('synergy_volunteer_apps', JSON.stringify(apps));
}

function getVolunteers() {
    return JSON.parse(localStorage.getItem('synergy_volunteers') || '[]');
}

function saveVolunteers(volunteers) {
    localStorage.setItem('synergy_volunteers', JSON.stringify(volunteers));
}

// Run init immediately
initDatabase();
