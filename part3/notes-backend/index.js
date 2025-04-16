// const http = require('http')

// middleware to enable CORS cross-origin resource sharing
// const cors = require('cors'
// app.use(cors())

const express = require('express')
const app = express()

let notes = [
	{
	  id: "1",
	  content: "HTML is easy",
	  important: true
	},
	{
	  id: "2",
	  content: "Browser can execute only JavaScript",
	  important: false
	},
	{
	  id: "3",
	  content: "GET and POST are the most important methods of HTTP protocol",
	  important: true
	}
  ]

const requestLogger = (request, response, next) => {
	console.log('Method:', request.method)
	console.log('Path:  ', request.path)
	console.log('Body:  ', request.body)
	console.log('---')
	next()
  }

app.use(requestLogger)
// middleware to show static content from the dist folder
app.use(express.static('dist'))
// middleware to parse JSON request body
app.use(express.json())

// define GET routes
app.get('/', (request, response) => {
	response.send('<h1>Hello Backend!</h1>')
})

app.get('/api/notes', (request, response) => {
	response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
	const id = request.params.id
	const note = notes.find(note => note.id === id)

	if (note) {
		response.json(note)
	}
	else {
		response.statusMessage = 'Note not found'
		response.status(404).end()
	}
})

// define a POST route
const generateId = () => {
	const maxId = notes.length > 0
	  ? Math.max(...notes.map(n => Number(n.id)))
	  : 0
	return String(maxId + 1)
  }

  app.post('/api/notes', (request, response) => {
	const body = request.body

	if (!body.content) {
	  return response.status(400).json({
		error: 'content missing'
	  })
	}

	const note = {
	  content: body.content,
	  important: body.important || false,
	  id: generateId(),
	}

	notes = notes.concat(note)

	response.json(note)
  })

  app.delete('/api/notes/:id', (request, response) => {
	const id = request.params.id
	notes = notes.filter(note => note.id !== id)

	response.status(204).end()
	})

  const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
  }

  app.use(unknownEndpoint)

//   const app = get((request, response) => {
// 	response.writeHead(200, { 'Content-Type': 'application/json' })
// 	response.end(JSON.stringify(notes))
//   })

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'text/plain' })
//   response.end('Hello World')
// })

// start the server locally
// const PORT = 3001
// app.listen(PORT, () => {
// 	console.log(`Server running on http://localhost:${PORT}`)
// 	})

// start the server on cloud
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`)
})