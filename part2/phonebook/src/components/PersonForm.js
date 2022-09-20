const Filter = (props) => {
	return (
		<form onSubmit={props.onSubmit}>
			<div>
				name: <input value={props.name} onChange={props.onChangePerson} />
				number: <input value={props.number} onChange={props.onChangeNum} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	)
}

export default Filter