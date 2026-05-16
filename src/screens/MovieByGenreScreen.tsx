import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Movie } from '../types/movie';
import { getMoviesByGenre } from '../services/genre.service';
import { SafeAreaView } from 'react-native-safe-area-context';
import MovieCard from '../components/MovieCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'MovieByGenre'>;

const MovieByGenreScreen = ({route, navigation}:Props) => {
    const { genreId, genreName } = route.params;

    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isRefresh, setIsRefresh] = useState<boolean>(false);

    useEffect(() => {
    fetchMovies(1, false);
  }, []);

  const fetchMovies = async (pageNumber: number, loadMore: boolean) => {
    if (pageNumber === 1) setLoading(true);
    else setLoadingMore(true);

    try {
      const response = await getMoviesByGenre(genreId,pageNumber);
      
      const newMovies = response;

      if (loadMore) {
        setMovies((prev) => [...prev, ...newMovies]);
      } else {
        setMovies(newMovies);
      }
      setError(null);
    } catch (err: any) {
      setError("Gagal memuat film. Ketuk untuk mencoba lagi.");
      console.error("Negative Case Discover:", err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setIsRefresh(false);
    }
  };

  const handleLoadMore = () => {
    if (!loadingMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMovies(nextPage, true);
    }
  };

  const handleRefresh = () => {
    setIsRefresh(true);
    setPage(1);
    fetchMovies(1, false);
  };

  if (loading && page === 1) {
    return (
      <SafeAreaView className="flex-1 bg-[#F1F1F1] justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
        <Text className="font-black mt-4 uppercase">Loading Movies...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-[#F1F1F1] justify-center p-5">
        <View style={[styles.errorCard]} className="bg-[#FF5C5C] p-6">
          <Text style={styles.movieTitle} className="text-center">WADUH ERROR!</Text>
          <Text className="text-center font-bold mt-2">{error}</Text>
          <TouchableOpacity 
            onPress={() => fetchMovies(1, false)}
            style={styles.retryButton}
            className="bg-white p-3 mt-4"
          >
            <Text className="text-center font-black">COBA LAGI</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <View className="px-4 pt-5 flex-1">
        {/* Header Title */}
        <View className="mb-4">
          <Text style={styles.headerSubtitle} className='mt-6'>GENRE / {genreName.toUpperCase()}</Text>
          <Text style={styles.headerTitle}>MOVIES LIST</Text>
        </View>

        {/* List Film */}
        <FlatList
          data={movies}
          keyExtractor={(item,index) => `${item.id}-${index}`}
          renderItem={({ item }) => <MovieCard item={item} />}
          showsVerticalScrollIndicator={false}
          onRefresh={handleRefresh}
          refreshing={isRefresh}
          // Trigger Endless Scroll ketika mendekati bawah layar
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => (
            loadingMore ? (
              <View className="py-4">
                <ActivityIndicator size="small" color="#000" />
              </View>
            ) : <View className="h-20" />
          )}
        />
      </View>
  )
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: '#000',
    letterSpacing: -1,
    marginTop: -5,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#5C7AFF',
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#000',
    lineHeight: 22,
  },
  errorCard: {
    borderWidth: 4,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  retryButton: {
    borderWidth: 2,
    borderColor: '#000',
  }
});

export default MovieByGenreScreen