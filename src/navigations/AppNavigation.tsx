import { RootStackParamList } from '../types/navigation';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GenreScreens from "../screens/GenreScreens";
import MovieByGenreScreen from "../screens/MovieByGenreScreen";
import MovieDetailScreen from '../screens/MovieDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Genre">
			<Stack.Screen name="Genre" component={GenreScreens} />
			<Stack.Screen name="MovieByGenre" component={MovieByGenreScreen} />
			<Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
		</Stack.Navigator>
	);
};

export default AppNavigation;
