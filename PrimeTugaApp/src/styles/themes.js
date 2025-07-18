import colors from './colors';
import typography from './typography';

// Main theme object combining all design tokens
export default {
  colors,
  typography,
  
  // Spacing system (8pt grid)
  spacing: {
    xs: 4,
    small: 8,
    medium: 16,
    large: 24,
    xl: 32,
    xxl: 48,
  },
  
  // Border radius
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
    xl: 16,
  },
  
  // Shadows for elevation
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.35,
      shadowRadius: 16,
      elevation: 8,
    },
  },
  
  // Animation durations
  animations: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  
  // Component specific dimensions
  dimensions: {
    // Movie card dimensions
    movieCard: {
      width: 140,
      height: 210,
    },
    
    // Hero banner
    heroBanner: {
      height: 300,
    },
    
    // Tab bar
    tabBar: {
      height: 60,
    },
    
    // Header
    header: {
      height: 56,
    },
  },
};
