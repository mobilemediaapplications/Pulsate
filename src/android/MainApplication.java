package cordova.plugin.pulsateIO;

import android.os.Bundle;
import android.view.View;

import org.apache.cordova.*;

import com.pulsatehq.*;
import com.pulsatehq.external.pulsate.manager.*;
import com.pulsatehq.external.pulsate.factory.*;
import com.pulsatehq.internal.PulsateApp;



public class MainApplication extends PulsateApp {

    IPulsateManager manager;



    public IPulsateManager getPulsate() {
        if (manager == null)
            manager = PulsateFactory.getInstance();
        return manager;
    }


    @Override
    public void onCreate() {
        super.onCreate();
        getPulsate();
    }
}
