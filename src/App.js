import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { useState } from 'react';
function App() {
	// const name = 'Greg';
	// const x = true;
	const [showAddTask, setShowAddTask] = useState(false);
	const [tasks, setTasks] = useState([
		{
			id: 1,
			text: 'Doctors Appointment',
			day: 'Feb 5th at 2:30pm',
			reminder: true,
		},
		{
			id: 2,
			text: 'Meeting at school',
			day: 'Feb 6th at 1:30pm',
			reminder: true,
		},
		{
			id: 3,
			text: 'Food Shopping',
			day: 'Feb 5th at 2:30pm',
			reminder: false,
		},
	]);

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
