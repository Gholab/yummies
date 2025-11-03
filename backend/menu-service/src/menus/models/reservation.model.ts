export interface Reservation {
    code: number;
    menu: {
        starters: string[];
        mains: string[];
        desserts: string[];
    };
    tableNumbers : number[];
    menuPrice: number;
}