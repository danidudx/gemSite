# JWELLCO Theme System Guide

## 🎨 Overview

This theme system allows you to change the entire project's colors and fonts from one central location (`public/theme.css`). All components will automatically update when you modify the CSS variables.

## 🚀 Quick Start

### Changing Colors

To change the primary brand color from gold to another color, simply update the CSS variables in `public/theme.css`:

```css
:root {
  --color-primary: #your-new-color; /* Main brand color */
  --color-primary-light: #lighter-shade; /* Light variant */
  --color-primary-dark: #darker-shade; /* Dark variant */
  --color-primary-darker: #darkest-shade; /* Darkest variant */
}
```

### Changing Fonts

To change the font family, update these variables:

```css
:root {
  --font-primary: "Your-Font", sans-serif; /* Main font */
  --font-secondary: "Your-Serif", serif; /* Secondary font */
  --font-accent: "Your-Accent", sans-serif; /* Accent font */
}
```

## 📋 Available Variables

### 🎨 Color System

#### Primary Colors

- `--color-primary`: Main brand color (currently gold)
- `--color-primary-light`: Light variant
- `--color-primary-dark`: Dark variant
- `--color-primary-darker`: Darkest variant

#### Secondary Colors

- `--color-secondary`: Secondary brand color (dark gray)
- `--color-secondary-light`: Light gray
- `--color-secondary-dark`: Darker gray

#### Neutral Colors

- `--color-white`: Pure white
- `--color-black`: Pure black
- `--color-gray-50` to `--color-gray-900`: Gray scale

#### Accent Colors

- `--color-accent-1`: Pink accent
- `--color-accent-2`: Purple accent
- `--color-accent-3`: Cyan accent
- `--color-accent-4`: Emerald accent

#### Status Colors

- `--color-success`: Green
- `--color-warning`: Amber
- `--color-error`: Red
- `--color-info`: Blue

### 🔤 Typography System

#### Font Families

- `--font-primary`: Main font (Inter)
- `--font-secondary`: Serif font (Playfair Display)
- `--font-accent`: Accent font (Montserrat)
- `--font-mono`: Monospace font (JetBrains Mono)

#### Font Sizes

- `--text-xs` to `--text-9xl`: Complete size scale

#### Font Weights

- `--font-thin` to `--font-black`: Complete weight scale

### 🎭 Background Colors

- `--bg-primary`: Main background
- `--bg-secondary`: Secondary background
- `--bg-tertiary`: Tertiary background
- `--bg-overlay`: Overlay background
- `--bg-glass`: Glass morphism background
- `--bg-glass-dark`: Dark glass morphism

### 📝 Text Colors

- `--text-primary`: Primary text color
- `--text-secondary`: Secondary text color
- `--text-tertiary`: Tertiary text color
- `--text-muted`: Muted text color
- `--text-accent`: Accent text color

## 🛠️ Usage in Components

### Using CSS Variables in Tailwind

```jsx
// Instead of hardcoded colors
<div className="bg-yellow-400 text-black">

// Use CSS variables
<div className="bg-[var(--color-primary)] text-[var(--color-black)]">
```

### Using CSS Variables in Regular CSS

```css
.my-component {
  background-color: var(--color-primary);
  color: var(--text-primary);
  font-family: var(--font-primary);
  font-size: var(--text-lg);
}
```

### Using Utility Classes

```jsx
// Pre-defined utility classes
<div className="text-gradient">Gradient Text</div>
<div className="bg-gradient-primary">Gradient Background</div>
<div className="bg-glass">Glass Effect</div>
<div className="shadow-glow">Glowing Shadow</div>
```

## 🎨 Theme Presets

### Gold Theme (Current)

```css
--color-primary: #fbbf24;
--color-primary-light: #fde68a;
--color-primary-dark: #f59e0b;
--color-primary-darker: #d97706;
```

### Silver Theme

```css
--color-primary: #94a3b8;
--color-primary-light: #cbd5e1;
--color-primary-dark: #64748b;
--color-primary-darker: #475569;
```

### Rose Gold Theme

```css
--color-primary: #f472b6;
--color-primary-light: #fbb6ce;
--color-primary-dark: #ec4899;
--color-primary-darker: #db2777;
```

### Emerald Theme

```css
--color-primary: #10b981;
--color-primary-light: #6ee7b7;
--color-primary-dark: #059669;
--color-primary-darker: #047857;
```

## 🌙 Dark/Light Theme Support

### Dark Theme

```css
[data-theme="dark"] {
  --bg-primary: #000000;
  --bg-secondary: #1f2937;
  --text-primary: #ffffff;
  --text-secondary: #d1d5db;
}
```

### Light Theme

```css
[data-theme="light"] {
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --text-primary: #1f2937;
  --text-secondary: #4b5563;
}
```

## 📱 Responsive Design

The theme system includes responsive typography that automatically adjusts for mobile devices:

```css
@media (max-width: 640px) {
  :root {
    --text-6xl: 2.5rem; /* Smaller on mobile */
    --text-7xl: 3rem;
    --text-8xl: 3.5rem;
    --text-9xl: 4rem;
  }
}
```

## 🎭 Animation Utilities

Pre-defined animation classes:

- `.animate-fadeInUp`: Fade in from bottom
- `.animate-fadeInLeft`: Fade in from left
- `.animate-fadeInRight`: Fade in from right
- `.animate-pulse`: Pulsing effect
- `.animate-bounce`: Bouncing effect

## 🔧 Customization Examples

### Example 1: Change to Blue Theme

```css
:root {
  --color-primary: #3b82f6;
  --color-primary-light: #93c5fd;
  --color-primary-dark: #1d4ed8;
  --color-primary-darker: #1e40af;
}
```

### Example 2: Change to Custom Font

```css
:root {
  --font-primary: "Poppins", sans-serif;
  --font-secondary: "Crimson Text", serif;
}
```

### Example 3: Change Spacing Scale

```css
:root {
  --space-md: 1.25rem; /* Increase default spacing */
  --space-lg: 2rem;
  --space-xl: 2.5rem;
}
```

## 📋 Best Practices

1. **Always use CSS variables** instead of hardcoded values
2. **Test color combinations** for accessibility
3. **Maintain contrast ratios** for readability
4. **Use semantic naming** for color variables
5. **Test on multiple devices** after changes
6. **Document custom changes** for team members

## 🚨 Important Notes

- Changes to `theme.css` will affect the entire project
- Always test changes in a development environment first
- Consider accessibility when changing colors
- Some components may need manual updates if they use hardcoded values
- The theme system works with both Tailwind CSS and regular CSS

## 🎯 Quick Reference

### Most Common Changes

- **Brand Color**: `--color-primary`
- **Background**: `--bg-primary`
- **Text Color**: `--text-primary`
- **Main Font**: `--font-primary`
- **Accent Color**: `--color-accent-1`

### File Locations

- **Theme Variables**: `public/theme.css`
- **HTML Head**: `index.html`
- **Components**: `src/components/`
- **Pages**: `src/pages/`
