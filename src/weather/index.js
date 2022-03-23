import React, { useEffect, useState } from 'react';
import '../img/fontawesome-free-6.1.0-web/fontawesome-free-6.1.0-web/css/all.min.css';
import './weather.scss';
const Weather = () => {
    const [weather, setWeather] = useState({});
    const [state, setstate] = useState("hanoi")
    const [title, settitle] = useState("");
    useEffect(() => {
        const APP_ID = "3a0bf553b2614da9713377a5e94be5c0";
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${APP_ID}&lang=vi`)
            .then(async res => {
                const data = await res.json();
                setWeather(data)
            })
    }, [state])
    const handleOnclick = () => {
        setstate(title)
    }
    const handleOnchange = (Event) => {
        settitle(Event.target.value)
    }
    const Unknown = "không xác định"
    const city = "tp không tồn tại"
    const none = "none"
    let img = ""
    if (Object.keys(weather).length <= 2) {
        img = undefined
    }
    else img = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    return (
        <div className='container'>
            <div className='main-section'>
                <div className='search-box'>
                    <i class="fa-solid fa-magnifying-glass" onClick={handleOnclick}></i>
                    <input id='search-input' value={title} type="text" placeholder='nhập tên thành phố' onChange={(Event) => handleOnchange(Event)}></input>
                </div>
                <p className='city-name'>{Object.keys(weather).length <= 2 ? city : weather.name}</p>
                <p className='weather-state'>{Object.keys(weather).length <= 2 ? Unknown : weather.weather[0].description}</p>
                {Object.keys(weather).length <= 2 ? "" : <img src={img} alt='error'></img>}
                {Object.keys(weather).length <= 2 ? "" : <p className='temperature'>{Math.round(weather.main.temp - 273)}</p>}
            </div>
            <div className='addtional-section'>
                <div className='infor'>
                    <span>Độ ẩm</span>
                    <span>{Object.keys(weather).length <= 2 ? none : weather.main.humidity + "%"}</span>
                </div>
                <div className='infor'>
                    <span>Gió</span>
                    <span>{Object.keys(weather).length <= 2 ? none : (weather.wind.speed * 3.6).toFixed(.2) + "km/h"}</span>
                </div>
            </div>
        </div>
    )
}

export default Weather;