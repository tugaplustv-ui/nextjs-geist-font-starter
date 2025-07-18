import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity,
  Alert 
} from 'react-native';
import Header from '../components/common/Header';
import MovieCard from '../components/home/MovieCard';
import themes from '../styles/themes';
import { SCREENS } from '../utils/constants';

export default function DownloadsScreen({ navigation }) {
  const [downloads, setDownloads] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Simulate some downloaded content
    loadDownloads();
  }, []);

  const loadDownloads = () => {
    // This would normally load from local storage or database
    const sampleDownloads = [
      {
        id: 'download_1',
        title: 'Filme de Exemplo',
        posterUrl: 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=Download+1',
        description: 'Este é um filme baixado para visualização offline.',
        year: '2024',
        genre: 'Ação',
        type: 'movie',
        rating: '8.5',
        duration: '2h 15min',
        quality: 'HD',
        language: 'PT',
        downloadDate: new Date().toISOString(),
        fileSize: '1.2 GB',
        downloadProgress: 100,
      },
      {
        id: 'download_2',
        title: 'Série Exemplo - S01E01',
        posterUrl: 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=Download+2',
        description: 'Primeiro episódio da primeira temporada.',
        year: '2024',
        genre: 'Drama',
        type: 'series',
        rating: '9.0',
        duration: '45min',
        quality: 'HD',
        language: 'PT',
        downloadDate: new Date().toISOString(),
        fileSize: '800 MB',
        downloadProgress: 100,
      },
    ];
    
    setDownloads(sampleDownloads);
  };

  const handleMoviePress = (movie) => {
    if (editMode) {
      toggleSelection(movie.id);
    } else {
      navigation.navigate(SCREENS.DETAILS, { movie });
    }
  };

  const toggleSelection = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleDelete = () => {
    if (selectedItems.length === 0) {
      Alert.alert('Seleção', 'Selecione itens para excluir.');
      return;
    }

    Alert.alert(
      'Excluir Downloads',
      `Deseja excluir ${selectedItems.length} item(ns) selecionado(s)?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: () => {
            setDownloads(prev => 
              prev.filter(item => !selectedItems.includes(item.id))
            );
            setSelectedItems([]);
            setEditMode(false);
          }
        }
      ]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === downloads.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(downloads.map(item => item.id));
    }
  };

  const renderDownloadItem = ({ item }) => (
    <View style={styles.downloadItem}>
      <MovieCard 
        item={item} 
        onPress={handleMoviePress}
        style={[
          styles.movieCard,
          selectedItems.includes(item.id) && styles.selectedCard
        ]}
      />
      
      <View style={styles.downloadInfo}>
        <Text style={styles.downloadTitle} numberOfLines={2}>
          {item.title}
        </Text>
        
        <View style={styles.downloadMeta}>
          <Text style={styles.downloadSize}>{item.fileSize}</Text>
          <Text style={styles.downloadDate}>
            Baixado em {new Date(item.downloadDate).toLocaleDateString('pt-BR')}
          </Text>
        </View>
        
        {item.downloadProgress < 100 && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${item.downloadProgress}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>{item.downloadProgress}%</Text>
          </View>
        )}
      </View>
      
      {editMode && (
        <TouchableOpacity
          style={styles.selectionButton}
          onPress={() => toggleSelection(item.id)}
        >
          <Text style={styles.selectionIcon}>
            {selectedItems.includes(item.id) ? '✓' : '○'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerActions}>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => setEditMode(!editMode)}
      >
        <Text style={styles.actionButtonText}>
          {editMode ? 'Cancelar' : 'Editar'}
        </Text>
      </TouchableOpacity>
      
      {editMode && (
        <>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleSelectAll}
          >
            <Text style={styles.actionButtonText}>
              {selectedItems.length === downloads.length ? 'Desmarcar Todos' : 'Selecionar Todos'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={handleDelete}
          >
            <Text style={[styles.actionButtonText, styles.deleteButtonText]}>
              Excluir ({selectedItems.length})
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Downloads" />
      
      {downloads.length > 0 ? (
        <>
          {renderHeader()}
          <FlatList
            data={downloads}
            renderItem={renderDownloadItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.downloadsList}
            showsVerticalScrollIndicator={false}
          />
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📥</Text>
          <Text style={styles.emptyTitle}>Nenhum download</Text>
          <Text style={styles.emptyMessage}>
            Seus downloads aparecerão aqui para visualização offline
          </Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => navigation.navigate(SCREENS.HOME)}
          >
            <Text style={styles.browseButtonText}>Explorar Conteúdo</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.colors.background,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: themes.spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: themes.colors.border,
  },
  actionButton: {
    paddingHorizontal: themes.spacing.medium,
    paddingVertical: themes.spacing.small,
    borderRadius: themes.borderRadius.small,
    backgroundColor: themes.colors.cardBackground,
  },
  deleteButton: {
    backgroundColor: themes.colors.error,
  },
  actionButtonText: {
    ...themes.typography.caption,
    color: themes.colors.text,
    fontWeight: '500',
  },
  deleteButtonText: {
    color: themes.colors.text,
  },
  downloadsList: {
    padding: themes.spacing.medium,
  },
  downloadItem: {
    flexDirection: 'row',
    marginBottom: themes.spacing.large,
    backgroundColor: themes.colors.cardBackground,
    borderRadius: themes.borderRadius.medium,
    padding: themes.spacing.medium,
    position: 'relative',
  },
  movieCard: {
    width: 80,
    height: 120,
    marginRight: 0,
  },
  selectedCard: {
    opacity: 0.7,
    borderWidth: 2,
    borderColor: themes.colors.primary,
  },
  downloadInfo: {
    flex: 1,
    marginLeft: themes.spacing.medium,
    justifyContent: 'space-between',
  },
  downloadTitle: {
    ...themes.typography.title,
    color: themes.colors.text,
    marginBottom: themes.spacing.small,
  },
  downloadMeta: {
    marginBottom: themes.spacing.small,
  },
  downloadSize: {
    ...themes.typography.caption,
    color: themes.colors.primary,
    fontWeight: 'bold',
    marginBottom: themes.spacing.xs,
  },
  downloadDate: {
    ...themes.typography.caption,
    color: themes.colors.textMuted,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: themes.colors.border,
    borderRadius: 2,
    marginRight: themes.spacing.small,
  },
  progressFill: {
    height: '100%',
    backgroundColor: themes.colors.primary,
    borderRadius: 2,
  },
  progressText: {
    ...themes.typography.caption,
    color: themes.colors.text,
    minWidth: 35,
  },
  selectionButton: {
    position: 'absolute',
    top: themes.spacing.small,
    right: themes.spacing.small,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: themes.colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectionIcon: {
    color: themes.colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: themes.spacing.large,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: themes.spacing.large,
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
    marginBottom: themes.spacing.large,
    lineHeight: 22,
  },
  browseButton: {
    backgroundColor: themes.colors.primary,
    paddingHorizontal: themes.spacing.large,
    paddingVertical: themes.spacing.medium,
    borderRadius: themes.borderRadius.medium,
  },
  browseButtonText: {
    ...themes.typography.button,
    color: themes.colors.text,
  },
});
