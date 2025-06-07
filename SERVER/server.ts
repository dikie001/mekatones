const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv')

dotenv.config();

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

// Import routes
const getAudios = require('./api/GetAudios');
app.use('/api/audios', getAudios )

app.listen(PORT, ()=>{
  console.log(`Server running at http://localhost: ${PORT}`)
})