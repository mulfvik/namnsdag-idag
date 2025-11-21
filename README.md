# Namnsdag Idag - Swedish Name Day Map

A responsive single-page web application that shows a map of Sweden with locations where people live who have today's name day (namnsdag).

## Features

- 🗓️ **Real-time Name Day**: Fetches today's Swedish name day from APIs
- 🗺️ **Interactive Map**: OpenStreetMap-based visualization of Sweden
- 📍 **Population Distribution**: Shows estimated population of people with today's names across Swedish municipalities
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Clean, Swedish-themed design with TailwindCSS
- 📊 **Statistics**: Real-time statistics about selected names and locations

## Technologies Used

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Leaflet & React-Leaflet** - Interactive maps with OpenStreetMap
- **TailwindCSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **Lucide React** - Beautiful icons

## APIs and Data Sources

### Name Day APIs
- Primary: Swedish name day APIs (with CORS fallback)
- Fallback: Local Swedish name calendar data

### Population Data
- **Important**: SCB (Statistics Sweden) discontinued name statistics as of 2024
- **Current**: Skatteverket (Swedish Tax Agency) now handles name data but only via web interface
- **SPAR Limitation**: Cannot be used for statistical mapping due to privacy laws (see SPAR_DATA_ANALYSIS.md)
- **Solution**: Uses enhanced historical data based on SCB patterns (2021-2023)
- Data represents realistic distribution patterns based on historical Swedish demographics

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd namnsdag-idag
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   └── SwedishMap.jsx           # Interactive map component
├── data/
│   └── swedishData.js           # Swedish municipalities and name calendar data
├── services/
│   ├── nameService.js           # API service for name day data
│   ├── enhancedNameService.js   # Enhanced historical population data
│   └── sparService.js           # SPAR limitations analysis
├── App.jsx                      # Main application component
├── main.jsx                     # React entry point
└── index.css                    # Global styles with Tailwind
```

## How It Works

1. **Name Day Fetching**: The app attempts to fetch today's Swedish name day from external APIs
2. **Enhanced Data Generation**: Uses historical SCB patterns (2021-2023) to create realistic population distribution
3. **Map Visualization**: Displays interactive markers on Swedish municipalities
4. **User Interaction**: Users can toggle names on/off to filter the map display
5. **Statistics**: Shows real-time statistics about selected names and locations

## Customization

### Current Data Limitations & Solutions

**The Challenge:**
- SCB discontinued name statistics in 2024
- Skatteverket has the data but no public API
- No official source for name distribution by region

**Current Implementation:**
1. **Enhanced Historical Estimates**: Based on SCB data patterns (2021-2023)
2. **Realistic Distribution**: Uses actual Swedish municipality populations
3. **Name Popularity**: Based on historical SCB name frequency data

**Future Integration Options:**
1. **Web Scraping**: Create backend service to scrape Skatteverket
2. **Data Purchase**: Contact Skatteverket for data licensing
3. **Crowdsourced Data**: Build community-contributed dataset

### Styling
The app uses TailwindCSS with Swedish flag colors:
- Swedish Blue: `#006AA7`
- Swedish Yellow: `#FECC02`

Modify `tailwind.config.js` to customize the theme.

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Acknowledgments

- Swedish name day data from traditional Swedish calendar
- OpenStreetMap for map tiles
- Statistics Sweden (SCB) for population data structure reference
- Swedish municipalities coordinate data
