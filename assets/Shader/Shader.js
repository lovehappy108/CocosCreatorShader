
var vertShader = "attribute vec4 a_position;\n"
                    + "attribute vec2 a_texCoord;\n"
                    + "attribute vec4 a_color;\n"
                    + "varying vec4 v_fragmentColor;\n"
                    + "varying vec2 v_texCoord;\n"
                    + "void main()\n"
                    + "{\n"
                    + "gl_Position = CC_PMatrix * a_position;\n"
                    + "v_fragmentColor = a_color;\n"
                    + "v_texCoord = a_texCoord;\n"
                    + "}";


var fragShader = "varying vec4 v_fragmentColor;\n"
                + "varying vec2 v_texCoord;\n"
                + "void main()\n"
                + "{\n"
                +   "   gl_FragColor = v_fragmentColor * texture2D(CC_Texture0, v_texCoord);\n"
                + "}";




var ShaderArray = {
    GreyShader : require("GreyShader")
}

function getOrCreateWithGLProgram(shader, glProgramName){
    var fs = shader.frag;
    var vs = shader.vert;
    var glProgram = new cc.GLProgram();
    if (cc.sys.isNative) {
        cc.log("use native GLProgram");
        glProgram.initWithString(vs == null? vertShader : vs, fs == null? fragShader : fs);
        glProgram.link();
        glProgram.updateUniforms();
    } else {
        cc.log("use webgl GLProgram");
        glProgram.initWithVertexShaderByteArray(vs == null? vertShader : vs, fs == null? fragShader : fs);
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
    if (shader == null){
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


