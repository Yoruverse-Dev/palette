import type { Palette, TwelveHexColorArray, HexColor, RBGColor, PaletteContructor, Palettes } from '@type/index'
import { PalettesHex, type PalettesKeys } from 'palettes'

class YoruPalette<T extends string> {
    palette: Palettes<T>

    constructor(palettes: Readonly<PaletteContructor<T>>) {
        this.palette = this.#registerPalettes(palettes)
    }

    #hexToRgb(hex: string): RBGColor {
        const hexColor = hex.replace('#', '')
        const r = parseInt(hexColor.substring(0, 2), 16)
        const g = parseInt(hexColor.substring(2, 4), 16)
        const b = parseInt(hexColor.substring(4, 6), 16)

        return [r, g, b]
    }

    #registerPalette(colors: TwelveHexColorArray): Palette {
        const shades = ['25', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] as const
        const palette: Palette = {} as Palette

        colors.forEach((color, index) => {
            const hex = `#${color}`.toLowerCase() as HexColor
            const rgb = this.#hexToRgb(hex)

            palette[shades[index]] = { hex, rgb }
        })

        return palette
    }

    #registerPalettes(palettes: PaletteContructor<T>): Palettes<T> {
        const registeredPalettes: Partial<Palettes<T>> = {}

        Object.keys(palettes).forEach((key) => {
            registeredPalettes[key as T] = this.#registerPalette(palettes[key as T])
        })

        return registeredPalettes as Palettes<T>
    }
}

const palette = new YoruPalette<PalettesKeys>(PalettesHex)

console.dir(palette.palette.yellow)