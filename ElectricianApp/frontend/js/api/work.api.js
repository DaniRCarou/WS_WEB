// =====================================================================
// work.api.js — Work records API
// Handles saving work records and checking time overlaps against the database
// =====================================================================

const TASK_IDS = {
    "Assembly and Wiring": 1,
    "Team Meeting": 2,
    "Cleanup": 3
};

// Sends all confirmed work records to the backend
export async function saveRecords(entries, employeeId) {
    for (const entry of entries) {
        const [startHours, startMinutes] = entry.start.split(':').map(Number);
        const [endHours, endMinutes] = entry.end.split(':').map(Number);
        const totalTime = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);

        const record = {
            task: { taskId: TASK_IDS[entry.type] },
            employee: { employeeId: parseInt(employeeId) },
            date: entry.date,
            startTime: entry.start,
            endTime: entry.end,
            totalTime: totalTime
        };

        try {
            const response = await fetch('https://employee-portal.up.railway.app/records/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(record)
            });
            if (!response.ok) {
                const error = await response.text();
                return { success: false, message: error };
            }
        } catch (err) {
            console.error("Error connecting to server:", err);
            return { success: false, message: "Server connection error" };
        }
    }
    return { success: true };
}

// Fetches all records for a given employee and date — used for overlap validation
export async function getRecordsByDate(employeeId, date) {
    const response = await fetch(`https://employee-portal-drc.onrender.com/records/employee/${parseInt(employeeId)}/date/${date}`);
    const records = await response.json();
    return records;
}