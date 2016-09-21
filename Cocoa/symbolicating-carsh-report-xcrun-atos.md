Given crash report:

```
Thread 0:
0   JavaScriptCore                	0x2899b2e4 JSC::Structure::Structure(JSC::VM&, JSC::JSGlobalObject*, JSC::JSValue, JSC::TypeInfo const&, JSC::ClassInfo const*, unsigned char, unsigned int) + 0
1   JavaScriptCore                	0x28627ffd JSC::Structure::Structure(JSC::VM&, JSC::JSGlobalObject*, JSC::JSValue, JSC::TypeInfo const&, JSC::ClassInfo const*, unsigned char, unsigned int) + 41
2   JavaScriptCore                	0x28627fc1 JSC::StructureRareData::createStructure(JSC::VM&, JSC::JSGlobalObject*, JSC::JSValue) + 89
3   JavaScriptCore                	0x286231f9 JSC::VM::VM(JSC::VM::VMType, JSC::HeapType) + 1585
4   JavaScriptCore                	0x28622bc5 JSC::VM::createLeaked(JSC::HeapType) + 25
5   WebCore                       	0x28bfc037 WebCore::JSDOMWindowBase::commonVM() + 43
6   WebCore                       	0x28c19165 WebCore::mainThreadNormalWorld() + 29
7   WebKitLegacy                  	0x2987e6cb -[WebFrame(WebInternal) _stringByEvaluatingJavaScriptFromString:forceUserGesture:] + 147
8   UIKit                         	0x29f65a51 -[UIWebView stringByEvaluatingJavaScriptFromString:] + 81
9   Aliwork                       	0x0019e035 0x4000 + 1679413
10  Aliwork                       	0x001da00d 0x4000 + 1925133
11  Aliwork                       	0x001d8dc1 0x4000 + 1920449
12  Aliwork                       	0x0000d37d 0x4000 + 37757
13  UIKit                         	0x29b709cd -[UIApplication _handleDelegateCallbacksWithOptions:isSuspended:restoreState:] + 233
14  UIKit                         	0x29d9a287 -[UIApplication _callInitializationDelegatesForMainScene:transitionContext:] + 3087
15  UIKit                         	0x29d9e241 -[UIApplication _runWithMainScene:transitionContext:completion:] + 1589
16  UIKit                         	0x29db2811 __84-[UIApplication _handleApplicationActivationWithScene:transitionContext:completion:]_block_invoke3286 + 37
17  UIKit                         	0x29d9b767 -[UIApplication workspaceDidEndTransaction:] + 135
18  FrontBoardServices            	0x26bebbf7 __FBSSERIALQUEUE_IS_CALLING_OUT_TO_A_BLOCK__ + 19
19  FrontBoardServices            	0x26bebaa7 -[FBSSerialQueue _performNext] + 227
20  FrontBoardServices            	0x26bebda5 -[FBSSerialQueue _performNextFromRunLoopSource] + 45
21  CoreFoundation                	0x254df9e7 __CFRUNLOOP_IS_CALLING_OUT_TO_A_SOURCE0_PERFORM_FUNCTION__ + 15
22  CoreFoundation                	0x254df5d7 __CFRunLoopDoSources0 + 455
23  CoreFoundation                	0x254dd93f __CFRunLoopRun + 807
24  CoreFoundation                	0x2542c1c9 CFRunLoopRunSpecific + 517
25  CoreFoundation                	0x2542bfbd CFRunLoopRunInMode + 109
26  UIKit                         	0x29b69f37 -[UIApplication _run] + 527
27  UIKit                         	0x29b64435 UIApplicationMain + 145
28  Aliwork                       	0x0000cfef 0x4000 + 36847
29  libdyld.dylib                 	0x250d8873 start + 3Thread 0:
0   JavaScriptCore                	0x2899b2e4 JSC::Structure::Structure(JSC::VM&, JSC::JSGlobalObject*, JSC::JSValue, JSC::TypeInfo const&, JSC::ClassInfo const*, unsigned char, unsigned int) + 0
1   JavaScriptCore                	0x28627ffd JSC::Structure::Structure(JSC::VM&, JSC::JSGlobalObject*, JSC::JSValue, JSC::TypeInfo const&, JSC::ClassInfo const*, unsigned char, unsigned int) + 41
2   JavaScriptCore                	0x28627fc1 JSC::StructureRareData::createStructure(JSC::VM&, JSC::JSGlobalObject*, JSC::JSValue) + 89
3   JavaScriptCore                	0x286231f9 JSC::VM::VM(JSC::VM::VMType, JSC::HeapType) + 1585
4   JavaScriptCore                	0x28622bc5 JSC::VM::createLeaked(JSC::HeapType) + 25
5   WebCore                       	0x28bfc037 WebCore::JSDOMWindowBase::commonVM() + 43
6   WebCore                       	0x28c19165 WebCore::mainThreadNormalWorld() + 29
7   WebKitLegacy                  	0x2987e6cb -[WebFrame(WebInternal) _stringByEvaluatingJavaScriptFromString:forceUserGesture:] + 147
8   UIKit                         	0x29f65a51 -[UIWebView stringByEvaluatingJavaScriptFromString:] + 81
9   Aliwork                       	0x0019e035 0x4000 + 1679413
10  Aliwork                       	0x001da00d 0x4000 + 1925133
11  Aliwork                       	0x001d8dc1 0x4000 + 1920449
12  Aliwork                       	0x0000d37d 0x4000 + 37757
13  UIKit                         	0x29b709cd -[UIApplication _handleDelegateCallbacksWithOptions:isSuspended:restoreState:] + 233
14  UIKit                         	0x29d9a287 -[UIApplication _callInitializationDelegatesForMainScene:transitionContext:] + 3087
15  UIKit                         	0x29d9e241 -[UIApplication _runWithMainScene:transitionContext:completion:] + 1589
16  UIKit                         	0x29db2811 __84-[UIApplication _handleApplicationActivationWithScene:transitionContext:completion:]_block_invoke3286 + 37
17  UIKit                         	0x29d9b767 -[UIApplication workspaceDidEndTransaction:] + 135
18  FrontBoardServices            	0x26bebbf7 __FBSSERIALQUEUE_IS_CALLING_OUT_TO_A_BLOCK__ + 19
19  FrontBoardServices            	0x26bebaa7 -[FBSSerialQueue _performNext] + 227
20  FrontBoardServices            	0x26bebda5 -[FBSSerialQueue _performNextFromRunLoopSource] + 45
21  CoreFoundation                	0x254df9e7 __CFRUNLOOP_IS_CALLING_OUT_TO_A_SOURCE0_PERFORM_FUNCTION__ + 15
22  CoreFoundation                	0x254df5d7 __CFRunLoopDoSources0 + 455
23  CoreFoundation                	0x254dd93f __CFRunLoopRun + 807
24  CoreFoundation                	0x2542c1c9 CFRunLoopRunSpecific + 517
25  CoreFoundation                	0x2542bfbd CFRunLoopRunInMode + 109
26  UIKit                         	0x29b69f37 -[UIApplication _run] + 527
27  UIKit                         	0x29b64435 UIApplicationMain + 145
28  Aliwork                       	0x0000cfef 0x4000 + 36847
29  libdyld.dylib                 	0x250d8873 start + 3
```

# How to know what is ```9   Aliwork                         0x0019e035 0x4000 + 1679413```

# Using ```xcrun atos```

1. Copy the match .app(unzipped from .ipa) and .dsym file to the same dir.
2. Find the Base image address : ```0x4000``` or get from the ```Binary Images``` section in the bottom of crashlog file. e.g ```Binary Images:
0x4000 - 0xdf7fff Aliwork armv7  <d1ce178641e93a46942594b189d24018> /var/containers/Bundle/Application/D35A3BCA-A17F-4732-8719-64904F5D6A88/Aliwork.app/Aliwork```
3. Next we need to know what is ```0x4000 + 1679413``` 
4. Convert __1679413__ to hex __0x19a035__ , using ```printf '0x%x\n' dec_number```
5. run ```xcrun atos -o Aliwork.app/Aliwork -arch armv7  -l 0x4000 0x19a035```
	* change -arch if necessary.
6. return ```-[AliworkConfDashboardViewController updateConferenceButton] (in Aliwork) + 629```
7. done