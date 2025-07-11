// pages/index.tsx
import { useEffect, useState } from "react"

interface WeatherData {
  main: {
    temp: number
    humidity: number
  }
  weather: {
    description: string
    icon: string
  }[]
  name: string
}

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [city, setCity] = useState("Lahore")

  const fetchWeather = async () => {
    setLoading(true)
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
      )
      const data = await res.json()
      setWeather(data)
    } catch (err) {
      console.error("Error fetching weather:", err)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchWeather()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetchWeather()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          🌤️ Weather Forecast
        </h1>

        <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city..."
            className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Search
          </button>
        </form>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : weather?.weather ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{weather.name}</h2>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather icon"
              className="mx-auto"
            />
            <p className="text-3xl font-bold text-indigo-800 mb-2">
              {weather.main.temp}°C
            </p>
            <p className="text-gray-600 capitalize mb-1">
              {weather.weather[0].description}
            </p>
            <p className="text-gray-500 text-sm">
              Humidity: {weather.main.humidity}%
            </p>
          </div>
        ) : (
          <p className="text-center text-red-600">City not found</p>
        )}
      </div>
    </div>
  )
}
