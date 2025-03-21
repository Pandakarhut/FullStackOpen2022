import { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'
import './index.css'

const App = () => {

	const [notes, setNotes] = useState([])
	const [newNote, setNewNote] = useState('a new note...')
	const [showAll, setShowAll] = useState(true)
	const [errorMessage, setErrorMessage] = useState(null)

	useEffect(() => {
		noteService
			.getAll()
			.then(initialNotes => {
				setNotes(initialNotes)
			})
	}, [])
	// console.log('render', notes.length, 'notes')

	const addNote = (event) => {
		event.preventDefault()
		// const newId = notes.length > 0 ? (Math.max(...notes.map(note => parseInt(note.id))) + 1).toString() : "1"
		const noteObject = {
			content: newNote,
			important: Math.random() > 0.5,
			// id: newId,
		}
		noteService
			.create(noteObject)
			.then(returnedNote => {
				setNotes(notes.concat(returnedNote))
				setNewNote('')
			})
	}

	const toggleImportanceOf = id => {
		// console.log('importance of ' + id + ' needs to be toggled.')
		// Below is an easier syntax in ES6, with backticks`` and ${} :
		// console.log(`importance of ${id} needs to be toggled.`)

		// The array find method is used to find the note we want to modify, and we then assign it to the note variable.
		// find(), findIndex(), indexOf(), includes()
		const note = notes.find(n => n.id === id)
		const changedNote = { ...note, important : !note.important }
		noteService
			.update(id, changedNote)
			.then(returnedNote => {
				setNotes(notes.map(note => note.id === id ? returnedNote : note))
			})
			.catch(error => {
				setErrorMessage(`Note '${note.content}' was already deleted from server`)
				setTimeout(() => {
					setErrorMessage(null)
				}, 5000)
				setNotes(notes.filter(n => n.id !== id))
			})
	}

	const handleNoteChange = (event) => {
		// console.log(event.target.value)
		setNewNote(event.target.value)
	}

	const notesToShow = showAll ? notes : notes.filter((note) => note.important )

	return (
	  <div>
		<h1>Notes</h1>
		<Notification message = {errorMessage} />
		<div>
			<button onClick = {() => setShowAll(!showAll)}>
				show {showAll ? 'important' : 'all'}
			</button>
		</div>
		<ul>
		  {notesToShow.map(note =>
		  	<Note
			key={note.id}
			note={note}
			toggleImportance={() => toggleImportanceOf(note.id)} />
			)}
		</ul>
		<form onSubmit={addNote}>
			<input
				// defaultValue={"a new note..."}
				value = {newNote}
				onChange = {handleNoteChange}
			/>
			<button type='submit'>save</button>
		</form>
	  </div>
	)
  }

export default App