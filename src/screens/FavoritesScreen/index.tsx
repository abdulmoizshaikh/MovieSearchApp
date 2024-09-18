import React from 'react';
import {FlatList, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import MovieItem from '../../components/MovieItem';

const FavoritesScreen: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.movies.favorites);

  return (
    <View>
      <FlatList
        data={favorites}
        keyExtractor={item => item.imdbID}
        renderItem={({item}) => <MovieItem movie={item} />}
      />
    </View>
  );
};

export default FavoritesScreen;
