package com.audiotour;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Collections;
import java.util.List;

public class MusicControlPackage implements ReactPackage {
    
    // Override method to create and register the native modules
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        // Register the MusicControlModule as a native module
        return Collections.singletonList(new MusicControlModule(reactContext));  // Register your module here
    }

    // Override method to create and register any custom view managers
    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        // Since this package does not contain any custom UI components, return an empty list
        return Collections.emptyList();  // You can return empty since we are not using any custom UI components
    }
}
