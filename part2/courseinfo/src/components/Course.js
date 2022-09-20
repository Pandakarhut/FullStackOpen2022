import React from 'react'

const Course = ({ course }) => {
	const initial = 0;
	const sum = course.parts.reduce(
		(preVal, curVal) => preVal + curVal.exercises,
		initial
	);

	return (
		<div>
			<h2>{course.name}</h2>
			<ul>
				{course.parts.map((part) => (
					<li key={part.id}>
						{part.name} {part.exercises}
					</li>
				))}				<li>
					<strong>total of {sum} exercises</strong>
				</li>
			</ul>
		</div>
	);
};

export default Course