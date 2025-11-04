import { View, Text } from 'react-native'
import React from 'react'

const Explore = () => {
  return (
    <View>
      <Text>Explore</Text>  
    </View>
  )
}

export default Explore 


/*

Psuedocode:

getLocation()


//Google Maps API Text Search
const request = {
    textQuery: query,
    fields: ['displayName', 'location', 'businessStatus'],
    includedType: '', // Restrict query to a specific type (leave blank for any).
    useStrictTypeFiltering: true,
    locationBias: map.center,
    isOpenNow: true,
    language: 'en-US',
    maxResultCount: 8,
    minRating: 1, // Specify a minimum rating.
    region: 'us',
};


const { places } = await Place.searchByText(request);

for (const id in places) {
            markers[id].map = <Place Component>;
        }; 


*/