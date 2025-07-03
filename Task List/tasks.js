//updates date in #curent-date:
document.addEventListener('DOMContentLoaded', () => {
     // Create a new Date object representing the current date and time.
    const today = new Date();
    // Format the date (e.g., "April 10, 2025")
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);
    // Display the date in the h2 tag
    document.getElementById('current-date').textContent = formattedDate;
});

//adds a new task in the list:
document.addEventListener("DOMContentLoaded", function () {
  const addTaskButton = document.getElementById("add-task");
  const taskContainer = document.querySelector(".vstack");

  addTaskButton.addEventListener("click", function () {
      // Prompt user for task text
      const taskText = prompt("Enter your task:");

      // If the user cancels or enters empty text, do nothing
      if (!taskText) return;

      // Create a new task element
      const newTask = document.createElement("div");
      newTask.classList.add("input-group", "new-task"); // .new-task for animation popping in

      newTask.innerHTML = `
          <div class="input-group-text">
              <input type="checkbox" class="task-checkbox" aria-label="Checkbox for following text input">
          </div>
          <span class="form-control uneditable task-text">${taskText}</span>
          <button class="btn btn-outline-secondary remove-task" type="button">X</button>
      `;

      // Append the new task to the .vstack container
      taskContainer.appendChild(newTask);

      // Disable checkbox and task
      const checkbox = newTask.querySelector(".task-checkbox");
      const taskTextElement = newTask.querySelector(".task-text");

      checkbox.addEventListener("change", function () {
          if (checkbox.checked) {
              checkbox.disabled = true; // Disable checkbox permanently
              taskTextElement.classList.add("text-muted", "text-decoration-line-through"); // Add strikethrough and gray styling
          }
      });

      // Add event listener to remove the task when clicking .remove-task
      newTask.querySelector(".remove-task").addEventListener("click", function () {
        newTask.classList.add("removing-task"); // Apply pop-out animation
        setTimeout(() => newTask.remove(), 300); // Remove after animation
      });
  });
});