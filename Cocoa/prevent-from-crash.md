###
如何避免 App 应为收到网络 API 数据返回异常而导致的解析 Crash.

hi,
    我目前遇到一个比较头疼的问题, 就是有时候在调用网络的 API 的时候. 往往会因为返回的数据格式异常, 内容异常, 返回 API 的约定而造成解析之后的 Crash, 请问下大家是如何处理这种问题的?
    比如, 我有一个 API 是这样的 http://xxx.com/getToken.json
    返回的数据一般是这样的
    {
        success: 1/0
        content: {
            token: tokenString, // "asdasdsad"
            code:  404, // an integer
            someData: xxx
        }
    }
    这个 API 约定 如果 success 为 1, 那么 content 里的 token, code, someData 都是应该存在, 且合法的.
    但是如果是因为服务端的 BUG 或者异常, 这个接口返回这样. success 为 1, 但是 token 没有, 那么我在取 token 值的时候
        token = [response valueForKeyPath:@"content.token"]; 则会取到 nil 值, 那么我在之后使用 这个 nil 值的时候很可能会导致 crash, 比如把这个值放到一个Dictionary里.

    又或者, 这个 API 约定 code  一定为一个 整数. 那么我在取这个值的时候, 是这样
        code = [[response valueForKeyPath:@"content.code"] integerValue]
    但是, 这个时候万一这个 code 是一个 NSArray.. 那么.. 我又 crash 了..


    所以, 我想请教下大家有什么经验来处理这种异常返回结果导致 App Crash 的问题? 谢谢
