import { Plugin } from 'vite'
import path from 'path'
import { readFile, writeFile } from 'fs/promises'
import fastGlob from 'fast-glob'

interface StackSvgProps {
  pathToSpriteIcns: string
  output: string
}

async function generateStackSvg({ pathToSpriteIcns, output }: StackSvgProps): Promise<void> {
  const files = await fastGlob(`${pathToSpriteIcns}*.svg`)

  if (!files.length) {
    console.error(`
      =--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=
      | ❌ Wrong path to icons: ${pathToSpriteIcns}
      | Please, try to change the current path!
      =--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=
    `)

    return
  }

  let spriteContent = '<svg xmlns="http://www.w3.org/2000/svg">\n'

  for (const file of files) {
    const svgContent = await readFile(file, 'utf-8')
    const fileName = path.basename(file, '.svg')

    // Remove unused and redundant XML-code from <svg>
    const cleanedSvg: string = svgContent
      .replace(/<!DOCTYPE.*?>/g, '')
      .replace(/(xml|xmlns)=(["'])(.+?)\2/g, '')
      .replace(/version=(["'])(.+?)\1/g, '')
      .replace(/<svg/, `<svg id="${fileName}"`)

    spriteContent += `${cleanedSvg}`
  }

  spriteContent += '</svg>'

  await writeFile(output, spriteContent, 'utf-8')

  console.debug(`
    =--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=
    | ✅ Stack-SVG-Sprite was successfully updated!
    | Generated file: ${output}
    =--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=
  `)
}

export default function customStackSvgPlugin({ pathToSpriteIcns, output }: StackSvgProps): Plugin[] {
  return [{
    name: 'stack-svg-plugin',
    buildStart: async () => await generateStackSvg({ pathToSpriteIcns, output }),
  }]
}
