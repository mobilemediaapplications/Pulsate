package cordova.plugin.pulsateIO;

import android.content.Intent;
import android.content.res.Resources;
import android.provider.Telephony;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewTreeObserver;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;

import com.pulsatehq.external.pulsate.manager.IPulsateManager;
import com.pulsatehq.internal.PulsateApp;
import com.pulsatehq.internal.inbox.InboxActivity;
import com.pulsatehq.internal.inbox.manager.InboxManager;
import com.pulsatehq.internal.util.AuthorizationData;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * This class echoes a string called from JavaScript.
 */
public class PulsateIO extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("init")) {
            this.init(args, callbackContext);
            return true;
        }

        if (action.equals("showFeed")) {
            this.showFeed(args, callbackContext);
            return true;
        }

        if (action.equals("hideFeed")) {
            this.hideFeed(args, callbackContext);
            return true;
        }
        return false;
    }

    private void init(JSONArray message, CallbackContext callbackContext) throws JSONException {

        AuthorizationData authData = new AuthorizationData(message.get(0).toString(), message.get(1).toString(), message.get(2).toString());
        IPulsateManager manager = ((cordova.plugin.pulsateIO.MainApplication) this.cordova.getActivity().getApplication()).getPulsate();
        manager.setAuthorizationData(authData);

        if (message != null && message.length() > 0) {
            callbackContext.success(message);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }

    private void showFeed(JSONArray message, CallbackContext callbackContext) throws JSONException {

        final IPulsateManager manager = ((cordova.plugin.pulsateIO.MainApplication) this.cordova.getActivity().getApplication()).getPulsate();

        final PulsateApp pp = (PulsateApp) this.cordova.getActivity().getApplication();


        manager.showFeed();

        if (message != null && message.length() > 0) {
            callbackContext.success(message);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }

    private void hideFeed(JSONArray message, CallbackContext callbackContext) throws JSONException {

        IPulsateManager manager = ((cordova.plugin.pulsateIO.MainApplication) this.cordova.getActivity().getApplication()).getPulsate();
        final PulsateApp pp = (PulsateApp) this.cordova.getActivity().getApplication();


        pp.currentActivity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                String view = pp.currentActivity.getClass().getName();
                if(view.contains("com.pulsatehq")){
                    pp.currentActivity.finish();
                }
            }
        });

        if (message != null && message.length() > 0) {
            callbackContext.success(message);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }
}
