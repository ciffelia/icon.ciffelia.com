import path from 'path'
import stream from 'stream'
import fs from 'fs'
import sharp from 'sharp'
import { GenerateOption } from './GenerateOption'

const iconPath = path.join(__dirname, '../_image/icon.png')

const generate = ({ size, format }: GenerateOption): stream.Readable => {
  const input = fs.createReadStream(iconPath)
  const transform = sharp().resize(size, size).toFormat(format)

  return input.pipe(transform)
}

export { generate }
