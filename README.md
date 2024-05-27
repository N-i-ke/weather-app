# 天気アプリ

## 概要

このアプリケーションは、OpenWeatherMap APIを使用して選択した都市の天気情報を表示するReactアプリです。天候条件に応じて背景画像が変わります。

## 使用方法

1. プロジェクトをクローンします。

```
git clone https://github.com/your-username/weather-app.git
```
2.  プロジェクトディレクトリに移動します。

```
cd weather-app
```

3.  依存関係をインストールします。

```
npm install
```

4. OpenWeatherMapからAPIキーを取得し、プロジェクトの環境変数に設定します。

OpenWeatherMapのURL↓
https://openweathermap.org/

```
.env
export REACT_APP_WEATHER_API_KEY=your-api-key
```

5. アプリケーションを起動します。

```
npm start
```