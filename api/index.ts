import 'reflect-metadata'
import { VercelRequest, VercelResponse } from '@vercel/node'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { GenerateOption } from './_lib/GenerateOption'
import { generate } from './_lib/generate'

const handler = async (
  request: VercelRequest,
  response: VercelResponse
): Promise<void> => {
  const option = plainToClass(GenerateOption, request.query, {
    exposeDefaultValues: true
  })

  const validationErrors = await validate(option, {
    forbidUnknownValues: true,
    validationError: { target: false }
  })
  if (validationErrors.length !== 0) {
    response.status(400).json({
      errors: validationErrors
    })
    return
  }

  response.status(200)
  response.setHeader('content-type', `image/${option.format}`)
  response.setHeader('cache-control', 'public,max-age=31536000,immutable')
  generate(option).pipe(response)
}

export default handler
