import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity,
  Keyboard 
} from 'react-native';
import Header from '../components/common/Header';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import MovieCard from '../components/home/MovieCard';
import { searchContent, fetchMovies } from '../services/scraper';
import themes from '../styles/themes';
import { SCREENS, ERROR_MESSAGES, CATEGORIES } from '../utils/constants';

export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    loadAllMovies();
  }, []);

  const loadAllMovies = async () => {
    try {
      const movies = await fetchMovies();
      setAllMovies(movies);
      setSearchResults(movies); // Show all movies initially
    } catch (err) {
      console.error('Error loading movies:', err);
      setError(ERROR_MESSAGES.LOADING_ERROR);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setSearchResults(allMovies);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const results = await searchContent(query);
      setSearchResults(results);
    } catch (err) {
      console.error('Search error:', err);
      setError(ERROR_MESSAGES.SEARCH_ERROR);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
    
    let filteredResults = allMovies;
    
    if (category && category !== selectedCategory) {
      filteredResults = allMovies.filter(movie => 
        movie.genre.toLowerCase().includes(category.toLowerCase())
      );
    }
    
    if (searchQuery.trim()) {
      filteredResults = filteredResults.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setSearchResults(filteredResults);
  };

  const handleMoviePress = (movie) => {
    navigation.navigate(SCREENS.DETAILS, { movie });
  };

  const renderMovieItem = ({ item }) => (
    <MovieCard 
      item={item} 
      onPress={handleMoviePress}
      style={styles.gridItem}
    />
  );

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item && styles.categoryButtonActive
      ]}
      onPress={() => handleCategoryFilter(item)}
    >
      <Text style={[
        styles.categoryText,
        selectedCategory === item && styles.categoryTextActive
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const categories = Object.values(CATEGORIES);

  return (
    <View style={styles.container}>
      <Header title="Buscar" />
      
      {/* Search Input */}
      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar filmes e séries..."
          placeholderTextColor={themes.colors.textMuted}
          value={searchQuery}
          onChangeText={handleSearch}
          returnKeyType="search"
          onSubmitEditing={() => Keyboard.dismiss()}
        />
      </View>

      {/* Category Filters */}
      <View style={styles.categoriesSection}>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Results */}
      <View style={styles.resultsSection}>
        {loading ? (
          <LoadingSpinner message="Buscando..." />
        ) : error ? (
          <ErrorMessage 
            message={error} 
            onRetry={() => handleSearch(searchQuery)}
          />
        ) : (
          <>
            <Text style={styles.resultsCount}>
              {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''} encontrado{searchResults.length !== 1 ? 's' : ''}
            </Text>
            
            <FlatList
              data={searchResults}
              renderItem={renderMovieItem}
              keyExtractor={(item) => `search_${item.id}`}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.resultsList}
              columnWrapperStyle={styles.row}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyIcon}>🔍</Text>
                  <Text style={styles.emptyTitle}>Nenhum resultado encontrado</Text>
                  <Text style={styles.emptyMessage}>
                    Tente buscar com palavras diferentes ou explore as categorias
                  </Text>
                </View>
              }
            />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.colors.background,
  },
  searchSection: {
    padding: themes.spacing.medium,
  },
  searchInput: {
    backgroundColor: themes.colors.cardBackground,
    borderRadius: themes.borderRadius.medium,
    paddingHorizontal: themes.spacing.medium,
    paddingVertical: themes.spacing.medium,
    ...themes.typography.body,
    color: themes.colors.text,
    borderWidth: 1,
    borderColor: themes.colors.border,
  },
  categoriesSection: {
    marginBottom: themes.spacing.medium,
  },
  categoriesList: {
    paddingHorizontal: themes.spacing.medium,
  },
  categoryButton: {
    backgroundColor: themes.colors.cardBackground,
    paddingHorizontal: themes.spacing.medium,
    paddingVertical: themes.spacing.small,
    borderRadius: themes.borderRadius.medium,
    marginRight: themes.spacing.small,
    borderWidth: 1,
    borderColor: themes.colors.border,
  },
  categoryButtonActive: {
    backgroundColor: themes.colors.primary,
    borderColor: themes.colors.primary,
  },
  categoryText: {
    ...themes.typography.caption,
    color: themes.colors.textSecondary,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: themes.colors.text,
  },
  resultsSection: {
    flex: 1,
    paddingHorizontal: themes.spacing.medium,
  },
  resultsCount: {
    ...themes.typography.caption,
    color: themes.colors.textMuted,
    marginBottom: themes.spacing.medium,
  },
  resultsList: {
    paddingBottom: themes.spacing.large,
  },
  row: {
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    marginRight: 0,
    marginBottom: themes.spacing.medium,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: themes.spacing.xxl,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: themes.spacing.medium,
  },
  emptyTitle: {
    ...themes.typography.subheader,
    color: themes.colors.text,
    marginBottom: themes.spacing.small,
  },
  emptyMessage: {
    ...themes.typography.body,
    color: themes.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 250,
  },
});
