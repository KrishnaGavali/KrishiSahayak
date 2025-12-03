type locationData = {
  placeName: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
};

type currentWeather = {
  temp_c: number;
  condition: string;
  wind_kph: number;
  humidity: number;
  uv: number;
  precip_mm: number;
  vis_km: number;
};

type forecastWeather = {
  date: string;
  max_temp_c: number;
  min_temp_c: number;
  avg_temp_c: number;
  condition: string;
};

export interface WeatherData {
  location: locationData;
  current: currentWeather;
  forecast: forecastWeather[];
}

class WeatherService {
  private baseUrl: string;
  private fetchUrl: string;
  private weatherData: WeatherData | null = null;

  constructor(latitude: number, longitude: number) {
    this.baseUrl = process.env.WEATHER_BASE_URL || "";
    this.fetchUrl = `${this.baseUrl}&q=${latitude},${longitude}&days=14&aqi=no&alerts=no`;
  }

  private async fetchWeatherData() {
    const response = await fetch(this.fetchUrl);
    return response;
  }

  async getCurrentWeather() {
    const response = await this.fetchWeatherData();

    const data = await response.json();

    let forecastArray: forecastWeather[] = data.forecast.forecastday.map(
      (data: any) => ({
        date: data.date,
        max_temp_c: data.day.maxtemp_c,
        min_temp_c: data.day.mintemp_c,
        avg_temp_c: data.day.avgtemp_c,
        condition: data.day.condition.text,
      })
    );

    this.weatherData = {
      location: {
        placeName: data.location.name,
        region: data.location.region,
        country: data.location.country,
        lat: data.location.lat,
        lon: data.location.lon,
      },
      current: {
        temp_c: data.current.temp_c,
        condition: data.current.condition.text,
        wind_kph: data.current.wind_kph,
        humidity: data.current.humidity,
        uv: data.current.uv,
        precip_mm: data.current.precip_mm,
        vis_km: data.current.vis_km,
      },
      forecast: forecastArray,
    };

    console.log("Weather Data fetched: ", this.weatherData);

    return this.weatherData;
  }
}

export default WeatherService;
