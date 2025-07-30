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
Each section should have:
- title: Main heading
- subtitle: Secondary heading  
- content: Either a string or array of ContentItem objects

ContentItem objects contain:
- title: Item heading
- subtitle: Item subheading
- content: Item description

When adding new features, maintain the existing architecture and ensure compatibility with static site generation.
