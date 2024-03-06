import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { BirthdayController } from './controllers/birthday.controller';
import { BirthdayService } from './services/birthday.service';

@Module({
  imports: [UserModule],
  controllers: [BirthdayController],
  providers: [BirthdayService],
  exports: [],
})
export class BirthdayModule {}
