# Gen Z Survey - Parallax Website

A modern, responsive website built with Next.js featuring parallax scrolling effects and static site generation. The site presents research insights about Generation Z through four engaging full-height sections.

## Features

- **Static Site Generation**: Pre-rendered HTML for optimal performance
- **Parallax Scrolling**: Smooth parallax effects between sections
- **CSS-in-JS**: All styling implemented using CSS-in-JS objects
- **Responsive Design**: Mobile-first approach with fluid typography
- **Template-Based Architecture**: Five different section templates for varied content presentation
- **JSON-Driven Content**: Content managed through JSON files with template-specific properties
- **TypeScript**: Full type safety throughout the project
- **Accessibility**: WCAG compliant with reduced motion support

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page with parallax sections
│   └── globals.css         # Global styles and animations
├── components/
│   ├── ParallaxSection.tsx # Main parallax section wrapper
│   └── templates/          # Template components for different section types
│       ├── HeroTemplate.tsx
│       ├── MultipleQuotesTemplate.tsx
│       ├── TextTemplate.tsx
│       ├── DemographicsTemplate.tsx
│       └── SingleQuoteTemplate.tsx
├── data/
│   └── content.json        # Site content with template-based structure
└── types/
    └── content.ts          # TypeScript type definitions for all templates
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

Generate static files for deployment:

```bash
npm run build
```

The static files will be generated in the `out/` directory.

## Content Management

Content is managed through the `src/data/content.json` file. Each section follows this structure:

```json
{
  "id": "unique-section-id",
  "template": "template-name",
  // Additional properties based on template
}
```

### Available Templates

#### 1. Hero Template
```json
{
  "id": "hero",
  "template": "hero",
  "title": "Main heading",
  "subtitle": "Secondary heading"
}
```

#### 2. Multiple Quotes Template
```json
{
  "id": "quotes",
  "template": "multiple-quotes",
  "children": [
    {
      "image": "/path/to/image1.jpg",
      "title": "Quote Title 1",
      "text": "Quote text content"
    },
    {
      "image": "/path/to/image2.jpg",
      "title": "Quote Title 2", 
      "text": "Quote text content"
    }
  ]
}
```

#### 3. Text Template
```json
{
  "id": "content",
  "template": "text",
  "text": "Long form text content"
}
```

#### 4. Demographics Template
```json
{
  "id": "demographics",
  "template": "demographics",
  "children": [
    {
      "image": "/path/to/chart1.jpg",
      "title": "Demographic Title 1",
      "text": "Demographic information and statistics"
    },
    {
      "image": "/path/to/chart2.jpg", 
      "title": "Demographic Title 2",
      "text": "Additional demographic insights"
    }
  ]
}
```

#### 5. Single Quote Template
```json
{
  "id": "quote",
  "template": "single-quote",
  "title": "Quote title",
  "subtitle": "The main quote text",
  "caption": "Attribution"
}
```

## Customization

### Styling
All styles are implemented using CSS-in-JS objects within components. This provides:
- Type safety for style properties
- Dynamic styling based on props
- Scoped styles without naming conflicts

### Parallax Effects
The parallax scrolling is implemented using vanilla JavaScript for optimal performance. The effect can be customized by adjusting the `parallaxSpeed` value in the `ParallaxSection` component.

### Responsive Design
The site uses:
- `clamp()` for fluid typography
- CSS Grid with `auto-fit` for responsive layouts
- Viewport units for consistent spacing
- Media queries for mobile optimizations

## Performance

The site is optimized for performance through:
- Static site generation
- Minimal JavaScript bundle
- CSS-in-JS for scoped styling
- Optimized images (when added)
- Preload critical resources

## Browser Support

- Modern browsers with ES2017+ support
- CSS Grid and Flexbox support required
- Intersection Observer API for enhanced effects (graceful degradation)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure TypeScript compilation passes
5. Test responsive design
6. Submit a pull request

## License

This project is licensed under the ISC License.
