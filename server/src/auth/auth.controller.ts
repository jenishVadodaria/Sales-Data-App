import {
  Controller,
  Post,
  UseInterceptors,
  UsePipes,
  Body,
  ValidationPipe,
  Res,
  HttpStatus,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './auth.dto';
import { Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Role } from './roles.enum';
import { Roles } from './roles.decorator';

@ApiTags('Authentication APIs')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Registration of user' })
  @ApiBody({ type: RegisterDto, required: true })
  @ApiOkResponse({ status: 201, description: 'User registered successfully' })
  //   @UseInterceptors(ResponseInterceptor)
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new ValidationPipe())
  async register(@Body() user: RegisterDto, @Res() res: Response) {
    try {
      await this.authService.registerUser(user);
      return res.status(HttpStatus.CREATED).json({
        message: 'User registered successfully',
      });
    } catch (error) {
      if (error.message === 'User already exists') {
        // return res.status(HttpStatus.UNAUTHORIZED).json({
        return res.status(HttpStatus.CONFLICT).json({
          message: 'User already exists',
        });
      }
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'User registration failed',
      });
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Login of user' })
  @ApiBody({ type: LoginDto, required: true })
  @ApiOkResponse({ status: 200, description: 'User logged in successfully' })
  // @UseInterceptors(ResponseInterceptor)
  @UsePipes(new ValidationPipe())
  async login(
    @Body() user: LoginDto,
    @Headers() headers,
    @Res() res: Response,
  ) {
    const result = await this.authService.authenticateUser(
      user.email,
      user.password,
      headers,
    );
    if (result instanceof Error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: result.message,
      });
    }
    const payload = { _id: result._id, role: result.role };
    const accessToken = this.jwtService.sign(payload);

    return res.status(HttpStatus.OK).json({
      message: 'User logged in successfully',
      data: {
        accessToken,
        _id: result._id,
        email: result.email,
        name: result.name,
        following: result.following,
      },
    });
  }

  // TODO : get all users registered through excel file
}
