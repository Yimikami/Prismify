# Template Integration Guide

This guide explains how to integrate the new templates feature into your existing Prismify application.

## Quick Integration

### 1. Add Template Integration to Sidebar

To add templates to your existing sidebar, import and use the `TemplateIntegration` component:

```tsx
// In your sidebar component (e.g., components/editor/sidebar.tsx)
import { TemplateIntegration } from './template-integration'

// Add this to your sidebar content
<TemplateIntegration />
```

### 2. Add Template Button to Main Interface

Add a "Templates" button to your main interface:

```tsx
import { useTemplates } from '@/store/use-templates'
import { Button } from '@/components/ui/button'
import { Grid } from 'lucide-react'

function TemplateButton() {
  const { selectedTemplate } = useTemplates()
  
  return (
    <Button variant="outline" size="sm">
      <Grid className="h-4 w-4 mr-2" />
      Templates
      {selectedTemplate && (
        <span className="ml-2 text-xs bg-primary text-primary-foreground px-1 rounded">
          {selectedTemplate.name}
        </span>
      )}
    </Button>
  )
}
```

### 3. Add Save Template Button

Add a "Save as Template" button to your export or settings area:

```tsx
import { SaveTemplateDialog } from '@/components/editor/save-template-dialog'

function SaveTemplateButton() {
  return <SaveTemplateDialog />
}
```

## Full Integration Example

Here's a complete example of how to integrate templates into your existing sidebar:

```tsx
// components/editor/sidebar.tsx
import { TemplateIntegration } from './template-integration'
import { SaveTemplateDialog } from './save-template-dialog'

export default function Sidebar() {
  return (
    <div className="sidebar">
      {/* Existing sidebar content */}
      
      {/* Add templates section */}
      <div className="sidebar-section">
        <TemplateIntegration />
      </div>
      
      {/* Add save template button */}
      <div className="sidebar-section">
        <SaveTemplateDialog />
      </div>
    </div>
  )
}
```

## Navigation Integration

Add a templates route to your navigation:

```tsx
// In your navigation component
const navigationItems = [
  // ... existing items
  {
    name: 'Templates',
    href: '/templates',
    icon: Grid
  }
]
```

## Store Integration

The templates store automatically integrates with your existing stores:

- `useImageOptions` - For image and text settings
- `useBackgroundOptions` - For background configuration
- `useFrameOptions` - For frame settings
- `useResizeCanvas` - For canvas dimensions

## Template Application Flow

1. User selects a template
2. `applyTemplate()` is called
3. Template configuration is applied to all relevant stores
4. Canvas updates with new settings
5. User can modify the applied template

## Customization Options

### Add New Template Categories

To add new template categories, update the categories array:

```tsx
const categories = [
  // ... existing categories
  { id: 'new-category', label: 'New Category' }
]
```

### Add New Templates

To add new templates, add them to the `defaultTemplates` array in `store/use-templates.ts`:

```tsx
const newTemplate: Template = {
  id: 'my-template',
  name: 'My Template',
  description: 'A custom template',
  category: 'social-media',
  thumbnail: '/templates/my-template.jpg',
  config: {
    // ... template configuration
  },
  tags: ['custom', 'social']
}
```

### Customize Template Styling

Modify the template components to match your design system:

```tsx
// Customize template card styling
<div className="template-card custom-styles">
  {/* Template content */}
</div>
```

## Testing Integration

1. **Test Template Application**: Select a template and verify it applies correctly
2. **Test Template Saving**: Create a design and save it as a template
3. **Test Template Deletion**: Delete a custom template
4. **Test Search and Filter**: Use search and category filters
5. **Test Responsive Design**: Test on different screen sizes

## Troubleshooting

### Common Issues

1. **Templates not applying**: Check store integration in `template-applier.ts`
2. **Save not working**: Verify `saveAsTemplate` function
3. **UI not rendering**: Check component imports and dependencies
4. **Type errors**: Ensure TypeScript types are properly defined

### Debug Steps

1. Check browser console for errors
2. Verify store state with Redux DevTools
3. Test individual template functions
4. Check component prop types

## Performance Considerations

- Templates are stored locally using Zustand persist
- Template thumbnails should be optimized images
- Lazy load template components for better performance
- Consider pagination for large template collections

## Security Notes

- Template data is stored locally
- No sensitive data in template configurations
- Validate template data before application
- Sanitize user input in save template dialog