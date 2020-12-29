import {
  Controller,
  Get,
  Post,
  Body,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CatsService, Cat } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  getAll(): Cat[] {
    return this.catsService.getAll();
  }

  @Post()
  create(@Body() body: { name: string }): Cat {
    if (!body.name) {
      throw new UnprocessableEntityException({
        error: 'You need to provide "name" key.',
      });
    }

    this.catsService.create(body.name);
    return this.catsService.create(body.name);
  }
}
