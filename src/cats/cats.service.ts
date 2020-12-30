import { Injectable } from '@nestjs/common';

export interface Cat {
  name: string;
  id: number;
}

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [{ name: 'InitialOnlyCatName', id: 0 }];

  create(name: Cat['name']) {
    const newCat = { name, id: this.cats.length };
    if (this.cats.length > 10) return null;

    this.cats.push(newCat);

    return newCat;
  }

  getAll(): Cat[] {
    return this.cats;
  }
}
