import React from 'react';
import {FlatList, ActivityIndicator, Text, View} from 'react-native';
import MovieItem from '../MovieItem';
import {useSelector, useDispatch} from 'react-redux';
import {AppDispatch, RootState} from '../../store';
import {fetchMovies} from '../../utils/api';
import {Movie} from 'src/types';

const MovieList: React.FC = () => {
  const {movies, loading, error, page, searchTerm} = useSelector(
    (state: RootState) => state.movies,
  );
  const dispatch = useDispatch<AppDispatch>();

  const loadMoreMovies = () => {
    if (!loading && searchTerm) {
      dispatch(fetchMovies({searchTerm, page}));
    }
  };

  const renderItem = ({item}: {item: Movie}) => <MovieItem movie={item} />;

  if (loading && movies.length === 0) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (movies.length === 0) {
    return (
      <View>
        <Text>No movies found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={movies}
      keyExtractor={item => item.imdbID}
      renderItem={renderItem}
      onEndReached={loadMoreMovies}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loading ? <ActivityIndicator size="small" /> : null}
    />
  );
};

export default MovieList;
