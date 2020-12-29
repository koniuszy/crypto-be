import { CatsService, Cat } from './cats.service';
export declare class CatsController {
    private catsService;
    constructor(catsService: CatsService);
    getAll(): Cat[];
    create(body: {
        name: string;
    }): Cat;
}
