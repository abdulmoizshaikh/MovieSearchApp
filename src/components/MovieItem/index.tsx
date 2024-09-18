import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {MovieItemProps} from 'src/types';
import {useDispatch, useSelector} from 'react-redux';
import {toggleFavorite} from '../../store/movieSlice';
import {RootState} from '../../store';
import styles from './styles';

const MovieItem: React.FC<MovieItemProps> = React.memo(({movie}) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.movies.favorites);

  if (!movie) {
    return null;
  }

  const posterUrl =
    movie.Poster && movie.Poster !== 'N/A'
      ? {uri: movie.Poster}
      : require('../../assets/placeholder.png');

  const movieTitle = movie.Title || 'Untitled';
  const movieYear = movie.Year || 'Unknown Year';

  const isFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);

  const handleFavoriteToggle = () => {
    dispatch(toggleFavorite(movie));
  };

  return (
    <TouchableOpacity style={styles.container}>
      <Image source={posterUrl} style={styles.poster} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{movieTitle}</Text>
        <Text style={styles.year}>{movieYear}</Text>
      </View>
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={handleFavoriteToggle}>
        <Icon
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={24}
          color={isFavorite ? 'red' : 'gray'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
});

export default MovieItem;
