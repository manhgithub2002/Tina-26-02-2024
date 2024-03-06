import { ApiTags } from '@nestjs/swagger';
import { BirthdayService } from '../services/birthday.service';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';

@ApiTags('Birthday')
@Controller('birthday')
@UseInterceptors(ClassSerializerInterceptor)
export class BirthdayController {
  constructor(private readonly birthdayService: BirthdayService) {}
  @Get('birthday-in-month')
  async birthdayInMonth() {
    return await this.birthdayService.getBirthdayInMonth();
  }
}
