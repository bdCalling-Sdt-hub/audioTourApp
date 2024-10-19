package com.audiotour;

import android.content.Context; // Ensure this import is added
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.content.Intent;
import android.media.AudioAttributes;
import android.media.AudioFocusRequest;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.os.Build;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class MusicControlModule extends ReactContextBaseJavaModule {
    private static MediaPlayer mediaPlayer;
    private static String currentUrl;
    private AudioManager audioManager;
    private AudioFocusRequest audioFocusRequest;

    public MusicControlModule(ReactApplicationContext context) {
        super(context);
        this.audioManager = (AudioManager) context.getSystemService(Context.AUDIO_SERVICE);
    }

    @Override
    public String getName() {
        return "MusicControlModule"; // This will be used in JavaScript
    }

    // Request audio focus for music playback
    private boolean requestAudioFocus() {
        int result;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            audioFocusRequest = new AudioFocusRequest.Builder(AudioManager.AUDIOFOCUS_GAIN)
                    .setOnAudioFocusChangeListener(this::onAudioFocusChange)
                    .setAudioAttributes(new AudioAttributes.Builder()
                            .setUsage(AudioAttributes.USAGE_MEDIA)
                            .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
                            .build())
                    .build();
            result = audioManager.requestAudioFocus(audioFocusRequest);
        } else {
            result = audioManager.requestAudioFocus(this::onAudioFocusChange, AudioManager.STREAM_MUSIC, AudioManager.AUDIOFOCUS_GAIN);
        }
        return result == AudioManager.AUDIOFOCUS_REQUEST_GRANTED;
    }

    // Abandon audio focus after music playback is stopped
    private void abandonAudioFocus() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            audioManager.abandonAudioFocusRequest(audioFocusRequest);
        } else {
            audioManager.abandonAudioFocus(this::onAudioFocusChange);
        }
    }

    private void onAudioFocusChange(int focusChange) {
        if (focusChange == AudioManager.AUDIOFOCUS_LOSS) {
            // Stop music if audio focus is lost
            stop(null);
        } else if (focusChange == AudioManager.AUDIOFOCUS_LOSS_TRANSIENT) {
            // Pause music when focus is temporarily lost
            pause(null);
        } else if (focusChange == AudioManager.AUDIOFOCUS_GAIN) {
            // Resume music if audio focus is regained
            if (mediaPlayer != null && !mediaPlayer.isPlaying()) {
                mediaPlayer.start();
            }
        }
    }

    // Method to play music
    @ReactMethod
    public void play(final String url, final Promise promise) {
        try {
            // Request audio focus before playing music
            if (!requestAudioFocus()) {
                promise.reject("AudioFocusError", "Failed to gain audio focus");
                return;
            }

            // If a different URL is passed, stop and release the old media player
            if (mediaPlayer != null && !url.equals(currentUrl)) {
                mediaPlayer.stop();
                mediaPlayer.release();
                mediaPlayer = null;
            }

            // Initialize the MediaPlayer if not already
            if (mediaPlayer == null) {
                mediaPlayer = new MediaPlayer();
                mediaPlayer.setDataSource(url);
                mediaPlayer.setLooping(true);
                mediaPlayer.prepareAsync();  // Prepare asynchronously to avoid blocking UI
                mediaPlayer.setOnPreparedListener(new MediaPlayer.OnPreparedListener() {
                    @Override
                    public void onPrepared(MediaPlayer mp) {
                        mp.start();  // Start playing when prepared
                        promise.resolve("Playing music from URL: " + url);
                    }
                });
                mediaPlayer.setOnErrorListener(new MediaPlayer.OnErrorListener() {
                    @Override
                    public boolean onError(MediaPlayer mp, int what, int extra) {
                        promise.reject("PlaybackError", "Error occurred during playback: " + what);
                        return true;
                    }
                });
                currentUrl = url;
                Log.d("MusicControlModule", "Playing music from URL: " + url);
            } else {
                mediaPlayer.start();  // Resume playback
                promise.resolve("Resumed playing music");
            }
        } catch (Exception e) {
            Log.e("MusicControlModule", "Error playing music", e);
            promise.reject("Error", "Error playing music: " + e.getMessage());
        }
    }

    // Method to pause music
    @ReactMethod
    public void pause(final Promise promise) {
        if (mediaPlayer != null && mediaPlayer.isPlaying()) {
            mediaPlayer.pause();
            if (promise != null) {
                promise.resolve("Music paused");
            }
        } else if (promise != null) {
            promise.reject("Error", "No music is playing to pause");
        }
    }

    // Method to stop music
    @ReactMethod
    public void stop(final Promise promise) {
        if (mediaPlayer != null) {
            mediaPlayer.stop();
            mediaPlayer.release();
            mediaPlayer = null;
            currentUrl = null;
            abandonAudioFocus();  // Abandon audio focus when stopped
            if (promise != null) {
                promise.resolve("Music stopped");
            }
        } else if (promise != null) {
            promise.reject("Error", "No music is playing to stop");
        }
    }

    // Method to start the foreground service
    @ReactMethod
    public void startForegroundService(String input) {
        Intent serviceIntent = new Intent(getReactApplicationContext(), MusicService.class);
        serviceIntent.putExtra("inputExtra", input);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            getReactApplicationContext().startForegroundService(serviceIntent); // For Android O and above
        } else {
            getReactApplicationContext().startService(serviceIntent); // For lower versions
        }
    }

    // Method to stop the foreground service
    @ReactMethod
    public void stopForegroundService() {
        Intent serviceIntent = new Intent(getReactApplicationContext(), MusicService.class);
        getReactApplicationContext().stopService(serviceIntent);
    }
}
