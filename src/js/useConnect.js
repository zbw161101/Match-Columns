/**
 * Created by ZhaoBoWen on 2016/11/19.
 */

"use strict";

const connect = require('./connect');

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

const t = [{"id":"0","correct":"1","result":"0"},{"id":"2","correct":"3","result":"1"},{"id":"1","correct":"1","result":"2"}];
const test = {"left":[{"c":"<p><img src=\"\/uploads\/question\/20161213\/148160748939758.png\" title=\"148160748939758.png\" alt=\"blob.png\"\/><\/p>","aw":"2"},{"c":"<p><img src=\"\/uploads\/question\/20161213\/1481607498712529.png\" title=\"1481607498712529.png\" alt=\"blob.png\"\/><\/p>","aw":"1"},{"c":"<p><img src=\"\/uploads\/question\/20161213\/1481607520944475.png\" title=\"1481607520944475.png\" alt=\"blob.png\"\/><\/p>","aw":"0"},{"c":"<p><img src=\"\/uploads\/question\/20161213\/1481607550202362.png\" title=\"1481607550202362.png\" alt=\"blob.png\"\/><\/p>","aw":"4"},{"c":"<p><img src=\"\/uploads\/question\/20161213\/1481607568865044.png\" title=\"1481607568865044.png\" alt=\"blob.png\"\/><\/p>","aw":"3"}],"right":[{"c":"<p><img src=\"\/uploads\/question\/20161213\/1481607505135751.png\" title=\"1481607505135751.png\" alt=\"blob.png\"\/><\/p>"},{"c":"<p><img src=\"\/uploads\/question\/20161213\/1481607512283292.png\" title=\"1481607512283292.png\" alt=\"blob.png\"\/><\/p>"},{"c":"<p><img src=\"\/uploads\/question\/20161213\/1481607535801448.png\" title=\"1481607535801448.png\" alt=\"blob.png\"\/><\/p>"},{"c":"<p><img src=\"https:\/\/w.com\/images\/branding\/googlelogo\/2x\/googlelogo_color_272x92dp.png\" title=\"1481607557620469.png\" alt=\"blob.png\"\/><\/p>"},{"c":"<p><img src=\"http:\/\/192.168.1on\/20161213\/148160757812379.png\" title=\"148160757812379.png\" alt=\"blob.png\"\/>&nbsp;&nbsp;&nbsp;&nbsp;<br\/><\/p>"}]};
showQuestion(t,test);
