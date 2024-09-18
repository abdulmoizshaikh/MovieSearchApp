import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 8,
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    alignItems: 'center',
  },
  poster: {
    width: 80,
    height: 120,
    marginRight: 16,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
    color: '#333',
  },
  year: {
    color: '#777',
    fontSize: 14,
  },
  favoriteButton: {
    marginLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 24,
  },
});

export default styles;
