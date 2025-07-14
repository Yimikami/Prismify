import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { applyTemplateToCanvas, getCurrentCanvasAsTemplate } from '@/utils/template-applier'

export interface Template {
  id: string
  name: string
  description: string
  category: 'social-media' | 'presentation' | 'marketing' | 'personal' | 'business'
  thumbnail: string
  config: {
    canvas: {
      width: number
      height: number
      background: string
    }
    frame: {
      type: 'none' | 'macbook' | 'iphone' | 'ipad' | 'desktop' | 'mobile'
      color: string
      shadow: boolean
    }
    text: {
      content: string
      fontSize: number
      fontFamily: string
      color: string
      position: { x: number; y: number }
    }
    effects: {
      blur: number
      brightness: number
      contrast: number
      saturation: number
    }
  }
  tags: string[]
  isCustom?: boolean
  createdAt?: Date
}

interface TemplatesStore {
  templates: Template[]
  selectedTemplate: Template | null
  customTemplates: Template[]
  
  // Actions
  setSelectedTemplate: (template: Template | null) => void
  addCustomTemplate: (template: Template) => void
  removeCustomTemplate: (templateId: string) => void
  applyTemplate: (template: Template) => void
  saveAsTemplate: (name: string, description: string, category: Template['category']) => void
}

