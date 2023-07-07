// Helper function to get the Name of the city.
const apiUrl = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2';

export const getCityName = async (latitude, longitude) => {
  try {
    const url = `${apiUrl}&lat=${latitude}&lon=${longitude}`;
    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200 && data.address.city) {
      setCity(data.address.city);
      return data?.address?.city;
    } else if (response.status === 200 && data.address.county) {
      const tahsilName = data?.address?.county.split(' ');
      console.log('Tahsil Name ---> ', tahsilName[0]);
      return tahsilName[0];
    } else {
      console.log('City not found --> ', latitude, longitude);
      return null;
    }
  } catch (error) {
    console.log('Error while getting city Name -->', error);
  }
};

// Helper function to calculate the Distance.
//   calculating the distance based on the longitude and latitude
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  console.log('Calculation functio arguments --> ', lat1, lon1, lat2, lon2);
  const earthRadius = 6371; // Earth's radius in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return distance; // Distance in kilometers
};

const deg2rad = degrees => {
  return degrees * (Math.PI / 180);
};

// calculate points function is here
const calculatePoints = (latitude, longitude, distance) => {
  if (distance >= 0.001) {
    setPoints(points + 1);
    setTimeAndPoints([
      ...timeAndPoints,
      {
        time: Date.now(),
        points: points,
      },
    ]);
  } else return;
};
