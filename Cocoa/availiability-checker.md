#Tool for iOS / Mac Availability Checker

Sometimes, when we make an App needed to support a range of platforms, e.g, __from iOS6.0 to iOS8.2__

We usually set project's __deployment target__ to __iOS6.0__ and use the __latest possible base SDK, iOS 8.2__ that's right, as many developer suggested.

But, here is a problem that nearly everyone have suffered

If i am using an API that's introduced in iOS7.0, how do i know?

One solutions is that , RTFM before use an API.

Or, handle every crash that those API cause, then using ```responsdsToSelector``` or __dynamically check system version__ , that's what i used to do.

One time, an iOS6 device crashed, i have to read the crash log to find out that an API ___ -[UIViewController setNeedsStatusBarAppearanceUpdate]___ is only available since iOS7. that's horrible!

So, after some diggings. i finally find a way to avoid those kind of mistake. we can let the compiler / Xcode to check those for you. it's just a simply compare the __deployment target's version __ and API's __ introduced version __

it's related some files:

1. NSObjCRuntime.h

    When we __CMD+Click__ an API, let's say
``` -[UIWindow beginSheetModalForWindow:(NSWindow *)sheetWindow completionHandler:(void (^)(NSModalResponse returnCode))handler]```
    we could see the method decleration

    ```- (void)beginCriticalSheet:(NSWindow *)sheetWindow completionHandler:(void (^)(NSModalResponse returnCode))handler NS_AVAILABLE_MAC(10_9);```

    and there is a macro draws my attention __NS_AVAILABLE_MAC__

    continue __CMD+CLICK__ to that macro, we saw
    ```#define NS_AVAILABLE_MAC(_mac) CF_AVAILABLE_MAC(_mac)``` at File __NSObjCRuntime.h__


2. __CFAvailability.h__
    keep __CMD+CLICK__ to __CF_AVAILABLE_MAC__ , we are at File __CFAvailability.h__ , seeing

	```
	#define CF_AVAILABLE_MAC(_mac) __attribute__((availability(macosx,__NSi_##_mac)))
    #define CF_AVAILABLE(_mac, _ios) __OSX_AVAILABLE_STARTING(__MAC_##_mac, __IPHONE_##_ios)
  // and more important ones

	#define CF_AVAILABLE_MAC(_mac) __OSX_AVAILABLE_STARTING(__MAC_##_mac, __IPHONE_NA)
#define CF_AVAILABLE_IOS(_ios)__OSX_AVAILABLE_STARTING(__MAC_NA, __IPHONE_##_ios)
```

    that seems fine. and we don't know what availability has to do. but we do know that __attribute__ . we also now, CF_AVAILABLE_MAC finally became __\_\_OSX_AVAILABLE_STARTING__

3. In __/usr/include/Availability.h__
    we saw

    ```
    #elif defined(__MAC_OS_X_VERSION_MIN_REQUIRED)

    #define __OSX_AVAILABLE_STARTING(_osx, _ios) __AVAILABILITY_INTERNAL##_osx
    ```


4. Finally, in __/usr/include/AvailabilityInternal.h__
	```
	#define __AVAILABILITY_INTERNAL_WEAK_IMPORT           __attribute__((weak_import))
	```
	and many like this

	```
	#elif __IPHONE_OS_VERSION_MIN_REQUIRED < __IPHONE_8_0

	     #define __AVAILABILITY_INTERNAL__IPHONE_8_0   __AVAILABILITY_INTERNAL_WEAK_IMPORT

    #else
	```

5. So we know, the complier know this things, and mark those API as weak_import. but it just don't give us any warnings, __we have to make our own__

### Marco for availability check

* create a .pch file, called __checker.pch__

* override the system macro in __checker.pch__

 ```
#if (defined(__IPHONE_7_0) && __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_7_0) || (defined(__MAC_10_9) &&  __MAC_OS_X_VERSION_MAX_ALLOWED >= __MAC_10_9)
#include <CoreFoundation/CFAvailability.h>
#undef CF_AVAILABLE
#define CF_AVAILABLE(_mac, _ios) __OSX_AVAILABLE_STARTING(__MAC_##_mac, __IPHONE_##_ios)
#undef CF_AVAILABLE_MAC
#define CF_AVAILABLE_MAC(_mac) __OSX_AVAILABLE_STARTING(__MAC_##_mac, __IPHONE_NA)
#undef CF_AVAILABLE_IOS
#define CF_AVAILABLE_IOS(_ios) __OSX_AVAILABLE_STARTING(__MAC_NA, __IPHONE_##_ios)
#endif // if iOS SDK >= 7.0 || OSX SDK >= 10.9
```

* override the system macro, again, like __this__

 ```
#if __MAC_OS_X_VERSION_SOFT_MAX_REQUIRED < __MAC_10_7
 #undef __AVAILABILITY_INTERNAL__MAC_10_7
 #define __AVAILABILITY_INTERNAL__MAC_10_7 __AVAILABILITY_TOO_NEW(__MAC_10_7)
 #endif

 #if __MAC_OS_X_VERSION_SOFT_MAX_REQUIRED < __MAC_10_8
 #undef __AVAILABILITY_INTERNAL__MAC_10_8
 #define __AVAILABILITY_INTERNAL__MAC_10_8 __AVAILABILITY_TOO_NEW(__MAC_10_8)
 #endif

 #if __MAC_OS_X_VERSION_SOFT_MAX_REQUIRED < __MAC_10_9
 #undef __AVAILABILITY_INTERNAL__MAC_10_9
 #define __AVAILABILITY_INTERNAL__MAC_10_9 __AVAILABILITY_TOO_NEW(__MAC_10_9)
 #endif

 #if __MAC_OS_X_VERSION_SOFT_MAX_REQUIRED < __MAC_10_10
 #undef __AVAILABILITY_INTERNAL__MAC_10_10
 #define __AVAILABILITY_INTERNAL__MAC_10_10 __AVAILABILITY_TOO_NEW(__MAC_10_10)
 #endif
```

* add our own warning message
 
 ```
 #define __AVAILABILITY_TOO_NEW(INTRO_VERSION)
 __attribute__((deprecated("Intro In:" #INTRO_VERSION  " TOO NEW!"))) __attribute__((weak_import))
```
