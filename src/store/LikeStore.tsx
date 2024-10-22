import { create } from 'zustand';
import { isExist } from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define types for song and store state
type Song = {
  id: string;
  title?: string;
  artist?: string;
  url: string;
};

type LikedSongsState = {
  likedSongs: Song[];
  addToLiked: (newSong: Song) => Promise<void>;
  loadLikedSongs: () => Promise<void>;
};

const useLikedSongs = create<LikedSongsState>((set) => ({
  likedSongs: [{ id: 'fj', url: '' }], // Providing minimal default
  addToLiked: async (newSong: Song) => {
    set((state) => {
      let isAlreadyLiked = isExist(state.likedSongs, newSong);
      const updatedSongs = isAlreadyLiked
        ? state.likedSongs.filter((item) => item.url !== newSong.url)
        : [newSong, ...state.likedSongs];
      AsyncStorage.setItem('likedSongs', JSON.stringify(updatedSongs));
      return {
        likedSongs: updatedSongs,
      };
    });
  },
  loadLikedSongs: async () => {
    try {
      const likedSongs = await AsyncStorage.getItem('likedSongs');
      if (likedSongs) {
        set({ likedSongs: JSON.parse(likedSongs) });
      }
    } catch (error) {
      console.error('Failed to load liked songs:', error);
    }
  },
}));

export default useLikedSongs;
