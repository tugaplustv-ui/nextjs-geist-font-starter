import React, { useState } from 'react';
import { 
  View, 
  ScrollView, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet,
  Dimensions,
  Alert 
} from 'react-native';
import VideoPlayer from '../components/player/VideoPlayer';
import themes from '../styles/themes';

const { width, height } = Dimensions.get('window');

export default function DetailsScreen({ route, navigation }) {
  const { movie } = route.params;
  const [playing, setPlaying] = useState(false);

  const handlePlayVideo = () => {
    if (movie.videoUrl) {
      setPlaying(true);
    } else {
      Alert.alert(
        'Vídeo Indisponível',
        'Este conteúdo não está disponível para reprodução no momento.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleCloseVideo = () => {
    setPlaying(false);
  };

  const handleDownload = () => {
    Alert.alert(
      'Download',
      'Funcionalidade de download será implementada em breve.',
      [{ text: 'OK' }]
    );
  };

  const handleAddToList = () => {
    Alert.alert(
      'Minha Lista',
      'Item adicionado à sua lista!',
      [{ text: 'OK' }]
    );
  };

  if (playing) {
    return (
      <VideoPlayer
        videoUrl={movie.videoUrl}
        title={movie.title}
        onClose={handleCloseVideo}
      />
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image
            source={{ uri: movie.posterUrl }}
            style={styles.posterImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay}>
            <View style={styles.heroContent}>
              <Text style={styles.title}>{movie.title}</Text>
              
              <View style={styles.metadata}>
                {movie.year && (
                  <Text style={styles.metadataText}>{movie.year}</Text>
                )}
                {movie.genre && (
                  <>
                    <Text style={styles.separator}>•</Text>
                    <Text style={styles.metadataText}>{movie.genre}</Text>
                  </>
                )}
                {movie.duration && (
                  <>
                    <Text style={styles.separator}>•</Text>
                    <Text style={styles.metadataText}>{movie.duration}</Text>
                  </>
                )}
                {movie.quality && (
                  <>
                    <Text style={styles.separator}>•</Text>
                    <Text style={styles.qualityText}>{movie.quality}</Text>
                  </>
                )}
              </View>

              {movie.rating && (
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingIcon}>⭐</Text>
                  <Text style={styles.rating}>{movie.rating}</Text>
                  <Text style={styles.ratingOutOf}>/10</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <TouchableOpacity 
            style={styles.playButton} 
            onPress={handlePlayVideo}
          >
            <Text style={styles.playButtonText}>▶ Assistir</Text>
          </TouchableOpacity>
          
          <View style={styles.secondaryActions}>
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={handleAddToList}
            >
              <Text style={styles.actionButtonText}>+ Minha Lista</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={handleDownload}
            >
              <Text style={styles.actionButtonText}>📥 Download</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Description Section */}
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>Sinopse</Text>
          <Text style={styles.description}>{movie.description}</Text>
        </View>

        {/* Details Section */}
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Detalhes</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tipo:</Text>
            <Text style={styles.detailValue}>
              {movie.type === 'series' ? 'Série' : 'Filme'}
            </Text>
          </View>
          
          {movie.genre && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Gênero:</Text>
              <Text style={styles.detailValue}>{movie.genre}</Text>
            </View>
          )}
          
          {movie.year && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Ano:</Text>
              <Text style={styles.detailValue}>{movie.year}</Text>
            </View>
          )}
          
          {movie.duration && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Duração:</Text>
              <Text style={styles.detailValue}>{movie.duration}</Text>
            </View>
          )}
          
          {movie.language && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Idioma:</Text>
              <Text style={styles.detailValue}>{movie.language}</Text>
            </View>
          )}
          
          {movie.quality && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Qualidade:</Text>
              <Text style={styles.detailValue}>{movie.quality}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    height: height * 0.4,
    position: 'relative',
  },
  posterImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: themes.spacing.large,
  },
  heroContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    ...themes.typography.heroTitle,
    color: themes.colors.text,
    marginBottom: themes.spacing.small,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: themes.spacing.small,
    flexWrap: 'wrap',
  },
  metadataText: {
    ...themes.typography.body,
    color: themes.colors.textSecondary,
  },
  separator: {
    ...themes.typography.body,
    color: themes.colors.textMuted,
    marginHorizontal: themes.spacing.small,
  },
  qualityText: {
    ...themes.typography.body,
    color: themes.colors.primary,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    fontSize: 16,
    marginRight: themes.spacing.xs,
  },
  rating: {
    ...themes.typography.title,
    color: themes.colors.text,
    fontWeight: 'bold',
  },
  ratingOutOf: {
    ...themes.typography.body,
    color: themes.colors.textSecondary,
  },
  actionsSection: {
    padding: themes.spacing.large,
  },
  playButton: {
    backgroundColor: themes.colors.primary,
    paddingVertical: themes.spacing.medium,
    borderRadius: themes.borderRadius.medium,
    alignItems: 'center',
    marginBottom: themes.spacing.medium,
  },
  playButtonText: {
    ...themes.typography.button,
    color: themes.colors.text,
    fontSize: 18,
  },
  secondaryActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: themes.colors.cardBackground,
    paddingVertical: themes.spacing.medium,
    paddingHorizontal: themes.spacing.large,
    borderRadius: themes.borderRadius.medium,
    flex: 0.48,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: themes.colors.border,
  },
  actionButtonText: {
    ...themes.typography.button,
    color: themes.colors.text,
    fontSize: 14,
  },
  descriptionSection: {
    padding: themes.spacing.large,
    paddingTop: 0,
  },
  sectionTitle: {
    ...themes.typography.subheader,
    color: themes.colors.text,
    marginBottom: themes.spacing.medium,
  },
  description: {
    ...themes.typography.body,
    color: themes.colors.textSecondary,
    lineHeight: 22,
  },
  detailsSection: {
    padding: themes.spacing.large,
    paddingTop: 0,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: themes.spacing.small,
    alignItems: 'center',
  },
  detailLabel: {
    ...themes.typography.body,
    color: themes.colors.textMuted,
    width: 80,
    fontWeight: '500',
  },
  detailValue: {
    ...themes.typography.body,
    color: themes.colors.text,
    flex: 1,
  },
});
