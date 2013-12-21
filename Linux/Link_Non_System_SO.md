#Problem

You have a library libfuse.so, you want to link with __-lfuse__

```gcc file1.c file2.c -o obj -L/lib -lfuse```


By default, thd linker will look up for your system directories and 
found: __/lib/libfuse.so.2 -> libfuse.so.2.8.6__

But you want to link your programe with the same so but different version __/some/other/path/lib/libfuse.so.2 -> /some/other/path/lib/libfuse.so.2.9.3__

#Solution

the linker, ld has a -rpath option, to set the search shared library path.

```gcc file1.c file2.c -o obj -L/some/other/path/lib -lfuse -Wl,-rpath=/some/other/path/lib/```

* -L tell gcc to search .so file in that directory, if that's not a system directory
* -Wl pass arguments to linker(ld)
* you can also set environment variable __LD_LIARBRY_PATH__ but that's for test only and not recommended.
