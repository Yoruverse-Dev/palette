# Yoruverse Palette
A collection of color palettes for Yoruverse projects. This can be fully customized to fit the needs of the project.

## Installation
```bash
npm install @yoruverse/palette
# or
yarn add @yoruverse/palette
# or
pnpm add @yoruverse/palette
# or
bun add @yoruverse/palette
```

## Usage
```ts
import { YoruPalette, PalettesHex, type PalettesKeys } from '@yoruverse/palette'

const palette = new YoruPalette<PalettesKeys>(PalettesHex)

console.log(palette.values.blue[500].hex)
```

## Customization
You can customize the palette by creating a new object with the same structure as `PalettesHex` and passing it to the `YoruPalette` constructor.

```ts
const CustomPalettesHex = {
    // You should add twelve shades for each color
    yellow: ['#fffff', ..., ..., ...],
} as const

type CustomPalettesKeys = keyof typeof CustomPalettesHex

const palette = new YoruPalette<CustomPalettesKeys>(CustomPalettesHex)

console.log(palette.values.yellow[25].hex)
```

## YoruPalette properties
- `values`: An object containing all the colors and their shades.
> [!NOTE] 
> It return hex and rgb values for each shade.
- `keys`: An array containing all the color names.
- `version`: The version of the palette.

## License
See [LICENSE.md](./LICENSE.md) for more information.
