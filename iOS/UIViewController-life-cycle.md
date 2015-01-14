#UIViewController Lifecycle

###Events(listed in order)

1. -(void)loadView

2. -(void)viewDidLoad

3. -(void)viewViewWillAppear

4. -(void)viewWillLayoutSubviews

5. -(void)viewDidLayoutSubviews

6. -(void)viewDidAppear

###How can we use them?

#### -(void)loadView

Creates the view that the controller manages.

It’s only called when the view controller is created and only when done programatically. You can override this method in order to create your views manually.

#### -(void)viewDidLoad

Called after the controller’s view is loaded into memory.

It’s only called when the view is created. Keep in mind that in this lifecycle step the view bounds are not final. Good place to init and setup objects used in the viewController.

When you create the class and load from xib. Great for initial setup and one-time-only work.

#### -(void)viewWillAppear:(BOOL)animated

Notifies the view controller that its view is about to be added to a view hierarchy.

It’s called whenever the view is presented on the screen. In this step the view has bounds defined but the orientation is not applied. __This event is called every time the view appears so don’t add code here which should be executed just one time (or manage it correctly).__

#### -(void)viewWillLayoutSubviews

Called to notify the view controller that its view is about to layout its subviews.

This method is called every time the frame changes like for example when rotate or it’s marked as needing layout. __It’s the first step where the view bounds are final. If you are not using autoresizing masks or constraints and the view size changes you probably want to update the subviews here.__

#### -(void)viewDidLayoutSubviews

Called to notify the view controller that its view has just laid out its subviews.

Make additional changes here after the view lays out its subviews.


#### -(void)viewDidAppear:(BOOL)animated

Notifies the view controller that its view was added to a view hierarchy.

__Good place to perform additional tasks associated with presenting the view like animations. This method is executed after the animation displaying the view finishes so in this step the view is already visible for the user. In some cases can be a good place to load data from core data and present it in the view or to start requesting data from a server.__

#### -(void)ViewDidUnload/ -(void)ViewDidDispose

In Objective C, this is where you do your clean-up and release of stuff, but this is handled automatically so not much you really need to do here.


