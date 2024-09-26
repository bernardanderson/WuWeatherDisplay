import dayjs from "dayjs";

class ModelMapperService {

    windDirectionValueToDirection = (directionValue) => {

        let compassArray = [[0,22,'N'],[23,67,'NE'],[68,112,'E'],[113,157,'SE'],
            [158,202,'S'],[203,247,'SW'],[248,292,'W'],[293,337,'NW'],[338,360,'N']];

        let weatherCompassDir = "";
        compassArray.forEach(element => {
            if (element[0] <= directionValue && directionValue <= element[1]) {
                weatherCompassDir = element[2];
            }
        });

        return weatherCompassDir;
    }

    formatWeatherData = (weatherData) =>
        ({
            ...weatherData,
            winddir: this.windDirectionValueToDirection(weatherData.winddir),
            time: dayjs(weatherData.time).format('MMMM D YYYY, h:mm:ss a')
        });

    mapRawWeatherConditions = (rawWeatherData) => {
        try {
            const rawMappedWeatherData = {
                baromin: rawWeatherData.imperial.pressure,
                humidity: rawWeatherData.humidity,
                tempf: rawWeatherData.imperial.temp,
                windspeedmph: rawWeatherData.imperial.windSpeed,
                winddir: rawWeatherData.winddir,
                windgustmph: rawWeatherData.imperial.windGust,
                windgustdir: rawWeatherData.winddir,
                dewptf: rawWeatherData.imperial.dewpt,
                dailyrainin: rawWeatherData.imperial.precipTotal,
                rainin: rawWeatherData.imperial.precipRate,
                time: rawWeatherData.obsTimeLocal
            };

            return this.formatWeatherData(rawMappedWeatherData);
        } catch (e) {
            console.error("Error in mapRawWeatherConditions", e);
            return undefined;
        }
    }

    mapRawFiveDayForecast = (rawFiveDayForecastData) => {
        try {
            const dayCount = rawFiveDayForecastData.calendarDayTemperatureMax.length;

            const forecastData = [];
            for (let i = 0; i < dayCount; i++) {

                const dayIndex = i * 2;
                const nightIndex = dayIndex + 1;
                const dayPart = rawFiveDayForecastData.daypart[0];

                const forecast = {
                    maxTemp: rawFiveDayForecastData.calendarDayTemperatureMax[i], // 93
                    minTemp: rawFiveDayForecastData.calendarDayTemperatureMin[i], // 66
                    dayOfWeek: rawFiveDayForecastData.dayOfWeek[i],               // "Sunday"
                    sunrise: rawFiveDayForecastData.sunriseTimeLocal[i],          // "2024-09-22T06:36:25-0500"
                    sunset: rawFiveDayForecastData.sunsetTimeLocal[i],            // "2024-09-22T18:43:58-0500"
                    precipChance: {
                        day: (dayPart.precipChance[dayIndex]) ? dayPart.precipChance[dayIndex] + "%" : "N/A",
                        night: (dayPart.precipChance[nightIndex]) ? dayPart.precipChance[nightIndex] + "%" : "N/A"
                    },
                    weatherPhrase: {
                        day: (dayPart.wxPhraseShort[dayIndex]) ? dayPart.wxPhraseShort[dayIndex] : "N/A",
                        night: (dayPart.wxPhraseShort[nightIndex]) ? dayPart.wxPhraseShort[nightIndex] : "N/A"
                    }

                };
                forecastData.push(forecast);
            }
            return forecastData;
        } catch (e) {
            console.error("Error in mapRawFiveDayForecast", e);
            return undefined;
        }
    }
}

const mapper = new ModelMapperService();
export default mapper;
