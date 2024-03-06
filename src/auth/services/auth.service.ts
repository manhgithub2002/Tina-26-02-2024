import { Payload } from '../strategies/accessToken.startegy';
import { ChangePasswordDto } from '../dtos/changePassword.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ForgotPasswordDto } from '../dtos/forgotPassword.dto';
import { UserService } from 'src/user/services/user.service';
import { JwtContants } from '../constants/constants';
import { Response } from 'express';
import { RefreshTokenDto } from '../dtos/refreshToken.dto';
import { FireBaseLoginResponse } from '../dtos/firebaseLoginResponse.dto';
import admin from 'src/firebaseConfig';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(res: Response, loginDto: LoginDto) {
    const existingUser = await this.userService.findByColumn(
      'username',
      loginDto.username,
    );

    if (!existingUser) {
      throw new BadRequestException('User not found');
    }

    const passwordMatched = await argon2.verify(
      existingUser.password,
      loginDto.password,
    );

    if (!passwordMatched) {
      throw new BadRequestException('Username or password incorrect');
    }
    const access_token = this.createToken('access_token', existingUser);
    const refresh_token = this.createToken('refresh_token', existingUser);

    this.sendRefreshToken('withoutFirebase', res, existingUser, refresh_token);

    return {
      access_token,
      refresh_token,
      existingUser,
    };
  }

  async SignInWithFirebase(
    firebaseLoginResponse: FireBaseLoginResponse,
    res: Response,
  ) {
    const { idToken, refreshToken } = firebaseLoginResponse;
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const existingUser = await this.userService.findByColumn(
        'email',
        decodedToken.email,
      );

      //Had account loggin with Firebase in DB
      if (existingUser && existingUser.username === '') {
        //update time,refresh token
        this.sendRefreshToken('firebase', res, existingUser, refreshToken);

        return {
          accessToken: idToken,
          refreshToken: refreshToken,
          user: existingUser,
        };
      }
      //
      else if (!existingUser) {
        //insert new user
        const newUser = new User();
        newUser.fullname = decodedToken.name;
        newUser.username = '';
        newUser.email = decodedToken.email;
        newUser.password = '';

        await this.userService.store(newUser);

        this.sendRefreshToken('firebase', res, newUser, refreshToken);

        return {
          accessToken: idToken,
          refreshToken: refreshToken,
          user: newUser,
        };
      }
      //Had account login without Firebase but same email
      else {
        throw new BadRequestException('Email already exists');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.userService.findByColumn(
      'username',
      registerDto.username,
    );

    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

    const password = await argon2.hash(registerDto.password);

    const newUser = new User();
    newUser.fullname = registerDto.fullname;
    newUser.username = registerDto.username;
    newUser.email = registerDto.email;
    newUser.password = password;

    await this.userService.store(newUser);

    return newUser;
  }

  async changePassword(
    res: Response,
    payload: Payload,
    changePasswordDto: ChangePasswordDto,
  ) {
    const user = await this.userService.findById(payload.sub);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const passwordMatched = await argon2.verify(
      user.password,
      changePasswordDto.oldPassword,
    );
    if (!passwordMatched) {
      throw new BadRequestException('Old password incorrect');
    }
    const password = await argon2.hash(changePasswordDto.newPassword);
    user.password = password;

    await this.userService.update(user.id, user);

    const acccess_token = this.createToken('access_token', user);
    const refresh_token = this.createToken('refresh_token', user);

    this.sendRefreshToken('withoutFirebase', res, user, refresh_token);

    return {
      acccess_token,
      refresh_token,
      user,
    };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {}

  async refreshToken(res: Response, refreshTokenPayload: RefreshTokenDto) {
    const existingUser = await this.userService.findById(
      refreshTokenPayload.payload.sub,
    );

    if (
      !existingUser ||
      existingUser.tokenVersion != refreshTokenPayload.tokenVersion
    ) {
      throw new BadRequestException('User does not exist');
    }

    const accessToken = this.createToken('access_token', existingUser);
    const refreshToken = this.createToken('refresh_token', existingUser);

    this.sendRefreshToken('withoutFirebase', res, existingUser, refreshToken);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      existingUser,
    };
  }

  createToken(type: 'access_token' | 'refresh_token', user: User) {
    return this.jwtService.sign(
      {
        sub: user.id,
        ...(type == 'refresh_token' ? { tokenVersion: user.tokenVersion } : {}),
      },
      type === 'access_token'
        ? { secret: JwtContants.access_token_secret_key, expiresIn: '15m' }
        : { secret: JwtContants.refresh_token_secret_key, expiresIn: '7d' },
    );
  }

  sendRefreshToken = (
    type: 'withoutFirebase' | 'firebase',
    res: Response,
    user: User,
    refreshToken: string,
  ) => {
    res.cookie('type', type, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });
    res.cookie(
      process.env.REFRESH_TOKEN_COOKIE_NAME as string,
      type === 'firebase'
        ? this.createToken('refresh_token', user)
        : refreshToken,
      {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
      },
    );
  };
}
