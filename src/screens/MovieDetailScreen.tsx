import { View, Text, ActivityIndicator, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { getDetailMovie, getReviewsMovie, getTrailerMovie } from '../services/movie.service';
import { MovieDetailType, Reviews, TrailerList } from '../types/movie';
import MovieDetail from '../components/MovieDetail';
import { FontAwesome } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'MovieDetail'>;

const MovieDetailScreen = ({ route, navigation }: Props) => {
  const { movieId } = route.params;

  const [detail, setDetail] = useState<MovieDetailType|undefined>();
  const [trailerId, setTrailerId] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Reviews[]>([]);
  const [reviewPage, setReviewPage] = useState<number>(1);
  
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMoreReviews, setLoadingMoreReviews] = useState<boolean>(false);

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    setLoading(true);
    try {
      const detailRes = await getDetailMovie(movieId);
      setDetail(detailRes);

      const videoRes = await getTrailerMovie(movieId);
      const youtubeTrailer = videoRes.find(
        (vid: TrailerList) => vid.site === 'YouTube' && (vid.type === 'Trailer' || vid.type === 'Teaser')
      );
      if (youtubeTrailer) setTrailerId(youtubeTrailer.key);

      const reviewRes = await getReviewsMovie(movieId,1);
      setReviews(reviewRes);

    } catch (error) {
      console.error("Negative Case Detail:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreReviews = async () => {
    if (loadingMoreReviews) return;
    setLoadingMoreReviews(true);
    try {
      const nextPage = reviewPage + 1;
      const res = await getReviewsMovie(movieId,nextPage);
      
      if (res.length > 0) {
        setReviews((prev) => [...prev, ...res]);
        setReviewPage(nextPage);
      }
    } catch (error) {
      console.error("Gagal load review selanjutnya", error);
    } finally {
      setLoadingMoreReviews(false);
    }
  };

  if (loading) {
    return (
        <ActivityIndicator size="large" color="#000" />
    );
  }
  return (
    <View className='my-5'>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        ListHeaderComponent={<MovieDetail detail={detail} trailerId={trailerId} />}
        renderItem={({ item }) => (
          <View style={styles.brutalCard} className="bg-[#A2FF5C] p-4 mb-4">
            <View className="flex-row items-center mb-2">
              <FontAwesome name="user" size={16} color="black" />
              <Text className="font-black text-sm ml-2">{item.author.toUpperCase()}</Text>
            </View>
            <Text className="text-gray-800 font-bold text-xs leading-4" numberOfLines={5}>
              "{item.content}"
            </Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.brutalCard} className="bg-white p-4 items-center">
            <Text className="font-bold text-gray-500">There are no reviews for this movie yet.</Text>
          </View>
        )}
        onEndReached={fetchMoreReviews}
        onEndReachedThreshold={0.3}
        ListFooterComponent={() => (
          loadingMoreReviews ? <ActivityIndicator size="small" color="#000" className="py-2" /> : null
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  brutalCard: {
    borderWidth: 3,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
});

export default MovieDetailScreen