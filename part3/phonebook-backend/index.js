const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
		id: "1",
		name: "Arto Hellas",
		number: "040-123456"
	  },
	  {
		id: "2",
		name: "Ada Lovelace",
		number: "39-44-5323523"
	  },
	  {
		id: "3",
		name: "Dan Abramov",
		number: "12-43-234345"
	  },
	  {
		id: "4",
		name: "Mary Poppendieck",
		number: "39-23-6423122"
	  }
	]

app.get('/info', (request, response) => {
	const personCount = persons.length
	const currentTime = new Date().toString()
	response.send(`
		<p>Phonebook has info for ${personCount} people</p>
		<p>${currentTime}</p>
		`)
})

app.get('/api/persons', (request, response) => {
	response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
	const id = request.params.id
	const person = persons.find(person => person.id === id)
	if (person) {
		response.json(person)
	}
	else {
		response.status(404).end()
	}
})

app.delete('/api/persons/:id', (request, response) => {
	const id = request.params.id
	persons = persons.filter(person => person.id !== id)
	response.statusMessage = 'Person deleted'
	response.status(204).end()
})

const randomId = () => {
	const randomId = persons.length > 0
	 ? Math.floor(Math.random(...persons.map(p => Number(p.id))) * 100000)
	  : 0
	return String(randomId)
}

app.post('/api/persons', (request, response) => {
	const body = request.body
	const exists = persons.some((person) => person.name === body.name)
	if (!body.name || !body.number) {
		return response.status(400).json({
			error: 'name or number missing'
		})
	}
	if (exists) {
		return response.status(400).json({
			error: 'name must be unique'
		})
	}
	const person = {
		id: randomId(),
		name: body.name,
		number: body.number
	}
	persons = persons.concat(person)
	response.json(person)
}
)

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})