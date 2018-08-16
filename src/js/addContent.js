/**
 * Created by ZhaoBoWen on 2016/11/14.
 */

"use strict";
// 添加内容
function addContent(ele, content) {

  var contentDOM = document.createElement("div");
  contentDOM.classList.add("connectContentBox");

  contentDOM.innerHTML = content;
  var imgDOM = contentDOM.getElementsByTagName("img")[0];

  if (imgDOM) {
    // 如果是图片,处理显示

    contentDOM.appendChild(imgDOM);
    // var img = new Image();

    // 图片是否加载成功如果加载成功则换算宽高
    // 并居中
    imgDOM.onload = function () {

      // 默认加载失败背景图 css默认写入 加载成功后删除
      contentDOM.style.backgroundImage = "url('')";

      var imgDOMHeight = parseInt(window.getComputedStyle(imgDOM, null).height);
      var imgDOMWidth = parseInt(window.getComputedStyle(imgDOM, null).width);

      var eleScale = parseInt(ele.style.width) / parseInt(ele.style.height);
      var imgScale = imgDOMWidth / imgDOMHeight;

      eleScale < imgScale ? (function () {

        imgDOM.style.height = "auto";
        imgDOM.style.width = ele.style.width;
        imgDOM.style.position = "absolute";
        imgDOM.style.left = 0;
        imgDOM.style.top = (parseInt(ele.style.height) - parseInt(window.getComputedStyle(imgDOM, null).height)) / 2 + 'px';

      }()) : (function () {

        imgDOM.style.height = ele.style.height;
        imgDOM.style.width = "auto";
        imgDOM.style.position = "absolute";
        imgDOM.style.top = 0;
        imgDOM.style.left = (parseInt(ele.style.width) - parseInt(window.getComputedStyle(imgDOM, null).width)) / 2 + 'px';

      }());

      imgDOM = null;

    };
    // 如果加载失败 那么清空内容全为背景色
    imgDOM.onerror = function () {

      contentDOM.innerHTML = '';

    };

    // 发起了一个http(s)的请求
    // img.src = imgDOM.getAttribute("src");
    // 图片加载完成后填入节点
    ele.appendChild(contentDOM);

  } else {
    // 没有图片,纯文本

    // 防止编辑出现多标签现象
    // 加外框后计算上下左右居中
    var textOutline = document.createElement("div");
    textOutline.style.position = "absolute";
    textOutline.innerHTML = content;
    textOutline.style.maxWidth = '90%';
    textOutline.style.maxHeight = '90%';
    // 图片加载完成后填入节点
    ele.appendChild(textOutline);

    // 等待浏览器渲染后,文字居中现实
    var textOutlineWidth = parseInt(window.getComputedStyle(textOutline, null).width);
    var eleWidth = parseInt(ele.style.width);

    if (eleWidth > textOutlineWidth) {

      textOutline.style.left = (eleWidth - textOutlineWidth) / 2 + 'px';
    }

    var textOutlineHeight = parseInt(window.getComputedStyle(textOutline, null).height);
    var eleHeight = parseInt(ele.style.height);

    if (eleHeight > textOutlineHeight) {

      textOutline.style.top = (eleHeight - textOutlineHeight) / 2 + 'px';
    }

  }

}

module.exports = addContent;