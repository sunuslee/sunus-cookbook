
### example project:[fswatch](https://github.com/emcrisostomo/fswatch)

###we need to build libfswatch.a for with deployment_target = 10.8 , default is the current os version.

###How to check a binary's deployment_target ?
``` tool -lv /path/to/binary | grep version```

1. set __deployment_target__ to __10.8__ 

	MACOSX_DEPLOYMENT_TARGET=10.8 CXXFLAGS="-stdlib=libc++ -std=c++11 -mmacosx-version-min=10.8" CXXLDFLAGS="-std=c++1" ./configure
	
	* the environment variable __MACOSX_DEPLOYMENT_TARGET=10.8__ and flag __-mmacosx-version-min=10.8__ is the key
	
2. set flags, e.g., cpp flags(CXXFLAG) and link flags(LDFLAG).
	
	MACOSX_DEPLOYMENT_TARGET=10.8 CXXFLAGS="-stdlib=libc++ -std=c++11 -mmacosx-version-min=10.8" CXXLDFLAGS="-std=c++1" ./configure
	
	* notice the CXXFLAG and CXXLDFLAGS
	
3. then run __make V=4__ to check the flags are take effects

4. if the project contains the cmake file , we can use `cmake -G "Xcode"`
	* REF: [cmake-tutorial-2-ide-integration](https://www.johnlamp.net/cmake-tutorial-2-ide-integration.html#section-Xcode)

6. Refs:
	1. [https://developer.apple.com/library/mac/documentation/Porting/Conceptual/PortingUnix/compiling/compiling.html](https://developer.apple.com/library/mac/documentation/Porting/Conceptual/PortingUnix/compiling/compiling.html)
	2. some example [http://www.shoup.net/ntl/doc/config.txt](http://www.shoup.net/ntl/doc/config.txt)
	3. stack overflow [https://stackoverflow.com/questions/16246352/how-do-i-specify-ldflags-and-cppflags-for-configure](https://stackoverflow.com/questions/16246352/how-do-i-specify-ldflags-and-cppflags-for-configure)