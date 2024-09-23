import React from 'react';
import Task from './Task';


interface TaskListProps {
  // Array of task objects passed as a prop from the parent component (App.tsx).
  tasks: Task[];
  // Function to mark a task as completed, passed as a prop.
  completeTask: (id: number) => void;
  // Function to delete a task, passed as a prop.
  deleteTask: (id: number) => void;
  // Function to edit a task's title, passed as a prop.
  editTask: (id: number, newTitle: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, completeTask, deleteTask, editTask }) => {

  /**
   * Function to handle task title editing.
   * It takes the task id and prompts the user for a new title, then calls the editTask function.
   */
  const handleEdit = (id: number) => {
    // Prompt the user to enter a new task title.
    const newTitle = prompt('Enter new title:');
    
    // If the user entered a valid title, call the editTask function.
    if (newTitle && newTitle.trim()) {
      editTask(id, newTitle);
    }
  };

  return (
    <ul>
      {/* Map over the tasks array and display each task */}
      {tasks.map((task) => (
        <li key={task.id}>
          {/* Display the task title */}
          <span
            style={{
              textDecoration: task.completed ? 'line-through' : 'none', // Strike through if task is completed
            }}
          >
            {task.title}
          </span>

          {/* Button to mark the task as completed */}
          <button onClick={() => completeTask(task.id)}>Complete</button>

          {/* Button to edit the task's title */}
          <button onClick={() => handleEdit(task.id)}>Edit</button>

          {/* Button to delete the task */}
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
