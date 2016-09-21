#Property for NSString
### Strong or Copy ?

For attributes whose type is an immutable value class that conforms to the NSCopying protocol, you almost always should specify copy in your @property declaration. Specifying retain is something you almost never want in such a situation.

Here's why you want to do that:

```
NSMutableString *someName = [NSMutableString stringWithString:@"Chris"];

Person *p = [[[Person alloc] init] autorelease];
p.name = someName;

[someName setString:@"Debajit"];
```

The current value of the Person.name property will be different depending on whether the property is declared retain or copy — it will be @"Debajit" if the property is marked retain, but @"Chris" if the property is marked copy.

Since in almost all cases you want to prevent mutating an object's attributes behind its back, you should mark the properties representing them copy. (And if you write the setter yourself instead of using @synthesize you should remember to actually use copy instead of retain in it.)

more link:

[https://stackoverflow.com/questions/387959/nsstring-property-copy-or-retain](https://stackoverflow.com/questions/387959/nsstring-property-copy-or-retain)