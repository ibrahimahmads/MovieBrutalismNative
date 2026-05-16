import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Movie } from '../types/movie';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

const IMAGE_URL = process.env.EXPO_PUBLIC_IMAGE_BASE_URL;

const MovieCard = ({ item }: { item: Movie }) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity style={styles.movieCard} className="flex-row p-3 mb-4 bg-white"
      onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}
    >
        {/* Poster Film */}
        <View>
          {item.poster_path ? (
            <Image 
              source={{ uri: `${IMAGE_URL}${item.poster_path}` }} 
              style={styles.posterWrapper}
              className="w-24 h-36"
              resizeMode="cover"
            />
          ) : (
            <View className="w-24 h-36 bg-gray-300 justify-center items-center">
              <Text className="text-xs font-bold text-center p-2">NO IMAGE</Text>
            </View>
          )}
        </View>

        {/* Info Film */}
        <View className="flex-1 ml-4 justify-between py-1">
          <View>
            <Text style={styles.movieTitle} numberOfLines={2}>
              {item.title.toUpperCase()}
            </Text>
            <Text className="text-gray-600 font-bold mt-1 text-xs">
              RELEASE: {item.release_date || 'N/A'}
            </Text>
            <Text className="text-gray-600 font-bold mt-1 text-xs" numberOfLines={3}>
              Synopsis: {item.overview || 'N/A'}
            </Text>
          </View>

          {/* Rating Badge (Neubrutalism Style) */}
          <View style={styles.ratingBadge} className="flex-row items-center self-start px-2 py-1 bg-[#5C7AFF] mt-2">
            <FontAwesome name="star" size={24} color="orange" />
            <Text className="font-black text-xs ml-1 text-orange-400">
              {item.vote_average.toFixed(1)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  movieCard: {
    borderWidth: 3,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  posterWrapper: {
    borderWidth: 2,
    borderColor: '#000',
    overflow: 'hidden',
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#000',
    lineHeight: 22,
  },
  ratingBadge: {
    borderWidth: 2,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
});

export default MovieCard