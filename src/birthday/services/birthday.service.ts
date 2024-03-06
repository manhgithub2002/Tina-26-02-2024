import { UserService } from '../../user/services/user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BirthdayService {
  constructor(private readonly userService: UserService) {}

  getBirthdayInMonth() {
    return this.userService.getUsersWithBirhdayInMonth();
  }
}
