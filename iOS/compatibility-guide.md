对于项目的设置, 需要设置 __BaseSDK__ 的版本 以及 __Deployment Target__

__BaseSDK__ 一般是推荐使用最新的 iOS/OS X 版本, 这样可以使用到最新的系统特性(API)

__Deployment Target__ 是需要支持的最低版本的 iOS/OS X 系统, 但是光是指定 __Deployment Target__是不能保证在该版本的系统能够正常运行的, 还需要做各种兼容性的工作.
	
首先我们得区分两种情况, 最终的产品是通过二进制分发(framework)的还是源码方式分发的.
	
* 对于源码方式分发的代码, 我们可以用到的版本有:
* 条件编译, 条件编译其实和 C/CPP 的一样, 就是通过各种宏来判断, 比如 iOS 上有内置的:
    
```
#define __IPHONE_2_0     20000
#define __IPHONE_2_1     20100
#define __IPHONE_2_2     20200
#define __IPHONE_3_0     30000
#define __IPHONE_3_1     30100
#define __IPHONE_3_2     30200
#define __IPHONE_4_0     40000
#define __IPHONE_4_1     40100
#define __IPHONE_4_2     40200
#define __IPHONE_4_3     40300
#define __IPHONE_5_0     50000
#define __IPHONE_5_1     50100
#define __IPHONE_6_0     60000
#define __IPHONE_6_1     60100
#define __IPHONE_7_0     70000
#define __IPHONE_7_1     70100
#define __IPHONE_8_0     80000
#define __IPHONE_8_1     80100


//那么可以这样

#if __IPHONE_OS_VERSION_MIN_REQUIRED >= __IPHONE_6_0
// deployment target is iOS 6 or greater
// iOS > 6.0 code
#endif
```
    
    
由于最终分发的是源码, 所以可以在编译时解决兼容性的问题


*   运行时检查. 这主要是在运行时查看是否有某个类/某个方法.需要的场景是某些方法在某个系统上没有. 若不检查就调用的话则会导致程序崩溃. 比如阿里郎的 Deployment Target 为 iOS 5.0 , 但是某个方法是 iOS7 之后才有的, 就需要这样检查.

```
if (NSClassFromString(@"SomeClass")) {
  // exist
  if ([SomeClass respondsToSelector:NSSelectorFromString(@"someMethod")]]) {
      result = [SomeClass someMethod];
  } else {
      result = xxx;
  }
} else {
  // non-exist
}
```

  * 如何在运行时检查是否有某个枚举变量的值? 此处的枚举变量和 C 一样. 应该没有 __直接__ 的检查版本, 但是可以通过检查该变量是在哪个系统版本被引进的, 然后通过版本来确定是否有该枚举变量.

  * 对于二进制方式分发的产品(比如 Framework) 则不能使用条件编译, 应该使用运行时检查.


  * 不管分发方式如何, 对于可能会在某些低版本不存在的系统 framework, 都应该使用 weak_link链接, 并且在运行时检查.