import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Genres } from '../types/movie'
import { getGenres } from '../services/genre.service';
import GenreCard from '../components/GenreCard';

const GenreScreens = () => {
    const [genres,setGenres] = useState<Genres>();
    const fetchGenres = async () => {
    try {
        const response = await getGenres();
        setGenres(response);
        } catch (error) {
        console.error("Negative Case: Gagal ambil data", error);
        }
    };
    useEffect(()=>{
        fetchGenres();
    },[])
  return (
    <View className="px-3 pt-5">
        <View className="px-2 mt-8">
          <Text className='font-bold text-2xl text-black mb-4 mt-5'>CHOOSE GENRE</Text>
        </View>
        
        <FlatList
          data={genres?.genres}
          numColumns={2}
          keyExtractor={(item,index) => `${item.id}-${index}`}
          renderItem={({ item, index }) => (
            <GenreCard name={item.name} index={index} id={item.id} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 150 }}
        />
      </View>
  )
}

export default GenreScreens