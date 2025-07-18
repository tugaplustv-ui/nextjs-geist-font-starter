import axios from 'axios';
import cheerio from 'cheerio';
import { API_ENDPOINT, SAMPLE_VIDEO_URLS, ERROR_MESSAGES } from '../utils/constants';

// Cache for storing scraped data
let contentCache = {
  movies: [],
  lastUpdated: null,
  cacheExpiry: 30 * 60 * 1000, // 30 minutes
};

/**
 * Fetch and parse movies/series from PrimeTuga
 */
export async function fetchMovies() {
  try {
    // Check cache first
    if (contentCache.movies.length > 0 && 
        contentCache.lastUpdated && 
        Date.now() - contentCache.lastUpdated < contentCache.cacheExpiry) {
      console.log('Returning cached content');
      return contentCache.movies;
    }

    console.log('Fetching fresh content from PrimeTuga...');
    const response = await axios.get(API_ENDPOINT, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const movies = [];

    // Parse blog posts - adjust selectors based on actual HTML structure
    $('.post, .blog-post, article').each((index, element) => {
      try {
        const $post = $(element);
        
        // Extract title
        const title = $post.find('.post-title, .entry-title, h1, h2, h3')
          .first()
          .text()
          .trim();

        // Extract image/poster
        const posterUrl = $post.find('img')
          .first()
          .attr('src') || $post.find('img').attr('data-src');

        // Extract description/synopsis
        const description = $post.find('.post-body, .entry-content, .content, p')
          .first()
          .text()
          .trim()
          .substring(0, 200) + '...';

        // Extract year from title or content
        const yearMatch = title.match(/\((\d{4})\)/) || description.match(/(\d{4})/);
        const year = yearMatch ? yearMatch[1] : '2024';

        // Extract genre (basic categorization)
        const genre = extractGenre(title, description);

        // Generate video URL (in real implementation, this would be scraped)
        const videoUrl = SAMPLE_VIDEO_URLS.movie;

        // Only add if we have essential data
        if (title && title.length > 2) {
          movies.push({
            id: `movie_${index}_${Date.now()}`,
            title: cleanTitle(title),
            posterUrl: posterUrl || generatePlaceholderImage(title),
            description: description || 'Descrição não disponível.',
            year,
            genre,
            videoUrl,
            type: 'movie', // Could be 'series' based on content analysis
            rating: generateRandomRating(),
            duration: generateRandomDuration(),
            quality: 'HD',
            language: 'PT',
            addedDate: new Date().toISOString(),
          });
        }
      } catch (error) {
        console.warn('Error parsing individual post:', error);
      }
    });

    // If no content found, return sample data
    if (movies.length === 0) {
      console.log('No content scraped, returning sample data');
      return getSampleMovies();
    }

    // Update cache
    contentCache.movies = movies;
    contentCache.lastUpdated = Date.now();

    console.log(`Successfully scraped ${movies.length} items`);
    return movies;

  } catch (error) {
    console.error('Scraper error:', error);
    
    // Return cached data if available
    if (contentCache.movies.length > 0) {
      console.log('Returning cached data due to error');
      return contentCache.movies;
    }
    
    // Return sample data as fallback
    console.log('Returning sample data due to error');
    return getSampleMovies();
  }
}

/**
 * Search for specific content
 */
export async function searchContent(query) {
  try {
    const allMovies = await fetchMovies();
    const searchResults = allMovies.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.description.toLowerCase().includes(query.toLowerCase()) ||
      movie.genre.toLowerCase().includes(query.toLowerCase())
    );
    
    return searchResults;
  } catch (error) {
    console.error('Search error:', error);
    throw new Error(ERROR_MESSAGES.SEARCH_ERROR);
  }
}

/**
 * Get featured/trending content
 */
export async function getFeaturedContent() {
  try {
    const allMovies = await fetchMovies();
    // Return first 5 items as featured
    return allMovies.slice(0, 5);
  } catch (error) {
    console.error('Featured content error:', error);
    return getSampleMovies().slice(0, 3);
  }
}

// Helper functions
function cleanTitle(title) {
  return title
    .replace(/\[.*?\]/g, '') // Remove brackets
    .replace(/\(.*?\)/g, '') // Remove parentheses
    .replace(/\s+/g, ' ') // Multiple spaces to single
    .trim();
}

