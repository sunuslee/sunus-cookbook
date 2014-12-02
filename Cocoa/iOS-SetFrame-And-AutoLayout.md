###setFrame in ViewDidLoad

If your xib file using __autoLayOut__ , then you __setFrame__ in __viewDidLoad__ will not work, because __autoLayout__ will override your __setFrame__

So you need to do your setFrame in __viewDidLayoutSubviews__

Or if you insist to setFrame in __viewDidLoad__ then you need to uncheck the __autoLayout__ in xib file.


Link:
[http://stackoverflow.com/questions/12645248/ios-setframe-no-longer-working-from-viewdidload-or-viewwillappear](http://stackoverflow.com/questions/12645248/ios-setframe-no-longer-working-from-viewdidload-or-viewwillappear)