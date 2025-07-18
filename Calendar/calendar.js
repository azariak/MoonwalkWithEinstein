function initializeCalendar(containerId, iconId) {
    const calendarContainer = document.getElementById(containerId);
    const calendarIcon = document.getElementById(iconId);

    if (!calendarContainer || !calendarIcon) return;

    const closeBtn = calendarContainer.querySelector('.close-calendar-btn');
    const monthYearEl = calendarContainer.querySelector('#month-year');
    const calendarDaysEl = calendarContainer.querySelector('#calendar-days');
    const prevMonthBtn = calendarContainer.querySelector('#prev-month');
    const nextMonthBtn = calendarContainer.querySelector('#next-month');

    let currentDate = new Date();

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
                calendarDaysEl.innerHTML += `<div class="day">${i}</div>`;
            }
        }
    }

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