function extractGenre(title, description) {
  const content = (title + ' ' + description).toLowerCase();
  
  if (content.includes('ação') || content.includes('action')) return 'Ação';
  if (content.includes('comédia') || content.includes('comedy')) return 'Comédia';
  if (content.includes('drama')) return 'Drama';
  if (content.includes('terror') || content.includes('horror')) return 'Terror';
  if (content.includes('romance')) return 'Romance';
  if (content.includes('thriller')) return 'Thriller';
  if (content.includes('ficção') || content.includes('sci-fi')) return 'Ficção Científica';
  if (content.includes('animação') || content.includes('animation')) return 'Animação';
  if (content.includes('documentário') || content.includes('documentary')) return 'Documentário';
  
  return 'Drama'; // Default genre
}

function generatePlaceholderImage(title) {
  // Generate a placeholder image URL based on title
  const encodedTitle = encodeURIComponent(title);
  return `https://via.placeholder.com/300x450/1a1a1a/ffffff?text=${encodedTitle}`;
}

function generateRandomRating() {
  return (Math.random() * 3 + 7).toFixed(1); // Rating between 7.0 and 10.0
}

function generateRandomDuration() {
  const durations = ['1h 30min', '1h 45min', '2h 00min', '2h 15min', '1h 20min', '2h 30min'];
  return durations[Math.floor(Math.random() * durations.length)];
}

function getSampleMovies() {
  return [
    {
      id: 'sample_1',
      title: 'Dragão',
      posterUrl: 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=Dragão',
      description: 'Uma aventura épica sobre dragões e fantasia em um mundo mágico cheio de mistérios.',
      year: '2025',
      genre: 'Fantasia',
      videoUrl: SAMPLE_VIDEO_URLS.movie,
      type: 'movie',
      rating: '8.5',
      duration: '2h 15min',
      quality: 'HD',
      language: 'PT',
      addedDate: new Date().toISOString(),
    },
    {
      id: 'sample_2',
      title: 'Os Simpsons',
      posterUrl: 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=Os+Simpsons',
      description: 'A famosa família amarela em suas aventuras hilariantes na cidade de Springfield.',
      year: '2024',
      genre: 'Animação',
      videoUrl: SAMPLE_VIDEO_URLS.movie,
      type: 'series',
      rating: '9.0',
      duration: '22min',
      quality: 'HD',
      language: 'PT',
      addedDate: new Date().toISOString(),
    },
    {
      id: 'sample_3',
      title: 'The Sopranos',
      posterUrl: 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=The+Sopranos',
      description: 'A vida complexa de um chefe da máfia tentando equilibrar família e negócios.',
      year: '2023',
      genre: 'Drama',
      videoUrl: SAMPLE_VIDEO_URLS.movie,
      type: 'series',
      rating: '9.2',
      duration: '1h 00min',
      quality: 'HD',
      language: 'PT',
      addedDate: new Date().toISOString(),
    },
    {
      id: 'sample_4',
      title: 'Rick and Morty',
      posterUrl: 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=Rick+and+Morty',
      description: 'As aventuras interdimensionais de um cientista louco e seu neto nervoso.',
      year: '2024',
      genre: 'Animação',
      videoUrl: SAMPLE_VIDEO_URLS.movie,
      type: 'series',
      rating: '8.8',
      duration: '23min',
      quality: 'HD',
      language: 'PT',
      addedDate: new Date().toISOString(),
    },
    {
      id: 'sample_5',
      title: 'Ford vs Ferrari',
      posterUrl: 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=Ford+vs+Ferrari',
      description: 'A história real da rivalidade entre Ford e Ferrari nas corridas de Le Mans.',
      year: '2023',
      genre: 'Ação',
      videoUrl: SAMPLE_VIDEO_URLS.movie,
      type: 'movie',
      rating: '8.1',
      duration: '2h 32min',
      quality: 'HD',
      language: 'PT',
      addedDate: new Date().toISOString(),
    },
  ];
}

// Clear cache function
export function clearCache() {
  contentCache.movies = [];
  contentCache.lastUpdated = null;
}
