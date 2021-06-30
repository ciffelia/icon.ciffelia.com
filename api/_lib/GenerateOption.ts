import { Type } from 'class-transformer'
import { IsIn, IsInt, IsPositive } from 'class-validator'

class GenerateOption {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  size!: number

  @IsIn(['jpeg', 'png', 'webp', 'gif', 'avif'])
  format!: 'jpeg' | 'png' | 'webp' | 'gif' | 'avif'
}

export { GenerateOption }
