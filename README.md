# Gen Z Survey - Parallax Website

A modern, responsive website built with Next.js featuring custom parallax scrolling effects and static site generation. The site presents research insights about Generation Z through interactive sections with smooth scroll-based animations and popover interactions.

## ✨ Features

- **Static Site Generation (SSG)**: Pre-rendered HTML for optimal performance and easy deployment
- **Custom Parallax Scrolling**: Vanilla JavaScript-powered parallax effects with scroll-based opacity transitions
- **Interactive Demographics**: Scroll-triggered participant reveals with responsive popovers
- **Template-Based Architecture**: 5 different section templates for varied content presentation
- **JSON-Driven Content**: Content managed through structured JSON with animation configuration
- **TypeScript**: Full type safety throughout the project
- **CSS-in-JS**: Scoped styling with responsive design patterns
- **Mobile-First Design**: Optimized for all screen sizes with adaptive interactions
- **Performance Optimized**: Throttled scroll handlers and batched state updates

## 🏗️ Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page orchestrating parallax sections
│   └── globals.css         # Global styles and CSS variables
├── components/
│   ├── ParallaxSection.tsx # Parallax wrapper with spacer/overlay system
│   ├── ReadingProgress.tsx # Scroll progress indicator
│   └── templates/          # Template components for different section types
│       ├── HeroTemplate.tsx           # Landing section
│       ├── MultipleQuotesTemplate.tsx # Quote grid with participants
│       ├── TextTemplate.tsx           # Long-form content
│       ├── DemographicsTemplate.tsx   # Interactive participant showcase
│       └── SingleQuoteTemplate.tsx    # Featured quote display
├── data/
│   └── content.json        # Site content with template and animation config
├── lib/
│   └── utils.ts           # Parallax scroll controllers and utilities
└── types/
    └── content.ts         # TypeScript interfaces for all templates
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository and install dependencies:
```bash
git clone <repository-url>
cd GenZSurvey
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Static Site Generation

### How to Produce Static Output

This project is configured for **static site generation** using Next.js's `output: 'export'` feature. The configuration is in `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  output: 'export',           // Enable static export
  trailingSlash: true,        // Add trailing slashes to URLs
  images: { unoptimized: true }, // Disable image optimization for static export
  distDir: 'out',            // Output directory
  assetPrefix: ''            // No asset prefix for relative paths
};
```

### Build Commands

```bash
# Build static site
npm run build

