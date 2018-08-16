/**
 * Created by ZhaoBoWen on 2016/11/18.
 */

"use strict";

function removeElement(_element){
    var _parentElement = _element.parentNode;
    if(_parentElement){
        _parentElement.removeChild(_element);
    }
}

module.exports = removeElement;
