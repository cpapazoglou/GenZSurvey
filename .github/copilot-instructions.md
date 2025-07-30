<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Project: Gen Z Survey - Parallax Website

This is a Next.js project with the following characteristics:

## Technology Stack
- Next.js 15 with App Router
- TypeScript
- React 19
- CSS-in-JS for styling
- Static Site Generation (SSG)

## Project Structure
- Content is stored in JSON files in `src/data/`
- Components use CSS-in-JS for styling
- Parallax scrolling effects implemented with vanilla JavaScript
- Four full-height sections with smooth transitions
- Responsive design with mobile-first approach

## Key Features
- Static site generation for optimal performance
- Parallax scrolling effects
- CSS-in-JS styling (no external CSS frameworks)
- Template-based content architecture with 5 different section types
- Responsive design
- Accessibility considerations
- Content-driven architecture with JSON data

## Styling Guidelines
- Use CSS-in-JS objects for all styling
- Implement responsive design with viewport units and media queries
- Follow accessibility best practices
- Use semantic HTML elements
- Maintain consistent spacing and typography scales

## Content Structure
The site uses a template-based architecture with 5 different section types:

### Available Templates:
1. **hero**: title, subtitle
2. **multiple-quotes**: image, title, text (array)
3. **text**: text
4. **demographics**: image, text
5. **single-quote**: title, subtitle, caption

Each section in content.json must have:
- id: Unique identifier
- template: One of the 5 template types above
- Additional properties based on template requirements

### Template Components:
- All templates are located in `src/components/templates/`
- Each template has its own TypeScript interface
- Templates receive only the props they need based on their type
- ParallaxSection.tsx acts as a wrapper that renders the appropriate template

## Documentation Maintenance
When making changes to the project:
- **Always update README.md** to reflect new features, dependencies, or configuration changes
- **Update package.json description** if the project scope changes
- **Maintain the copilot-instructions.md** file when adding new patterns or architectural decisions
- **Document any new components** with clear examples and usage instructions
- **Update deployment instructions** if build or deployment processes change
- **Keep version information current** in all documentation files

When adding new features, maintain the existing architecture and ensure compatibility with static site generation.
