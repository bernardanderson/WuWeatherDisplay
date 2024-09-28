# WuWeatherDisplay

`WuWeatherDisplay` is a simple, small footprint, front-end only application to access the Weather Underground (WU) current weather and five-day forecast api endpoints and National Weather Service (NWS) radar weather map. The UI was kept simplistic and written to be displayed on impromptu weather displays like old tablets or other small, low resolution devices with internet and browser capabilies.

### Features
- Display of current weather data from a single, configurable WU weather station. **(Updates every 2 minutes)**
- Display of the WU 5-day forecast data for a five digit zip-code area. **(Updates every 6 hours)**
- Display of the NWS weather radar from a selectable list of NWS radars. These radar maps are animated gifs. **(Updates every 10 minutes)**
- Light or Dark Theme
- Timed Light or Dark Theme (switches from one theme to another depending on the time of day) 
- No back-end service requirements. The entire application runs exclusely in the front-end and can be hosted anywhere.
- Configuration persistence. All settings are stored in the browser's local storage.

### Installation 
The application is Javascript written with React library. It uses Vite for the tooling.
- To run in development mode: `npm run dev`
- To build you own production build: `npm run build`
- Or run it from `https://bernardanderson.github.io`

#### Configuration Requirements:

- A WU API access key(s).
  - **Note:** There are two configuration locations for WU API keys. The same one can be used for both. Sometimes people has access to multiple keys with different permission levels and/or API request count limitations.
- A WU Weather Station ID. These Ids can be found on WU website [[Example](https://www.wunderground.com/wundermap?lat=45.679&lon=-111.036)]. Select one of the circles to see it's `Station ID`. You are essentially tapping into the data of someone's personal weather station data, so find one close to your location.

