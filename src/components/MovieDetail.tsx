import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import YoutubePlayer from 'react-native-youtube-iframe';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { MovieDetailType } from '../types/movie';

const IMAGE_URL = process.env.EXPO_PUBLIC_IMAGE_BASE_URL;

interface MovieDetailProps {
  detail: MovieDetailType|undefined;
  trailerId: string | null;
}

const MovieDetail = ({ detail, trailerId }: MovieDetailProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View className='my-5'>
      {/* Tombol Back */}
      <TouchableOpacity 
        style={styles.brutalBadge} 
        className="bg-white p-3 self-start mb-4 flex-row items-center"
        onPress={() => navigation.goBack()}
      >
        <FontAwesome name="arrow-left" size={20} color="black" />
        <Text className="font-black ml-2 text-xs">BACK</Text>
      </TouchableOpacity>

      {/* Trailer Section */}
      <Text style={styles.sectionTitle}>TRAILER WATCH</Text>
      <View style={styles.brutalCard} className="bg-black mb-6 overflow-hidden">
        {trailerId ? (
          <YoutubePlayer height={200} play={false} videoId={trailerId} />
        ) : (
          <View className="h-48 justify-center items-center bg-gray-800">
            <Text className="text-white font-bold uppercase">Trailer Not Available</Text>
          </View>
        )}
      </View>

      {/* Detail Konten */}
      <View style={styles.brutalCard} className="bg-white p-4 mb-6">
        <View className="flex-row">
          <Image 
            source={{ uri: `${IMAGE_URL}${detail?.poster_path}` }} 
            style={styles.poster}
            className="w-28 h-40"
          />
          <View className="flex-1 ml-4 justify-between">
            <View>
              <Text style={styles.movieTitle}>{detail?.title?.toUpperCase()}</Text>
              <Text className="text-gray-600 font-bold mt-1 text-xs">RELEASE: {detail?.release_date}</Text>
              <View className="flex-row flex-wrap gap-2 mt-2">
              {detail?.genres?.map((genre: { id: number; name: string }) => (
                <TouchableOpacity
                  key={genre.id}
                  style={styles.genreBadge}
                  className="bg-[#FFACF2] px-2 py-1"
                  onPress={() => {
                    navigation.navigate('MovieByGenre', {
                      genreId: genre.id,
                      genreName: genre.name,
                    });
                  }}
                >
                  <Text className="font-black text-[10px] color-black uppercase">
                    {genre.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            </View>
            
            <View style={styles.brutalBadge} className="bg-[#FFDE00] flex-row items-center px-2 py-1 self-start mt-2">
              <FontAwesome name="star" size={14} color="orange" />
              <Text className="font-black text-xs ml-1">{detail?.vote_average?.toFixed(1)}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle} className="mt-4 mb-1">SYNOPSIS</Text>
        <Text className="text-gray-800 font-medium leading-5 text-sm text-justify">
          {detail?.overview || 'Tidak ada sinopsis untuk film ini.'}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>USER REVIEWS</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#000',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  movieTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#000',
    lineHeight: 26,
  },
  brutalCard: {
    borderWidth: 3,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  brutalBadge: {
    borderWidth: 2,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  poster: {
    borderWidth: 2,
    borderColor: '#000',
  },
  genreBadge: {
    borderWidth: 2,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
});

export default MovieDetail