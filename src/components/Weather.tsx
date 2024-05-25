import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureThreeQuarters,
  faSun,  
  faCloud,
  faWind,
  faCity,
  faCloudRain,
  faSnowflake,
  faQuestion,
  faTemperatureHigh,
} from "@fortawesome/free-solid-svg-icons";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    main: string,
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

        let background;
        switch (response.data.weather[0].main) {
          case "Clear":
            background = "yellow";
            break;
          case "Clouds":
            background = "gray";
            break;
          case "Rain":
            background = "blue";
            break;
          default:
            background = "white";
            break;
        }
        document.body.style.backgroundColor = background;
        
        console.log(response.data)
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
      <div className="flex justify-center gap-4">
        {weatherData && (
          <>
            {weatherData.weather[0].main === "Clear" && (
              <div className="text-yellow-400">
                <FontAwesomeIcon icon={faSun} className="w-8 h-8" />
                <span>晴れ</span>
              </div>
            )}
            {weatherData.weather[0].main === "Clouds" && (
              <div className="text-gray-400">
                <FontAwesomeIcon icon={faCloud} className="w-8 h-8" />
                <span>曇り</span>
              </div>
            )}
            {weatherData.weather[0].main === "Rain" && (
              <div className="text-blue-400">
                <FontAwesomeIcon icon={faCloudRain} className="w-8 h-8" />
                <span>雨</span>
              </div>
            )}
            {weatherData.weather[0].main === "Snow" && (
              <div className="text-blue-200">
                <FontAwesomeIcon icon={faSnowflake} className="w-8 h-8" />
                <span>雪</span>
              </div>
            )}
          </>
        )}
        {!weatherData && (
          <div className="text-gray-400">
            <FontAwesomeIcon icon={faQuestion} className="w-8 h-8" />
            <span>天気情報がありません</span>
          </div>
        )}
      </div>
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
      <div className=" w-full flex items-center justify-center">
        {loading ? (
          <p className="text-center text-gray-500">ローディング中...</p>
        ) : weatherData ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center w-full">
            <h2 className="text-2xl font-bold mb-2">
              {cityNames[weatherData.name]}
            </h2>
            <p className="justify-start text-left flex items-center gap-5">
              <div>
                <FontAwesomeIcon icon={faCity} />
              </div>
              選択中の都市: {cityNames[selectedCity]}
            </p>
            <p className="justify-start text-left flex items-center gap-5">
              <div>
                <FontAwesomeIcon
                  icon={faTemperatureThreeQuarters}
                  className="w-5 h-6"
                />
              </div>
              気温: {weatherData.main.temp}°C
            </p>
            <p className="justify-start text-left flex items-center gap-5">
              <div>
                <FontAwesomeIcon icon={faCloud} />
              </div>
              天気: {weatherData.weather[0].description}
            </p>
            <p className="justify-start text-left flex items-center gap-5">
              <div>
                <FontAwesomeIcon icon={faWind} />
              </div>
              風速: {weatherData.wind.speed} m/s, 風向: {weatherData.wind.deg}°
            </p>
            <p className="justify-start text-left flex items-center gap-5">
              <div>
                <FontAwesomeIcon icon={faTemperatureHigh} />
              </div>
              湿度: {weatherData.main.humidity}%
            </p>
          </div>
        ) : (
          <p className="text-center text-red-500">参照するデータがありません</p>
        )}
      </div>
    </div>
  );
};

export default Weather;
