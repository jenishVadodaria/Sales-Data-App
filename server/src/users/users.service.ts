import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { FollowCompanyDto } from './dto/follow-company.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly authService: AuthService,
  ) {}

  // async getAllUsers() {
  //   try {
  //     const users = await this.userModel.find({ isDeleted: false });
  //     return users;
  //   } catch (error) {
  //     throw new Error('Failed to retrieve users');
  //   }
  // }

  async getAllUsers(query: string) {
    try {
      const filter = { isDeleted: false };
      if (query) {
        const regexQuery = new RegExp(query, 'i');
        filter['$or'] = [
          { name: regexQuery },
          { email: regexQuery },
          // Add more fields to search against, if needed
        ];
      }
      const users = await this.userModel.find(filter);
      return users;
    } catch (error) {
      throw new Error('Failed to retrieve users');
    }
  }

  async getUserDetails(_id: string) {
    try {
      const user = await this.userModel.findOne({ _id, isDeleted: false });
      if (user) {
        return user;
      } else {
        return `User not Found`;
      }
    } catch (error) {
      throw new Error('Failed to retrieve user');
    }
  }

  async updateUser(updateUserDto: UpdateUserDto, id: string) {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(
        id,
        updateUserDto,
        {
          new: true,
        },
      );

      return updatedUser;
    } catch (error) {
      throw new Error('Failed to Update User');
    }
  }

  async deleteUser(deleteUserDto: DeleteUserDto) {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(
        deleteUserDto._id,
        deleteUserDto,
        { new: true },
      );

      if (updatedUser.isDeleted) {
        return 'User Deletion is successful';
      } else {
        throw new Error('User Deletion is not successfull');
      }
    } catch (error) {
      throw new Error('Failed to Delete User');
    }
  }

  async followCompany(followCompanyDto: FollowCompanyDto) {
    try {
      const user = await this.userModel.findOneAndUpdate(
        { _id: followCompanyDto.userId },
        { $addToSet: { following: followCompanyDto.companyId } },
        { new: true },
      );

      if (user) {
        return user;
      }
    } catch (error) {
      return error;
    }
  }

  async unfollowCompany(followCompanyDto: FollowCompanyDto) {
    try {
      const user = await this.userModel.findOneAndUpdate(
        { _id: followCompanyDto.userId },
        { $pull: { following: followCompanyDto.companyId } },
        { new: true },
      );

      if (user) {
        return user;
      }
    } catch (error) {
      return error;
    }
  }
}
