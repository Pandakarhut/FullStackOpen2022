const successStyle = {
	color: 'green',
	background: 'lightgrey',
	fontSize: 20,
	borderStyle: 'solid',
	borderRadius: 5,
	padding: 10,
	marginBottom: 10
}

const errorStyle = {
	color: 'red',
	background: 'lightgrey',
	fontSize: 20,
	borderStyle: 'solid',
	borderRadius: 5,
	padding: 10,
	marginBottom: 10,
}

const alertStyle = {
	color: 'black',
	background: 'lightgrey',
	fontSize: 20,
	borderStyle: 'solid',
	borderRadius: 5,
	padding: 10,
	marginBottom: 10
}

const Notification = ({message}) => {
	if (message === null) {
		return null
	}

	if (message.includes('error')){
		return (
			<div style={errorStyle} className="error">
			{message}
		</div>
		)
	}

	if (message.includes('added') || message.includes('Deleted')){
		return (
			<div style={alertStyle} className="alert">
			{message}
		</div>
		)
	}

	else {
		return (
			<div style={successStyle} className="error">
				{message}
			</div>
		)
	}
}

export default Notification