import { useState , useEffect} from 'react'
import { nanoid } from 'nanoid';
// import Persons from './components/Persons'
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [find, setFind] = useState('')
  const [message, setMessage] = useState(null)

	// useEffect Hook用于在组件挂载后执行副作用代码
	useEffect(() => {
	personService
		.getAll()
		.then(initialPersons => {
			setPersons(initialPersons)
		})
	// 空数组作为依赖，表示只在组件挂载和卸载时执行一次
	}, [])

  const addPerson = (event) => {
    event.preventDefault()
    //Verify that newname doesn't already exist
    //Returns true if person.name === newName is true for any item.
    const exists = persons.some((person) =>
      person.name === newName,
    )

    if (exists) {
      setMessage(`${newName} is already added to the Phonebook!`)
    }
    else {
      const personObject = {
        name: newName,
        number: newNum,
		// add id, remember to convert to string
        // id: (persons.length + 1).toString()
		id: nanoid()
      }

	  personService
	  	.create(personObject)
		.then(returnedPerson => {
			setPersons(persons.concat(returnedPerson))
			setNewName('')
			setNewNum('')
			setMessage(`Added ${newName}`)
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		},)
    }
  }

  const deletePerson = (id, name) => {
	if (window.confirm(`Delete ${name}?`)) {
		personService
		.remove(id)
		.then(() => {
			setPersons(persons.filter(person => person.id !== id))
			setMessage(`Deleted ${name}`)
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		},)
	}
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNum(event.target.value)
  }

  const handleFindChange = (event) => {
    // console.log(event.target.value)
    setFind(event.target.value)
  }

  const personsToShow = find.length === 0
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(find.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
	  <Notification message={message} />
      <Filter onChange={handleFindChange} />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        name={newName}
        number={newNum}
        onChangePerson={handleNameChange}
        onChangeNum={handleNumberChange}
      />
      <h3>Numbers</h3>
	  <ul>
        {personsToShow.map(person => (
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App