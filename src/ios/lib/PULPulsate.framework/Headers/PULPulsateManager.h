//
//  PULPulsateManager.h
//  PULPulsate 2.8.5
//
//  Created by Michal on 04/12/2014.
//  Copyright (c) 2014 Pulsatehq. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "PULPulsateManagerDelegate.h"
#import <UIKit/UIKit.h>

@class UINavigationController;

@interface PULPulsateManager : NSObject

typedef NS_ENUM(NSUInteger, PULUserGender){
    PULMale,
    PULFemale
};

typedef NS_ENUM(NSUInteger, PULPrivacyLevel){
    PULPrivacySubscribed,
    PULPrivacyUnsubscribed
};

/**
 *  Starts Pulsate session lifecycle. If location and push were set as enabled it'll show the prompts to the user.
 *  Session starts when the app enters foreground and ends when it goes to background.
 */
-(void)startPulsateSession;

/**
 *  Starts Pulsate session lifecycle for given user (alias). If location and push were set as enabled it'll show the prompts to the user.
 *  Session starts when the app enters foreground and ends when it goes to background.
 */
-(void)startPulsateSessionForAlias:(nonnull NSString*)alias;

-(void)logout;

/**
 *  Updates the user's first name. Gets updated when entering background.
 *
 *  @param firstName firstName - can't be nil
 */
-(void)updateFirstName:(nonnull NSString*)firstName;

/**
 *  Updates the user's last name. Gets updated when entering background.
 *
 *  @param lastName lastName - can't be nil
 */
-(void)updateLastName:(nonnull NSString*)lastName;

/**
 *  Updates the user's email. Gets updated when entering background.
 *
 *  @param email email - can't be nil
 */
-(void)updateEmail:(nonnull NSString*)email;

/**
 *  Updates user's age. Gets updated when entering background.
 *
 *  @param age user's age
 */
-(void)updateAge:(NSUInteger)age;

/**
 *  Updates user's gender. Gets updated when entering background.
 *
 *  @param gender user's gender
 */
-(void)updateGender:(PULUserGender)gender;

/**
 *  Sets user's privacy settings.
 *
 *  @param privacyLevel user's privacy level
 */
-(void)setPrivacy:(PULPrivacyLevel)privacyLevel;

/**
 *  Creates a custom attribute with a string. Neither can be nil. Gets updated when entering background.
 *
 *  @param propertyName custom attribute name
 *  @param value        attribute value
 */
-(void)createAttribute:(nonnull NSString *)propertyName withString:(nonnull NSString *)value;

/**
 *  Creates a custom attribute with a float. Key can't be nil. Gets updated when entering background.
 *
 *  @param propertyName custom attribute name
 *  @param number       attribute value
 */
-(void)createAttribute:(nonnull NSString *)propertyName withFloat:(CGFloat)number;

/**
 *  Creates a custom attribute with an integer. Key can't be nil. Gets updated when entering background.
 *
 *  @param propertyName custom attribute name
 *  @param number       attribute value
 */
-(void)createAttribute:(nonnull NSString *)propertyName withInteger:(NSInteger)number;

/**
 *  Creates custom attribute with a bool. Key can't be nil. Gets updated when entering background.
 *
 *  @param propertyName custom attribute name
 *  @param boolean      attribute value
 */
-(void)createAttribute:(nonnull NSString *)propertyName withBoolean:(BOOL)boolean;

/**
 *  Creates custom attribute with a date. Key can't be nil. Gets updated when entering background.
 *
 *  @param propertyName custom attribute name
 *  @param date         attribute value
 */
-(void)createAttribute:(nonnull NSString *)propertyName withDate:(nonnull NSDate*)date;

/**
 *  Increments given integer attribute by given value. Gets updated when entering background.
 *
 *  @param attributeName which attribute to increment
 *  @param value         value to increment by
 */
-(void)incrementIntegerAttribute:(nonnull NSString*)attributeName withInteger:(NSInteger)value;

/**
 *  Decrements given integer attribute by given. Gets updated when entering background.
 *
 *  @param attributeName custom attribute name
 *  @param value         attribute value
 */
-(void)decrementIntegerAttribute:(nonnull NSString*)attributeName withInteger:(NSInteger)value;

/**
 *  Increments given float attribute with given value. Gets updated when entering background.
 *
 *  @param attributeName custom attribute name
 *  @param value         attribute value
 */
-(void)incrementFloatAttribute:(nonnull NSString*)attributeName withFloat:(CGFloat)value;

/**
 *  Decrements given float attribute with given value. Gets updated when entering background.
 *
 *  @param attributeName custom attribute name
 *  @param value         attribute value
 */
-(void)decrementFloatAttribute:(nonnull NSString*)attributeName withFloat:(CGFloat)value;

/**
 *  If you chose to have location disabled when instantiating the Pulsate Manager, you can enable it later.
 *  This enables you to postpone the location query prompt.
 */
-(void)startLocation;

/**
 *  If you chose to have push disabled when instantiating the Pulsate Manager, you can enable it later.
 *  This enables you to postpone the push query prompt.
 */
-(void)startRemoteNotifications;

/**
 *  If you chose to have push disabled when instantiating the Pulsate Manager, you can enable it later.
 *  This enables you to postpone the push query prompt and customize the push settings
 */
-(void)startRemoteNotificationsWithSettings:(nonnull UIUserNotificationSettings*)notificationSettings;

/**
 *  Creates and returns a Pulsate Feeed Navigation Controller. You can choose to present it however you see fit.
 *
 */
-(nonnull UINavigationController*)getFeedNavigationController;

/**
 * If feed is opened automatically (by pressing a push notification for example) you might want to
 * hide it programatically.
 */
-(void)closeAutomaticallyOpenedFeed;

/**
 *  Sends a custom in app event
 *
 *  @param event event to be sent - can't be nil
 */
-(void)createEvent:(nonnull NSString*)event;

/**
 * Attributes synchronize when the app is entering background. This method forces the synchronization to happen instantly.
 */
-(void)forceAttributeSync;

/**
 *  Sets the create thread button in feed visibility.
 *
 *  @param buttonEnabled decides if the button should be enabled
 */
-(void)setNewThreadButtonEnabled:(BOOL)buttonEnabled;

/**
 *  Decides if beacon actions should be sent with a location. The default is NO.
 *
 */
-(void)sendLocationWithBeaconEvents:(BOOL)sendLocation;

/**
 * 
 *
 */
-(BOOL)isUserAuthorized;

/**
 *  Set if user is authorized or not. The default is YES.
 *
 */
-(void)setUserAuthorized:(BOOL)authorized;

/**
 *  Set Pulsate Manager Delegate. Returns callbacks for: onUnauthorizedAction
 *
 */
-(void)setPulsateManagerDelegate:(nonnull PULPulsateManagerDelegate*)pulsateManagerDelegate;

/**
 *  Gets the Pulsate Manager Delegate
 */
-(nullable PULPulsateManagerDelegate*)getPulsateManagerDelegate;

/**
 *  Shows the last blocked message or card. User must be authorized.
 *
 */
-(void)showLastUnauthorizedMessage;
@end
