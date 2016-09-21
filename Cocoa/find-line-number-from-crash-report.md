##With Crash Report like this:

```
Thread 0 Crashed:: Dispatch queue: com.apple.main-thread
0   libobjc.A.dylib               	0x00007fff9260f0dd objc_msgSend   29
1   com.alibaba.AliLang.osx       	0x000000010c6bade2 -[ALPinger socketDidDisconnect:withError:]   198
2   com.alibaba.AliLang.osx       	0x000000010c74d388 __33-[GCDAsyncSocket closeWithError:]_block_invoke   43
3   libdispatch.dylib             	0x00007fff8f39b323 _dispatch_call_block_and_release   12
4   libdispatch.dylib             	0x00007fff8f396c13 _dispatch_client_callout   8
5   libdispatch.dylib             	0x00007fff8f3a2cbf _dispatch_main_queue_callback_4CF   861
6   com.apple.CoreFoundation      	0x00007fff8d9e83f9 __CFRUNLOOP_IS_SERVICING_THE_MAIN_DISPATCH_QUEUE__   9
7   com.apple.CoreFoundation      	0x00007fff8d9a368f __CFRunLoopRun   2159
8   com.apple.CoreFoundation      	0x00007fff8d9a2bd8 CFRunLoopRunSpecific   296
9   com.apple.HIToolbox           	0x00007fff87ce456f RunCurrentEventLoopInMode   235
10  com.apple.HIToolbox           	0x00007fff87ce42ea ReceiveNextEventCommon   431
11  com.apple.HIToolbox           	0x00007fff87ce412b _BlockUntilNextEventMatchingListInModeWithFilter   71
12  com.apple.AppKit              	0x00007fff8e8548ab _DPSNextEvent   978
13  com.apple.AppKit              	0x00007fff8e853e58 -[NSApplication nextEventMatchingMask:untilDate:inMode:dequeue:]   346
14  com.apple.AppKit              	0x00007fff8e849af3 -[NSApplication run]   594
15  com.apple.AppKit              	0x00007fff8e7c6244 NSApplicationMain   1832
16  libdyld.dylib                 	0x00007fff919355c9 start   1


```

We need to know what exactly is ```-[ALPinger socketDidDisconnect:withError:]   198```


##Solution:

###From
[https://stackoverflow.com/questions/18112842/how-can-i-find-the-address-of-a-stack-trace-in-lldb-for-ios](https://stackoverflow.com/questions/18112842/how-can-i-find-the-address-of-a-stack-trace-in-lldb-for-ios)


Here is something I found that worked:

First you need to find the address of the method itself.

```
image lookup -v -F "-[ViewController myMethod:]"
```

in the result you will see a lot of info, but the range part will give you want you want

```
... range = [0x000708c0-0x00070c6c) ...
(where 0x000708c0 is address of method)
```

Now to add the given offset of 47, just use LLDB to do that math for you:
```
(lldb) p/x 0x000708c0 + 47
(int) $0 = 0x000708ef
```
and you get your answer, the offending line is on 0x000708ef

Or better yet, based on Jason Molenda's answer, is to just go straight to the code listing, which will show the line number:

```
(lldb) source list -a `0x000708c0 + 47`
EDIT: improved based on the answer from Jason Molenda
```