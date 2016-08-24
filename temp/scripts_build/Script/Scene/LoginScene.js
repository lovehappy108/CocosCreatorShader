"use strict";
cc._RFpush(module, '703601KhppCQpXPArxhSIYP', 'LoginScene');
// Script/Scene/LoginScene.js

var Shader = require("../../Shader/Shader.js");
cc.Class({
    "extends": cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function onLoad() {
        var node = cc.find("LoginBg/login_enterBtn", this.node);
        var actionBy = cc.rotateBy(12, 360);
        node.runAction(cc.repeatForever(actionBy));
        Shader.setGLProgram(node, "GreyShader");
    }
});

cc._RFpop();