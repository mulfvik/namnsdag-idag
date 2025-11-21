import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Info, Loader2 } from 'lucide-react';
import SwedishMap from './components/SwedishMap';
import { getTodaysNames } from './services/nameService';
import { swedishMunicipalities } from './data/swedishData';
import { getEnhancedNameData } from './services/enhancedNameService';
import { explainSparLimitations } from './services/sparService';

function App() {
  const [nameDay, setNameDay] = useState(null);
  const [nameData, setNameData] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Get today's names
        const todaysNames = await getTodaysNames();
        setNameDay(todaysNames);
        
        // Get enhanced population data for these names
        const enhancedData = await getEnhancedNameData(todaysNames.names, swedishMunicipalities);
        setNameData(enhancedData.data);
        setDataSource(enhancedData);
        
        // Select all names by default
        setSelectedNames(todaysNames.names);
        
      } catch (err) {
        setError('Kunde inte ladda data');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const toggleName = (name) => {
    setSelectedNames(prev => 
      prev.includes(name) 
        ? prev.filter(n => n !== name)
        : [...prev, name]
    );
  };

  const getTotalCount = () => {
    return nameData
      .filter(item => selectedNames.includes(item.name))
      .reduce((sum, item) => sum + item.count, 0);
  };

  const getUniqueLocations = () => {
    const locations = new Set(
      nameData
        .filter(item => selectedNames.includes(item.name))
        .map(item => item.municipality)
    );
    return locations.size;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-swedish-blue to-blue-800 flex items-center justify-center">
        <div className="text-center text-white">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
          <p className="text-xl">Laddar namnsdag...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-xl">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-swedish-blue to-blue-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between flex-wrap gap-3 md:gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              <div>
                <h1 className="text-xl md:text-2xl font-bold">Dagens Namn</h1>
                <p className="text-blue-100 text-xs md:text-sm">
                  Geografisk fördelning av svenska namn
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 md:gap-4 flex-wrap">
              {/* Name Checkboxes */}
              {nameDay && (
                <div className="flex items-center gap-2 md:gap-3">
                  {nameDay.names.map((name, index) => (
                    <div key={name} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        id={`header-name-${index}`}
                        checked={selectedNames.includes(name)}
                        onChange={() => toggleName(name)}
                        className="w-3 h-3 text-swedish-blue rounded focus:ring-swedish-blue"
                      />
                      <label 
                        htmlFor={`header-name-${index}`}
                        className="text-xs md:text-sm font-medium cursor-pointer hover:text-blue-200 whitespace-nowrap"
                      >
                        {name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="text-right text-xs border-l border-blue-400 pl-2 md:pl-3">
                <p className="text-blue-100 font-medium">
                  {new Date().toLocaleDateString('sv-SE', { 
                    day: 'numeric', 
                    month: 'short'
                  })}
                </p>
                {nameDay && dataSource && (
                  <div className="text-blue-200 mt-1">
                    <p>Data: Historiska SCB-mönster</p>
                    {dataSource.scbStatus && !dataSource.scbStatus.available && (
                      <p className="text-yellow-200">⚠️ SCB avslutad 2024</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 min-h-[calc(100vh-120px)] lg:h-[calc(100vh-120px)]">
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4 lg:order-1 order-2">
            
            {/* Statistics */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-base font-bold mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-swedish-blue" />
                Statistik
              </h3>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Valda namn:</span>
                  <span className="font-semibold">{selectedNames.length}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Totalt antal:</span>
                  <span className="font-semibold">{getTotalCount().toLocaleString('sv-SE')}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Kommuner:</span>
                  <span className="font-semibold">{getUniqueLocations()}</span>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-swedish-blue mt-0.5" />
                <div className="text-xs text-gray-700">
                  <p className="font-medium mb-1">Om kartan</p>
                  <p className="mb-2">
                    Kartan visar uppskattade antal personer med dagens namnsdag 
                    i olika svenska kommuner.
                  </p>
                  {dataSource && (
                    <div className="text-xs text-gray-600 border-t pt-1">
                      <p className="font-medium">Datakällor:</p>
                      <p>• Historiska SCB-mönster (2021-2023)</p>
                      <p>• SPAR: Ej tillgängligt (integritet)</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="bg-white rounded-lg shadow-md h-[75vh] lg:h-full overflow-hidden">
              <div className="h-full">
                <SwedishMap 
                  nameData={nameData} 
                  selectedNames={selectedNames}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
