import {
  Controller,
  Get,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Param,
  Put,
  Body,
  Delete,
  Patch,
  Query,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { FollowCompanyDto } from './dto/follow-company.dto';

@ApiTags('User Collection APIs')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('list')
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get all user details' })
  @ApiOkResponse({
    status: 200,
    description: 'All User details fetched successfully',
  })
  //   @UseInterceptors(ResponseInterceptor)
  @UsePipes(new ValidationPipe())
  getAllUsers(@Query('q') query: string) {
    return this.usersService.getAllUsers(query);
  }

  @Get('user/:id')
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get user details' })
  @ApiOkResponse({
    status: 200,
    description: 'User details fetched successfully',
  })
  //   @UseInterceptors(ResponseInterceptor)
  @UsePipes(new ValidationPipe())
  getUserDetails(@Param('id') id: string) {
    return this.usersService.getUserDetails(id);
  }

  @Patch('user/update/:id')
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update a user info.' })
  @ApiBody({ type: UpdateUserDto, required: true })
  @ApiOkResponse({ status: 200, description: 'User updated successfully' })
  //   @UseInterceptors(ResponseInterceptor)
  @UsePipes(new ValidationPipe())
  updateUser(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string) {
    return this.usersService.updateUser(updateUserDto, id);
  }

  @Delete('user/delete')
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Soft Delete a user' })
  @ApiBody({ type: DeleteUserDto, required: true })
  @ApiOkResponse({ status: 200, description: 'User deleted successfully' })
  //   @UseInterceptors(ResponseInterceptor)
  @UsePipes(new ValidationPipe())
  deleteUser(@Body() deleteUserDto: DeleteUserDto) {
    return this.usersService.deleteUser(deleteUserDto);
  }

  @Post('user/follow')
  @ApiBearerAuth()
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Follow a company' })
  @ApiBody({ type: FollowCompanyDto, required: true })
  @ApiOkResponse({ status: 200, description: 'Company followed successfully' })
  //   @UseInterceptors(ResponseInterceptor)
  @UsePipes(new ValidationPipe())
  followCompany(@Body() followCompanyDto: FollowCompanyDto) {
    return this.usersService.followCompany(followCompanyDto);
  }

  @Post('user/unfollow')
  @ApiBearerAuth()
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Unfollow a company' })
  @ApiBody({ type: FollowCompanyDto, required: true })
  @ApiOkResponse({
    status: 200,
    description: 'Company unfollowed successfully',
  })
  //   @UseInterceptors(ResponseInterceptor)
  @UsePipes(new ValidationPipe())
  unfollowCompany(@Body() followCompanyDto: FollowCompanyDto) {
    return this.usersService.unfollowCompany(followCompanyDto);
  }
}
