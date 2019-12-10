package com.navigationsample;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import sdk.Sdk;


public class SdkModule extends ReactContextBaseJavaModule {
    public SdkModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "SdkModule";
    }

    public String cfg() {
        return this.getReactApplicationContext().getFilesDir().getAbsolutePath() + "/fabric/network.yaml";
    }

    @ReactMethod
    public void getPath(Promise promise) throws Exception {
        promise.resolve(this.getReactApplicationContext().getFilesDir().getAbsolutePath());
    }

    @ReactMethod
    public void genericQueryChaincode(final String channel, final String user, final String chainCodeName,final String chainCodeFunctionName, final String args, final Promise promise) throws Exception {
        final String cfg = this.cfg();
        new Thread(new Runnable() {
            public void run() {
                String response;
                try {
                    response = Sdk.genericQueryChaincode(cfg, channel, user,chainCodeName,chainCodeFunctionName,args);
                    promise.resolve(response);
                } catch (Exception e) {
                    promise.reject("error ...", e.getMessage());
                }
            }
        }).start();
    }


    @ReactMethod
    public void genericExecuteChaincode(final String channel, final String user, final String chainCodeName,final String chainCodeFunctionName, final String args, final Promise promise) throws Exception {
        final String cfg = this.cfg();
        new Thread(new Runnable() {
            public void run() {
                String response;
                try {
                    response = Sdk.genericExecuteChaincode(cfg, channel, user,chainCodeName,chainCodeFunctionName,args);
                    promise.resolve(response);
                    return;
                } catch (Exception e) {
                    promise.reject("error ...", e.getMessage());
                    return;
                }
            }
        }).start();
    }

    @ReactMethod
    public void registerUser(final String fabric_ip, final String user, final String password, final Promise promise) throws Exception {
        final String cfg = this.cfg();
        new Thread(new Runnable() {
            public void run() {
                String response;
                try {
                    response = Sdk.registerUser(cfg, fabric_ip, user, password);
                    promise.resolve(response);
                    return;
                } catch (Exception e) {
                    promise.reject("error ...", e.getMessage());
                    return;
                }
            }
        }).start();
    }

    

}
