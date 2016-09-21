//
//  PULPulsateManagerDelegate.h
//  PULPulsate
//
//  Created by Michal on 02/01/2015.
//  Copyright (c) 2015 Pulsatehq. All rights reserved.
//

#import <Foundation/Foundation.h>

@protocol PULPulsateManagerDelegate  <NSObject>
@required
-(void)onUnauthorizedAction;
-(void)onPulsateEerror:(NSError*)error;
@end

@interface PULPulsateManagerDelegate : NSObject

-(void)unauthorizedAction:(NSString*)action;

@property (nonatomic, weak) id  <PULPulsateManagerDelegate> delegatePasser;

@end
