import ThemedView from "@/components/themedView";
import { useEffect, useState, useCallback, useRef, useMemo } from "react";
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
      {places.map(place => (
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
          data={places}
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



