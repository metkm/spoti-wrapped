import {
  TonalPalette,
  argbFromHex,
  argbFromRgb,
  rgbaFromArgb,
  themeFromSourceColor,
  type Theme,
} from '@material/material-color-utilities'
import ColorThief from 'colorthief'

const updateCssVariable = (tone: number, level: number) => {
  const rgba = rgbaFromArgb(tone)
  const rgbaString = `rgb(${rgba.r} ${rgba.g} ${rgba.b})`

  document.documentElement.style.setProperty(
    `--ui-color-primary-${level}`,
    rgbaString,
  )
}

export const useTheme = () => {
  const bgImage = useState<string | undefined>('bg-image')
  const theme = useState<Theme>(() =>
    themeFromSourceColor(argbFromHex('#4ade80')),
  )
  const palette = useState<TonalPalette>(() =>
    TonalPalette.fromInt(theme.value.schemes.dark.primary),
  )
  const colorMode = useColorMode()

  const scheme = computed(() => colorMode.value === 'dark' ? theme.value.schemes.dark : theme.value.schemes.light)

  const updateColorsFromImageElement = (element: HTMLImageElement) => {
    const thief = new ColorThief()

    const dominantColor = thief.getColor(element)
    if (!dominantColor) return

    theme.value = themeFromSourceColor(argbFromRgb(...dominantColor))

    // update primary colors
    palette.value = TonalPalette.fromInt(scheme.value.primary)

    // update css variables
    for (let index = 0; index < 90; index += 10) {
      const tone = palette.value.tone(index === 0 ? 5 : index)

      updateCssVariable(tone, 900 - index * 10)
    }

    updateCssVariable(palette.value.tone(90), 50)
    updateCssVariable(palette.value.tone(10), 950)
  }

  return {
    bgImage,
    palette,
    theme,
    scheme,
    updateColorsFromImageElement,
  }
}
