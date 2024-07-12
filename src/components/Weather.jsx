import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import Search_Icon from '../assets/search.png'
import Weather_Icon from '../assets/clear.png'
import cloud_Icon from '../assets/cloud.png'
import Drizzle_Icon from '../assets/drizzle.png'
import humidity_Icon from '../assets/humidity.png'
import rain_Icon from '../assets/rain.png'
import snow_Icon from '../assets/snow.png'
import wind_Icon from '../assets/wind.png'
import mist_Icon from '../assets/mist.png'
import './Back.css'

const Weather = () => {

  const inputRef = useRef()
  const[weatherData, setWeatherData] = useState({});
  const allIcons ={
    "01d": Weather_Icon,
    "01n": Weather_Icon,
    "02d": cloud_Icon,
    "02n": cloud_Icon,
    "03d": cloud_Icon,
    "03n": cloud_Icon,
    "04d": Drizzle_Icon,
    "04n": Drizzle_Icon,
    "09d": rain_Icon,
    "09n": rain_Icon,
    "10d": rain_Icon,
    "10n": rain_Icon,
    "13d": snow_Icon,
    "13n": snow_Icon,
    "50d": mist_Icon
  }

  const search = async (city) => {
    if(city == ""){
      alert("Please enter a city name");
      return;
    }
    try {

      const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;


      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || Weather_Icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })
    }
     catch (error) {
      setWeatherData(false);
      alert("wrong city name please try again with proper city name");
    }
  }
useEffect(() => {
  search("Raipur");
},[])


  return (
    <div className="Weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Search'/>
        <img src={Search_Icon} alt="" onClick={()=> search(inputRef.current.value)}/>
      </div>
      <img src={weatherData.icon} className='Weather-icon'/>
      <p className="tempreture">{weatherData.temperature}° c
      </p>
      <p className="Location">{weatherData.location}</p>
      <div className="weather-data">
      <div className="col">
        <img src={weatherData.icon} className="humidity"/>
        <div>
          <p>{weatherData.humidity} %</p>
          <span>Humidity</span>
        </div>
      </div>
      <div className="col">
        <img src={wind_Icon} className="Wind"/>
        <div>
          <p>{weatherData.windSpeed} km/h</p>
          <span>Wind speed</span>
        </div>
      </div>
      </div>
     
    </div>

  )
}

export default Weather
