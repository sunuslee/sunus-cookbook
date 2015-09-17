#我的一些调试的 Tips

###打印日志的宏
1. 先看代码

```
void _sunusdbg(int DBG, int ACT,const char *func, const char *file,int line, const char *fmt, ...);
#define sunus_dbg(DBG,ACT,func,...)  _sunusdbg(DBG,ACT,#func,__FILE__,__LINE__, __VA_ARGS__)

#define ERROR 1
#define FINISHED 2
#define IN 3
#define OUT 4
#define WATCH 5
#define	PANIC 6
static const char * const dbg_infos[10] =
{
    NULL,
    "ERROR",
    "FINISHED",
    "IN",
    "OUT",
    "WATCH",
    "PANIC"
};

void
_sunusdbg(int on,int act,const char *func, const char *file, int line, const char *fmt, ...)
{
    va_list ap;
    if(on)
    {
        printf("SUNUS : %s %d %s %s\n",file,line,func,dbg_infos[act]);
        va_start(ap, fmt);
        printf(fmt, ap);
        printf("\n");
        if(act == 6)
            printf("stop!\n");
    }
}

```



需要打印日志的时候可以

```
sunus_dbg(1, ERROR, "Some data string: %s", string);

```

* 由于我以前写过蛮多的 C 代码, 然后 Objective-C 是 C 的超集, 于是我回想起以前我自己用的一个 C 的调试宏. 主要是这几个宏起到了作用, \_\_FILE\_\_,  \_\_LINE\_\_ , #func , 这几个编译器内置的宏可以获取到当前的文件名, 行号, 函数名等.

* 然后我想, 可否将该函数移植到 Objective-C 上, 这样打印日志也更加清晰了.
* 移植过后的版本

```
#define sunus_dbg(DBG,ACT,func,...)  _nssunusdbg(DBG,ACT,__PRETTY_FUNCTION__,__FILE__,__LINE__, __VA_ARGS__)

void
_nssunusdbg(int on,int act,const char *func, const char *file, int line, const char *fmt, ...)
{
    va_list ap;
    if(on)
    {
        printf("SUNUS : %s %d %s %s\n",file,line,func,dbg_infos[act]);
        va_start(ap, fmt);
        printf(fmt, ap);
        printf("\n");
        if(act == 6)
            printf("stop!\n");
    }
}
```

用法和上一个一样, 只不过获取对应方法名的宏变成了 \_\_PRETTY_FUNCTION\_\_

PS, 以上的几个宏 \_\_FILE\_\_ , \_\_LINE_\_\_ , \_\_VA_ARGS\_\_ , \_\_PRETTY_FUNCTION\_\_ 等, 均为编译器(gcc, clang)的内置宏.

###符号断点
2. 有些时候, 调试的时候, 不知道程序在哪调用了某个方法, 这时候调试非常困难. 这是, 可以使用 「symbolic breakpoint」 来解决问题. 「symbolic breakpoint」的做法是给某个符号, 某个方法打上断点. 比如我的某个 SDK 会无故调用 logout 方法, 但是我不知道在哪调用的, 于是可以这样.「Xcode->breakpoint->add Symbolic breakpoint」, 然后 symbol 输入 

    __ -[MySDK logout:someParameters:]__
    
    这样, 每次调用 logout 的时候即可被断下, 进行下一步的分析.
        
 * 一个典型的做法是添加这个符号断点
    
    __ -[NSObject doesNotRecognizeSelector:]__
    
    这样每次都能捕获到由于对象不对, 产生 unrecognized selector sent" exception 的异常.

3. 更加有意思的地方是, 在添加断点的条件(condiction)里写上
```
[NSThread isMainThread]
```
这样就可以把所有在 __主线程__ 的断点给断下来, 而其他线程的则忽略
    
##Refrences:

[Apple breakpoint help](https://developer.apple.com/library/ios/recipes/xcode_help-breakpoint_navigator/articles/adding_a_symbolic_breakpoint.html)

[Power of breakpoint](http://www.albertopasca.it/whiletrue/2013/06/xcode-power-of-breakpoints/)

[GCC Preprocess Guide](https://gcc.gnu.org/onlinedocs/cpp/)


<script src="http://yandex.st/highlightjs/7.3/highlight.min.js"></script>
<link rel="stylesheet" href="http://yandex.st/highlightjs/7.3/styles/github.min.css">
<script>
  hljs.initHighlightingOnLoad();
</script>

