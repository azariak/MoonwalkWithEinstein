function initializeCalendar(containerId, iconId) {
    const calendarContainer = document.getElementById(containerId);
    const calendarIcon = document.getElementById(iconId);

    if (!calendarContainer || !calendarIcon) return;

    const closeBtn = calendarContainer.querySelector('.close-calendar-btn');
    const monthYearEl = calendarContainer.querySelector('#month-year');
    const calendarDaysEl = calendarContainer.querySelector('#calendar-days');
    const prevMonthBtn = calendarContainer.querySelector('#prev-month');
    const nextMonthBtn = calendarContainer.querySelector('#next-month');
    const streakTitle = calendarContainer.querySelector('.calendar-header h3');

    let currentDate = new Date();

    // localStorage key for visited days
    const VISITED_DAYS_KEY = 'moonwalk_visited_days';

    // Get visited days from localStorage
    function getVisitedDays() {
        const visited = localStorage.getItem(VISITED_DAYS_KEY);
        return visited ? JSON.parse(visited) : [];
    }

    // Save visited days to localStorage
    function saveVisitedDays(visitedDays) {
        localStorage.setItem(VISITED_DAYS_KEY, JSON.stringify(visitedDays));
    }

    // Mark today as visited
    function markTodayAsVisited() {
        const today = new Date();
        const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        
        let visitedDays = getVisitedDays();
        if (!visitedDays.includes(todayStr)) {
            visitedDays.push(todayStr);
            saveVisitedDays(visitedDays);
        }
    }

    // Calculate current streak
    function calculateStreak() {
        const visitedDays = getVisitedDays().sort();
        if (visitedDays.length === 0) return 0;

        const today = new Date();
        let streak = 0;
        let checkDate = new Date(today);

        // Check backwards from today to find consecutive days
        while (true) {
            const checkDateStr = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;
            
            if (visitedDays.includes(checkDateStr)) {
                streak++;
                checkDate.setDate(checkDate.getDate() - 1);
            } else {
                break;
            }
        }

        return streak;
    }

    // Update streak display in title
    function updateStreakDisplay() {
        const streak = calculateStreak();
        if (streakTitle) {
            streakTitle.textContent = `🔥 Streak (${streak})`;
        }
    }

    // Check if a day is visited
    function isDayVisited(year, month, day) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return getVisitedDays().includes(dateStr);
    }

    function renderCalendar() {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();

        if (monthYearEl) {
            monthYearEl.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;
        }

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        if (calendarDaysEl) {
            calendarDaysEl.innerHTML = '';
            for (let i = 0; i < firstDayOfMonth; i++) {
                calendarDaysEl.innerHTML += `<div></div>`;
            }
            for (let i = 1; i <= daysInMonth; i++) {
                const isVisited = isDayVisited(year, month, i);
                const visitedClass = isVisited ? ' visited' : '';
                const xMark = isVisited ? '<span class="x-mark">✗</span>' : '';
                calendarDaysEl.innerHTML += `<div class="day${visitedClass}">${i}${xMark}</div>`;
            }
        }

        // Update streak display
        updateStreakDisplay();
    }

    // Mark today as visited on initialization
    markTodayAsVisited();

    calendarIcon.addEventListener('click', (event) => {
        event.stopPropagation();
        const isVisible = calendarContainer.style.display === 'block';
        calendarContainer.style.display = isVisible ? 'none' : 'block';
        if (!isVisible) {
            renderCalendar();
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            calendarContainer.style.display = 'none';
        });
    }
    
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });
    }

    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });
    }

    document.addEventListener('click', (event) => {
        if (!calendarContainer.contains(event.target) && !calendarIcon.contains(event.target)) {
            calendarContainer.style.display = 'none';
        }
    });
    
    renderCalendar();
} 