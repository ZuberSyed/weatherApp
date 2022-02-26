const express = require('express')
const fetch = require('node-fetch')
const database = require('nedb')
require('dotenv').config()
const db = new database('database.db')
const app = express()
app.listen(5050, () => console.log('Listening at port 5050'))
app.use(express.static('public'))
app.use(express.json())
db.loadDatabase()

app.post('/api', async (req,res) => {
        const data = req.body
        db.insert(data)
        res.json(data)
})
app.get('/weather/:city',async (req,res) => {
            const cityValue = req.params.city
            const api_key = process.env.API_KEY
            const response_data = await fetch(`https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${cityValue}&aqi=yes`)
            const json_data = await response_data.json()
            res.send(json_data)
})