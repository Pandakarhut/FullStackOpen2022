import React from 'react'

export default function TodoList({ todos }) {
	return (
		<div>
			My to-do list
			{todos.length}
		</div>
	)
}
