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
    private ArrayList<String> trackList = new ArrayList<>();  // Track list to hold multiple URLs
    private int currentTrackIndex = 0;  // Current track index for navigation
    private String currentTrackUrl;  // Current track URL

    public MusicControlModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "MusicControlModule";
    }

    // Set track list from JavaScript
    @ReactMethod
    public void setTrackList(ArrayList<String> tracks, Promise promise) {
        try {
            trackList.clear();
            trackList.addAll(tracks);  // Update the track list dynamically
            currentTrackIndex = 0;  // Reset to the first track
            promise.resolve("Track list set successfully.");
        } catch (Exception e) {
            promise.reject("Error", "Failed to set track list: " + e.getMessage());
        }
    }

    // Play a track from a dynamic URL
    @ReactMethod
    public void play(String url, Promise promise) {
        try {
            if (mediaPlayer != null) {
                mediaPlayer.reset();
            }

            mediaPlayer = new MediaPlayer();
            mediaPlayer.setDataSource(url);  // Set the dynamic URL
            mediaPlayer.setLooping(false);

            mediaPlayer.setOnPreparedListener(mp -> {
                mp.start();
                currentTrackUrl = url;  // Save the current track URL
                promise.resolve("Playing music from URL: " + url);
            });

            mediaPlayer.setOnErrorListener((mp, what, extra) -> {
                promise.reject("PlaybackError", "Error during playback: " + what);
                return true;
            });

            mediaPlayer.prepareAsync();  // Asynchronous preparation
        } catch (Exception e) {
            Log.e("MusicControlModule", "Error playing music", e);
            promise.reject("Error", "Error playing music: " + e.getMessage());
        }
    }

    // Handle progress bar
    @ReactMethod
    public void getDuration(Promise promise) {
        if (mediaPlayer != null) {
            int duration = mediaPlayer.getDuration();  // Get the duration in milliseconds
            promise.resolve(duration / 1000);  // Return duration in seconds
        } else {
            promise.reject("Error", "Media player is not initialized.");
        }
    }

    @ReactMethod
    public void getCurrentPosition(Promise promise) {
        if (mediaPlayer != null) {
            int currentPosition = mediaPlayer.getCurrentPosition();  // Get current position in milliseconds
            promise.resolve(currentPosition / 1000);  // Return position in seconds
        } else {
            promise.reject("Error", "Media player is not initialized.");
        }
    }

// slider progress

@ReactMethod
public void seekTo(int position, Promise promise) {
    if (mediaPlayer != null) {
        mediaPlayer.seekTo(position);
        promise.resolve("Seeked to position: " + position);
    } else {
        promise.reject("Error", "Media player is not initialized.");
    }
}


    // Toggle mute
    @ReactMethod
    public void toggleMute(boolean isMute, Promise promise) {
        if (mediaPlayer != null) {
            if (isMute) {
                mediaPlayer.setVolume(0f, 0f);  // Mute both channels
            } else {
                mediaPlayer.setVolume(1f, 1f);  // Unmute
            }
            promise.resolve("Volume toggled.");
        } else {
            promise.reject("Error", "Media player is not initialized.");
        }
    }

    // Shuffle the track list and play from the first track
    @ReactMethod
    public void shuffleTracks(Promise promise) {
        try {
            if (trackList.size() > 1) {
                Collections.shuffle(trackList);  // Shuffle the track list
                currentTrackIndex = 0;  // Reset to the first track after shuffling
                String shuffledTrackUrl = trackList.get(currentTrackIndex);  // Get the first shuffled track
                play(shuffledTrackUrl, promise);  // Play the shuffled track
                promise.resolve("Track list shuffled and playing first track.");
            } else {
                promise.reject("Error", "Not enough tracks to shuffle.");
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
            promise.reject("Error", "No track available.");
        }
    }

    // Skip to the next track
    @ReactMethod
    public void skipToNext(Promise promise) {
        if (currentTrackIndex < trackList.size() - 1) {
            currentTrackIndex++;
            play(trackList.get(currentTrackIndex), promise);
        } else {
            promise.reject("Error", "No next track available.");
        }
    }

    // Skip to the previous track
    @ReactMethod
    public void skipToPrevious(Promise promise) {
        if (currentTrackIndex > 0) {
            currentTrackIndex--;
            play(trackList.get(currentTrackIndex), promise);
        } else {
            promise.reject("Error", "No previous track available.");
        }
    }

    // Pause the music
    @ReactMethod
    public void pause(Promise promise) {
        if (mediaPlayer != null && mediaPlayer.isPlaying()) {
            mediaPlayer.pause();
            promise.resolve("Music paused.");
        } else {
            promise.reject("Error", "No music is playing to pause.");
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
            promise.resolve("Music stopped.");
        } else {
            promise.reject("Error", "No music is playing to stop.");
        }
    }
}
