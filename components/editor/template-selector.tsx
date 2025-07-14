'use client'

import { useState } from 'react'
import { useTemplates, Template } from '@/store/use-templates'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Grid, Star, Trash2, Plus } from 'lucide-react'
import { cn } from '@/utils/button-utils'

const categories = [
  { id: 'all', label: 'All' },
  { id: 'social-media', label: 'Social' },
  { id: 'presentation', label: 'Presentations' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'personal', label: 'Personal' },
  { id: 'business', label: 'Business' },
  { id: 'custom', label: 'My Templates' },
]

export function TemplateSelector() {
  const { templates, customTemplates, applyTemplate, removeCustomTemplate } = useTemplates()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const allTemplates = [...templates, ...customTemplates]
  
  const filteredTemplates = allTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'custom' ? template.isCustom : template.category === selectedCategory)
    
    return matchesSearch && matchesCategory
  })

  const handleTemplateSelect = (template: Template) => {
    applyTemplate(template)
  }

  const handleDeleteTemplate = (templateId: string) => {
    removeCustomTemplate(templateId)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Templates</h3>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="text-xs"
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="group relative cursor-pointer rounded-lg border bg-card p-3 hover:shadow-md transition-all"
            onClick={() => handleTemplateSelect(template)}
          >
            {/* Template Preview */}
            <div 
              className="aspect-video rounded-md mb-2 relative overflow-hidden"
              style={{ background: template.config.canvas.background }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium">
                {template.name}
              </div>
              {template.isCustom && (
                <div className="absolute top-1 right-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                </div>
              )}
              {template.isCustom && (
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-1 left-1 h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteTemplate(template.id)
                  }}
                >
                  <Trash2 className="h-2 w-2" />
                </Button>
              )}
            </div>
            
            {/* Template Info */}
            <div className="space-y-1">
              <h4 className="text-sm font-medium truncate">{template.name}</h4>
              <p className="text-xs text-muted-foreground truncate">
                {template.config.canvas.width} × {template.config.canvas.height}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-8">
          <Grid className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm text-muted-foreground">No templates found</p>
        </div>
      )}
    </div>
  )
}