package com.audiotour;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.content.res.AssetFileDescriptor;
import android.media.MediaPlayer;
import android.os.Build;
import android.os.IBinder;
import android.util.Log;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

import java.io.IOException;

public class MusicService extends Service {
    private static final String CHANNEL_ID = "MusicServiceChannel";
    private MediaPlayer mediaPlayer;

    @Override
    public void onCreate() {
        super.onCreate();
        Log.d("MusicService", "Service started...");
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        String input = intent.getStringExtra("inputExtra");
        String audioSource = intent.getStringExtra("audioSource");

        createNotificationChannel();

        Intent notificationIntent = new Intent(this, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, notificationIntent, PendingIntent.FLAG_IMMUTABLE);

        Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentTitle("Music Service")
                .setContentText(input != null ? input : "Playing background music")
                .setSmallIcon(R.mipmap.ic_launcher)
                .setContentIntent(pendingIntent)
                .build();

        startForeground(1, notification);

        if (mediaPlayer == null) {
            mediaPlayer = new MediaPlayer();
        } else {
            mediaPlayer.reset();
        }

        if (audioSource != null) {
            if (audioSource.startsWith("http") || audioSource.startsWith("https")) {
                playFromUrl(audioSource);
            } else {
                playFromAssets(audioSource);
            }
        } else {
            Log.e("MusicService", "No audio source provided.");
        }

        return START_NOT_STICKY;
    }

    private void playFromUrl(String url) {
        try {
            mediaPlayer.setDataSource(url);
            mediaPlayer.prepareAsync();
            mediaPlayer.setOnPreparedListener(mp -> {
                mp.start();
                Log.d("MusicService", "Playing music from URL: " + url);
            });
        } catch (IOException e) {
            Log.e("MusicService", "Error playing music from URL", e);
        }
    }

    private void playFromAssets(String assetPath) {
        try {
            AssetFileDescriptor afd = getAssets().openFd(assetPath);
            mediaPlayer.setDataSource(afd.getFileDescriptor(), afd.getStartOffset(), afd.getLength());
            mediaPlayer.prepare();
            mediaPlayer.start();
            Log.d("MusicService", "Playing music from assets: " + assetPath);
        } catch (IOException e) {
            Log.e("MusicService", "Error playing music from assets", e);
        }
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (mediaPlayer != null) {
            mediaPlayer.stop();
            mediaPlayer.release();
            mediaPlayer = null;
            Log.d("MusicService", "MediaPlayer stopped and released...");
        } else {
            Log.e("MusicService", "MediaPlayer was null on destroy");
        }
        Log.d("MusicService", "Service stopped...");
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel serviceChannel = new NotificationChannel(
                    CHANNEL_ID,
                    "Music Service Channel",
                    NotificationManager.IMPORTANCE_LOW
            );
            NotificationManager manager = getSystemService(NotificationManager.class);
            if (manager != null) {
                manager.createNotificationChannel(serviceChannel);
                Log.d("MusicService", "Notification channel created");
            } else {
                Log.e("MusicService", "NotificationManager is null");
            }
        }
    }
}
