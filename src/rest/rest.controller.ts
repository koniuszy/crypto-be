import { Controller, Get } from '@nestjs/common';

@Controller('rest')
export class RestController {
  @Get()
  getRestResponse() {
    return JSON.stringify({ message: 'rest-response sample' });
  }
}
