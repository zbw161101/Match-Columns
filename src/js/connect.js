/**
 * Created by ZhaoBoWen on 2016/11/14.
 */

"use strict";

var addContent = require('./addContent');
var removeElement = require('./removeElement');

var STATE_INITAL = 0;//初始化状态
// var STATE_SELECTED = 1;//选中状态  暂时抛弃,由class == ac判断
var STATE_CONNECTION = 2;//连线状态

// 记录用户所连线答案
var questionArr;

var winWidth = parseInt(window.getComputedStyle(document.body, null).width);
// 显示轮廓
var packDivWidth = winWidth * 0.3;
var packDivHeight = winWidth * 0.22;
var packDivGapBottom = 30;
/**
 * 连线题类
 * @constructor
 */
function ConnectDiv() {

    // 获取连线区域节点
    this.connectDiv = document.getElementById('connect');
}

/**
 * 初始化
 * @param record 用户作答记录
 * @param dataList 展示数据
 * @param type 是否批卷
 */
ConnectDiv.prototype.init = function (record, dataList, type) {

    // APP可能会重复利用,清空节点
    this.connectDiv.innerHTML = "";

    // APP可能会重复利用,清空答案
    questionArr = [];

    // 用户是否之前作答
    this.userAnswerArr = record ? record : [];

    // 是否批卷,
    this.type = type;

    var me = this;

    // 记录需要的属性
    // 绑定点击事件
    for (var list = 0; list < 2; list++) {
        var questionList = [];
        for (var row = 0, len = dataList.right.length > dataList.left.length ? dataList.right.length : dataList.left.length; row < len; row++) {

            // 如果空数据的时候重新循环
            if ((list === 0 && !dataList.left[row]) || (list === 1 && !dataList.right[row])) {

                continue;
            }
            var packDiv = document.createElement("div");
            packDiv.setAttribute("class", "connectList");

            packDiv.state = STATE_INITAL;
            packDiv.index = row;
            // 用于删除连接线
            packDiv.lineId = null;
            // 用于控制数组
            packDiv.lineNum = null;
            //自动填充内容,轮廓狂傲是为固定

            packDiv.style.width = packDivWidth + 'px';
            packDiv.style.height = packDivHeight + 'px';

            packDiv.style.top = row * (packDivHeight + packDivGapBottom) + 'px';


            // 计算偏移量,并储存
            // 绘制线段时需要
            this.connectDiv.appendChild(packDiv);

            /**
             *
             * 显示真正数据
             * 先显示左侧数据,再显示右侧数据
             *
             */
            if (list === 0) {

                addContent(packDiv, dataList.left[row].c);
            } else {

                addContent(packDiv, dataList.right[row].c);
            }

            /**
             *
             * 需要左右两侧拆分数据的属性
             * 设置css浮动左浮动和有浮动,用来区分两侧列表的位置
             * list 存储各列表每个可连接DOM的偏移量
             * position 每个选项DOM 连线的连接点坐标
             *
             */
            if (list === 0) {

                // 左侧列表距离浏览器的位置
                packDiv.style.left = "3%";

                // 用户点击时根据此项判断点击的是那侧列表
                // 点击左侧需要判断同侧的其他选中状态,连接状态进行对应处理
                packDiv.list = "left";

                // 线的起始坐标,存入DOM中
                // 后期用户划线时直接取出
                packDiv.position = {
                    X: packDiv.offsetLeft + packDivWidth + 6,
                    Y: packDiv.offsetTop + packDivHeight / 2
                }
            } else {

                // 左侧列表距离浏览器的位置
                packDiv.style.right = "3%";
                // 点击右侧需要判断另外一侧的选中状态,连接状态进行对应处理
                packDiv.list = "right";

                // 线的结束坐标,存入DOM中
                // 后期用户划线时直接取出
                packDiv.position = {
                    X: packDiv.offsetLeft - 3,
                    Y: packDiv.offsetTop + packDivHeight / 2
                }
            }


            if (!this.type) {

                packDiv.ontouchend = function () {

                    var otherAc;

                    if (this.state === STATE_INITAL) {

                        // 如果点击的是左侧列表切换状态,并加遮罩
                        if (this.list === "left") {

                            var similarOtherAc = document.getElementsByClassName("ac")[0];

                            if (similarOtherAc) {

                                similarOtherAc.classList.remove("ac");

                            }
                            this.classList.add("ac");

                            //如果点击的是右侧
                        } else {

                            otherAc = document.getElementsByClassName("ac")[0];
                            if (otherAc) {

                                otherAc.classList.remove('ac');

                                if (otherAc.lineId !== null) {
                                    me._rmUserAnswer(otherAc.lineId);
                                }

                                // 记录用户连接答案
                                me.userAnswerArr.push({"id": otherAc.index, "result": this.index});

                                // 绘制连线
                                me._draw(questionArr[0][otherAc.index], questionArr[1][this.index]);
                            }

                        }

                    } else {

                        // 当前状态为连线状态 即 state === STATE_CONNECTION
                        if (this.list === "left") {

                            otherAc = document.getElementsByClassName("ac")[0];
                            if (otherAc) {
                                otherAc.classList.remove("ac");
                            }
                            this.classList.add("ac");

                        } else {

                            otherAc = document.getElementsByClassName("ac")[0];

                            // 如果左侧不是没有任何选中的状态
                            if (otherAc) {

                                otherAc.classList.remove('ac');

                                if(document.getElementById('line' + otherAc.index + '_' + this.index) != null){
                                    return;
                                }

                                // 左侧之前如果没有连接过其他线并且没有重复点击一个线
                                // 如果另一侧有连接,删除两条线
                                if (otherAc.lineId !== null && otherAc.lineId !== this.lineId) {

                                    me._rmUserAnswer(otherAc.lineId);
                                }

                                me._rmUserAnswer(this.lineId);

                                // 用户答案记录
                                me.userAnswerArr.push({
                                    "id": otherAc.index,
                                    "result": this.index
                                });


                                me._draw(questionArr[0][otherAc.index], questionArr[1][this.index]);

                            }

                        }
                    }
                };
            }
            //储存到列数组中
            questionList.push(packDiv);


        }

        //列数组储存到问题的最终数组里,方面以后操作节点
        questionArr.push(questionList);

    }

    this._anewDraw();

    // 如果需要批卷
    if (this.type) {
        this._judgeAnswer();
    }
    return this;
};

