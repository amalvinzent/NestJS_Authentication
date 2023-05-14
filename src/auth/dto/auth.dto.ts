import { IsString, MaxLength, MinLength } from 'class-validator'

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string

  @IsString()
  @MinLength(8, { message: 'short password' })
  @MaxLength(20, { message: 'password too long' })
  password: string
}
