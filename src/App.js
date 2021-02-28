import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import About from './components/About';

function App() {
	// const name = 'Greg';
	// const x = true;
	const [showAddTask, setShowAddTask] = useState(false);
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		const getTasks = async () => {
			const tasksFromServer = await fetchTasks();
			setTasks(tasksFromServer);
		};

		getTasks();
	}, []);

	// Fetch tasks from server
	const fetchTasks = async () => {
		const res = await fetch('http://localhost:5000/tasks');
		const data = await res.json();

		return data;
	};

	const fetchTask = async (id) => {
		const res = await fetch(`http://localhost:5000/tasks/${id}`);
		const data = await res.json();

		return data;
	};

	// Add task
	const addTask = async (task) => {
		const res = await fetch('http://localhost:5000/tasks', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(task),
		});
		const data = await res.json();

		setTasks([...tasks, data]);
		// const id = Math.floor(Math.random() * 10000 + 1);
		// const newTask = { id, ...task };
		// setTasks([...tasks, newTask]);
	};

	// Toggle reminder
	const toggleReminder = async (id) => {
		const taskToToggle = await fetchTask(id);
		const updatedTask = {
			...taskToToggle,
			reminder: !taskToToggle.reminder,
		};
		const res = await fetch(`http://localhost:5000/tasks/${id}`, {
			method: 'PUT',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(updatedTask),
		});
		await res.json();

		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, reminder: !task.reminder } : task
			)
		);
	};

	// Delete Task
	const deleteTask = async (id) => {
		await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' });
		setTasks(tasks.filter((task) => task.id !== id));
	};

	return (
		<Router>
			<div className='container'>
				{/* <Header title='Hello' /> */}
				<Header
					onAdd={() => setShowAddTask(!showAddTask)}
					showAddTask={showAddTask}
				/>

				<Route
					path='/'
					exact
					render={(props) => (
						<>
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
						</>
					)}
				/>
				<Route path='/about' component={About} />
				<Footer />
			</div>
		</Router>
	);
}
export default App;
