import { render as _render } from "./render";
import { Page as _RemaxifyPage } from "@remax/remaxify-runtime";

_RemaxifyPage(
  {
    data: {
      text: "This is page data.",
    },
    onLoad: function (options) {
      // Do some initialize when page load.
    },
    onShow: function () {
      // Do something when page show.
    },
    onReady: function () {
      // Do something when page ready.
    },
    onHide: function () {
      // Do something when page hide.
    },
    onUnload: function () {
      // Do something when page close.
    },
    onPullDownRefresh: function () {
      // Do something when pull down.
    },
    onReachBottom: function () {
      // Do something when page reach bottom.
    },
    onShareAppMessage: function () {
      // return custom share data when user share.
    },
    onPageScroll: function () {
      // Do something when page scroll
    },
    onResize: function () {
      // Do something when page resize
    },

    onTabItemTap(item) {
      console.log(item.index);
      console.log(item.pagePath);
      console.log(item.text);
    },

    // Event handler.
    viewTap: function () {
      this.setData(
        {
          text: "Set some data for updating view.",
        },
        function () {
          // this is setData callback
        }
      );
    },
    customData: {
      hi: "MINA",
    },
  },
  _render
);
