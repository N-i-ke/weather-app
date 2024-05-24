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

// 英語名と日本語名の対応表
const cityNames: { [key: string]: string } = {
  Tokyo: "東京",
  Osaka: "大阪",
  Nagoya: "名古屋",
  Sapporo: "札幌",
  Fukuoka: "福岡",
  Yokohama: "横浜",
  Kyoto: "京都",
  Kobe: "神戸",
  Sendai: "仙台",
  Hiroshima: "広島",
};

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
          }
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
      <h2 className="font-bold text-2xl mb-4">お天気表示アプリケーション</h2>
      <br />
      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        className="p-2 border border-gray-300 rounded-md mb-4"
      >
        {Object.entries(cityNames).map(([englishName, japaneseName]) => (
          <option key={englishName} value={englishName}>
            {japaneseName}
          </option>
        ))}
      </select>
      <div className="min-h-[200px] w-full flex items-center justify-center">
        {loading ? (
          <p className="text-center text-gray-500">ローディング中...</p>
        ) : weatherData ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center w-full">
            <h2 className="text-2xl font-bold mb-2">
              {cityNames[weatherData.name]}
            </h2>
            <p className="text-left">選択中の都市: {cityNames[selectedCity]}</p>
            <p className="text-left">気温: {weatherData.main.temp}°C</p>
            <p className="text-left">
              天気: {weatherData.weather[0].description}
            </p>
            <p className="text-left">
              風速: {weatherData.wind.speed} m/s, 風向: {weatherData.wind.deg}°
            </p>
            <p className="text-left">湿度: {weatherData.main.humidity}%</p>
          </div>
        ) : (
          <p className="text-center text-red-500">参照するデータがありません</p>
        )}
      </div>
    </div>
  );
};

export default Weather;
