import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { RegisterDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { MailService } from '../mail/mail.service';
import { mailHtml } from 'src/mail/templates/mailTemplate';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly mailService: MailService,
  ) {}

  async hashPassword(password: string, salt: string | null): Promise<any> {
    if (salt === null) {
      salt = await bcrypt.genSalt(11);
    }
    const hashedPassword = await bcrypt.hash(password, salt);
    return { salt, password: hashedPassword };
  }

  async registerUser(user: RegisterDto) {
    const existingUser = await this.userModel.findOne({ email: user.email });

    if (existingUser) {
      throw new Error('User already exists');
    }
    const { password, salt } = await this.hashPassword(user.password, null);
    const newUser = new this.userModel({
      ...user,
      password,
      salt,
    });
    await newUser.save();

    // Send email after registration
    const emailSubject = 'Registration Confirmation';
    await this.mailService.sendMail(
      user.email,
      emailSubject,
      await mailHtml(user.password),
    );
  }

  async authenticateUser(email: string, password: string, headers) {
    const whereCondition: any = { email };

    if (headers.apptype === 'user') {
      whereCondition.role = 'user';
    }

    if (!headers.apptype) {
      whereCondition.role = {
        $ne: 'user',
      };
    }

    const user = await this.userModel.findOne(whereCondition, {
      password: 1,
      salt: 1,
      email: 1,
      name: 1,
      role: 1,
      following: 1,
    });
    if (!user) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    // if (user && !user.isVerified) {
    //   return new HttpException('User not verified', HttpStatus.UNAUTHORIZED);
    // }
    const { password: hashedPassword } = await this.hashPassword(
      password,
      user.salt,
    );
    if (user && hashedPassword === user.password) {
      delete user.password;
      delete user.salt;
      return user;
    }
    return new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }

  async getUserRoleById(id: string) {
    const role = await this.userModel.findById(id, 'role');
    return role;
  }
}
