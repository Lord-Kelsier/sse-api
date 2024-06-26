import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

// const PORT = 3000

app.get('/ping', (_req, res) => {
  console.log('someone pinged here')
  res.send('pong')
})
// https://stackoverflow.com/a/59041709
app.get('/streaming', (_req, res) => {
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Connection', 'keep-alive')
  res.flushHeaders() // flush the headers to establish SSE with client

  let counter = 0
  const interValID = setInterval(() => {
    counter++
    if (counter >= 10) {
      clearInterval(interValID)
      res.end() // terminates SSE session
      return
    }
    console.log(counter)
    res.write(`data: ${JSON.stringify({ num: counter })}\n\n`) // res.write() instead of res.send()
  }, 200)

  // If client closes connection, stop sending events
  res.on('close', () => {
    console.log('client dropped me')
    clearInterval(interValID)
    res.end()
  })
})

export default app

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`)
// })
