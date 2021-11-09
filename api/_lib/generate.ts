import path from 'path'
import stream from 'stream'
import fs from 'fs'
import sharp from 'sharp'
import { GenerateOption } from './GenerateOption'

const iconPath = path.join(__dirname, '../_image/icon.png')

const generate = ({
  size,
  rounded,
  format
}: GenerateOption): stream.Readable => {
  const input = fs.createReadStream(iconPath)
  let transform = sharp().resize(size, size).toFormat(format)

  if (rounded) {
    const mask = Buffer.from(
      `<svg><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" /></svg>`
    )
    transform = transform.composite([{ input: mask, blend: 'dest-in' }])
  }

  return input.pipe(transform)
}

export { generate }