/**
 * 查找对应连线,对应数组中删除
 * @param lineId 线的ID
 * @private
 */
ConnectDiv.prototype._rmUserAnswer = function (lineId) {

    var id = lineId[0];

    var result = lineId[1];

    for (var i = 0, len = this.userAnswerArr.length; i < len; i++) {

        if (this.userAnswerArr[i].id == id && this.userAnswerArr[i].result == result) {

            // lineId 清空
            questionArr[0][id].lineId = null;
            questionArr[1][result].lineId = null;

            // 初始化连线状态
            questionArr[0][id].state = STATE_INITAL;
            questionArr[1][result].state = STATE_INITAL;

            // 删除选中边框
            questionArr[0][id].classList.remove("acBorder");
            questionArr[1][result].classList.remove("acBorder");

            // 从用户答案中删除该答案
            this.userAnswerArr.splice(i, 1);
            // 删除连线
            removeElement(document.getElementById('line' + id + '_' + result));
            return;
        }
    }
};

/**
 * 历史作答重新绘制
 * 重绘全部连线  主要用于绘制历史记录
 * @private
 */
ConnectDiv.prototype._anewDraw = function () {

    var record = this.userAnswerArr;

    // 重新绘制全部线
    for (var drawIndex = 0, drawLen = record.length; drawIndex < drawLen; drawIndex++) {

        this._draw(questionArr[0][record[drawIndex].id], questionArr[1][record[drawIndex].result]);
    }
};

