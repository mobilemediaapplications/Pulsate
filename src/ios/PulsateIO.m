/********* PlusateIO.m Cordova Plugin Implementation *******/

#import <Cordova/CDV.h>

#import <PULPulsate/PULPulsate.h>

#import "AppDelegate.h"

@interface PulsateIO : CDVPlugin {
    //store the LaunchOptions, to be used later by Pulsate
    NSNotification *launchOpts;
}

- (void)showFeed:(CDVInvokedUrlCommand*)command;
- (void)hideFeed:(CDVInvokedUrlCommand*)command;
@end

@implementation PulsateIO

- (void)pluginInitialize
{

    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(finishLaunching:) name:UIApplicationDidFinishLaunchingNotification object:nil];

}



- (void)finishLaunching:(NSNotification *)notification
{

    self->launchOpts = notification;
}

/*
 Method used to init Pulsate SDK, setting APPKey and APPID
 */
- (void)init:(CDVInvokedUrlCommand*)command
{

    NSError* error;

    PULAuthorizationData* authData = [[PULAuthorizationData alloc] initWithAppId:command.arguments[0] andAppKey:command.arguments[1] validationError:&error];

    PULPulsateManager* pulsateManager = [PULPulsateFactory getInstanceWithAuthorizationData:authData withLocationEnabled:YES withPushEnabled:YES withLaunchOptions:self->launchOpts.userInfo error:&error];

    [pulsateManager startPulsateSession];
}


- (void)showFeed:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;

    NSError* error;


    //Get existing Instance of Pulsate Manager, initialization is done in init method
    PULPulsateManager* pulsateManager = [PULPulsateFactory getDefaultInstance];

    AppDelegate *appDelegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];

    [pulsateManager setNewThreadButtonEnabled:YES];

    UISplitViewController* spvController = [[UISplitViewController alloc] init];

    UINavigationController* pulsateFeedNavController = [pulsateManager getFeedNavigationController];

    [spvController showDetailViewController:pulsateFeedNavController sender:nil];

    CGRect viewBounds = appDelegate.window.bounds;
    float fromTop = [[command.arguments objectAtIndex:0] floatValue];
    float fromBottom = [[command.arguments objectAtIndex:1] floatValue];
    CGRect webViewBound = CGRectMake(0,
                                     fromTop,
                                     viewBounds.size.width,
                                     viewBounds.size.height - fromBottom - fromTop );
    spvController.view.frame = webViewBound;

    spvController.view.tag = 1200;
    [appDelegate.window.rootViewController.view addSubview:spvController.view];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

}


- (void)hideFeed:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    NSString* echo = [command.arguments objectAtIndex:0];

    if (echo != nil && [echo length] > 0) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:echo];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }


    AppDelegate *appDelegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];


    UIView *pulspv = (UIView*)[appDelegate.window.rootViewController.view viewWithTag:1200];
    [pulspv removeFromSuperview];
    pulspv.hidden = true;
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

}



@end
