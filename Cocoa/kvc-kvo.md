#Key-Value Coding/Key-Value Observe simple example

this code snippet shows you how to use kvc/kvo in your project.

the whole idea about kvc/kvo is about let your __Observe Object__ gets notified when __another Object__'s  __perproty__ value gets changed.

First, we need to define some basic rules to use kvc/kvo

1. we will call __Observe Object__ as __Object O__, call __another Object__ as __Object A__ in this article.

2. __Object A__ must be key-value coding compliant for the property.
	* the __variable__ you want to observe must be have getter and setter method. if a variable call __foo__, then you need to have two methods: ``foo`` and ``setFoo``
	* most of the time, just use the ``@property`` to declear the property, it should be fine automatically 
 
3. in __Object O__, you must implement the method

	```
	- (void)observeValueForKeyPath:(NSString *)keyPath
                      ofObject:(id)object
                        change:(NSDictionary *)change
                       context:(void *)context 
	```
	that's the method to be call when a propert's value get changed in __Object A__ via __setFoo__, notice, __only setFoo__ can be noticed, if you use ```ObjectA.foo = xx```, it just don't work.


4. in __Object A__, we use

	```
	- (void)addObserver:(NSObject *)anObserver
		 	 forKeyPath:(NSString *)keyPath 
				options:(NSKeyValueObservingOptions)options 
				context:(void *)context
	```
	to add __Object O__ , meaning allow __Object O__ to get noticed when a property at keyPath
	gets changed.

5. Two references
	* [Key-Value Coding Programming Guide](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/KeyValueCoding/Articles/KeyValueCoding.html#//apple_ref/doc/uid/10000107i) 
	* [Key-Value Observing Programming Guide](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/KeyValueObserving/KeyValueObserving.html#//apple_ref/doc/uid/10000177-BCICJDHA)
6. that's all we need to know. 

OK, next, i will show you how to you KVC/KVO by a simple example.

```
//
//  main.m
//  kvcfun
//
//  Created by Sunus on 2/11/14.
//  Copyright (c) 2014 Sunus. All rights reserved.
//
//  A simple kvo/kvc example

#import <Foundation/Foundation.h>

// Observe class
@interface obClass : NSObject

@property (nonatomic, strong) NSString *obMe;

@end

@implementation obClass
- (void)observeValueForKeyPath:(NSString *)keyPath
                      ofObject:(id)object
                        change:(NSDictionary *)change
                       context:(void *)context {
    
    NSLog(@"keyPath: %@", keyPath);
    NSLog(@"change: %@", change);
}

-(void)registerObserver:(NSObject *)object
                keyPath:(NSString *)keyPath
{
    [self addObserver:object forKeyPath:keyPath options:(NSKeyValueObservingOptionNew|NSKeyValueObservingOptionOld) context:nil];
}

@end


// an Object with property

@interface funnyClass : NSObject

@property (nonatomic, strong) NSString *varOne;

@property (nonatomic, strong) NSString *varTwo;

@end

@implementation funnyClass


@end


int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSLog(@"Hello, World!");
        funnyClass *funnyObject = [[funnyClass alloc] init];
        obClass *obObject = [[obClass alloc] init];
        [funnyObject setVarOne:@"LOL"];
        [funnyObject addObserver:obObject forKeyPath:@"varOne" options:NSKeyValueObservingOptionOld|NSKeyValueObservingOptionNew context:nil];
        // invaoke with keyPath varOne
        [funnyObject setVarOne:@"xjx"];
        [obObject addObserver:obObject forKeyPath:@"obMe" options:(NSKeyValueObservingOptionOld|NSKeyValueObservingOptionNew) context:nil];
        // invaoke with keyPath obMe
        [obObject setObMe:@"asd"];
        [obObject removeObserver:obObject forKeyPath:@"obMe"];
        [funnyObject removeObserver:obObject forKeyPath:@"varOne"];
    }
    return 0;
}
```