[Source](http://python-china.org/topic/704 "Permalink to 为 C/C++ 库定制 Python Binding — Python China")

###本文转自: http://python-china.org/topic/704
###Author: tonyseek

# 为 C/C++ 库定制 Python Binding — Python China

这应该是个非常常见的需求了吧。可能因为性能原因需要自己编写一部分 C 代码，可能因为需要的第三方库是 C/C++ 编写的。

我遇到这个问题是因为希望将淘宝发的一个切图实现 [tclip][1] 放到 Python 上用。和几个同事都尝试折腾了这个问题，总结出了几种可行的方法。

## 可行的办法

### 直接 port 到 Python 上

实现例子: [github.com/CNBorn/pytclip][2]

tclip 是使用 OpenCV 实现的，所以一个可行的途径是直接使用 OpenCV 的 Python Binding，将逻辑在 Python 中实现一遍。

所以如果目标库本身代码比较简单，但是用到了第三方 C/C%2B%2B 库，可以寻找有没有第三方库的 Python Binding。如果有，可以将逻辑 port 到 Python 上实现。

优点：

  * 编写快，只需要编写 Python 代码，不需要写 C/C%2B%2B；
  * 构建过程简单。由于将构建过程推给了第三方 Python Binding，所以直接用 setuptools 内置的依赖管理指向 PyPI 上的包即可。如果源中提供了打包好的依赖，部署环境不需要安装编译器或 foobar-devel 库。

缺点：

  * 视具体情况不同，性能折扣可能比较大；
  * 而且最终质量依赖第三方 Python Binding 库的质量。如果第三方实现的很多坑，那我们作为使用者就会掉坑；
  * 跨平台、跨解释器受第三方限制。如果第三方 Python Binding 库只支持 CPython 或 Python 2.x 或只支持某个操作系统，那么我们编写的库也将受到这个限制。

### 使用 CPython ABI 绑定

实现例子: [github.com/xtao/tclip][3]

这个对 CPython 而言“受官方支持”的做法，大部分库也都会选择这么做。用 C/C%2B%2B 编写一个绑定模块并在其中 `#include ` 和定义 `PyMODINIT_FUNC`，使用 setuptools 编译后就可以在 Python 中直接 import，非常好用。

除去直接使用 C/C%2B%2B 访问 CPython ABI，借助 Pyrex 或者 Cython 能编码过程进一步简化。使用 Cython 后除了访问 C/C%2B%2B 接口处，其他地方就像编写普通 Python 代码。

优点：

  * CPython 的官方指导做法，适用面广；
  * 构建过程简单，在 `setup.py` 中定义好后，`python setup.py install` 或者 `pip install foobar` 就可以直接编译扩展并安装到 site-packages 目录。部署环境要求安装编译器，但编译过程不用人为干预。如果在源中打包好，部署环境的编译器也可以省去。

缺点：

  * 仅适用于 CPython，无法适用其它富有潜力的解释器，如 PyPy。

### 使用 ctypes 或者 cffi 绑定

实现例子: [github.com/tonyseek/python-tclip][4]

[ctypes][5] 是 Python 标准库模块，能在运行时载入动态链接库（Windows 平台上的 `foo.dll`、Linux/Unix/OSX 平台上的 `foo.so`），在 CPython 2.x/3.x 和 PyPy 上均受支持。

[cffi][6] 是 PyPy 开发者编写的一套 Python 与 C 的 FII 实现，和 ctypes 类似，但提供了更高层的接口，支持直接内嵌 C 源码，运行时将其编译。cffi 同时支持 CPython 和 PyPy 两种解释器。在 PyPy 中 cffi 是内置的，ctypes 实际上是 cffi 的一个 wrapper。

其中我个人更推荐使用 cffi，因为它能接受和 setuptools 一样的扩展选项，例如指定 `include` 路径、`library` 路径，方便编译需要外部库支持的 C/C%2B%2B 源码。如果配合[一个简单的函数][7]调用系统的 `pkg-config` 来寻找这个路径，就能在不同的平台下不修改参数而直接编译，方便程度不亚于 CPython ABI。

另外，cffi 支持基础类型到 Python 的自动转换，例如 `str` 对 `char *`、`int` 对 `int` 等。用 cffi 产生的接口对于不合法的输入不是一个粗暴的段错误或 core dump 回应，而是抛出 Python 语言级别的可恢复异常，例如 `TypeError`。

一个简单的例子：

```
    import cffi

    ffi = cffi.FFI()
    ffi.cdef("""
        int hello(char *);
    """)
    ffi.verify("""
        #include 
        int hello(char *name) { printf("hello, %s", name); return 0; }
    """)

    assert ffi.hello("world") == 0
```

如果 C 的源码独立成文件，也可以用 `ffi.verify(sources=['foo.c'])` 指定。`verify` 接受的参数和 setuptools/distutils 的 `Extension` 类接受的参数是兼容的。

如果目标代码不是 ANSI C 而是 C++ 的，暴露给 cffi 的接口需要包在 `extern "C" {}` 内。

优点：

  * 跨解释器兼容，同时支持 CPython 2.x/3.x 和 PyPy；
  * 开发和部署都非常简单，编译过程由 cffi 库默默完成。

缺点：

  * 由于是运行时编译，所以即使做了安装源的二进制打包，部署环境还是**必须**安装编译器和 `foobar-devel` 库；
  * 同样由于运行时编译，所以对于频繁运行而每次运行时间又特别短的小脚本来说，`verify` 的执行有些不“低碳”（对于驻守进程的应用则可以忽略这个开销，因为 `verify` 只在首次调时编译）。

### 基于 boost-python 的封装

实现例子：tclip 的例子就没有了。有一个 tesseract 的 Python Binding 实现 tesserwrap，[早期][8]使用了这个方法。

据说性能捉急，坑又多多。所以 tesserwrap 现在也迁移到 `ctypes` 了。这里就不详述了。

## 做出选择

我个人来说最推崇的方法是 cffi/ctypes，理由是“跨解释器”。我认为作为一个库实现，对 PyPy 的支持重要程度不亚于对 Python 3.x 的支持。

我现在发起的开源 Python 库一律对 CPython 2.7、CPython 3.3 和 PyPy latest stable release 提供 CI 保证和维护支持。因为我认为作为维护者，不应该让自己的库成为用户选择优秀解释器的阻碍。cffi/ctypes 很完美地符合了这个要求。

目前为止，我了解的还有 [Wand][9]（ImageMagick 的 binding）和现行版本的 [tesserwrap][10]（Tesseract 的 binding）使用了 cffi/ctypes ；此外如果要在 PyPy 下使用 PostgreSQL，选择之一也是 [psycopg2-ctypes][11] 驱动。

   [1]: https://github.com/exinnet/tclip
   [2]: https://github.com/CNBorn/pytclip
   [3]: https://github.com/xtao/tclip
   [4]: https://github.com/tonyseek/python-tclip
   [5]: http://docs.python.org/dev/library/ctypes.html
   [6]: http://cffi.readthedocs.org
   [7]: https://github.com/tonyseek/python-tclip/blob/e041c974f409bcc4075121a38d16fda83fe8d9cc/tclip.py#L13-L23
   [8]: https://github.com/gregjurman/tesserwrap/blob/3edfbe1942a6ba6983e32564b99442fdae8550c2/tesserwrap/cpp/tesseract_wrap.cpp#L70-L95
   [9]: http://docs.wand-py.org
   [10]: https://github.com/gregjurman/tesserwrap
   [11]: https://github.com/mvantellingen/psycopg2-ctypes
  
