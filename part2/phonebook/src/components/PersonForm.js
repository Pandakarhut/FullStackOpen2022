const Filter = ({onSubmit, newName, newNum, onChangePerson, onChangeNum}) => {
	return (
		<form onSubmit={onSubmit}>
        <div>
		name: <input value={newName} onChange={onChangePerson}/>
		number: <input value={newNum} onChange={onChangeNum}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
	)
  }

  export default Filter

