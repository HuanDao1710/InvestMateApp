export enum STORAGE {
  IS_FIRST_LAUNCH_APP = 'is_first_launch_app',
}

export const ROOT_PATH = 'https://e656-14-162-145-192.ngrok-free.app';


export type RootRouter = {
  HomeScreen: undefined;
  SearchScreen: undefined;
  WatchListSearch: {
    watchlistId: string
  }
};