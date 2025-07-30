# Gen Z Survey - Parallax Website

A modern, responsive website built with Next.js featuring parallax scrolling effects and static site generation. The site presents research insights about Generation Z through four engaging full-height sections.

## Features

- **Static Site Generation**: Pre-rendered HTML for optimal performance
- **Parallax Scrolling**: Smooth parallax effects between sections
- **CSS-in-JS**: All styling implemented using CSS-in-JS objects
- **Responsive Design**: Mobile-first approach with fluid typography
- **JSON-Driven Content**: Content managed through JSON files
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
│   └── ParallaxSection.tsx # Reusable parallax section component
├── data/
│   └── content.json        # Site content and data
└── types/
    └── content.ts          # TypeScript type definitions
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
  "title": "Section Title",
  "subtitle": "Section Subtitle", 
  "content": "String content or array of content items"
}
```

For sections with multiple content items:

```json
{
  "content": [
    {
      "title": "Item Title",
      "subtitle": "Item Subtitle",
      "content": "Item description"
    }
  ]
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
