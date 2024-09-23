import React, { useState, useEffect } from 'react';
import Task from './components/Task';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';


const App: React.FC = () => {
  // useState hook is used to declare the state for tasks.
  // tasks: The current array of task objects.
  // setTasks: The function used to update the tasks state.
  // We initialize the tasks state as an empty array.
  const [tasks, setTasks] = useState<Task[]>([]);

  /**
   * useEffect hook to load tasks from local storage when the component mounts.
   * This effect will run once when the component is first rendered due to the empty dependency array ([])
   * If there are tasks in local storage, it parses the JSON string into a Task[] array and updates the state.
   */
  useEffect(() => {
    // Retrieve tasks from localStorage using the key 'tasks'.
    const savedTasks = localStorage.getItem('tasks');
    
    if (savedTasks) {
      try {
        // Parse the JSON string into an array of Task objects.
        const parsedTasks: Task[] = JSON.parse(savedTasks);
        console.log('Loaded tasks from localStorage:', parsedTasks); // For debugging
        // Update the state with the parsed tasks.
        setTasks(parsedTasks);
      } catch (error) {
        // If there is an error parsing the JSON (e.g., invalid format), log it to the console.
        console.error('Error parsing tasks from localStorage:', error);
      }
    } else {
      // If no tasks are found in local storage, log a message.
      console.log('No tasks found in localStorage');
    }
  }, []); // Empty array means this effect runs only once when the component mounts.

  /**
   * useEffect hook to save tasks to local storage whenever the tasks state changes.
   * Every time the tasks array is updated, this effect will run and store the tasks in local storage.
   */
  useEffect(() => {
    console.log('Saving tasks to localStorage:', tasks); // For debugging
    // Save the tasks array as a JSON string in localStorage under the key 'tasks'.
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]); // This effect depends on the 'tasks' state, so it runs whenever 'tasks' is updated.

  /**
   * Function to add a new task.
   * This function takes a title as an argument and creates a new task object.
   * It then updates the state by appending the new task to the existing array.
   */
  const addTask = (title: string) => {
    // Create a new task object with a unique id, title, and completed set to false.
    const newTask: Task = {
      id: tasks.length + 1, // Assign an id based on the length of the tasks array.
      title: title,         // The title passed as an argument.
      completed: false,     // New tasks are not completed by default.
    };
    // Update the tasks state by adding the new task to the current tasks array.
    setTasks([...tasks, newTask]);
  };

  /**
   * Function to mark a task as completed.
   * This function takes a task id and updates the 'completed' field for the matching task.
   */
  const completeTask = (id: number) => {
    // Use map to create a new array of tasks, where the completed field is updated for the task with the given id.
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  };

  /**
   * Function to delete a task.
   * This function takes a task id and removes the task with that id from the tasks array.
   */
  const deleteTask = (id: number) => {
    // Filter out the task with the given id, creating a new array without it.
    setTasks(tasks.filter((task) => task.id !== id));
  };

  /**
   * Function to edit a task's title.
   * This function takes a task id and a new title, and updates the title of the task with the given id.
   */
  const editTask = (id: number, newTitle: string) => {
    // Use map to create a new array where the title of the task with the given id is updated.
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  };

  // Render the main components for the task tracker.
  return (
    <div>
      <h1>Task Tracker</h1>
      {/* TaskForm component handles adding new tasks, and we pass the addTask function as a prop */}
      <TaskForm addTask={addTask} />
      {/* TaskList component displays the list of tasks and allows completing, deleting, and editing tasks */}
      <TaskList
        tasks={tasks}              // Pass the tasks array as a prop to TaskList
        completeTask={completeTask} // Pass the completeTask function as a prop
        deleteTask={deleteTask}     // Pass the deleteTask function as a prop
        editTask={editTask}         // Pass the editTask function as a prop
      />
    </div>
  );
};

export default App;
