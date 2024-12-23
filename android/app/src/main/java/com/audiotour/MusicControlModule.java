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
    private ArrayList<String> trackList = new ArrayList<>();
    private int currentTrackIndex = 0;
    private String currentTrackUrl;

    public MusicControlModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "MusicControlModule";
    }

    @ReactMethod
    public void setTrackList(ArrayList<String> tracks, Promise promise) {
        try {
            trackList.clear();
            trackList.addAll(tracks);
            currentTrackIndex = 0;
            promise.resolve("Track list set successfully.");
        } catch (Exception e) {
            promise.reject("Error", "Failed to set track list: " + e.getMessage());
        }
    }

    @ReactMethod
    public void play(String url, Promise promise) {
        try {
            if (mediaPlayer != null) {
                mediaPlayer.reset();
            }

            mediaPlayer = new MediaPlayer();
            mediaPlayer.setDataSource(url);
            mediaPlayer.setLooping(false);

            mediaPlayer.setOnPreparedListener(mp -> {
                mp.start();
                currentTrackUrl = url;
                promise.resolve("Playing music from URL: " + url);
            });

            mediaPlayer.setOnErrorListener((mp, what, extra) -> {
                promise.reject("PlaybackError", "Error during playback: " + what);
                return true;
            });

            mediaPlayer.prepareAsync();
        } catch (Exception e) {
            Log.e("MusicControlModule", "Error playing music", e);
            promise.reject("Error", "Error playing music: " + e.getMessage());
        }
    }

    @ReactMethod
    public void getDuration(Promise promise) {
        if (mediaPlayer != null) {
            int duration = mediaPlayer.getDuration();
            promise.resolve(duration / 1000);
        } else {
            promise.reject("Error", "Media player is not initialized.");
        }
    }

    @ReactMethod
    public void getCurrentPosition(Promise promise) {
        if (mediaPlayer != null) {
            int currentPosition = mediaPlayer.getCurrentPosition();
            promise.resolve(currentPosition / 1000);
        } else {
            promise.reject("Error", "Media player is not initialized.");
        }
    }

    @ReactMethod
    public void seekTo(int position, Promise promise) {
        if (mediaPlayer != null) {
            mediaPlayer.seekTo(position);
            promise.resolve("Seeked to position: " + position);
        } else {
            promise.reject("Error", "Media player is not initialized.");
        }
    }

    @ReactMethod
    public void toggleMute(boolean isMute, Promise promise) {
        if (mediaPlayer != null) {
            if (isMute) {
                mediaPlayer.setVolume(0f, 0f);
            } else {
                mediaPlayer.setVolume(1f, 1f);
            }
            promise.resolve("Volume toggled.");
        } else {
            promise.reject("Error", "Media player is not initialized.");
        }
    }

    @ReactMethod
    public void shuffleTracks(Promise promise) {
        try {
            if (trackList.size() > 1) {
                Collections.shuffle(trackList);
                currentTrackIndex = 0;
                String shuffledTrackUrl = trackList.get(currentTrackIndex);
                play(shuffledTrackUrl, promise);
                promise.resolve("Track list shuffled and playing first track.");
            } else {
                promise.reject("Error", "Not enough tracks to shuffle.");
            }
        } catch (Exception e) {
            Log.e("MusicControlModule", "Error shuffling tracks", e);
            promise.reject("Error", "Error shuffling tracks: " + e.getMessage());
        }
    }

    @ReactMethod
    public void getCurrentTrack(Promise promise) {
        if (currentTrackIndex >= 0 && currentTrackIndex < trackList.size()) {
            promise.resolve(trackList.get(currentTrackIndex));
        } else {
            promise.reject("Error", "No track available.");
        }
    }

    @ReactMethod
    public void skipToNext(Promise promise) {
        if (currentTrackIndex < trackList.size() - 1) {
            currentTrackIndex++;
            play(trackList.get(currentTrackIndex), promise);
        } else {
            promise.reject("Error", "No next track available.");
        }
    }

    @ReactMethod
    public void skipToPrevious(Promise promise) {
        if (currentTrackIndex > 0) {
            currentTrackIndex--;
            play(trackList.get(currentTrackIndex), promise);
        } else {
            promise.reject("Error", "No previous track available.");
        }
    }

    @ReactMethod
    public void pause(Promise promise) {
        if (mediaPlayer != null && mediaPlayer.isPlaying()) {
            mediaPlayer.pause();
            promise.resolve("Music paused.");
        } else {
            promise.reject("Error", "No music is playing to pause.");
        }
    }

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