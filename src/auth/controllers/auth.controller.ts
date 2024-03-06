import { Payload } from '../strategies/accessToken.startegy';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { ChangePasswordDto } from '../dtos/changePassword.dto';
import { ForgotPasswordDto } from '../dtos/forgotPassword.dto';
import { RefreshTokenDto } from '../dtos/refreshToken.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Res({ passthrough: true }) res, @Body() loginDto: LoginDto) {
    return this.authService.login(res, loginDto);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @UseGuards(AccessTokenGuard)
  @Post('change-password')
  async changePassword(
    @Res({ passthrough: true }) res,
    @Req() req,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return await this.authService.changePassword(
      res,
      req.user as Payload,
      changePasswordDto,
    );
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return await this.authService.forgotPassword(forgotPasswordDto);
  }

  //   @Post('reset-password')
  //   async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
  //     return await this.authService.resetPassword(resetPasswordDto);
  //   }

  @Post('refresh-token')
  async refreshToken(@Res() res, @Body() refreshTokenDto: RefreshTokenDto) {
    return await this.authService.refreshToken(res, refreshTokenDto);
  }

  //   @Post('logout')
  //   async logout(@Body() logoutDto: LogoutDto) {
  //     return await this.authService.logout(logoutDto);
  //   }
}
