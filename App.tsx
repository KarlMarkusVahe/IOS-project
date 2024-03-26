import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';
import { API_KEY } from '@env';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      setWeather(response.data);
      setError(null);
    } catch (error) {
      setError('Error fetching weather data');
      setWeather(null);
    }
  };

  const handleSubmit = () => {
    fetchWeather();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Weather App</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, margin: 10, width: 200 }}
        placeholder="Enter city"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Get Weather" onPress={handleSubmit} />
      {weather && (
        <View>
          <Text>{weather.name}, {weather.sys.country}</Text>
          <Text>Temperature: {weather.main.temp}°C</Text>
          <Text>Description: {weather.weather[0].description}</Text>
        </View>
      )}
      {error && <Text>{error}</Text>}
    </View>
  );
}

export default App;