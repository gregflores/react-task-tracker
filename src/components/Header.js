import PropTypes from 'prop-types';
import Button from './Button.js';
import { useLocation } from 'react-router-dom';

const Header = ({ title, onAdd, showAddTask }) => {
	const location = useLocation();
	return (
		<header className='header'>
			<h1>Task Tracker</h1>
			{/* styling and props */}
			{/* <h2 style={headingStyle}>{title}</h2> */}
			{location.pathname === '/' && (
				<Button
					color={showAddTask ? 'Red' : 'Green'}
					text={showAddTask ? 'Close' : 'Add'}
					onClick={onAdd}
				/>
			)}
			{/* <Button color='blue' text='Hello' />
			<Button color='orange' text='Hello' /> */}
		</header>
	);
};
Header.defaultProps = {
	title: 'Task Tracker Default prop',
};
// Passed in prop.title must be a string and is required
Header.propTypes = {
	title: PropTypes.string.isRequired,
};

// CSS in Js
// const headingStyle = {
// 	color: 'red',
// 	backgroundColor: 'black',
// };
export default Header;
