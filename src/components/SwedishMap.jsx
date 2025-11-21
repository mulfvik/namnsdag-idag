import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Component to fit map bounds to markers
const FitBounds = ({ bounds }) => {
  const map = useMap();
  
  useEffect(() => {
    if (bounds && bounds.length > 0) {
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [map, bounds]);
  
  return null;
};

const SwedishMap = ({ nameData, selectedNames }) => {
  const [bounds, setBounds] = useState([]);
  
  // Filter data based on selected names
  const filteredData = nameData.filter(item => 
    selectedNames.length === 0 || selectedNames.includes(item.name)
  );
  
  // Calculate bounds for filtered data
  useEffect(() => {
    if (filteredData.length > 0) {
      const newBounds = filteredData.map(item => [item.lat, item.lng]);
      setBounds(newBounds);
    }
  }, [filteredData]);
  
  // Calculate marker size based on count
  const getMarkerSize = (count) => {
    const minSize = 8;
    const maxSize = 40;
    const maxCount = Math.max(...filteredData.map(item => item.count));
    const size = minSize + (count / maxCount) * (maxSize - minSize);
    return Math.max(minSize, size);
  };
  
  // Get color based on name
  const getMarkerColor = (name) => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
    ];
    const index = selectedNames.indexOf(name);
    return colors[index % colors.length] || '#FF6B6B';
  };
  
  // Sweden center coordinates
  const swedenCenter = [62.0, 15.0];
  
  return (
    <div className="h-full w-full relative">
      <MapContainer
        center={swedenCenter}
        zoom={5}
        className="h-full w-full"
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {filteredData.map((item, index) => (
          <CircleMarker
            key={`${item.municipality}-${item.name}-${index}`}
            center={[item.lat, item.lng]}
            radius={getMarkerSize(item.count)}
            pathOptions={{
              fillColor: getMarkerColor(item.name),
              color: '#fff',
              weight: 2,
              opacity: 1,
              fillOpacity: 0.7
            }}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-bold text-lg">{item.municipality}</h3>
                <p className="text-sm text-gray-600">
                  Namn: <span className="font-semibold">{item.name}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Uppskattade antal: <span className="font-semibold">{item.count}</span>
                </p>
                <p className="text-xs text-gray-500">
                  Befolkning: {item.population.toLocaleString('sv-SE')}
                </p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
        
        <FitBounds bounds={bounds} />
      </MapContainer>
      
      {filteredData.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
          <div className="text-center">
            <p className="text-lg">Ingen data att visa</p>
            <p className="text-sm">Välj namn från listan ovan</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwedishMap;
