// =====================================================================
// worker.js — Worker view controller
// Handles task registration, time validation, review and submission
// =====================================================================

import { saveRecords, getRecordsByDate } from '../api/work.api.js';
import { showView } from '../main.js';

document.addEventListener('DOMContentLoaded', () => {

    // Set today's date as default
    const dateInput = document.getElementById('date');
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${yyyy}-${mm}-${dd}`;
    dateInput.value = formattedDate;

    const firstName = sessionStorage.getItem('firstName');
    document.getElementById('user-name').textContent = firstName;

    // Auto-jump between time inputs
    document.querySelector('.task-start').addEventListener('input', function() {
        const parts = this.value.split(':');
        if (parts.length === 2 && parts[1].length === 2) document.querySelector('.task-end').focus();
    });
    document.querySelector('.meeting-start').addEventListener('input', function() {
        if (this.value.length === 5) document.querySelector('.meeting-end').focus();
    });
    document.querySelector('.cleanup-start').addEventListener('input', function() {
        if (this.value.length === 5) document.querySelector('.cleanup-end').focus();
    });

    // Submit on Enter key
    document.querySelector('.task-end').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') { e.preventDefault(); document.querySelector('#task-panel .confirm-btn').click(); }
    });
    document.querySelector('.meeting-end').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') { e.preventDefault(); document.querySelector('#meeting-panel .confirm-btn').click(); }
    });
    document.querySelector('.cleanup-end').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') { e.preventDefault(); document.querySelector('#cleanup-panel .confirm-btn').click(); }
    });

    // Panel elements
    const taskButton = document.querySelector('.task-btn');
    const teamMeetingButton = document.querySelector('.meeting-btn');
    const cleanUpButton = document.querySelector('.cleanup-btn');
    const prod = document.querySelector('.prod');
    const taskTime = document.querySelector('.task-time');
    const taskValidation = document.querySelector('#task-validation');
    const meetingTime = document.querySelector('.meeting-time');
    const meetingValidation = document.querySelector('#meeting-validation');
    const cleaninUpTime = document.querySelector('.cleanup-time');
    const cleanUpValidation = document.querySelector('#cleanup-validation');

    // Assembly button toggle
    taskButton.addEventListener('click', () => {
        if (prod.style.display === 'flex' && taskTime.style.display === 'flex' && taskValidation.style.display === 'flex') {
            prod.style.display = 'none';
            taskTime.style.display = 'none';
            taskValidation.style.display = 'none';
            teamMeetingButton.style.display = 'flex';
            cleanUpButton.style.display = 'flex';
        } else {
            prod.style.display = 'flex';
            taskTime.style.display = 'flex';
            taskValidation.style.display = 'flex';
            meetingTime.style.display = 'none';
            meetingValidation.style.display = 'none';
            cleaninUpTime.style.display = 'none';
            cleanUpValidation.style.display = 'none';
            document.querySelector('.task-start').focus();
            if (window.innerWidth <= 480) {
                teamMeetingButton.style.display = 'none';
                cleanUpButton.style.display = 'none';
            }
        }
    });

    // Meeting button toggle
    teamMeetingButton.addEventListener('click', () => {
        if (meetingTime.style.display === 'flex' && meetingValidation.style.display === 'flex') {
            meetingTime.style.display = 'none';
            meetingValidation.style.display = 'none';
            taskButton.style.display = 'flex';
            cleanUpButton.style.display = 'flex';
        } else {
            meetingTime.style.display = 'flex';
            meetingValidation.style.display = 'flex';
            prod.style.display = 'none';
            taskTime.style.display = 'none';
            taskValidation.style.display = 'none';
            cleaninUpTime.style.display = 'none';
            cleanUpValidation.style.display = 'none';
            document.querySelector('.meeting-start').focus();
            if (window.innerWidth <= 480) {
                taskButton.style.display = 'none';
                cleanUpButton.style.display = 'none';
            }
        }
    });

    // Cleanup button toggle
    cleanUpButton.addEventListener('click', () => {
        if (cleaninUpTime.style.display === 'flex' && cleanUpValidation.style.display === 'flex') {
            cleaninUpTime.style.display = 'none';
            cleanUpValidation.style.display = 'none';
            taskButton.style.display = 'flex';
            teamMeetingButton.style.display = 'flex';
        } else {
            cleaninUpTime.style.display = 'flex';
            cleanUpValidation.style.display = 'flex';
            meetingTime.style.display = 'none';
            meetingValidation.style.display = 'none';
            prod.style.display = 'none';
            taskTime.style.display = 'none';
            taskValidation.style.display = 'none';
            document.querySelector('.cleanup-start').focus();
            if (window.innerWidth <= 480) {
                taskButton.style.display = 'none';
                teamMeetingButton.style.display = 'none';
            }
        }
    });

    // Hide panels on outside click
    document.addEventListener("click", (e) => {
        const target = e.target;
        if (!target.closest('#task-panel')) {
            prod.style.display = 'none';
            taskTime.style.display = 'none';
            taskValidation.style.display = 'none';
            const prodNumber = document.querySelector('#prod-number');
            if (prodNumber) prodNumber.value = '';
            const taskStart = document.querySelector('.task-start');
            if (taskStart) taskStart.value = '';
            const taskEnd = document.querySelector('.task-end');
            if (taskEnd) taskEnd.value = '';
        }
        if (!target.closest('#meeting-panel')) {
            meetingTime.style.display = 'none';
            meetingValidation.style.display = 'none';
            const meetingStart = document.querySelector('.meeting-start');
            if (meetingStart) meetingStart.value = '';
            const meetingEnd = document.querySelector('.meeting-end');
            if (meetingEnd) meetingEnd.value = '';
        }
        if (!target.closest('#cleanup-panel')) {
            cleaninUpTime.style.display = 'none';
            cleanUpValidation.style.display = 'none';
            const cleanupStart = document.querySelector('.cleanup-start');
            if (cleanupStart) cleanupStart.value = '';
            const cleanupEnd = document.querySelector('.cleanup-end');
            if (cleanupEnd) cleanupEnd.value = '';
        }
    });

    // Delete buttons
    document.querySelector('#task-delete-btn').addEventListener('click', () => {
        document.querySelector('#prod-number').value = '';
        document.querySelector('.task-start').value = '';
        document.querySelector('.task-end').value = '';
    });
    document.querySelector('#meeting-delete-btn').addEventListener('click', () => {
        document.querySelector('.meeting-start').value = '';
        document.querySelector('.meeting-end').value = '';
    });
    document.querySelector('#cleanup-delete-btn').addEventListener('click', () => {
        document.querySelector('.cleanup-start').value = '';
        document.querySelector('.cleanup-end').value = '';
    });

    // Check for time overlap against in-memory entries and database
    async function hasSolapamiento(newStart, newEnd, date) {
        const employeeId = sessionStorage.getItem('employeeId');
        const localOverlap = entries.some(reg => newStart < reg.end && newEnd > reg.start);
        if (localOverlap) return true;
        const dbRecords = await getRecordsByDate(employeeId, date);
        if (!Array.isArray(dbRecords)) return false;
        return dbRecords.some(reg => {
            const dbStart = reg.startTime.substring(0, 5);
            const dbEnd = reg.endTime.substring(0, 5);
            return newStart < dbEnd && newEnd > dbStart;
        });
    }

    const entries = [];

    // Assembly Confirm
    document.querySelector('#task-panel .confirm-btn').addEventListener('click', async () => {
        const faNumber = document.querySelector('#prod-number').value;
        const start = document.querySelector('.task-start').value;
        const end = document.querySelector('.task-end').value;
        const date = document.querySelector('#date').value;
        if (!start || !end) { alert(window.currentLanguageData?.alerts?.emptyTimeError || "Please enter a valid time in HH:MM format"); return; }
        if (start >= end) { alert(window.currentLanguageData?.alerts?.endTimeError || "The end time must be later than the start time"); return; }
        if (await hasSolapamiento(start, end, date)) { alert(window.currentLanguageData?.alerts?.overlapError || "This time slot overlaps with an existing entry"); return; }
        entries.push({ type: "Assembly and Wiring", date, start, end, faNumber });
        document.querySelector('#prod-number').value = '';
        document.querySelector('.task-start').value = '';
        document.querySelector('.task-end').value = '';
        prod.style.display = 'none';
        taskTime.style.display = 'none';
        taskValidation.style.display = 'none';
        alert(window.currentLanguageData?.alerts?.assemblySaved || "Assembly entry saved");
    });

    // Meeting Confirm
    document.querySelector('#meeting-panel .confirm-btn').addEventListener('click', async () => {
        const start = document.querySelector('#meeting-panel .meeting-start').value;
        const end = document.querySelector('#meeting-panel .meeting-end').value;
        const date = document.querySelector('#date').value;
        if (!start || !end) { alert(window.currentLanguageData?.alerts?.emptyTimeError || "Please enter a valid time in HH:MM format"); return; }
        if (start >= end) { alert(window.currentLanguageData?.alerts?.endTimeError || "The end time must be later than the start time"); return; }
        if (await hasSolapamiento(start, end, date)) { alert(window.currentLanguageData?.alerts?.overlapError || "This time slot overlaps with an existing entry"); return; }
        entries.push({ type: "Team Meeting", date, start, end });
        document.querySelector('.meeting-start').value = '';
        document.querySelector('.meeting-end').value = '';
        meetingTime.style.display = 'none';
        meetingValidation.style.display = 'none';
        alert(window.currentLanguageData?.alerts?.meetingSaved || "Team Meeting entry saved");
    });

    // Cleanup Confirm
    document.querySelector('#cleanup-panel .confirm-btn').addEventListener('click', async () => {
        const start = document.querySelector('#cleanup-panel .cleanup-start').value;
        const end = document.querySelector('#cleanup-panel .cleanup-end').value;
        const date = document.querySelector('#date').value;
        if (!start || !end) { alert(window.currentLanguageData?.alerts?.emptyTimeError || "Please enter a valid time in HH:MM format"); return; }
        if (start >= end) { alert(window.currentLanguageData?.alerts?.endTimeError || "The end time must be later than the start time"); return; }
        if (await hasSolapamiento(start, end, date)) { alert(window.currentLanguageData?.alerts?.overlapError || "This time slot overlaps with an existing entry"); return; }
        entries.push({ type: "Cleanup", date, start, end });
        document.querySelector('.cleanup-start').value = '';
        document.querySelector('.cleanup-end').value = '';
        cleaninUpTime.style.display = 'none';
        cleanUpValidation.style.display = 'none';
        alert(window.currentLanguageData?.alerts?.cleanupSaved || "Cleanup entry saved");
    });

    // Check button
    const check = document.querySelector('#check-btn');
    const checkWrapper = document.querySelector('.check-wrapper');
    const workerWrapper = document.querySelector('.worker-wrapper');
    const workerForm = document.getElementById('worker-form');
    const backBtn = document.querySelector('.check-back_btn');
    const submitBtn = document.querySelector('.check-submit_btn');

    check.addEventListener('click', (event) => {
        event.stopPropagation();
        workerWrapper.innerHTML = "";
        checkWrapper.style.display = 'flex';
        workerWrapper.appendChild(checkWrapper);

        const tbody = document.querySelector('.check-table__body');
        tbody.innerHTML = "";

        entries.forEach((reg, index) => {
            const [startHours, startMinutes] = reg.start.split(':').map(Number);
            const [endHours, endMinutes] = reg.end.split(':').map(Number);
            const durationMinutes = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);
            const durationHours = Math.floor(durationMinutes / 60);
            const durationMins = durationMinutes % 60;
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td data-label="#">${index + 1}</td>
                <td data-label="Task">${reg.type}</td>
                <td data-label="Date">${reg.date}</td>
                <td data-label="From">${reg.start}</td>
                <td data-label="To">${reg.end}</td>
                <td data-label="Duration">${durationHours}h ${durationMins}min</td>
                <td data-label="FA Number">${reg.faNumber || '—'}</td>
                <td data-label=""><button class="delete-row-btn">✕</button></td>
            `;
            tr.querySelector('.delete-row-btn').addEventListener('click', () => {
                entries.splice(entries.indexOf(reg), 1);
                tr.remove();
                tbody.querySelectorAll('tr').forEach((fila, i) => { fila.cells[0].textContent = i + 1; });
            });
            tbody.appendChild(tr);
        });

        const totalMinutes = entries.reduce((total, reg) => {
            const [sh, sm] = reg.start.split(':').map(Number);
            const [eh, em] = reg.end.split(':').map(Number);
            return total + (eh * 60 + em) - (sh * 60 + sm);
        }, 0);
        document.getElementById('total-time-formatted').textContent = `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}min`;
        document.getElementById('total-time-minutes').textContent = `${totalMinutes} min`;

        backBtn.addEventListener('click', () => {
            workerForm.reset();
            checkWrapper.style.display = 'none';
            workerWrapper.appendChild(workerForm);
            dateInput.value = formattedDate;
        });
    });

    // Submit button
    submitBtn.addEventListener('click', async () => {
        const employeeId = sessionStorage.getItem('employeeId');
        const result = await saveRecords(entries, employeeId);
        if (result.success) {
            entries.length = 0;
            alert(window.currentLanguageData?.alerts?.submitReady || "Data ready to be sent to the database");
            showView('worker-view');
            checkWrapper.style.display = 'none';
            workerWrapper.appendChild(workerForm);
            dateInput.value = formattedDate;
        } else {
            alert('Error: ' + result.message);
        }
    });

    // Logout button
    document.querySelector('#logout-btn').addEventListener('click', () => {
        if (entries.length > 0) {
            alert(window.currentLanguageData?.alerts?.logoutPendingTasks || "You have pending tasks. Press CHECK to review them before logging out.");
            return;
        }
        sessionStorage.clear();
        showView('login-view');
    });

});