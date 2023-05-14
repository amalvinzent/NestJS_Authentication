import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  ValidationPipe
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthCredentialsDto } from './dto/auth.dto'
import { JwtAuthGuard } from './guard/jwt-auth.guard'
import { LocalAuthGuard } from './guard/local-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
  ): Promise<void> {
    return await this.authService.signUp(authCredentialsDto)
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Request() req) {
    return this.authService.signIn(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('myinfo')
  getMe(@Request() req) {
    return req.user
  }
}
