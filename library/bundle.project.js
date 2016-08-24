require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"CanvasAdapter":[function(require,module,exports){
"use strict";
cc._RFpush(module, '3b85ee7B6RJLbz209I0ZwTG', 'CanvasAdapter');
// Script/CanvasAdapter.js

cc.Class({
    "extends": cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        canvas: {
            "default": null,
            type: cc.Canvas
        }
    },

    onLoad: function onLoad() {
        // cc.log("cc.view.getVisibleSizeInPixel = %s, %s", cc.view.getVisibleSizeInPixel().width, cc.view.getVisibleSizeInPixel().height)

        // cc.log("cc.view.getVisibleSize = %s, %s", cc.view.getVisibleSize().width, cc.view.getVisibleSize().height)
        // cc.log("cc.view.getFrameSize = %s, %s", cc.view.getFrameSize().width, cc.view.getFrameSize().height)

        // cc.log("cc.director.getWinSizeInPixels = %s, %s",cc.director.getWinSizeInPixels().width, cc.director.getWinSizeInPixels().height);
        // cc.log("cc.director.getWinSize = %s, %s",cc.director.getWinSize().width, cc.director.getWinSize().height);
        var frameSize = cc.winSize;
        var designResolution = new cc.Size(1136, 640);
        if (frameSize.width == 1024 && frameSize.height == 768 || frameSize.width == 2048 && frameSize.height == 1536) {
            designResolution.width = 1024;
            designResolution.height = 768;
        } else if (frameSize.height / frameSize.width < 0.5625) {
            this.canvas.fitHeight = false;
            this.canvas.fitWidth = true;
        }
        this.canvas = this.getComponent(cc.Canvas);
        this.canvas.designResolution = designResolution;
    }
});

cc._RFpop();
},{}],"GreyShader":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'f396avwhuJHt67L7V7eWxGU', 'GreyShader');
// Shader/GreyShader.js


var frag = "varying vec4 v_fragmentColor;\n" + "varying vec2 v_texCoord;\n" + "void main()\n" + "{\n" + "   vec4 col = texture2D(CC_Texture0, v_texCoord);\n" + "   float grey = dot(col.rgb, vec3(0.299, 0.587, 0.114));\n" + "   gl_FragColor = vec4(grey, grey, grey, col.a);\n" + "}";

function setUniforms(node) {}

module.exports = {
                frag: frag,
                vert: null,
                setUniforms: setUniforms
};

cc._RFpop();
},{}],"HelloWorld":[function(require,module,exports){
"use strict";
cc._RFpush(module, '280c3rsZJJKnZ9RqbALVwtK', 'HelloWorld');
// Script/HelloWorld.js

cc.Class({
    'extends': cc.Component,

    properties: {
        label: {
            'default': null,
            type: cc.Label
        },
        text: 'Hello, World!'
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.label.string = this.text;
    },

    // called every frame
    update: function update(dt) {}
});

cc._RFpop();
},{}],"LoginScene":[function(require,module,exports){
"use strict";
cc._RFpush(module, '703601KhppCQpXPArxhSIYP', 'LoginScene');
// Script/Scene/LoginScene.js

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

cc._RFpop();
},{"../../Shader/Shader.js":"Shader"}],"Shader":[function(require,module,exports){
"use strict";
cc._RFpush(module, '4f91eCtRq1GrLSs2YoKe8pN', 'Shader');
// Shader/Shader.js


var vertShader = "attribute vec4 a_position;\n" + "attribute vec2 a_texCoord;\n" + "attribute vec4 a_color;\n" + "varying vec4 v_fragmentColor;\n" + "varying vec2 v_texCoord;\n" + "void main()\n" + "{\n" + "gl_Position = CC_PMatrix * a_position;\n" + "v_fragmentColor = a_color;\n" + "v_texCoord = a_texCoord;\n" + "}";

var fragShader = "varying vec4 v_fragmentColor;\n" + "varying vec2 v_texCoord;\n" + "void main()\n" + "{\n" + "   gl_FragColor = v_fragmentColor * texture2D(CC_Texture0, v_texCoord);\n" + "}";

var ShaderArray = {
    GreyShader: require("GreyShader")
};

function getOrCreateWithGLProgram(shader, glProgramName) {
    var fs = shader.frag;
    var vs = shader.vert;
    var glProgram = new cc.GLProgram();
    if (cc.sys.isNative) {
        cc.log("use native GLProgram");
        glProgram.initWithString(vs == null ? vertShader : vs, fs == null ? fragShader : fs);
        glProgram.link();
        glProgram.updateUniforms();
    } else {
        cc.log("use webgl GLProgram");
        glProgram.initWithVertexShaderByteArray(vs == null ? vertShader : vs, fs == null ? fragShader : fs);
        glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
        glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
        glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
        glProgram.link();
        glProgram.updateUniforms();
    }
    return glProgram;
}

function setGLProgram(node, glShaderName) {
    var shader = ShaderArray[glShaderName];
    var fs = fragShader;
    if (shader == null) {
        cc.log("%s shader is nil", glShaderName);
        return;
    }
    var glProgram = getOrCreateWithGLProgram(shader, glShaderName);

    setProgram(node._sgNode, glProgram);
}

function setProgram(node, program) {

    if (cc.sys.isNative) {
        var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(program);
        node.setGLProgramState(glProgram_state);
    } else {
        node.setShaderProgram(program);
    }

    var children = node.children;
    if (!children) return;

    for (var i = 0; i < children.length; i++) {
        setProgram(children[i], program);
    }
}

module.exports = {
    setGLProgram: setGLProgram
};

cc._RFpop();
},{"GreyShader":"GreyShader"}],"StartGame":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'd543awag0xDFqvUsMwI5Arb', 'StartGame');
// Script/StartGame.js

