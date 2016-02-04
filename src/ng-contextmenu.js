/**
 * Created by abuhena on 2/2/16.
 */

'use strict';

angular.module('ngContextMenu', []).

    factory('contextMenu', [ '$document', '$rootScope', function ($document, $rootScope) {

        var selector = null;
        var bodySelector = false;
        var itemIdPrefix = "contextMenu";

        $rootScope.contextMenuItems = {};

        var createContext = function (parse, filItems) {

            var divider = $document[0].createElement('div');
            divider.id = itemIdPrefix + filItems.name;
            divider.style.display = "none";
            divider.style.position = "fixed";
            divider.style.paddingBottom = "30px";
            divider.style.paddingTop = "10px";
            divider.style.width = "180px";
            divider.style.borderRadius = "5px";
            divider.style.backgroundColor = filItems.theme == "light" ? "rgba(255,255,255, 0.85)" : "rgba(0,0,0, 0.85)";
            divider.style.boxShadow = "0 0 4px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.28)";

            filItems.items.forEach(function (item) {
                var rowItem = $document[0].createElement("div");
                rowItem.style.fontFamily = '"Helvetica Neue Light", "HelveticaNeue-Light",'+
                    ' "Helvetica Neue", Calibri, Helvetica, Arial, Sans-Serif';
                rowItem.style.fontSize = "12px";
                rowItem.style.minHeight = "18px";
                rowItem.style.borderBottom = "1px solid #C2C1C1";
                rowItem.style.marginLeft = "5px";
                rowItem.style.marginRight = "5px";
                rowItem.style.padding = "6px 5px 5px 10px";
                rowItem.style.color = item.disable ? "#929090" : filItems.theme == "light" ? "#414141" : "#EFEFEF";
                rowItem.style.cursor = item.disable ? "" : "pointer";
                rowItem.style.textAlign = "left";
                rowItem.innerHTML = item.title;
                rowItem.id = itemIdPrefix +"-" + filItems.name +"-" + filItems.items.indexOf(item);

                rowItem.addEventListener("mouseover", function () {
                    rowItem.style.marginLeft = "0px";
                    rowItem.style.marginRight = "0px";
                    rowItem.style.padding = "6px 10px 5px 15px";
                    rowItem.style.backgroundColor = item.disable ? filItems.theme == "light" ? "transparent" : "rgba(0,0,0, 0.3)" :
                    filItems.theme == "light" ? "rgba(0,0,0, 0.05)" : "rgba(0,0,0, 0.85)";
                });

                rowItem.addEventListener("mouseout", function () {
                    rowItem.style.marginLeft = "5px";
                    rowItem.style.marginRight = "5px";
                    rowItem.style.padding = "6px 5px 5px 10px";
                    rowItem.style.backgroundColor = "transparent";

                });

                rowItem.addEventListener("click", function () {
                    return item.disable || item.listen();
                });

                divider.appendChild(rowItem);
            });

            return divider;

        };

        var config = function (parse, items) {

            var reserveContext = createContext(parse, items);
            var driverArea = null;

            if (bodySelector) {
                driverArea = $document[0];
                $document[0].body.insertBefore(reserveContext, $document[0].body.firstChild);
            } else {
                driverArea = $document[0].querySelector(parse);
                $document[0].querySelector(parse).insertBefore(reserveContext,
                    $document[0].querySelector(parse).firstChild);
            }

            driverArea.addEventListener('contextmenu', function (e) {
                return updateContext(e, reserveContext);
            }, false);

            driverArea.addEventListener('click', function (e) {

                reserveContext.style.display = "none";

            });
        };

        var updateContext = function (event, element) {
            event.preventDefault();
            element.style.top = event.clientY+"px";
            element.style.left = event.clientX+"px";
            element.style.display = "block";
        };

        return {
            init: function (parse, items) {

                if (typeof parse == 'undefined' || (typeof  items == 'undefined'||typeof items != 'object')) {
                    throw new TypeError("Malformed configuration.");
                } else {

                    selector = parse;
                    bodySelector = (parse.indexOf(".")<0&&parse.indexOf("#")<0);// ? false : true;

                    if ((bodySelector)&&selector!="body") {
                        throw new ReferenceError("Selector doesn't appear to be a valid Class/Id - you must disclose your"+
                        " selector as .your_class_name / #your_id / body");
                    } else if ($document[0].querySelector(parse)==null) {
                        throw new ReferenceError("Undefined query selector provided - make sure you defined '"+parse+"' class"+
                        " OR id on your HTML template");
                    }

                    if (typeof items.theme=="undefined") {
                        throw new TypeError("You must disclose the theme name on the top level object -"+
                        " currently only two dark and light.");
                    } else if (['dark', 'light'].indexOf(items.theme)<0) {
                        throw new ReferenceError("There are no such theme as '"+items.theme+"' , please use dark/light ");
                    }

                    if (typeof items.name=='undefined') {
                        throw new TypeError("You must add an unique name of context menu on the top level object.");
                    } else if (typeof $rootScope.contextMenuItems[items.name] != "undefined") {
                        throw new Error("Currently ngContextMenu doesn't support duplicate names.");
                    }

                    if (typeof items.items == "undefined" || items.items.length<1) {
                        throw new SyntaxError("Malformed configuration - please go through API doc");
                    }

                    //$rootScope.contextMenuItems = items;

                    Object.defineProperty($rootScope.contextMenuItems, items.name, {
                        value: items
                    });

                    return config(parse, items);
                }

            },

            name: function(name) {

                if (typeof $rootScope.contextMenuItems[name]!='object')
                {
                    throw new TypeError("Context name doesn't seem to be a valid name.");
                }

                if (itemIdPrefix.indexOf("-")>-1) {
                    itemIdPrefix = itemIdPrefix.substring(0, itemIdPrefix.indexOf("-"));
                }
                itemIdPrefix += "-";
                itemIdPrefix += name;
                itemIdPrefix += "-";
                return {
                    index: function (num) {
                        if (typeof num != "number" || num >= $rootScope.contextMenuItems[name].length) {
                            throw new Error("Row number not found OR context has not been initiated.");
                        } else {
                            return {
                                getTitle: function () {
                                    return $rootScope.contextMenuItems[name].items[num].title;
                                },
                                setTitle: function (title) {
                                    if (typeof title == "string") {

                                        $rootScope.contextMenuItems[name].items[num].title = title;
                                        $document[0].getElementById(itemIdPrefix + num).innerHTML = title;

                                    } else {
                                        throw new TypeError("Title must be string OR plain HTML.");
                                    }
                                },
                                getDisable: function () {
                                    return typeof $rootScope.contextMenuItems[name].items[num].disable == "undefined" ? false :
                                        $rootScope.contextMenuItems[name].items[num].disable;
                                },
                                setDisable: function (bool) {
                                    if (typeof bool == "boolean") {

                                        $rootScope.contextMenuItems[name].items[num].disable = bool;

                                        $document[0].getElementById(itemIdPrefix + num).style.color = bool ?
                                            "#929090" : $rootScope.contextMenuItems[name].theme == "light" ? "#414141" : "#EFEFEF";
                                        $document[0].getElementById(itemIdPrefix + num).style.cursor = bool ? "" : "pointer";

                                    } else {
                                        throw new TypeError("Disable property must be Boolean");
                                    }
                                },
                                getListen: function () {
                                    return $rootScope.contextMenuItems[name].items[num].listen;
                                },
                                setListen: function (listener) {
                                    if (typeof listener == 'function') {

                                        $rootScope.contextMenuItems[name].items[num] = listener;

                                        $document[0].getElementById(itemIdPrefix + num).addEventListener("click", function () {
                                            return listener();
                                        }, false);

                                    } else {
                                        throw new TypeError("Listener property must be a Function");
                                    }
                                }
                            }
                        }
                    }
                }
            },

            destroy: function (name) {

                if (typeof $rootScope.contextMenuItems[name]!='object')
                {
                    throw new TypeError("Context name doesn't seem to be a valid name.");
                }

                var elem = document.getElementById("contextMenu" + name);
                elem.parentNode.removeChild(elem);
            }
        };


    }]);