# This runs:
# 1. next build - Generates static files
# 2. npm run postbuild - Cleans up 404 files for deployment
```

### Output Structure
```
out/
├── index.html              # Main page
├── _next/                  # Next.js assets
│   ├── static/
│   └── chunks/
├── images/                 # Static images
└── 404.html               # 404 page (removed by postbuild)
```

### Deployment Options
- **Static hosting**: Deploy `out/` folder to any static host (Netlify, Vercel, GitHub Pages, etc.)
- **CDN**: Upload to AWS S3 + CloudFront, Azure Static Web Apps, etc.
- **Traditional web servers**: Serve static files with Apache/Nginx

## 📝 Content Management

### How to Add New Content

Content is managed through the `src/data/content.json` file using a template-based system. Each section must have:

```json
{
  "id": "unique-section-id",
  "template": "template-name",
  "animation": "parallax",  // Optional: enables parallax scrolling
  // Additional template-specific properties
}
```

### Available Templates

#### 1. Hero Template
For landing sections with title and subtitle:
```json
{
  "id": "hero",
  "template": "hero",
  "title": "Main Heading",
  "subtitle": "Secondary heading or tagline"
}
```

#### 2. Multiple Quotes Template
For participant quotes in a grid layout:
```json
{
  "id": "quotes",
  "template": "multiple-quotes",
  "layout": "row",
  "animation": "parallax",
  "children": [
    {
      "image": "/images/participant1.svg",
      "title": "Participant Name, Age",
      "text": "\"Quote content with <strong>HTML</strong> formatting.\""
    }
  ]
}
```

#### 3. Text Template
For long-form content and research text:
```json
{
  "id": "content",
  "template": "text",
  "text": "<p>Rich HTML content with <strong>formatting</strong>, paragraphs, and styling.</p>"
}
```

#### 4. Demographics Template
Interactive participant showcase with scroll-based reveals and popovers:
```json
{
  "id": "demographics",
  "template": "demographics",
  "animation": "parallax",
  "children": [
    {
      "image": "/images/participant.svg",
      "title": "Participant Name",
      "text": "<strong>Name, Age</strong>, location, occupation details"
    }
  ]
}
```

#### 5. Single Quote Template
For featured quotes or key statements:
```json
{
  "id": "quote",
  "template": "single-quote",
  "text": "The featured quote or statement content"
}
```

### Adding New Sections

1. **Add to content.json**: Insert new section object in the `sections` array
2. **Set unique ID**: Use descriptive, unique identifier
3. **Choose template**: Select appropriate template from available options
4. **Configure animation**: Add `"animation": "parallax"` for scroll effects
5. **Add content**: Fill in template-specific properties

Example:
```json
{
  "id": "new-research-findings",
  "template": "text", 
  "animation": "parallax",
  "text": "<p>New research content...</p>"
}
```

## 🎬 Parallax Animation System

### How Parallax Works

The parallax system uses a **dual-element approach** with invisible spacers and fixed overlays:

#### Architecture

1. **Spacer Element** (`parallaxSpacer`):
   - Invisible (`visibility: hidden`)
   - Maintains document flow and scroll height
   - Height: `130vh` (creates scroll distance)
   - Contains template content for layout calculation

2. **Overlay Element** (`parallax`):
   - Fixed position (`position: fixed`)
   - Initially hidden (`opacity: 0`)
   - Becomes visible when spacer enters viewport
   - Fades out when next section approaches

#### Animation Flow

```typescript
// From utils.ts - parallax controller
if (spacerRect.bottom < viewportHeight * 0.3) {
  // Spacer scrolled past - reset
  opacity = 0;
} else if (nextElement && nextTop < viewportHeight) {
  // Next section entering - fade out
  const coverage = (viewportHeight - nextTop) / (viewportHeight / 2);
  opacity = 1 - coverage;
} else {
  // Section active - full opacity
  opacity = 1;
}
```

### How to Set Parallax Animation

#### Method 1: Add to Existing Section
Add the `animation` property to any section in `content.json`:

```json
{
  "id": "existing-section",
  "template": "text",
  "animation": "parallax",  // ← Add this line
  "text": "Content here..."
}
```

#### Method 2: Create New Parallax Section
```json
{
  "id": "new-parallax-section",
  "template": "multiple-quotes",
  "animation": "parallax",
  "children": [
    // Template content
  ]
}
```

#### Method 3: Remove Parallax
Simply remove or comment out the `animation` property:
```json
{
  "id": "regular-section",
  "template": "text",
  // "animation": "parallax",  ← Remove this
  "text": "This will scroll normally"
}
```

### Parallax Behavior

- **With parallax**: Section has smooth opacity transitions, fixed positioning
- **Without parallax**: Section scrolls normally with document flow
- **Scroll detection**: Uses spacer elements for accurate viewport calculations
- **Performance**: Throttled scroll handlers (16ms) with `requestAnimationFrame`

### Technical Implementation

```tsx
// ParallaxSection.tsx
if (section.animation === 'parallax') {
  return (
    <>
      {/* Invisible spacer for scroll calculation */}
      <section className={styles.parallaxSpacer} style={{ visibility: 'hidden' }}>
        <div className={styles.container}>
          {renderTemplate('spacer')}
        </div>
      </section>
      
      {/* Fixed overlay with content */}
      <section className={styles.parallax} data-section={section.id}>
        <div className={styles.container}>
          {renderTemplate('content')}
        </div>
      </section>
    </>
  );
}
```

## 🎨 Customization

### Styling
- **CSS-in-JS**: All styles in component files for type safety
- **CSS Modules**: Scoped styles for layout components  
- **CSS Variables**: Global theming in `globals.css`
- **Responsive Design**: Mobile-first with clamp() and viewport units

### Performance Optimizations
- **Throttled Scrolling**: 16ms intervals with `requestAnimationFrame`
- **Batched State Updates**: Single state object updates in complex components
- **Passive Event Listeners**: Non-blocking scroll handlers
- **Static Generation**: Pre-rendered HTML for instant loading

### Browser Support
- Modern browsers with ES2017+ support
- CSS Grid and Flexbox required
- Intersection Observer for enhanced effects (with graceful degradation)

## 🧪 Development

### TypeScript
Full type coverage with interfaces for all templates and content structure.

### Testing Build
```bash
npm run build    # Test static generation
npm run lint     # Check for code issues
npx tsc --noEmit # Verify TypeScript compilation
```

### Performance Monitoring
- Bundle analysis available in build output
- Network tab for asset optimization
- Lighthouse for performance scoring

## 📄 License

This project is licensed under the ISC License.
