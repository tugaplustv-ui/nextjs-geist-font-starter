// Application constants
export const API_ENDPOINT = 'https://primetuga.blogspot.com';

// Sample video URLs for testing (replace with actual scraped URLs)
export const SAMPLE_VIDEO_URLS = {
  trailer: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
  movie: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
};

// App configuration
export const APP_CONFIG = {
  name: 'PrimeTuga',
  version: '1.0.0',
  maxRetries: 3,
  requestTimeout: 10000,
};

// Navigation constants
export const SCREENS = {
  HOME: 'Home',
  SEARCH: 'Search',
  DOWNLOADS: 'Downloads',
  PROFILE: 'Profile',
  DETAILS: 'Details',
  PLAYER: 'Player',
};

// Content categories
export const CATEGORIES = {
  MOVIES: 'Filmes',
  SERIES: 'Séries',
  DOCUMENTARIES: 'Documentários',
  ANIMATION: 'Animação',
  ACTION: 'Ação',
  COMEDY: 'Comédia',
  DRAMA: 'Drama',
  THRILLER: 'Thriller',
  HORROR: 'Terror',
  ROMANCE: 'Romance',
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erro de conexão. Verifique sua internet.',
  LOADING_ERROR: 'Erro ao carregar conteúdo. Tente novamente.',
  VIDEO_ERROR: 'Erro ao reproduzir vídeo.',
  SEARCH_ERROR: 'Erro na busca. Tente novamente.',
  GENERIC_ERROR: 'Algo deu errado. Tente novamente.',
};

// Success messages
export const SUCCESS_MESSAGES = {
  CONTENT_LOADED: 'Conteúdo carregado com sucesso',
  VIDEO_READY: 'Vídeo pronto para reprodução',
};
