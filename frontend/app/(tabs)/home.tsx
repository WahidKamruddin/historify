import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


const Home = () => {
    const inset = useSafeAreaInsets()
    console.log(inset.top, inset.bottom, typeof (inset.top))
    return (
        <View style={{ paddingTop: inset.top, paddingBottom: inset.bottom }}>
            <Text className='text-white'>hi</Text>
        </View>
    );
}

export default Home;
