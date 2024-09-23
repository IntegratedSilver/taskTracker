import React, { useState } from 'react';

interface TaskFormProps {
  // The addTask function is passed down as a prop from the parent (App.tsx).
  // It is a function that takes a string (the task title) and adds a new task.
  addTask: (title: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  // useState hook to manage the input field's value (the task title).
  // title: The current value of the input field.
  // setTitle: The function to update the title.
  const [title, setTitle] = useState('');

  /**
   * handleSubmit function is called when the form is submitted.
   * It prevents the default form submission behavior and calls the addTask function,
   * passing the title as an argument, then resets the input field.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh on form submit.

    // If the input is empty, we don't want to add an empty task.
    if (!title.trim()) return;

    // Call the addTask function passed as a prop to add the new task.
    addTask(title);
    
    // Clear the input field after submitting the task.
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input field for entering the task title */}
      <input
        type="text"
        placeholder="Enter task title"
        value={title}               // Bind the input's value to the title state.
        onChange={(e) => setTitle(e.target.value)} // Update title state on every keystroke.
      />
      {/* Button to submit the form and add the task */}
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
