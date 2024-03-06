import {
  Body,
  Controller,
  ParseFilePipe,
  Post,
  UploadedFiles,
} from '@nestjs/common';

@Controller('uploads')
export class UploadController {
  @Post('upload-file')
  uploadFile(
    @Body() body,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [],
      }),
    )
    file: Express.Multer.File,
  ) {
    return {
      body,
      file: file.buffer.toString(),
    };
  }
}
