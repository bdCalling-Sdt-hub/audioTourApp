package com.audiotour;

import android.media.MediaPlayer;
import android.util.Log;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.ArrayList;
import java.util.Collections;

public class MusicControlModule extends ReactContextBaseJavaModule {
   private MediaPlayer mediaPlayer;
    private ArrayList<String> trackList = new ArrayList<>();  // Declare trackList
    private int currentTrackIndex = 0;  // Initialize currentTrackIndex
 private String currentTrackUrl;  // Declare currentTrackUrl

 
    public MusicControlModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "MusicControlModule";
    }

    // Play a track from a dynamic URL
    @ReactMethod
    public void play(String url, Promise promise) {
        try {
            if (mediaPlayer != null) {
                mediaPlayer.reset();
            }

            mediaPlayer = new MediaPlayer();
            mediaPlayer.setDataSource(url); // Set the dynamic URL
            mediaPlayer.setLooping(false);

            mediaPlayer.setOnPreparedListener(new MediaPlayer.OnPreparedListener() {
                @Override
                public void onPrepared(MediaPlayer mp) {
                    mp.start();
                    currentTrackUrl = url;  // Save the current track URL
                    promise.resolve("Playing music from URL: " + url);
                }
            });

            mediaPlayer.setOnErrorListener(new MediaPlayer.OnErrorListener() {
                @Override
                public boolean onError(MediaPlayer mp, int what, int extra) {
                    promise.reject("PlaybackError", "Error during playback: " + what);
                    return true;
                }
            });

            mediaPlayer.prepareAsync(); // Asynchronous preparation
        } catch (Exception e) {
            Log.e("MusicControlModule", "Error playing music", e);
            promise.reject("Error", "Error playing music: " + e.getMessage());
        }
    }


// handle progress bar
@ReactMethod
public void getDuration(Promise promise) {
    if (mediaPlayer != null) {
        int duration = mediaPlayer.getDuration(); // Get the duration in milliseconds
        promise.resolve(duration /1000);
    } else {
        promise.reject("Error", "Media player is not initialized.");
    }
}





@ReactMethod
public void getCurrentPosition(Promise promise) {
    if (mediaPlayer != null) {
        int currentPosition = mediaPlayer.getCurrentPosition(); // Get current position in milliseconds
        promise.resolve(currentPosition / 1000);
    } else {
        promise.reject("Error", "Media player is not initialized.");
    }
}


// volume
@ReactMethod
public void toggleMute(boolean isMute, Promise promise) {
    if (mediaPlayer != null) {
        if (isMute) {
            mediaPlayer.setVolume(0f, 0f); // Mute both left and right channels
        } else {
            mediaPlayer.setVolume(1f, 1f); // Unmute
        }
        promise.resolve("Volume toggled");
    } else {
        promise.reject("Error", "MediaPlayer is not initialized");
    }
}


// Shuffle the track list and play from the first track
    @ReactMethod
    public void shuffleTracks(Promise promise) {
        try {
            if (trackList.size() > 1) {
                Collections.shuffle(trackList); // Shuffle the track list
                currentTrackIndex = 0;  // Reset to the first track after shuffling
                String shuffledTrackUrl = trackList.get(currentTrackIndex); // Get the first shuffled track

                play(shuffledTrackUrl, promise); // Play the shuffled track
                promise.resolve("Track list shuffled and playing first track");
            } else {
                promise.reject("Error", "Not enough tracks to shuffle");
            }
        } catch (Exception e) {
            Log.e("MusicControlModule", "Error shuffling tracks", e);
            promise.reject("Error", "Error shuffling tracks: " + e.getMessage());
        }
    }

    // Get the current track URL
    @ReactMethod
    public void getCurrentTrack(Promise promise) {
        if (currentTrackIndex >= 0 && currentTrackIndex < trackList.size()) {
            promise.resolve(trackList.get(currentTrackIndex));
        } else {
            promise.reject("Error", "No track available");
        }
    }


    // Skip to the next track (URL passed dynamically from React Native)
    @ReactMethod
    public void skipToNext(String nextTrackUrl, Promise promise) {
        if (nextTrackUrl != null && !nextTrackUrl.isEmpty()) {
            play(nextTrackUrl, promise);
        } else {
            promise.reject("Error", "No next track URL provided");
        }
    }

    // Skip to the previous track (URL passed dynamically from React Native)
    @ReactMethod
    public void skipToPrevious(String previousTrackUrl, Promise promise) {
        if (previousTrackUrl != null && !previousTrackUrl.isEmpty()) {
            play(previousTrackUrl, promise);
        } else {
            promise.reject("Error", "No previous track URL provided");
        }
    }

    // Pause the music
    @ReactMethod
    public void pause(Promise promise) {
        if (mediaPlayer != null && mediaPlayer.isPlaying()) {
            mediaPlayer.pause();
            promise.resolve("Music paused");
        } else {
            promise.reject("Error", "No music is playing to pause");
        }
    }

    // Stop the music
    @ReactMethod
    public void stop(Promise promise) {
        if (mediaPlayer != null) {
            mediaPlayer.stop();
            mediaPlayer.release();
            mediaPlayer = null;
            currentTrackUrl = null;
            promise.resolve("Music stopped");
        } else {
            promise.reject("Error", "No music is playing to stop");
        }
    }
}
