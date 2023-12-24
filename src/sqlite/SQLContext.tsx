import { createContext } from 'react';
import {TrackingStockEntity, WatchlistEntity} from '../type';

export interface SQLiteFunc {
  findAllWatchlist: () => Promise<WatchlistEntity[]>;
  createWatchlist: (value: WatchlistEntity) => void;
  updateWatchlist: (name: string, id: number) => void;
  deleteWatchlist: (value: WatchlistEntity) => void;
  findAllTrackingStocks : (watchlist : number) => Promise<TrackingStockEntity[]>; 
  createTrackingStocks : (value: TrackingStockEntity) => void;
  deleteTrackingStocks : (value: TrackingStockEntity) => void;
  countTrackingStocks: (watchlist: number) => Promise<number>;
}

const SQLiteContext = createContext<SQLiteFunc>({
  findAllWatchlist: () => Promise.resolve([]),
  createWatchlist: (value: WatchlistEntity) => undefined,
  updateWatchlist: (name : string, id: number) => undefined,
  deleteWatchlist: (value: WatchlistEntity) => undefined,
  findAllTrackingStocks : (watchlist : number) => Promise.resolve([]),
  createTrackingStocks : (value: TrackingStockEntity) => undefined,
  deleteTrackingStocks : (value: TrackingStockEntity) => undefined,
  countTrackingStocks : (watchlist: number) => Promise.resolve(0)
});

export default SQLiteContext;
