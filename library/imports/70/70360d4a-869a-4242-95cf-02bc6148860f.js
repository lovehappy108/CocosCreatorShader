var Shader = require("../../Shader/Shader.js");
cc.Class({
    "extends": cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function onLoad() {
        cc._initDebugSetting(cc.DebugMode.INFO);
        console.log("onLoadonLoadonLoad");
        var node = cc.find("LoginBg/login_enterBtn", this.node);
        var actionBy = cc.rotateBy(12, 360);
        node.runAction(cc.repeatForever(actionBy));
        cc.director.getActionManager().pauseTarget(node);
        Shader.setGLProgram(node, "GreyShader");
        // node.getComponent(cc.Sprite).spriteFrame.getTexture().setAliasTexParameters();
    }
});