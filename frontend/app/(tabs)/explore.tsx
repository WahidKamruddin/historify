import ThemedView from "@/components/themedView";
import React, { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import useLocation from "@/hooks/useLocation";
import { getNearbyPlaces } from "@/api/exploreApi";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";



export default function ExploreScreen() {
  const { location, error } = useLocation();
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const sheetRef = useRef<BottomSheet>(null);


  // variables
  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

   // callbacks
   const handleSheetChange = useCallback((index: any) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  // render
  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <View className="gap-2 p-4">
        <Text className="text-3xl">{item.name}</Text>
        <Text className="text-xl">{item.address}</Text>
        <Text>Lat: {item.lat}, Long: {item.lng}</Text>
      </View>
    ),
    []
  );

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




  //development list:
  const placesList = [
    {
      "place_id": 1,
      "lat": 40.7580,
      "lng": -73.9855,
      "name": "Times Square",
      "address": "Times Square, Manhattan, NY 10036"
    },
    {
      "place_id": 2,
      "lat": 40.7061,
      "lng": -73.9969,
      "name": "Brooklyn Bridge",
      "address": "Brooklyn Bridge, Brooklyn, NY 11201"
    },
    {
      "place_id": 3,
      "lat": 40.6602,
      "lng": -73.9690,
      "name": "Prospect Park",
      "address": "Prospect Park, Brooklyn, NY 11225"
    },
    {
      "place_id": 4,
      "lat": 40.6892,
      "lng": -74.0445,
      "name": "Statue of Liberty",
      "address": "Liberty Island, New York, NY 10004"
    },
    {
      "place_id": 5,
      "lat": 40.8296,
      "lng": -73.9262,
      "name": "Yankee Stadium",
      "address": "1 E 161 St, The Bronx, NY 10451"
    },
    {
      "place_id": 6,
      "lat": 40.7812,
      "lng": -73.9665,
      "name": "Central Park",
      "address": "Central Park, New York, NY 10024"
    },
    {
      "place_id": 7,
      "lat": 40.7484,
      "lng": -73.9857,
      "name": "Empire State Building",
      "address": "20 W 34th St, New York, NY 10001"
    },
    {
      "place_id": 8,
      "lat": 40.7527,
      "lng": -73.9772,
      "name": "Grand Central Terminal",
      "address": "89 E 42nd St, New York, NY 10017"
    },
    {
      "place_id": 9,
      "lat": 40.7060,
      "lng": -74.0086,
      "name": "Wall Street",
      "address": "Wall St, New York, NY 10005"
    },
    {
      "place_id": 10,
      "lat": 40.7505,
      "lng": -73.9934,
      "name": "Madison Square Garden",
      "address": "4 Pennsylvania Plaza, New York, NY 10001"
    }
  ]

  return (
    <GestureHandlerRootView>
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      {places? places : placesList.map(place => (
        <Marker
          key={place.place_id}
          coordinate={{ latitude: place.lat, longitude: place.lng }}
          title={place.name}
          description={place.address}
        />
      ))}
    </MapView>
    <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        onChange={handleSheetChange}
      >
        <BottomSheetFlatList
          data={placesList}
          keyExtractor={(i: { place_id: number }) => i.place_id}
          renderItem={renderItem}
        />
      </BottomSheet>
    </GestureHandlerRootView>
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