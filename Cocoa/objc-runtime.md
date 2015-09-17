###Associated-objects

What for ?

If you want to add __instance variable__ to a __existing class__
	1: subclass that class
	2: Associated-objects

Normally, a __category__ for a class can not be add __instance variable__, but with Associated-objects, you can!

How Associated-objects works:

* add a key-value pair to a instance of a __existing class__ by(setValue)
	
		void objc_setAssociatedObject ( id object, const void *key, id value, objc_AssociationPolicy policy );
		
		##we can use selector as the key.

* read the value

		id objc_getAssociatedObject ( id object, const void *key );



Here are some more detail reference

1. [http://kingscocoa.com/tutorials/associated-objects/](http://kingscocoa.com/tutorials/associated-objects/)
2. [http://nshipster.com/associated-objects/](http://nshipster.com/associated-objects/)


###Method-Swizzling


Reference:

1. [http://nshipster.com/method-swizzling/](http://nshipster.com/method-swizzling/)