/**
 * 绘制线条
 * 利用数学公式计算出斜边长(连线的线长)
 * 计算需要旋转的角度后旋转
 *
 * 左右两侧列表添加连线ID 更改state为连线状态
 * @param startDOM 左侧连接节点
 * @param endDOM 右侧连接节点
 * @private
 */
ConnectDiv.prototype._draw = function (startDOM, endDOM) {

    if (!this.type) {
        startDOM.classList.add("acBorder");
        endDOM.classList.add("acBorder");
    }

    var lineId = [startDOM.index, endDOM.index];
    startDOM.lineId = endDOM.lineId = lineId;
    // 设置所有连线状态
    startDOM.state = endDOM.state = STATE_CONNECTION;

    // 设置连线题左右列表的Id 后期批改 根据此项判断对错

    startDOM.id = "div" + lineId[0] + "_" + lineId[1];

    endDOM.id = "div" + lineId[0] + "right" + lineId[1];

    // 获取连线开始的坐标
    var lineStart = startDOM.position;

    // 获取连线结束的坐标
    var lineEnd = endDOM.position;

    var line = document.createElement("div");

    line.setAttribute("class", "line");

    line.id = "line" + startDOM.index.toString() + "_" + endDOM.index.toString();

    // 计算三角形旋转角度 与 线的长度
    var triangleLineA = lineEnd.X - lineStart.X;
    var triangleLineB = lineEnd.Y - lineStart.Y;
    var angle = Math.atan2(triangleLineB, triangleLineA) * 180 / Math.PI;
    line.style.width = Math.sqrt(Math.pow(Math.abs(triangleLineA), 2) + Math.pow(Math.abs(triangleLineB), 2)) + 'px';
    line.style.top = lineStart.Y + 'px';
    line.style.left = lineStart.X + 'px';

    // 旋转基准点,低版本考虑兼容
    line.style.webkitTransformOrigin = "0 50%";
    line.style.mozTransformOrigin = "0 50%";
    line.style.msTransformOrigin = "0 50%";
    line.style.oTransformOrigin = "0 50%";
    line.style.transformOrigin = "0 50%";

    // 旋转角度基准点,低版本考虑兼容
    line.style.webkitTransform = "rotate(" + angle + "deg)";
    line.style.mozTransform = "rotate(" + angle + "deg)";
    line.style.msTransform = "rotate(" + angle + "deg)";
    line.style.oTransform = "rotate(" + angle + "deg)";
    line.style.transform = "rotate(" + angle + "deg)";
    this.connectDiv.appendChild(line);
};
/**
 * 返回答案数组
 * 与APP交互,返回用户连线答案
 * @returns {Array}
 */
ConnectDiv.prototype.getUserAnswer = function () {
    return this.userAnswerArr;
};

/**
 * 批改作业
 * @private
 */
ConnectDiv.prototype._judgeAnswer = function () {

    for (var i = 0, len = this.userAnswerArr.length; i < len; i++) {

        if (this.userAnswerArr[i].correct == 3) {

            // 用户答题正确
            document.getElementById("div" + this.userAnswerArr[i].id + "_" + this.userAnswerArr[i].result).classList.add("answerRight");
            //
            document.getElementById("div" + this.userAnswerArr[i].id + "right" + this.userAnswerArr[i].result).classList.add("answerRight");
            document.getElementById("line" + this.userAnswerArr[i].id + "_" + this.userAnswerArr[i].result).classList.add("answerRight");
        } else {

            // 用户答案错误
            // 左侧列表红色边框
            document.getElementById("div" + this.userAnswerArr[i].id + "_" + this.userAnswerArr[i].result).classList.add("answerError");
            // // 右侧列表红色边框
            document.getElementById("div" + this.userAnswerArr[i].id + "right" + this.userAnswerArr[i].result).classList.add("answerError");
            // // 连线红色
            document.getElementById("line" + this.userAnswerArr[i].id + "_" + this.userAnswerArr[i].result).classList.add("answerError");
        }
    }
};

module.exports = new ConnectDiv();