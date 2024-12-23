// import TrackPlayer from 'react-native-track-player';

// module.exports = async function () {
//   // Event listener for remote play (from notification or headset buttons)
//   TrackPlayer.addEventListener('remote-play', () => {
//     TrackPlayer.play();
//   });

//   // Event listener for remote pause
//   TrackPlayer.addEventListener('remote-pause', () => {
//     TrackPlayer.pause();
//   });

//   // Event listener for remote stop
//   TrackPlayer.addEventListener('remote-stop', () => {
//     TrackPlayer.stop();
//   });

//   // Optionally, add listeners for other events like next, previous
//   TrackPlayer.addEventListener('remote-next', () => {
//     // Implement track skipping logic here
//   });

//   TrackPlayer.addEventListener('remote-previous', () => {
//     // Implement track skipping logic here
//   });
// };

const { default: TrackPlayer, Event } = require("react-native-track-player");

module.exports = async function() {
    TrackPlayer.addEventListener(Event.RemotePause, () => {
        console.log('Event.RemotePause');
        TrackPlayer.pause();
      });
    
      TrackPlayer.addEventListener(Event.RemotePlay, () => {
        console.log('Event.RemotePlay');
        TrackPlayer.play();
      });
    
      TrackPlayer.addEventListener(Event.RemoteNext, () => {
        console.log('Event.RemoteNext');
        TrackPlayer.skipToNext();
      });
    
      TrackPlayer.addEventListener(Event.RemotePrevious, () => {
        console.log('Event.RemotePrevious');
        TrackPlayer.skipToPrevious();
      });
}