import React, { useState } from 'react'

const Button ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App () => {
	const [time, setTime] = useState;
	let now = new Date().toLocaleTimeString()
	setInterval(() => {

	}, 1000);


	return {
		< div >
			<h1>TIME</h1>
			<Button onClick={} text="Get Time" />
		</div >
	}
}

export default App