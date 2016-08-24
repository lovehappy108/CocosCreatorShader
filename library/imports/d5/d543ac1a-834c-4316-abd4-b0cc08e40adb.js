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