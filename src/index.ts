import config from './config';
import axios from 'axios';

// sample dataset
let inputData: Array<location> = [
  { location_name: 'Los Angeles', postal_code: '90001' },
  { location_name: 'Washington', postal_code: '20001' },
  { location_name: 'Atlanta', postal_code: '30301' },
  { location_name: 'New York', postal_code: '10001' },
  { location_name: 'Oxford', postal_code: '27565' },
  { location_name: 'Newport', postal_code: '02840' },
  { location_name: 'Camden', postal_code: '29020' },
  { location_name: 'Killington', postal_code: '05751' },
  { location_name: 'Altavista', postal_code: '24517' },
  { location_name: 'Beaver', postal_code: '25813' },
];

interface location {
  location_name: string,
  postal_code: string | number,
  weather?: string,
  current_time?: string
}

const fetchWeatherData = async (locationInput: location) : Promise<location|null> => {
  try {
    const url: string = `${config.API_ENDPOINT}?key=${config.API_KEY}&format=json&num_of_days=0&q=${locationInput.postal_code}&extra=localObsTime`;
    const { status, data } = await axios.get(url);
    if (status === 200 && data.data.error !== 'undefined') {
      return { ...locationInput, weather: data.data.current_condition[0].weatherDesc[0].value, current_time: data.data.current_condition[0].localObsDateTime };
    }
    
    return null;
  } catch (e) {
    return null;
  }
}

for (const input of inputData) {
  (async () => {
    const response: location | null = await fetchWeatherData(input);
    if (response !== null) {
      console.log(response);
    }
  })();
}