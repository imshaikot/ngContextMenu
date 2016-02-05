# ngContextMenu
AngularJS Custom Context Menu Provider to customize your mouse right clicked context menu and prevent the default one to come forward.

  Initial configuration is as usual
  
  ```javascript
  angular.module('myTestApp', ['ngContextMenu'....
  
  ```
  Usecase
  
  ```javascript
  contextMenu.init('.orange', {
            theme: 'dark',
            name: 'orange',
            items: [
            {
                title: "Open",
                listen: function() {
                    window.history.back();
                }
            },
            {
                title: "Open With...",
                disable: true,
                listen: function() {
                    //this won't fire unless you triger to disable: false OR remove this
                }
            }
            //More items .....

        ]});
  
  ```
  Please go through `test/` directory.
  
  `contextMenu` provider have three top level methods `contextMenu.init` , `contextMenu.name` , `contextMenu.destroy`
  
  ```javascript
  contextMenu.init(Selector, ItemsConfigurableObject)
  ``` 
  This method literely have 2 required parameters `Selector` and `ItemsConfigurableObject` - Selector is basically the query selector
  that where context will setup popup , you can use any CSS class OR unique ID OR body to prevent the default context menu from
  the entire web app.
  `ItemsConfigurableObject` is the top level object notation - the basic syntax is
  ```
  {
    theme: 'theme name', //dark or light
    name: 'context menu name' // name must be unique 
    items: [ //Context menu listing
      {
        title: 'Back' //Title of the first CM list item
        disable: false, // true OR false to declare disability
        listen: function () {} // List item click event listener
      }
    ]
  }
  ```
  You must have to declare this method as long you need to configure the context menu.
  
  ```javascript
  contextMenu.name(contextMenuName)
  ``` 
  This method use to access the top level API - parameter is name of your context menu that you want to access.
  This method will return a method object for subsequent listing item `index(number)` and this method will return a set of method 
  object for subsequent listing item 
  
  `getTitle()` 
  
  `setTitle(String)` 
  
  `getDisable()` 
  
  `setDisable(Boolean)` 
  
  `getListen()` 
  
  `setListen(Function)`
  
  So the code will be something like this
  ```javascript
  contextMenu.name("main").index(0).setTitle("New Title");
  contextMenu.name("main").index(0).setListen(function () {
    alert("I'm a new listener and just got fired");
  });
  ```
  
  ```javascript
  contextMenu.destroy(contextMenuName)
  ``` 
  This method use to destroy the active context menu from the binded element.
  
  
