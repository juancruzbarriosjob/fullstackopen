require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

app.use(express.static('build'))

app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    const date = new Date()
    const infoPersons = `<p>Phonebook has info for ${persons.length} people</p>`
    const infoDate = `<p>${date.toString()}</p>`
    response.send(infoPersons + infoDate)
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  }).catch((error) => {
    console.log(error)
    response.status(404).end()
  })
})

app.post('/api/persons/', (request, response) => {
  const body = request.body

  if (body.name === undefined && body.number === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })
  
  person.save().then(savedPerson => {
    response.json(savedPerson.toJSON())
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.filter(person => person.id === id)

  response.status(204).end()
})

const hasNameAndNumber = (newPerson) => {
  return newPerson.name && newPerson.number
}

const personExists = (newPerson) => {
  return persons.some((person) => person.name === newPerson.name)
}

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})