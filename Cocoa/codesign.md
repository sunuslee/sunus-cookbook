#Codesign a Bundle

using codesign tool

```
codesign --force --verbose=4 --sign "code sign id" bundle.app
```

####Code sign a Framework

1. check framework format is correct. (especially the __symbolc links__ and __files layout__)

```
MyFramework.framework/
    MyFramework  -> Versions/Current/MyFramework
    Resources    -> Versions/Current/Resources
    Versions/
        A/
            MyFramework
            Resources/
                English.lproj/
                    InfoPlist.strings
                Info.plist
        Current  -> A
```

2. codesign path is

```
MyFramework.framework/Versions/A
```


####Check codesign

There are two tools to check if codesign is succeed

```

spctl --access --verbose -t exec/installer bundle_name/framework_name


codesign --verify --verbose=4 bundle_name/framework_name

```


####Tips
If possible, set xcode to __don't use codesign__

instead using codesign and spctl tool to manually codesign the app.


####References
[Codesign in depth](https://developer.apple.com/library/mac/technotes/tn2206/_index.html#//apple_ref/doc/uid/DTS40007919-CH1-SUBSECTION9)

[Anatomy of Framework Bundles](https://developer.apple.com/library/mac/documentation/MacOSX/Conceptual/BPFrameworks/Concepts/FrameworkAnatomy.html)

[codesign-mavericks](http://furbo.org/2013/10/17/code-signing-and-mavericks/)
