#Capture All Notifications For Debugging

Use code below

```

void MyCallBack (CFNotificationCenterRef center,
                 void *observer,
                 CFStringRef name,
                 const void *object,
                 CFDictionaryRef userInfo)
{
    NSLog(@"name: %@", name);
    NSLog(@"userinfo: %@", userInfo);
}

CFNotificationCenterAddObserver(CFNotificationCenterGetLocalCenter(), 
    NULL, 
    MyCallBack, 
    NULL, 
    NULL,  
    CFNotificationSuspensionBehaviorDeliverImmediately);
 ```
 
 Or this
 
 ```
 [[NSNotificationCenter defaultCenter] addObserverForName:nil
                                                    object:nil
                                                     queue:nil
                                                 usingBlock:^(NSNotification *notification) {
    NSLog(@"%@", notification.name);
  }];
```