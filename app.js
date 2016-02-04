/**
 * Created by abuhena on 2/2/16.
 */
angular.module('myTestApp', ['ngContextMenu']).
    controller('mainCtrl', ['$scope', 'contextMenu', function ($scope, contextMenu) {

        contextMenu.init('.green', {
            theme: 'light',
            name: 'green',
            items: [
            {
                title: "Back",
                listen: function() {
                    window.history.back();
                }
            },
            {
                title: "View",
                disable: true,
                listen: function() {
                    //nothing now
                }
            },
            {
                title: "Sort",
                disable: false,
                listen: function() {
                    contextMenu.name('green').index(0).setTitle("Go Back")
                    console.log(contextMenu.name('green').index(0).getTitle());
                    contextMenu.name('green').index(3).setDisable(!contextMenu.name('green').index(3).getDisable());

                    console.log(contextMenu.name('green').index(0).getListen());

                    contextMenu.name('green').index(0).setListen(function () {
                        alert("Hello World!");
                    });
                }
            },
            {
                title: "Reload",
                listen: function() {
                    window.location.reload();
                }
            }

        ]});




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
                    //nothing now
                }
            },
                {
                    title: "Share",
                    disable: true,
                    listen: function() {
                        //nothing now
                    }
                },
            {
                title: "Rename",
                disable: false,
                listen: function() {
                    contextMenu.name('orange').index(0).setTitle("Close");
                }
            },
            {
                title: "Delete",
                listen: function() {
                    alert("Indigo Ref");
                }
            },
                {
                    title: "Property",
                    listen: function() {
                        $scope.hello();
                    }
                }

        ]});

        $scope.destroyCM = function () {
            alert("Hello, world");
        }

    }]);

