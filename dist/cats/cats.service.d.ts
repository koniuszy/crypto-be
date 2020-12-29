export interface Cat {
    name: string;
    id: number;
}
export declare class CatsService {
    private readonly cats;
    create(name: Cat['name']): {
        name: string;
        id: number;
    };
    getAll(): Cat[];
}
