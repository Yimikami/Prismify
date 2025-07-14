'use client'

import { useState } from 'react'
import { useTemplates, Template } from '@/store/use-templates'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Search, Grid, List, Plus, Star, Trash2 } from 'lucide-react'
import { cn } from '@/utils/button-utils'

const categories = [
  { id: 'all', label: 'All Templates', icon: Grid },
  { id: 'social-media', label: 'Social Media', icon: Grid },
  { id: 'presentation', label: 'Presentations', icon: Grid },
  { id: 'marketing', label: 'Marketing', icon: Grid },
  { id: 'personal', label: 'Personal', icon: Grid },
  { id: 'business', label: 'Business', icon: Grid },
  { id: 'custom', label: 'My Templates', icon: Star },
]

export function TemplateGallery() {
  const { templates, customTemplates, applyTemplate, removeCustomTemplate } = useTemplates()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const allTemplates = [...templates, ...customTemplates]
  
  const filteredTemplates = allTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
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
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Templates</h1>
          <p className="text-muted-foreground">Choose from our collection of ready-made templates</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-7">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="text-xs">
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Templates Grid */}
      <div className={cn(
        "grid gap-4",
        viewMode === 'grid' 
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
          : "grid-cols-1"
      )}>
        {filteredTemplates.map((template) => (
          <Card 
            key={template.id} 
            className={cn(
              "cursor-pointer transition-all hover:shadow-lg hover:scale-105",
              viewMode === 'list' && "flex flex-row"
            )}
            onClick={() => handleTemplateSelect(template)}
          >
            <div className={cn(
              "relative",
              viewMode === 'list' ? "w-32 h-24" : "aspect-video"
            )}>
              <div 
                className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-lg"
                style={{ background: template.config.canvas.background }}
              >
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
                  {template.name}
                </div>
              </div>
              {template.isCustom && (
                <div className="absolute top-2 right-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                </div>
              )}
              {template.isCustom && (
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 left-2 h-6 w-6 p-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteTemplate(template.id)
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>
            
            <CardHeader className={cn(
              "p-4",
              viewMode === 'list' && "flex-1"
            )}>
              <CardTitle className="text-lg">{template.name}</CardTitle>
              <CardDescription className="text-sm">
                {template.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className={cn(
              "p-4 pt-0",
              viewMode === 'list' && "flex-1"
            )}>
              <div className="flex flex-wrap gap-1">
                {template.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {template.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{template.tags.length - 3}
                  </Badge>
                )}
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                {template.config.canvas.width} × {template.config.canvas.height}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            <Grid className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold">No templates found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        </div>
      )}
    </div>
  )
}