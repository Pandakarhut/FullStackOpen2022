import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [find, setFind] = useState('')


  const addPerson = (event) => {
    event.preventDefault()

    //Verify that newname doesn't already exist
    //Returns true if person.name === newName is true for any item.
    const exists = persons.some((person) =>
      person.name === newName
    );

    if (exists) {
      alert(`${newName} is already added to the Phonebook!`)
    }
    else {
      const personObject = {
        name: newName,
        number: newNum,
        id: persons.length + 1,
      }

      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNum('')
    }
  }

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNum(event.target.value)
  }

  const handleFindChange = (event) => {
    console.log(event.target.value)
    setFind(event.target.value)
  }

  const personsToShow = find.length === 0
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(find.toLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFindChange}/>
      <h3>add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        newNum={newNum}
        onChangePerson = {handlePersonChange}
        onChangeNum = {handleNumberChange}
      />
      <h3>Numbers</h3>
      <ul>
        {personsToShow.map(person =>
        <Persons key={person.id} person={person} />)}
      </ul>
      {/* <div>debug: {newName}</div> */}
    </div>
  )
}

export default App