import { ConflictException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose'
import { AuthCredentialsDto } from './dto/auth.dto'
import { User } from './interface/user.interface'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new this.userModel({ username, password: hashedPassword })
    try {
      await user.save()
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('user already exists')
      }
      throw error
    }
  }

  async signIn(user: User) {
    const payload = { username: user.username, sub: user._id }
    return {
      accessToken: this.jwtService.sign(payload)
    }
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ username })
    if (!user) {
      return null
    }
    const valid = await bcrypt.compare(password, user.password)
    if (valid) {
      return user
    }
    return null
  }
}
