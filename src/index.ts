import type { Palette, TwelveHexColorArray, HexColor, RBGColor, PaletteConstructor, Palettes, BasePalette } from '../types'

export class YoruPalette<T extends string> {
    values: Palettes<T>
    base: BasePalette<'white' | 'black' | 'transparent'> = {
        white: {
            hex: '#ffffff',
            rgba: [255, 255, 255],
        },
        black: {
            hex: '#000000',
            rgba: [0, 0, 0],
        },
        transparent: {
            hex: '#ffffff00',
            rgba: [0, 0, 0],
        }
    }
    keys: T[]
    version = '0.0.1'

    constructor(palettes: Readonly<PaletteConstructor<T>>) {
        this.values = this.#registerPalettes(palettes)
        this.keys = Object.keys(this.values) as T[]
    }

    #hexToRgb(hex: string): RBGColor {
        const hexColor = hex.replace('#', '')
        const r = parseInt(hexColor.substring(0, 2), 16)
        const g = parseInt(hexColor.substring(2, 4), 16)
        const b = parseInt(hexColor.substring(4, 6), 16)
        const a = parseInt(hexColor.substring(6, 8), 16) || 255

        return [r, g, b, a]
    }

    #registerPalette(colors: TwelveHexColorArray): Palette {
        const shades = ['25', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] as const
        const palette: Palette = {} as Palette

        colors.forEach((color, index) => {
            const hex = `#${color}`.toLowerCase() as HexColor
            const rgba = this.#hexToRgb(hex)

            palette[shades[index]] = { hex, rgba }
        })

        return palette
    }

    #registerPalettes(palettes: PaletteConstructor<T>): Palettes<T> {
        const registeredPalettes: Partial<Palettes<T>> = {}

        Object.keys(palettes).forEach((key) => {
            registeredPalettes[key as T] = this.#registerPalette(palettes[key as T])
        })

        return registeredPalettes as Palettes<T>
    }
}