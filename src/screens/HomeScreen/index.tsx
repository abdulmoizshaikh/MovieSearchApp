import React, {useEffect, useState, useMemo} from 'react';
import {View, TextInput} from 'react-native';
import {useDispatch} from 'react-redux';
import {debounce} from 'lodash';
import {fetchMovies} from '../../utils/api';
import MovieList from '../../components/MovieList';
import styles from './styles';
import {setSearchTerm} from '../../store/movieSlice';
import {AppDispatch} from '../../store';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchText, setSearchText] = useState('');

  const debouncedSearch = useMemo(
    () =>
      debounce((text: string) => {
        dispatch(setSearchTerm(text));
        dispatch(fetchMovies({searchTerm: text, page: 1}));
      }, 500),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    if (searchText) {
      debouncedSearch(searchText);
    }
    return () => {
      debouncedSearch.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for movies..."
        placeholderTextColor="#888"
        onChangeText={setSearchText}
        value={searchText}
      />
      <MovieList />
    </View>
  );
};

export default HomeScreen;
