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