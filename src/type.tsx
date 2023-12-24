import { HttpStatusCode } from "axios";

export interface Response<T> {
    data: T;
    status: HttpStatusCode;
    error: any;
    message?: string;
}

export type ParamList = {
    stockinfo: {
        item : StockInfoProps
    },
};

export interface StockInfoProps {
    name: string,
    code: string,
    chart: any,
    smg : number,
    price: number,
    changePrice: number,
    changePricePercent: number,
    exchange: string,
    time: number
}

export interface WatchlistEntity {
    id: number
    name : string
}

export interface TrackingStockEntity {
    id: number,
    code : string,
    watchlist : number
}