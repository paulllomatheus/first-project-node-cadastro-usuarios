const express = require("express")
const axios = require("axios")
const cors = require("cors")

const uuid = require("uuid")
const app = express()
const port = 3001

app.use(cors())
app.use(express.json())

const users = []

const checkIdUser = (request, response, next) => {
  const { id } = request.params
  const index = users.findIndex((user) => user.id === id)

  if (index < 0) {
    return response.status(404).json({ error: "Not found" })
  }

  request.id = id
  request.index = index

  next()
}

app.get("/users", (request, response) => {
  return response.json(users)
})

app.post("/users", (request, response) => {
  const { name, age } = request.body
  const newUser = { id: uuid.v4(), name, age }

  users.push(newUser)

  return response.status(201).json(newUser)
})

app.put("/users/:id", checkIdUser, (request, response) => {
  const { name, age } = request.body
  const id = request.id
  const index = request.index

  const updateUser = { id, name, age }

  users[index] = updateUser

  return response.json(updateUser)
})

app.delete("/users/:id", checkIdUser, (request, response) => {
  const index = request.index

  users.splice(index, 1)

  return response.status(204).json()
})

app.listen(port, () => {
  console.log(`🚀 Server started on port ${port} 🚀`)
})
