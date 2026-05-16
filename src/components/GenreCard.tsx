import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

const BRUTAL_COLORS = ['#FFDE00', '#FF5C5C', '#5CFFB0', '#5C7AFF', '#FFACF2', '#A2FF5C'];

const GenreCard = ({ name, index, id }:{name:string; index:number; id:number}) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const bgColor = BRUTAL_COLORS[index % BRUTAL_COLORS.length];
    
    const rotation = index % 2 === 0 ? '-1deg' : '1deg';
  return (
    <TouchableOpacity 
        style={[
          styles.brutalCard, 
          { backgroundColor: bgColor, transform: [{ rotate: rotation }] }
        ]}
        className="flex-1 m-2 h-32 justify-between p-4"
        onPress={() => navigation.navigate('MovieByGenre', { genreId: id, genreName: name })}
      >
        <MaterialCommunityIcons name="ticket-confirmation-outline" size={32} color="black" />
        <Text style={styles.brutalText} numberOfLines={2}>
          {name.toUpperCase()}
        </Text>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#000',
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: -1,
  },
  brutalCard: {
    backgroundColor: '#FFDE00',
    borderWidth: 3,
    borderColor: '#000',
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 10,
  },
  brutalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default GenreCard