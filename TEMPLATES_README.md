# Prismify Templates Feature

A comprehensive template system for Prismify that provides ready-made designs and layouts similar to Canva.

## Features

### 🎨 Pre-built Templates
- **Social Media Templates**: Instagram posts, Twitter headers, LinkedIn posts
- **Presentation Templates**: Clean slides, keynote styles
- **Marketing Templates**: Product showcases, advertisements
- **Personal Templates**: Blog posts, portfolios
- **Business Templates**: Business cards, corporate presentations

### 🔧 Custom Templates
- Save your current designs as reusable templates
- Organize templates by categories
- Search and filter templates
- Delete custom templates

### 📱 Responsive Design
- Templates optimized for different screen sizes
- Mobile-friendly template selector
- Grid and list view options

## Template Categories

### Social Media
- **Instagram Post**: 1080×1080 square format with gradient backgrounds
- **Twitter Header**: 1500×500 wide format for Twitter headers
- **LinkedIn Post**: 1200×628 professional format

### Presentations
- **Presentation Slide**: 1920×1080 clean slide format
- **Keynote Style**: 1920×1080 elegant dark gradient style

### Marketing
- **Product Showcase**: 1200×800 with MacBook frame
- **Advertisement**: 1200×628 eye-catching red gradient

### Personal
- **Personal Blog**: 1200×628 soft pastel gradient
- **Portfolio**: 1200×800 with iPhone frame

### Business
- **Business Card**: 1050×600 professional white background
- **Corporate Presentation**: 1920×1080 formal dark style

## How to Use

### 1. Access Templates
Templates can be accessed through:
- Sidebar template selector (compact view)
- Full template gallery (full-screen view)
- Template integration component

### 2. Apply a Template
1. Browse available templates by category
2. Search for specific templates
3. Click on a template to apply it to your canvas
4. The template will automatically configure:
   - Canvas dimensions
   - Background (solid, gradient, or image)
   - Frame type and settings
   - Default text content
   - Effects and styling

### 3. Save Custom Templates
1. Design your image in Prismify
2. Click "Save as Template" button
3. Enter template name and description
4. Select a category
5. Your design will be saved as a reusable template

### 4. Manage Templates
- View all templates in the gallery
- Filter by category (Social, Presentations, Marketing, etc.)
- Search templates by name or description
- Delete custom templates
- Organize templates with tags

## Technical Implementation

### Store Structure
```typescript
interface Template {
  id: string
  name: string
  description: string
  category: 'social-media' | 'presentation' | 'marketing' | 'personal' | 'business'
  thumbnail: string
  config: {
    canvas: { width: number; height: number; background: string }
    frame: { type: string; color: string; shadow: boolean }
    text: { content: string; fontSize: number; fontFamily: string; color: string; position: { x: number; y: number } }
    effects: { blur: number; brightness: number; contrast: number; saturation: number }
  }
  tags: string[]
  isCustom?: boolean
  createdAt?: Date
}
```

### Key Components
- `useTemplates` - Zustand store for template management
- `TemplateIntegration` - Compact sidebar component
- `TemplateGallery` - Full-screen template browser
- `SaveTemplateDialog` - Dialog for saving custom templates
- `template-applier.ts` - Utility for applying template configurations

### Integration Points
- Integrates with existing image options store
- Connects with background options store
- Links to frame options store
- Works with canvas resize functionality
- Supports text layer management

## Template Configuration

Each template includes:
- **Canvas Settings**: Width, height, background
- **Frame Settings**: Type (none, macbook, iphone, etc.), color, shadow
- **Text Settings**: Content, font size, family, color, position
- **Effects**: Blur, brightness, contrast, saturation

## Usage Examples

### Quick Start
```typescript
import { useTemplates } from '@/store/use-templates'

const { applyTemplate } = useTemplates()

// Apply Instagram post template
applyTemplate(instagramPostTemplate)
```

### Save Current Design
```typescript
import { useTemplates } from '@/store/use-templates'

const { saveAsTemplate } = useTemplates()

// Save current canvas as template
saveAsTemplate('My Design', 'A beautiful gradient design', 'social-media')
```

## Benefits

### For Users
- **Quick Start**: Jump into design with pre-configured layouts
- **Consistency**: Maintain brand consistency across designs
- **Efficiency**: Save time with ready-made templates
- **Customization**: Modify templates to fit specific needs
- **Organization**: Keep designs organized by category

### For Developers
- **Modular**: Easy to add new templates
- **Extensible**: Simple to extend with new categories
- **Maintainable**: Clean separation of concerns
- **Type-safe**: Full TypeScript support
- **Persistent**: Templates saved locally

## Future Enhancements

- Template sharing between users
- Template marketplace
- Advanced template editing
- Template versioning
- Template analytics
- Collaborative templates
- Template import/export
- Template preview generation

## Contributing

To add new templates:
1. Add template configuration to `defaultTemplates` array
2. Include appropriate thumbnail image
3. Test template application
4. Update documentation

## Support

For questions or issues with templates:
- Check the template configuration
- Verify store integration
- Test template application
- Review console for errors