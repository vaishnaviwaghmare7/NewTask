document.addEventListener('DOMContentLoaded', function() {
    // Function to toggle all checkboxes in a section
    function toggleCheckboxes(sectionClass) {
        const checkboxes = document.querySelectorAll(`${sectionClass} input[type="checkbox"]`);
        const toggleAll = document.createElement('button');
        toggleAll.textContent = 'Toggle All';
        toggleAll.classList.add('toggle-all-btn');
        
        const section = document.querySelector(sectionClass);
        section.insertBefore(toggleAll, section.firstChild);

        toggleAll.addEventListener('click', function() {
            const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
            checkboxes.forEach(checkbox => {
                checkbox.checked = !allChecked;
            });
        });
    }

    // Apply toggle functionality to each section
    toggleCheckboxes('.activity-status');
    toggleCheckboxes('.assignment');
    toggleCheckboxes('.due-date');

    // Function to filter tasks based on status
    function filterTasks(status) {
        const tasks = document.querySelectorAll('.activity-status li');
        tasks.forEach(task => {
            const taskStatus = task.querySelector('input').id;
            if (status === 'all' || taskStatus === status) {
                task.style.display = 'flex';
            } else {
                task.style.display = 'none';
            }
        });
    }

    // Add filter buttons for activity status
    const filterButtons = document.querySelector('.filter-buttons');
    filterButtons.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function() {
            filterTasks(button.getAttribute('data-status'));
        });
    });

    // Function to dynamically update the count of tasks
    function updateTaskCount() {
        const counts = {
            overdue: 25,
            today: 2,
            ticket: 20,
            critical: 15,
            assigned: 12
        };

        Object.keys(counts).forEach(status => {
            const countElement = document.querySelector(`#${status} + span`);
            if (countElement) {
                countElement.textContent = counts[status];
            }
        });
    }

    updateTaskCount();

    // Function to add a new task (for demonstration purposes)
    function addNewTask(taskName, status) {
        const taskList = document.querySelector('.activity-status ul');
        const newTask = document.createElement('li');
        newTask.innerHTML = `
            <input type="checkbox" id="${status}"> ${taskName} <span>0</span>
        `;
        taskList.appendChild(newTask);
        updateTaskCount();
    }

    // Example: Add a new task
    setTimeout(() => {
        addNewTask('New Task', 'today');
    }, 5000);
});