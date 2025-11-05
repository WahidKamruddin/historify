import ThemedView from "@/components/themedView";
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import useLocation from "@/hooks/useLocation";
import { getNearbyPlaces } from "@/api/exploreApi";

export default function ExploreScreen() {
  const { location, error } = useLocation();
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location) {
      setLoading(true);
      getNearbyPlaces(location.lat, location.lng)
        .then(data => setPlaces(data))
        .finally(() => setLoading(false));
    }
  }, [location]);

  if (error) return <View style={styles.center}><Text>{error}</Text></View>;
  if (!location || loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      {places.map(place => (
        <Marker
          key={place.place_id}
          coordinate={{ latitude: place.lat, longitude: place.lng }}
          title={place.name}
          description={place.address}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});



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