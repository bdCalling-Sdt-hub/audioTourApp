import TrackPlayer from 'react-native-track-player';

module.exports = async function () {
  // Event listener for remote play (from notification or headset buttons)
  TrackPlayer.addEventListener('remote-play', () => {
    TrackPlayer.play();
  });

  // Event listener for remote pause
  TrackPlayer.addEventListener('remote-pause', () => {
    TrackPlayer.pause();
  });

  // Event listener for remote stop
  TrackPlayer.addEventListener('remote-stop', () => {
    TrackPlayer.stop();
  });

  // Optionally, add listeners for other events like next, previous
  TrackPlayer.addEventListener('remote-next', () => {
    // Implement track skipping logic here
  });

  TrackPlayer.addEventListener('remote-previous', () => {
    // Implement track skipping logic here
  });
};

// import TrackPlayer, { Event } from "react-native-track-player";

// const trackPlayerService = async () => {
//   TrackPlayer.addEventListener(Event.RemotePause, async () => {
//     console.log('Event.RemotePause');
//     await TrackPlayer.pause();
//   });

//   TrackPlayer.addEventListener(Event.RemotePlay, async () => {
//     console.log('Event.RemotePlay');
//     await TrackPlayer.play();
//   });

//   TrackPlayer.addEventListener(Event.RemoteNext, async () => {
//     console.log('Event.RemoteNext');
//     try {
//       await TrackPlayer.skipToNext();
//     } catch (error) {
//       console.error('Error skipping to next track:', error);
//     }
//   });

//   TrackPlayer.addEventListener(Event.RemotePrevious, async () => {
//     console.log('Event.RemotePrevious');
//     try {
//       await TrackPlayer.skipToPrevious();
//     } catch (error) {
//       console.error('Error skipping to previous track:', error);
//     }
//   });
// };

// export default trackPlayerService;
