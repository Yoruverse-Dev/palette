export type HexColor = `#${string}`
export type RBGColor = [number, number, number, number?]

type Shades = '25' | '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '950'

export type Palette = BasePalette<Shades>

export type BasePalette<T extends string> = {
    [key in T]: {
        hex: HexColor
        rgba: RBGColor
    }
}

export type Palettes<T extends string | number | symbol = string> = {
    [key in T]: Palette
}

export type TwelveHexColorArray<T = string> = Readonly<[T, T, T, T, T, T, T, T, T, T, T, T]>

export type PaletteConstructor<T extends string | number | symbol = string> = {
    [key in T]: TwelveHexColorArray;
};
