import React, { useState, useEffect } from "react";
import axios from "axios";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
}

const cities = [
  "Tokyo",
  "Osaka",
  "Nagoya",
  "Sapporo",
  "Fukuoka",
  "Yokohama",
  "Kyoto",
  "Kobe",
  "Sendai",
  "Hiroshima",
];

const Weather: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>("Tokyo");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWeather = async (city: string) => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather`,
          {
            params: {
              q: city,
              lang: "ja",
              units: "metric",
              appid: process.env.REACT_APP_WEATHER_API_KEY,
            },
          },
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather(selectedCity);
  }, [selectedCity]);

  return (
    <div className="weather-container">
      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
      >
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      {loading ? (
        <p>ローディング中...</p>
      ) : weatherData ? (
        <div className="weather-info">
          <h2>{weatherData.name}</h2>
          <p>気温: {weatherData.main.temp}°C</p>
          <p>天気: {weatherData.weather[0].description}</p>
          <p>
            風速: {weatherData.wind.speed} m/s, 風向: {weatherData.wind.deg}°
          </p>
          <p>湿度: {weatherData.main.humidity}%</p>
        </div>
      ) : (
        <p>参照するデータがありません</p>
      )}
    </div>
  );
};

export default Weather;
