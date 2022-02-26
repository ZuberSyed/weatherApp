//declarations
const cityName = document.querySelector('.cityName')
const btn = document.querySelector('.get')
const card = document.querySelector('card')

btn.addEventListener('click',getData)

async function getData(){
    const city = cityName.value
    const date = new Date()
    const timeStamp = date.toLocaleString()
    const weekDay =['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    const dayStamp = weekDay[date.getDay()]
    
    //get Data
    const second_response = await fetch(`/weather/${city}`)
    const second_jsonData = await second_response.json()
    const {text,icon} = second_jsonData.current.condition
    const {region,country} = second_jsonData.location
    const {temp_c,temp_f,humidity,wind_kph ,precip_in} = second_jsonData.current

    //declaring data 
    const iconImg = document.querySelector('.icon')
    const degrees = document.querySelector('.degrees')
    const texts = document.querySelector('.text')
    const regions = document.querySelector('.region')
    const precipt = document.querySelector('#precip')
    const winds = document.querySelector('#windPer')
    const humiditys = document.querySelector('#humidityPer')
    const weeks = document.querySelector('.week')

    //textContent
    iconImg.src  = icon
    iconImg.style.width ="8rem"
    iconImg.style.height = "8rem"
    degrees.textContent = `${temp_c} °C`
    regions.textContent = `${city}, ${region} ${country}`
    texts.textContent = text
    precipt.textContent = `Precipitation: ${precip_in} %`
    winds.textContent =`Wind: ${wind_kph} km/h`
    humiditys.textContent = `Humidity: ${humidity} %`
    weeks.textContent = `${dayStamp}`
    
    //creating elements to display
    const data ={city,country,dayStamp,region,timeStamp,icon,temp_c,temp_f,humidity,wind_kph,precip_in}
 
    // post data collected from getting data
    const response = await fetch('/api',{
        method:'POST',
        headers:{ 
            'Content-type':'application/json'
        },
        body:JSON.stringify(data)
    })
    const jsonData = await response.json()
}