const defaultTemplates: Template[] = [
  // Social Media Templates
  {
    id: 'instagram-post',
    name: 'Instagram Post',
    description: 'Perfect square format for Instagram posts',
    category: 'social-media',
    thumbnail: '/templates/instagram-post.jpg',
    config: {
      canvas: {
        width: 1080,
        height: 1080,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      },
      frame: {
        type: 'none',
        color: '#ffffff',
        shadow: false
      },
      text: {
        content: 'Your amazing content here',
        fontSize: 48,
        fontFamily: 'Inter',
        color: '#ffffff',
        position: { x: 50, y: 50 }
      },
      effects: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturation: 100
      }
    },
    tags: ['instagram', 'social', 'square', 'gradient']
  },
  {
    id: 'twitter-header',
    name: 'Twitter Header',
    description: 'Wide format perfect for Twitter headers',
    category: 'social-media',
    thumbnail: '/templates/twitter-header.jpg',
    config: {
      canvas: {
        width: 1500,
        height: 500,
        background: 'linear-gradient(90deg, #1da1f2 0%, #0d8bd9 100%)'
      },
      frame: {
        type: 'none',
        color: '#ffffff',
        shadow: false
      },
      text: {
        content: 'Your Twitter Header',
        fontSize: 64,
        fontFamily: 'Inter',
        color: '#ffffff',
        position: { x: 50, y: 50 }
      },
      effects: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturation: 100
      }
    },
    tags: ['twitter', 'header', 'wide', 'blue']
  },
  {
    id: 'linkedin-post',
    name: 'LinkedIn Post',
    description: 'Professional format for LinkedIn content',
    category: 'social-media',
    thumbnail: '/templates/linkedin-post.jpg',
    config: {
      canvas: {
        width: 1200,
        height: 628,
        background: 'linear-gradient(135deg, #0077b5 0%, #005885 100%)'
      },
      frame: {
        type: 'none',
        color: '#ffffff',
        shadow: false
      },
      text: {
        content: 'Professional Content',
        fontSize: 56,
        fontFamily: 'Inter',
        color: '#ffffff',
        position: { x: 50, y: 50 }
      },
      effects: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturation: 100
      }
    },
    tags: ['linkedin', 'professional', 'business', 'blue']
  },

  // Presentation Templates
  {
    id: 'presentation-slide',
    name: 'Presentation Slide',
    description: 'Clean slide format for presentations',
    category: 'presentation',
    thumbnail: '/templates/presentation-slide.jpg',
    config: {
      canvas: {
        width: 1920,
        height: 1080,
        background: '#ffffff'
      },
      frame: {
        type: 'none',
        color: '#333333',
        shadow: false
      },
      text: {
        content: 'Presentation Title',
        fontSize: 72,
        fontFamily: 'Inter',
        color: '#333333',
        position: { x: 50, y: 50 }
      },
      effects: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturation: 100
      }
    },
    tags: ['presentation', 'slide', 'clean', 'white']
  },
  {
    id: 'keynote-slide',
    name: 'Keynote Style',
    description: 'Elegant keynote presentation style',
    category: 'presentation',
    thumbnail: '/templates/keynote-slide.jpg',
    config: {
      canvas: {
        width: 1920,
        height: 1080,
        background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)'
      },
      frame: {
        type: 'none',
        color: '#ffffff',
        shadow: false
      },
      text: {
        content: 'Keynote Title',
        fontSize: 80,
        fontFamily: 'Inter',
        color: '#ffffff',
        position: { x: 50, y: 50 }
      },
      effects: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturation: 100
      }
    },
    tags: ['keynote', 'elegant', 'dark', 'gradient']
  },

  // Marketing Templates
  {
    id: 'product-showcase',
    name: 'Product Showcase',
    description: 'Highlight your products with style',
    category: 'marketing',
    thumbnail: '/templates/product-showcase.jpg',
    config: {
      canvas: {
        width: 1200,
        height: 800,
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
      },
      frame: {
        type: 'macbook',
        color: '#333333',
        shadow: true
      },
      text: {
        content: 'Product Name',
        fontSize: 60,
        fontFamily: 'Inter',
        color: '#ffffff',
        position: { x: 50, y: 50 }
      },
      effects: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturation: 100
      }
    },
    tags: ['product', 'showcase', 'macbook', 'pink']
  },
  {
    id: 'advertisement',
    name: 'Advertisement',
    description: 'Eye-catching ad format',
    category: 'marketing',
    thumbnail: '/templates/advertisement.jpg',
    config: {
      canvas: {
        width: 1200,
        height: 628,
        background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)'
      },
      frame: {
        type: 'none',
        color: '#ffffff',
        shadow: false
      },
      text: {
        content: 'Special Offer!',
        fontSize: 68,
        fontFamily: 'Inter',
        color: '#ffffff',
        position: { x: 50, y: 50 }
      },
      effects: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturation: 100
      }
    },
    tags: ['ad', 'offer', 'red', 'attention']
  },

  // Personal Templates
  {
    id: 'personal-blog',
    name: 'Personal Blog',
    description: 'Clean format for blog posts',
    category: 'personal',
    thumbnail: '/templates/personal-blog.jpg',
    config: {
      canvas: {
        width: 1200,
        height: 628,
        background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
      },
      frame: {
        type: 'none',
        color: '#333333',
        shadow: false
      },
      text: {
        content: 'Blog Post Title',
        fontSize: 56,
        fontFamily: 'Inter',
        color: '#333333',
        position: { x: 50, y: 50 }
      },
      effects: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturation: 100
      }
    },
    tags: ['blog', 'personal', 'soft', 'pastel']
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Showcase your work professionally',
    category: 'personal',
    thumbnail: '/templates/portfolio.jpg',
    config: {
      canvas: {
        width: 1200,
        height: 800,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      },
      frame: {
        type: 'iphone',
        color: '#000000',
        shadow: true
      },
      text: {
        content: 'Portfolio',
        fontSize: 64,
        fontFamily: 'Inter',
        color: '#ffffff',
        position: { x: 50, y: 50 }
      },
      effects: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturation: 100
      }
    },
    tags: ['portfolio', 'iphone', 'professional', 'purple']
  },

  // Business Templates
  {
    id: 'business-card',
    name: 'Business Card',
    description: 'Professional business card format',
    category: 'business',
    thumbnail: '/templates/business-card.jpg',
    config: {
      canvas: {
        width: 1050,
        height: 600,
        background: '#ffffff'
      },
      frame: {
        type: 'none',
        color: '#333333',
        shadow: false
      },
      text: {
        content: 'Your Name\nJob Title',
        fontSize: 48,
        fontFamily: 'Inter',
        color: '#333333',
        position: { x: 50, y: 50 }
      },
      effects: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturation: 100
      }
    },
    tags: ['business', 'card', 'professional', 'white']
  },
  {
    id: 'corporate-presentation',
    name: 'Corporate Presentation',
    description: 'Formal corporate presentation style',
    category: 'business',
    thumbnail: '/templates/corporate-presentation.jpg',
    config: {
      canvas: {
        width: 1920,
        height: 1080,
        background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)'
      },
      frame: {
        type: 'desktop',
        color: '#333333',
        shadow: true
      },
      text: {
        content: 'Corporate Title',
        fontSize: 76,
        fontFamily: 'Inter',
        color: '#ffffff',
        position: { x: 50, y: 50 }
      },
      effects: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturation: 100
      }
    },
    tags: ['corporate', 'formal', 'desktop', 'dark']
  }
]

export const useTemplates = create<TemplatesStore>()(
  persist(
    (set, get) => ({
      templates: defaultTemplates,
      selectedTemplate: null,
      customTemplates: [],

      setSelectedTemplate: (template: Template | null) => set({ selectedTemplate: template }),

      addCustomTemplate: (template: Template) => {
        const customTemplate = {
          ...template,
          id: `custom-${Date.now()}`,
          isCustom: true,
          createdAt: new Date()
        }
        set((state: TemplatesStore) => ({
          customTemplates: [...state.customTemplates, customTemplate]
        }))
      },

      removeCustomTemplate: (templateId: string) => {
        set((state: TemplatesStore) => ({
          customTemplates: state.customTemplates.filter((t: Template) => t.id !== templateId)
        }))
      },

      applyTemplate: (template: Template) => {
        applyTemplateToCanvas(template)
        set({ selectedTemplate: template })
      },

      saveAsTemplate: (name: string, description: string, category: Template['category']) => {
        const newTemplate = getCurrentCanvasAsTemplate(name, description, category)
        get().addCustomTemplate(newTemplate)
      }
    }),
    {
      name: 'prismify-templates',
      partialize: (state: TemplatesStore) => ({
        customTemplates: state.customTemplates
      })
    }
  )
)