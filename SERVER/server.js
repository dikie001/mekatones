const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv')

dotenv.config();
console.log("🌍 Cloudinary ENV:", process.env.CLOUDINARY_CLOUD_NAME);


const app = express()
const PORT = 3000


app.use(cors({
  origin:'http://localhost:5174',
  credentials:true
}))
app.use(express.json())

// Import routes
const getAudios = require('./api/GetAudios');
app.use('/api/audios', getAudios )

app.listen(PORT, ()=>{
  console.log(`Server running at http://localhost: ${PORT}`)

})