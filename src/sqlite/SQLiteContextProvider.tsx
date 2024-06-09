import SQLiteContext from './SQLContext';
import React from 'react';
import SQLite from 'react-native-sqlite-storage';
import {WatchlistEntity, TrackingStockEntity} from '../type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE } from '../constants';

const SQLiteContextProvider = ({children}: {children: React.ReactNode}) => {
  const dbRef = React.useRef<SQLite.SQLiteDatabase>();

  //Watchlist
  const findAllWatchlist = React.useCallback((): Promise<WatchlistEntity[]> => {
    return new Promise<WatchlistEntity[]>((resolve, reject) => {
      if (!dbRef.current) return reject('DB not found');
      dbRef.current.transaction(tz => {
        tz.executeSql(`SELECT * FROM watchlist`, [], (tran, result) => {
          resolve(result.rows.raw());
        });
      });
    });
  }, []);

  const createWatchlist = (value: WatchlistEntity) => {
    if (!dbRef.current) return;
    dbRef.current.transaction(tx =>
      tx.executeSql('INSERT INTO watchlist (name) VALUES (?)', [value.name]),
    );
  };

  const deleteWatchlist = (value: WatchlistEntity) => {
    if (!dbRef.current) return;
    dbRef.current.transaction(tx =>
      tx.executeSql(`DELETE FROM watchlist WHERE id = ?;`, [value.id]),
    );
  };

  const updateWatchlist = (name: string, id: number) => {
    if (!dbRef.current) return;
    dbRef.current.transaction(tx =>
      tx.executeSql(
        'UPDATE watchlist SET name = ? WHERE id = ?;',[name, id],),
    );
  };

  //stracking_strock
  const findAllTrackingStocks = React.useCallback((watchlist : number): Promise<TrackingStockEntity[]> => {
    return new Promise<TrackingStockEntity[]>((resolve, reject) => {
      if (!dbRef.current) return reject('DB not found');
      dbRef.current.transaction(tz => {
        tz.executeSql(`SELECT * FROM tracking_stocks WHERE watchlist = ${watchlist}`, [], (tran, result) => {
          resolve(result.rows.raw());
        });
      });
    });
  }, []);

  const countTrackingStocks = React.useCallback((watchlist: number): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
      if (!dbRef.current) return reject('DB not found');
      dbRef.current.transaction(tz => {
        tz.executeSql(
          `SELECT COUNT(*) AS count FROM tracking_stocks WHERE watchlist = ?`,
          [watchlist],
          (tran, result) => {
            const count = result.rows.item(0)?.count || 0;
            resolve(count);
          },
          (error) => {
            reject(error);
          }
        );
      });
    });
  }, []);

  const createTrackingStocks = (value: TrackingStockEntity) : Promise<TrackingStockEntity | null> => {
    return new Promise((resolve, reject) => {
      if (!dbRef.current) return resolve(null);
  
      dbRef.current.transaction(tx => {
        tx.executeSql(
          `INSERT into tracking_stocks (code, watchlist) VALUES (?, ?)`,
          [value.code, value.watchlist],
          (_, result) => {
            const insertId = result.insertId;
            tx.executeSql(
              `SELECT * FROM tracking_stocks WHERE id = ?`,
              [insertId],
              (_, { rows }) => {
                if (rows.length > 0) {
                  resolve(rows.item(0) as TrackingStockEntity);
                } else {
                  resolve(null);
                }
              },
              (tx, error) => {
                reject(error);
                return false;
              }
            );
          },
          (tx, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  };
  

  const deleteTrackingStocks = (value: TrackingStockEntity): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (!dbRef.current) {
        reject(false);
        return;
      }
  
      dbRef.current.transaction(
        tx => {
          tx.executeSql(
            'DELETE FROM tracking_stocks WHERE id = ?',
            [value.id],
            (_, result) => {
              if (result.rowsAffected > 0) {
                resolve(true);
              } else {
                resolve(false);
              }
            },
            error => {
              reject(false);
            }
          );
        },
        error => {
          reject(false);
        }
      );
    });
  };
  
  //Stock FIlter
  



  React.useEffect(() => {
    const db = SQLite.openDatabase(
      {
        name: 'investmate.db',
      },
      () => null,
    );

    db.executeSql(`CREATE TABLE if NOT EXISTS watchlist (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT
      )`);

    db.executeSql(
      `CREATE TABLE IF NOT EXISTS tracking_stocks 
      (id INTEGER PRIMARY KEY AUTOINCREMENT, code TEXT, watchlist INTEGER)`,
    );

    // db.executeSql(
    //   `CREATE TABLE IF NOT EXISTS stock_filter 
    //   (id INTEGER PRIMARY KEY AUTOINCREMENT, 
    //    name TEXT, 
    //    watchlist INTEGER, 
    //    key TEXT, 
    //    min_value DOUBLE(10, 2), 
    //    max_value DOUBLE(10, 2), 
    //    current_min_value DOUBLE(10, 2), 
    //    current_max_value DOUBLE(10, 2))`,
    // );

    const check = async()=> {
      const isFirstLaunchApp = await AsyncStorage.getItem(STORAGE.IS_FIRST_LAUNCH_APP);
      if(isFirstLaunchApp === null) {
        db.executeSql(`INSERT INTO watchlist (name) VALUES ("Default")`);
        AsyncStorage.setItem(STORAGE.IS_FIRST_LAUNCH_APP, "false");
      }
    }
    check();   

    dbRef.current = db;
  }, []);

  const value = React.useMemo(
    () => ({
      findAllWatchlist, 
      createWatchlist, 
      updateWatchlist, 
      deleteWatchlist, 
      findAllTrackingStocks, 
      createTrackingStocks, 
      deleteTrackingStocks,
      countTrackingStocks
    }),
    [],
  );

  return (
    <SQLiteContext.Provider value={value}>{children}</SQLiteContext.Provider>
  );
};

export default SQLiteContextProvider;
