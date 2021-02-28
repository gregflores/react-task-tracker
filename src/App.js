import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { useState, useEffect } from 'react';
function App() {
	// const name = 'Greg';
	// const x = true;
	const [showAddTask, setShowAddTask] = useState(false);
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		const fetchTasks = async () => {
			const res = await fetch('http://localhost:5000/tasks');
			const data = await res.json();

			console.log(data);
		};
		fetchTasks();
	}, []);

	// Add task
	const addTask = (task) => {
		const id = Math.floor(Math.random() * 10000 + 1);
		const newTask = { id, ...task };
		setTasks([...tasks, newTask]);
	};

	// Toggle reminder
	const toggleReminder = (id) => {
		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, reminder: !task.reminder } : task
			)
		);
	};

	// Delete Task
	const deleteTask = (id) => {
		setTasks(tasks.filter((task) => task.id !== id));
	};

	return (
		<div className='container'>
			{/* <Header title='Hello' /> */}
			<Header
				onAdd={() => setShowAddTask(!showAddTask)}
				showAddTask={showAddTask}
			/>
			{showAddTask && <AddTask onAdd={addTask} />}
			{/* Reading variables inside JSX */}
			{/* <h2>Hello {x ? 'Yes' : 'No'}</h2>
			<h2>Hello {name}</h2> */}
			{tasks.length > 0 ? (
				<Tasks
					tasks={tasks}
					onDelete={deleteTask}
					onToggle={toggleReminder}
				/>
			) : (
				'You have no tasks'
			)}
		</div>
	);
}

export default App;