cc.Class({
    "extends": cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        loginScene: {
            "default": null,
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        cc._initDebugSetting(cc.DebugMode.INFO);
    },

    start: function start() {
        cc.instantiate(this.loginScene).parent = cc.director.getScene();
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{}]},{},["HelloWorld","CanvasAdapter","Shader","LoginScene","StartGame","GreyShader"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL0FwcGxpY2F0aW9ucy9Db2Nvc0NyZWF0b3IuYXBwL0NvbnRlbnRzL1Jlc291cmNlcy9hcHAuYXNhci9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiYXNzZXRzL1NjcmlwdC9DYW52YXNBZGFwdGVyLmpzIiwiYXNzZXRzL1NoYWRlci9HcmV5U2hhZGVyLmpzIiwiYXNzZXRzL1NjcmlwdC9IZWxsb1dvcmxkLmpzIiwiYXNzZXRzL1NjcmlwdC9TY2VuZS9Mb2dpblNjZW5lLmpzIiwiYXNzZXRzL1NoYWRlci9TaGFkZXIuanMiLCJhc3NldHMvU2NyaXB0L1N0YXJ0R2FtZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzNiODVlZTdCNlJKTGJ6MjA5STBad1RHJywgJ0NhbnZhc0FkYXB0ZXInKTtcbi8vIFNjcmlwdC9DYW52YXNBZGFwdGVyLmpzXG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cbiAgICAgICAgY2FudmFzOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkNhbnZhc1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICAvLyBjYy5sb2coXCJjYy52aWV3LmdldFZpc2libGVTaXplSW5QaXhlbCA9ICVzLCAlc1wiLCBjYy52aWV3LmdldFZpc2libGVTaXplSW5QaXhlbCgpLndpZHRoLCBjYy52aWV3LmdldFZpc2libGVTaXplSW5QaXhlbCgpLmhlaWdodClcblxuICAgICAgICAvLyBjYy5sb2coXCJjYy52aWV3LmdldFZpc2libGVTaXplID0gJXMsICVzXCIsIGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS53aWR0aCwgY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpLmhlaWdodClcbiAgICAgICAgLy8gY2MubG9nKFwiY2Mudmlldy5nZXRGcmFtZVNpemUgPSAlcywgJXNcIiwgY2Mudmlldy5nZXRGcmFtZVNpemUoKS53aWR0aCwgY2Mudmlldy5nZXRGcmFtZVNpemUoKS5oZWlnaHQpXG5cbiAgICAgICAgLy8gY2MubG9nKFwiY2MuZGlyZWN0b3IuZ2V0V2luU2l6ZUluUGl4ZWxzID0gJXMsICVzXCIsY2MuZGlyZWN0b3IuZ2V0V2luU2l6ZUluUGl4ZWxzKCkud2lkdGgsIGNjLmRpcmVjdG9yLmdldFdpblNpemVJblBpeGVscygpLmhlaWdodCk7XG4gICAgICAgIC8vIGNjLmxvZyhcImNjLmRpcmVjdG9yLmdldFdpblNpemUgPSAlcywgJXNcIixjYy5kaXJlY3Rvci5nZXRXaW5TaXplKCkud2lkdGgsIGNjLmRpcmVjdG9yLmdldFdpblNpemUoKS5oZWlnaHQpO1xuICAgICAgICB2YXIgZnJhbWVTaXplID0gY2Mud2luU2l6ZTtcbiAgICAgICAgdmFyIGRlc2lnblJlc29sdXRpb24gPSBuZXcgY2MuU2l6ZSgxMTM2LCA2NDApO1xuICAgICAgICBpZiAoZnJhbWVTaXplLndpZHRoID09IDEwMjQgJiYgZnJhbWVTaXplLmhlaWdodCA9PSA3NjggfHwgZnJhbWVTaXplLndpZHRoID09IDIwNDggJiYgZnJhbWVTaXplLmhlaWdodCA9PSAxNTM2KSB7XG4gICAgICAgICAgICBkZXNpZ25SZXNvbHV0aW9uLndpZHRoID0gMTAyNDtcbiAgICAgICAgICAgIGRlc2lnblJlc29sdXRpb24uaGVpZ2h0ID0gNzY4O1xuICAgICAgICB9IGVsc2UgaWYgKGZyYW1lU2l6ZS5oZWlnaHQgLyBmcmFtZVNpemUud2lkdGggPCAwLjU2MjUpIHtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLmZpdEhlaWdodCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5jYW52YXMuZml0V2lkdGggPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2FudmFzID0gdGhpcy5nZXRDb21wb25lbnQoY2MuQ2FudmFzKTtcbiAgICAgICAgdGhpcy5jYW52YXMuZGVzaWduUmVzb2x1dGlvbiA9IGRlc2lnblJlc29sdXRpb247XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdmMzk2YXZ3aHVKSHQ2N0w3VjdlV3hHVScsICdHcmV5U2hhZGVyJyk7XG4vLyBTaGFkZXIvR3JleVNoYWRlci5qc1xuXG5cbnZhciBmcmFnID0gXCJ2YXJ5aW5nIHZlYzQgdl9mcmFnbWVudENvbG9yO1xcblwiICsgXCJ2YXJ5aW5nIHZlYzIgdl90ZXhDb29yZDtcXG5cIiArIFwidm9pZCBtYWluKClcXG5cIiArIFwie1xcblwiICsgXCIgICB2ZWM0IGNvbCA9IHRleHR1cmUyRChDQ19UZXh0dXJlMCwgdl90ZXhDb29yZCk7XFxuXCIgKyBcIiAgIGZsb2F0IGdyZXkgPSBkb3QoY29sLnJnYiwgdmVjMygwLjI5OSwgMC41ODcsIDAuMTE0KSk7XFxuXCIgKyBcIiAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoZ3JleSwgZ3JleSwgZ3JleSwgY29sLmEpO1xcblwiICsgXCJ9XCI7XG5cbmZ1bmN0aW9uIHNldFVuaWZvcm1zKG5vZGUpIHt9XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgICAgICAgICAgICAgIGZyYWc6IGZyYWcsXG4gICAgICAgICAgICAgICAgdmVydDogbnVsbCxcbiAgICAgICAgICAgICAgICBzZXRVbmlmb3Jtczogc2V0VW5pZm9ybXNcbn07XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICcyODBjM3JzWkpKS25aOVJxYkFMVnd0SycsICdIZWxsb1dvcmxkJyk7XG4vLyBTY3JpcHQvSGVsbG9Xb3JsZC5qc1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICB0ZXh0OiAnSGVsbG8sIFdvcmxkISdcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gdGhpcy50ZXh0O1xuICAgIH0sXG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWVcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge31cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnNzAzNjAxS2hwcENRcFhQQXJ4aFNJWVAnLCAnTG9naW5TY2VuZScpO1xuLy8gU2NyaXB0L1NjZW5lL0xvZ2luU2NlbmUuanNcblxudmFyIFNoYWRlciA9IHJlcXVpcmUoXCIuLi8uLi9TaGFkZXIvU2hhZGVyLmpzXCIpO1xuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7fSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICBjYy5faW5pdERlYnVnU2V0dGluZyhjYy5EZWJ1Z01vZGUuSU5GTyk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwib25Mb2Fkb25Mb2Fkb25Mb2FkXCIpO1xuICAgICAgICB2YXIgbm9kZSA9IGNjLmZpbmQoXCJMb2dpbkJnL2xvZ2luX2VudGVyQnRuXCIsIHRoaXMubm9kZSk7XG4gICAgICAgIHZhciBhY3Rpb25CeSA9IGNjLnJvdGF0ZUJ5KDEyLCAzNjApO1xuICAgICAgICBub2RlLnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGFjdGlvbkJ5KSk7XG4gICAgICAgIGNjLmRpcmVjdG9yLmdldEFjdGlvbk1hbmFnZXIoKS5wYXVzZVRhcmdldChub2RlKTtcbiAgICAgICAgU2hhZGVyLnNldEdMUHJvZ3JhbShub2RlLCBcIkdyZXlTaGFkZXJcIik7XG4gICAgICAgIC8vIG5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUuZ2V0VGV4dHVyZSgpLnNldEFsaWFzVGV4UGFyYW1ldGVycygpO1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnNGY5MWVDdFJxMUdyTFNzMllvS2U4cE4nLCAnU2hhZGVyJyk7XG4vLyBTaGFkZXIvU2hhZGVyLmpzXG5cblxudmFyIHZlcnRTaGFkZXIgPSBcImF0dHJpYnV0ZSB2ZWM0IGFfcG9zaXRpb247XFxuXCIgKyBcImF0dHJpYnV0ZSB2ZWMyIGFfdGV4Q29vcmQ7XFxuXCIgKyBcImF0dHJpYnV0ZSB2ZWM0IGFfY29sb3I7XFxuXCIgKyBcInZhcnlpbmcgdmVjNCB2X2ZyYWdtZW50Q29sb3I7XFxuXCIgKyBcInZhcnlpbmcgdmVjMiB2X3RleENvb3JkO1xcblwiICsgXCJ2b2lkIG1haW4oKVxcblwiICsgXCJ7XFxuXCIgKyBcImdsX1Bvc2l0aW9uID0gQ0NfUE1hdHJpeCAqIGFfcG9zaXRpb247XFxuXCIgKyBcInZfZnJhZ21lbnRDb2xvciA9IGFfY29sb3I7XFxuXCIgKyBcInZfdGV4Q29vcmQgPSBhX3RleENvb3JkO1xcblwiICsgXCJ9XCI7XG5cbnZhciBmcmFnU2hhZGVyID0gXCJ2YXJ5aW5nIHZlYzQgdl9mcmFnbWVudENvbG9yO1xcblwiICsgXCJ2YXJ5aW5nIHZlYzIgdl90ZXhDb29yZDtcXG5cIiArIFwidm9pZCBtYWluKClcXG5cIiArIFwie1xcblwiICsgXCIgICBnbF9GcmFnQ29sb3IgPSB2X2ZyYWdtZW50Q29sb3IgKiB0ZXh0dXJlMkQoQ0NfVGV4dHVyZTAsIHZfdGV4Q29vcmQpO1xcblwiICsgXCJ9XCI7XG5cbnZhciBTaGFkZXJBcnJheSA9IHtcbiAgICBHcmV5U2hhZGVyOiByZXF1aXJlKFwiR3JleVNoYWRlclwiKVxufTtcblxuZnVuY3Rpb24gZ2V0T3JDcmVhdGVXaXRoR0xQcm9ncmFtKHNoYWRlciwgZ2xQcm9ncmFtTmFtZSkge1xuICAgIHZhciBmcyA9IHNoYWRlci5mcmFnO1xuICAgIHZhciB2cyA9IHNoYWRlci52ZXJ0O1xuICAgIHZhciBnbFByb2dyYW0gPSBuZXcgY2MuR0xQcm9ncmFtKCk7XG4gICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xuICAgICAgICBjYy5sb2coXCJ1c2UgbmF0aXZlIEdMUHJvZ3JhbVwiKTtcbiAgICAgICAgZ2xQcm9ncmFtLmluaXRXaXRoU3RyaW5nKHZzID09IG51bGwgPyB2ZXJ0U2hhZGVyIDogdnMsIGZzID09IG51bGwgPyBmcmFnU2hhZGVyIDogZnMpO1xuICAgICAgICBnbFByb2dyYW0ubGluaygpO1xuICAgICAgICBnbFByb2dyYW0udXBkYXRlVW5pZm9ybXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjYy5sb2coXCJ1c2Ugd2ViZ2wgR0xQcm9ncmFtXCIpO1xuICAgICAgICBnbFByb2dyYW0uaW5pdFdpdGhWZXJ0ZXhTaGFkZXJCeXRlQXJyYXkodnMgPT0gbnVsbCA/IHZlcnRTaGFkZXIgOiB2cywgZnMgPT0gbnVsbCA/IGZyYWdTaGFkZXIgOiBmcyk7XG4gICAgICAgIGdsUHJvZ3JhbS5hZGRBdHRyaWJ1dGUoY2MubWFjcm8uQVRUUklCVVRFX05BTUVfUE9TSVRJT04sIGNjLm1hY3JvLlZFUlRFWF9BVFRSSUJfUE9TSVRJT04pO1xuICAgICAgICBnbFByb2dyYW0uYWRkQXR0cmlidXRlKGNjLm1hY3JvLkFUVFJJQlVURV9OQU1FX0NPTE9SLCBjYy5tYWNyby5WRVJURVhfQVRUUklCX0NPTE9SKTtcbiAgICAgICAgZ2xQcm9ncmFtLmFkZEF0dHJpYnV0ZShjYy5tYWNyby5BVFRSSUJVVEVfTkFNRV9URVhfQ09PUkQsIGNjLm1hY3JvLlZFUlRFWF9BVFRSSUJfVEVYX0NPT1JEUyk7XG4gICAgICAgIGdsUHJvZ3JhbS5saW5rKCk7XG4gICAgICAgIGdsUHJvZ3JhbS51cGRhdGVVbmlmb3JtcygpO1xuICAgIH1cbiAgICByZXR1cm4gZ2xQcm9ncmFtO1xufVxuXG5mdW5jdGlvbiBzZXRHTFByb2dyYW0obm9kZSwgZ2xTaGFkZXJOYW1lKSB7XG4gICAgdmFyIHNoYWRlciA9IFNoYWRlckFycmF5W2dsU2hhZGVyTmFtZV07XG4gICAgdmFyIGZzID0gZnJhZ1NoYWRlcjtcbiAgICBpZiAoc2hhZGVyID09IG51bGwpIHtcbiAgICAgICAgY2MubG9nKFwiJXMgc2hhZGVyIGlzIG5pbFwiLCBnbFNoYWRlck5hbWUpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBnbFByb2dyYW0gPSBnZXRPckNyZWF0ZVdpdGhHTFByb2dyYW0oc2hhZGVyLCBnbFNoYWRlck5hbWUpO1xuXG4gICAgc2V0UHJvZ3JhbShub2RlLl9zZ05vZGUsIGdsUHJvZ3JhbSk7XG59XG5cbmZ1bmN0aW9uIHNldFByb2dyYW0obm9kZSwgcHJvZ3JhbSkge1xuXG4gICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xuICAgICAgICB2YXIgZ2xQcm9ncmFtX3N0YXRlID0gY2MuR0xQcm9ncmFtU3RhdGUuZ2V0T3JDcmVhdGVXaXRoR0xQcm9ncmFtKHByb2dyYW0pO1xuICAgICAgICBub2RlLnNldEdMUHJvZ3JhbVN0YXRlKGdsUHJvZ3JhbV9zdGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbm9kZS5zZXRTaGFkZXJQcm9ncmFtKHByb2dyYW0pO1xuICAgIH1cblxuICAgIHZhciBjaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW47XG4gICAgaWYgKCFjaGlsZHJlbikgcmV0dXJuO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBzZXRQcm9ncmFtKGNoaWxkcmVuW2ldLCBwcm9ncmFtKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHNldEdMUHJvZ3JhbTogc2V0R0xQcm9ncmFtXG59O1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnZDU0M2F3YWcweERGcXZVc013STVBcmInLCAnU3RhcnRHYW1lJyk7XG4vLyBTY3JpcHQvU3RhcnRHYW1lLmpzXG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cbiAgICAgICAgbG9naW5TY2VuZToge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgY2MuX2luaXREZWJ1Z1NldHRpbmcoY2MuRGVidWdNb2RlLklORk8pO1xuICAgIH0sXG5cbiAgICBzdGFydDogZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICAgIGNjLmluc3RhbnRpYXRlKHRoaXMubG9naW5TY2VuZSkucGFyZW50ID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKTtcbiAgICB9XG5cbn0pO1xuLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbi8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbi8vIH0sXG5cbmNjLl9SRnBvcCgpOyJdfQ==
