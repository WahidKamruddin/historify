import ThemedView from "@/components/themedView";
import { Text } from "@/components/ui/text";

const Explore = () => {
  return (
    <ThemedView>
      <Text>Explore</Text>  
    </ThemedView>
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