import { Type } from 'class-transformer'
import { IsBoolean, IsIn, IsInt, IsPositive } from 'class-validator'

class GenerateOption {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  size: number = 512

  @Type(() => Boolean)
  @IsBoolean()
  rounded: boolean = false

  @Type(() => String)
  @IsIn(['jpeg', 'png', 'webp', 'gif', 'avif'])
  format: 'jpeg' | 'png' | 'webp' | 'gif' | 'avif' = 'png'
}

export { GenerateOption }
