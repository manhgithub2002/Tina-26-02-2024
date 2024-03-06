import { Module } from '@nestjs/common';
import { UploadService } from './services/upload.service';
import { UploadController } from './controllers/upload.controller';

@Module({
  imports: [],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}
