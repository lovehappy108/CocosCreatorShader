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