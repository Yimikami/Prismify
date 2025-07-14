import { useImageOptions } from '@/store/use-image-options'
import { useBackgroundOptions } from '@/store/use-background-options'
import { useFrameOptions } from '@/store/use-frame-options'
import { useResizeCanvas } from '@/store/use-resize-canvas'
import { Template } from '@/store/use-templates'

export function applyTemplateToCanvas(template: Template) {
  const { setScale } = useImageOptions.getState()
  const { setBackgroundType, setBackgroundColor, setBackgroundImage } = useBackgroundOptions.getState()
  const { setFrameType, setFrameColor, setShadow } = useFrameOptions.getState()
  const { setCanvasWidth, setCanvasHeight } = useResizeCanvas.getState()

  // Apply canvas settings
  setCanvasWidth(template.config.canvas.width)
  setCanvasHeight(template.config.canvas.height)

  // Apply background
  if (template.config.canvas.background.startsWith('linear-gradient')) {
    setBackgroundType('gradient')
    setBackgroundColor(template.config.canvas.background)
  } else if (template.config.canvas.background.startsWith('http')) {
    setBackgroundType('image')
    setBackgroundImage(template.config.canvas.background)
  } else {
    setBackgroundType('solid')
    setBackgroundColor(template.config.canvas.background)
  }

  // Apply frame settings
  setFrameType(template.config.frame.type)
  setFrameColor(template.config.frame.color)
  setShadow(template.config.frame.shadow)

  // Apply effects
  setScale(template.config.effects.brightness / 100)

  // Add default text if specified
  if (template.config.text.content) {
    const { texts, setTexts } = useImageOptions.getState()
    const newText = {
      id: Date.now(),
      content: template.config.text.content,
      style: {
        textSize: `${template.config.text.fontSize / 10}`,
        textColor: template.config.text.color,
        textAlign: 'left' as const,
        fontWeight: 500,
        fontFamily: template.config.text.fontFamily,
        letterSpacing: -0.03,
        textShadow: '',
        shadowName: '',
        shadowColor: '#000',
        shadowOpacity: 0,
        hasBackground: false,
        backgroundColor: '#ffffff',
        padding: '0',
        zIndex: 10,
        position: `${template.config.text.position.x}% ${template.config.text.position.y}%`
      }
    }
    setTexts([...texts, newText])
  }
}

export function getCurrentCanvasAsTemplate(name: string, description: string, category: Template['category']): Template {
  const { scale } = useImageOptions.getState()
  const { backgroundType, backgroundColor, backgroundImage } = useBackgroundOptions.getState()
  const { frameType, frameColor, shadow } = useFrameOptions.getState()
  const { canvasWidth, canvasHeight } = useResizeCanvas.getState()
  const { texts } = useImageOptions.getState()

  let background = backgroundColor
  if (backgroundType === 'image' && backgroundImage) {
    background = backgroundImage
  }

  const firstText = texts[0]
  const textConfig = firstText ? {
    content: firstText.content,
    fontSize: parseFloat(firstText.style.textSize) * 10,
    fontFamily: firstText.style.fontFamily,
    color: firstText.style.textColor,
    position: { x: 50, y: 50 } // Default position
  } : {
    content: name,
    fontSize: 48,
    fontFamily: 'Inter',
    color: '#333333',
    position: { x: 50, y: 50 }
  }

  return {
    id: `custom-${Date.now()}`,
    name,
    description,
    category,
    thumbnail: '/templates/custom.jpg',
    config: {
      canvas: {
        width: canvasWidth,
        height: canvasHeight,
        background
      },
      frame: {
        type: frameType,
        color: frameColor,
        shadow
      },
      text: textConfig,
      effects: {
        blur: 0,
        brightness: scale * 100,
        contrast: 100,
        saturation: 100
      }
    },
    tags: ['custom'],
    isCustom: true,
    createdAt: new Date()
  }
}