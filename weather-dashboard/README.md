# 🌤️ Weather Dashboard

A modern, responsive weather dashboard that displays current weather conditions and a 5-day forecast for any city in the world.

## Features

✨ **Current Weather Display**
- Real-time temperature, humidity, wind speed, and pressure
- Weather description with visual indicators
- "Feels like" temperature
- Visibility information

🔍 **Smart City Search**
- Auto-complete suggestions as you type
- Search from a list of cities
- Error handling for invalid cities

📊 **5-Day Forecast**
- Daily weather forecast with high/low temperatures
- Weather description for each day
- Visual weather icons

📱 **Responsive Design**
- Works perfectly on desktop, tablet, and mobile
- Beautiful gradient background
- Smooth animations and transitions

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenWeatherMap API key (free tier available)

### Installation

1. **Clone or download the project**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get your API key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate an API key
   - Copy the API key

4. **Configure the API key**
   - Open `script.js`
   - Replace `'e8b8a8a8c8a8a8a8c8a8a8a8c8a8a8a8'` with your OpenWeatherMap API key:
   ```javascript
   const API_KEY = 'YOUR_API_KEY_HERE';
   ```

   OR

   - Create a `.env` file based on `.env.example`
   - Add your API key:
   ```
   OPENWEATHERMAP_API_KEY=your_api_key_here
   ```

5. **Start the server**
   ```bash
   npm start
   ```

6. **Open in browser**
   - Navigate to `http://localhost:3000`
   - Start searching for cities!

## Deployment on Render

### Step 1: Prepare your repository

1. Ensure your project is pushed to GitHub
2. Make sure `.env.example` is in the repository (but not `.env` with real credentials)

### Step 2: Deploy on Render

1. Visit [Render](https://render.com)
2. Sign up or log in with your GitHub account
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Select the repository `Abhishektharu/website-`
6. Configure the service:
   - **Name**: `weather-dashboard`
   - **Branch**: `weather-dashboard`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free tier is fine

7. Add environment variables:
   - Click "Advanced"
   - Add environment variable:
     - **Key**: `OPENWEATHERMAP_API_KEY`
     - **Value**: Your OpenWeatherMap API key

8. Click "Create Web Service"
9. Render will build and deploy your app
10. Your app will be live at: `https://weather-dashboard-xxx.onrender.com`

### Step 3: Access your app

- Once deployment is complete, click the URL to visit your weather dashboard
- Share the link with anyone to let them check the weather!

## API Configuration

This project uses the free tier of OpenWeatherMap API:
- **Current Weather**: Weather data2.5/forecast endpoint
- **Rate Limit**: 60 requests per minute (free tier)
- **Documentation**: [OpenWeatherMap API Docs](https://openweathermap.org/api)

## Project Structure

```
weather-dashboard/
├── index.html          # Main HTML structure
├── styles.css          # Styling and animations
├── script.js           # Frontend logic and API calls
├── server.js           # Express server
├── package.json        # Project dependencies
├── .env.example        # Environment variables template
└── README.md           # This file
```

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **API**: OpenWeatherMap API
- **Deployment**: Render
- **Styling**: Custom CSS with animations

## Features Explained

### 1. City Search with Auto-complete
- Uses Geocoding API to fetch matching cities
- Debounced input for better performance
- Displays top 5 results

### 2. Current Weather Display
- Temperature with visual gradient
- Multiple weather metrics in easy-to-read cards
- Emoji icons for quick visual reference

### 3. 5-Day Forecast
- One forecast per day
- High and low temperatures
- Weather description and icons

### 4. Responsive Design
- Mobile-first approach
- Adaptive grid layouts
- Touch-friendly buttons

## Customization

### Change Colors
Edit the CSS variables in `styles.css`:
```css
:root {
  --primary-color: #667eea;      /* Change this */
  --secondary-color: #764ba2;    /* Or this */
  /* ... */
}
```

### Change Temperature Units
Modify the `units=metric` parameter in `script.js` to `units=imperial` for Fahrenheit:
```javascript
const weatherUrl = `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
```

## Troubleshooting

### "City not found" error
- Check that the city name is spelled correctly
- Try with country name, e.g., "London, UK"

### API key errors
- Verify your API key is correct
- Check that your API key is not expired or revoked
- Ensure you have a free tier account on OpenWeatherMap

### Render deployment fails
- Check that `package.json` is in the correct directory
- Verify all environment variables are set
- Check the Render logs for specific errors

## Future Enhancements

- 🗓️ Extended 16-day forecast
- 🌍 Multiple location favorites
- 📊 Historical weather data
- 🎨 Theme switcher (dark/light mode)
- 📍 Geolocation support
- 💾 Local storage for recent searches
- 🔔 Weather alerts and notifications

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

If you encounter any issues:
1. Check the troubleshooting section
2. Review the OpenWeatherMap API documentation
3. Check Render deployment logs

Happy weather checking! 🌤️