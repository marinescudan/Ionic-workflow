// src/app/constants/category-colors.constants.ts
// API-ready constant - category color configuration using CSS variables

/**
 * Available color palette options
 * Add class to <body> to switch: palette-1, palette-2, palette-3, palette-4
 */
export type PaletteOption = 'palette-1' | 'palette-2' | 'palette-3' | 'palette-4';

/**
 * Category types - progression-based naming
 * fundamentals → essentials → intermediate → advanced → expert
 */
export type CategoryType = 'fundamentals' | 'essentials' | 'intermediate' | 'advanced' | 'expert';

/**
 * Category color configuration
 */
export interface CategoryColorConfig {
  /** CSS variable name for main color (e.g., '--category-fundamentals') */
  cssVar: string;
  /** CSS variable name for light/background color */
  cssVarLight: string;
  /** CSS variable name for contrast/text color */
  cssVarContrast: string;
  /** CSS class for ion-chip */
  chipClass: string;
  /** CSS class for ion-progress-bar */
  progressClass: string;
}

/**
 * Maps category names to their CSS variable configurations
 * Progression: fundamentals → essentials → intermediate → advanced → expert
 */
export const CATEGORY_COLORS: Record<CategoryType, CategoryColorConfig> = {
  fundamentals: {
    cssVar: '--category-fundamentals',
    cssVarLight: '--category-fundamentals-light',
    cssVarContrast: '--category-fundamentals-contrast',
    chipClass: 'category-chip fundamentals',
    progressClass: 'category-fundamentals',
  },
  essentials: {
    cssVar: '--category-essentials',
    cssVarLight: '--category-essentials-light',
    cssVarContrast: '--category-essentials-contrast',
    chipClass: 'category-chip essentials',
    progressClass: 'category-essentials',
  },
  intermediate: {
    cssVar: '--category-intermediate',
    cssVarLight: '--category-intermediate-light',
    cssVarContrast: '--category-intermediate-contrast',
    chipClass: 'category-chip intermediate',
    progressClass: 'category-intermediate',
  },
  advanced: {
    cssVar: '--category-advanced',
    cssVarLight: '--category-advanced-light',
    cssVarContrast: '--category-advanced-contrast',
    chipClass: 'category-chip advanced',
    progressClass: 'category-advanced',
  },
  expert: {
    cssVar: '--category-expert',
    cssVarLight: '--category-expert-light',
    cssVarContrast: '--category-expert-contrast',
    chipClass: 'category-chip expert',
    progressClass: 'category-expert',
  },
};

/**
 * Get category color configuration
 */
export function getCategoryColorConfig(category: string): CategoryColorConfig {
  return CATEGORY_COLORS[category as CategoryType] || CATEGORY_COLORS.fundamentals;
}

/**
 * Get CSS class for category chip
 */
export function getCategoryChipClass(category: string): string {
  const config = getCategoryColorConfig(category);
  return config.chipClass;
}

/**
 * Get CSS class for category progress bar
 */
export function getCategoryProgressClass(category: string): string {
  const config = getCategoryColorConfig(category);
  return config.progressClass;
}

/**
 * Get inline style object for category color
 * Useful when you need to apply the color directly
 */
export function getCategoryStyle(category: string): { [key: string]: string } {
  const config = getCategoryColorConfig(category);
  return {
    '--background': `var(${config.cssVar})`,
    '--color': `var(${config.cssVarContrast})`,
    'background-color': `var(${config.cssVar})`,
    'color': `var(${config.cssVarContrast})`,
  };
}

/**
 * Get background style for category (light variant)
 */
export function getCategoryBackgroundStyle(category: string): { [key: string]: string } {
  const config = getCategoryColorConfig(category);
  return {
    'background-color': `var(${config.cssVarLight})`,
    'border-left': `4px solid var(${config.cssVar})`,
  };
}

/**
 * Category progression order (for sorting/display)
 */
export const CATEGORY_ORDER: CategoryType[] = [
  'fundamentals',
  'essentials',
  'intermediate',
  'advanced',
  'expert',
];

/**
 * Get category index for sorting (lower = earlier in progression)
 */
export function getCategoryOrder(category: string): number {
  const index = CATEGORY_ORDER.indexOf(category as CategoryType);
  return index >= 0 ? index : 999;
}
