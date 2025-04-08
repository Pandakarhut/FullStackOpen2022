const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())

morgan.token('body', (req) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

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
	const currentTime = new Date().toString()
	response.send(`
		<p>Phonebook has info for ${persons.length} people</p>
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
		response.statusMessage = 'Person not found'
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
	const existName = persons.some((person) => person.name === body.name)
	const existNumber = persons.some((person) => person.number === body.number)


	if (!body.name || !body.number) {
		return response.status(400).json({
			error: 'name or number missing'
		})
	}

	if (existName) {
		return response.status(400).json({
			error: 'name must be unique'
		})
	}

	if (existNumber) {
		return response.status(400).json({
			error: 'number must be unique'
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

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`)
})