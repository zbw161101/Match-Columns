/**
 * Created by ZhaoBoWen on 2016/11/19.
 */

"use strict";

var connect = require('./connect');

window.showQuestion = function (record, initContent, headerData) {
    record = JSON.parse(JSON.stringify(record));
    initContent = JSON.parse(JSON.stringify(initContent));
    connect.init(record, initContent, false);
    headerData = JSON.parse(JSON.stringify(headerData));
    document.getElementById('header').innerHTML = headerData.c;
};
window.getUserAnswer = function () {
    BHWEB.popUserAnswer(JSON.stringify(connect.getUserAnswer()));
};
window.getAllAnswers = function () {
    return JSON.stringify(connect.getUserAnswer());
};

window.showResult = function (answer, initContent, headerData) {
    answer = JSON.parse(JSON.stringify(answer));
    initContent = JSON.parse(JSON.stringify(initContent));
    connect.init(answer, initContent, true);
    headerData = JSON.parse(JSON.stringify(headerData));
    document.getElementById('header').innerHTML = headerData.c;
};

// showHeader('<p><span style="font-family:\'宋体\';font-size:14px;">下面的图片分别是谁看到的</span><span style="font-family:\'Times New Roman\';font-size:14px;"><span style="font-family:\'宋体\';">？连一连。</span></span></p><p><img src="http://www.banhai.com/uploads/question/20161220/1482215638479841.png" title="1482215638479841.png"alt="blob.png"/></p>')
var t = [{"id":"0","correct":"1","result":"0"},{"id":"2","correct":"3","result":"1"},{"id":"1","correct":"1","result":"2"}];
var txt = {"left": [{"c": "<p><img src=\"http://t11.baidu.com/it/u=988766659,1196358583&fm=76\" title=\"1479202234525235.png\" alt=\"19_222949_18.jpg\"/></p>","aw": "2"},{"c": "<p><img src=\"/uploads/11022016/6201103411087392.png\" title=\"147920225712700.png\" alt=\"19_222949_18.jpg\"/></p>","aw": "0"},{"c": "<p><img src=\"/uploads/11022016/6201103411251232.png\" title=\"1479202271546418.png\" alt=\"19_222949_18.jpg\"/></p>","aw": "1"}],"right":[{"c":"正面"},{"c":"上面"},{"c":"下面"}]};
var test = {"left":[{"c":"<p><img src=\"\/uploads\/question\/20161213\/148160748939758.png\" title=\"148160748939758.png\" alt=\"blob.png\"\/><\/p>","aw":"2"},{"c":"<p><img src=\"\/uploads\/question\/20161213\/1481607498712529.png\" title=\"1481607498712529.png\" alt=\"blob.png\"\/><\/p>","aw":"1"},{"c":"<p><img src=\"\/uploads\/question\/20161213\/1481607520944475.png\" title=\"1481607520944475.png\" alt=\"blob.png\"\/><\/p>","aw":"0"},{"c":"<p><img src=\"\/uploads\/question\/20161213\/1481607550202362.png\" title=\"1481607550202362.png\" alt=\"blob.png\"\/><\/p>","aw":"4"},{"c":"<p><img src=\"\/uploads\/question\/20161213\/1481607568865044.png\" title=\"1481607568865044.png\" alt=\"blob.png\"\/><\/p>","aw":"3"}],"right":[{"c":"<p><img src=\"\/uploads\/question\/20161213\/1481607505135751.png\" title=\"1481607505135751.png\" alt=\"blob.png\"\/><\/p>"},{"c":"<p><img src=\"\/uploads\/question\/20161213\/1481607512283292.png\" title=\"1481607512283292.png\" alt=\"blob.png\"\/><\/p>"},{"c":"<p><img src=\"\/uploads\/question\/20161213\/1481607535801448.png\" title=\"1481607535801448.png\" alt=\"blob.png\"\/><\/p>"},{"c":"<p><img src=\"https:\/\/w.com\/images\/branding\/googlelogo\/2x\/googlelogo_color_272x92dp.png\" title=\"1481607557620469.png\" alt=\"blob.png\"\/><\/p>"},{"c":"<p><img src=\"http:\/\/192.168.1on\/20161213\/148160757812379.png\" title=\"148160757812379.png\" alt=\"blob.png\"\/>&nbsp;&nbsp;&nbsp;&nbsp;<br\/><\/p>"}]};
showQuestion(t,test);


// window.test = function () {
//     connect.init([],{'left':[{c:'<span>asdf</span><span>asasdfkjhalskdjfalksjdflkajsdl;fkja;slkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjfslkdjf;lakjsd;flkjasd;lfkja;lskdjf;lakjsdf;lkjas;ldkfj;alskjdf;lakjsd;lkjfa;lskdjf;lkasjd;flkja;slkdjf;lakjsd;flkjdf</span><span>asdf</span>'},{c:'<span>asdf</span>'},{c:'<span>asdf</span>'},{c:'<span>asdf</span>'}],'right':[{c:'1'},{c:'1'},{c:'1'}]},false);
// };
// test();

// showResult([{"id":"0","correct":"3","result":"2"},{"id":"1","correct":"1","result":"1"},{"id":"2","correct":"1","result":"0"}],{"left":[{"c":"<p><img src=\"\/uploads\/question\/20161202\/1480671295201649.png\" title=\"1480671295201649.png\" alt=\"1.png\"\/><\/p>","aw":"2"},{"c":"<p><img src=\"\/uploads\/question\/20161202\/148067131560785.png\" title=\"148067131560785.png\" alt=\"2.png\"\/><\/p>","aw":"0"},{"c":"<p><img src=\"\/uploads\/question\/20161202\/1480671336970038.png\" title=\"1480671336970038.png\" alt=\"3.png\"\/><\/p>","aw":"1"}],"right":[{"c":"<p>正面<\/p>"},{"c":"<p>上面<\/p>"},{"c":"<p>侧面<\/p>"}]})