window.addEventListener("DOMContentLoaded", () => {
  const ctl = new CollapsibleTimeline("#timeline");
});
class CollapsibleTimeline {
  constructor(el) {
    this.el = document.querySelector(el);
    this.init();
  }
  init() {
    var _this$el;
    (_this$el = this.el) === null || _this$el === void 0 || _this$el.addEventListener("click", this.itemAction.bind(this));
  }
  animateItemAction(button, ctrld, contentHeight, shouldCollapse) {
    const expandedClass = "timeline__item-body--expanded";
    const animOptions = {
      duration: 300,
      easing: "cubic-bezier(0.65,0,0.35,1)"
    };
    if (shouldCollapse) {
      button.ariaExpanded = "false";
      ctrld.ariaHidden = "true";
      ctrld.classList.remove(expandedClass);
      animOptions.duration *= 2;
      this.animation = ctrld.animate([{
        height: `${contentHeight}px`
      }, {
        height: `${contentHeight}px`
      }, {
        height: "0px"
      }], animOptions);
    } else {
      button.ariaExpanded = "true";
      ctrld.ariaHidden = "false";
      ctrld.classList.add(expandedClass);
      this.animation = ctrld.animate([{
        height: "0px"
      }, {
        height: `${contentHeight}px`
      }], animOptions);
    }
  }
  itemAction(e) {
    const {
      target
    } = e;
    const action = target === null || target === void 0 ? void 0 : target.getAttribute("data-action");
    const item = target === null || target === void 0 ? void 0 : target.getAttribute("data-item");
    if (action) {
      var _this$el2;
      const targetExpanded = action === "expand" ? "false" : "true";
      const buttons = Array.from((_this$el2 = this.el) === null || _this$el2 === void 0 ? void 0 : _this$el2.querySelectorAll(`[aria-expanded="${targetExpanded}"]`));
      const wasExpanded = action === "collapse";
      for (let button of buttons) {
        var _this$el3, _ctrld$firstElementCh;
        const buttonID = button.getAttribute("data-item");
        const ctrld = (_this$el3 = this.el) === null || _this$el3 === void 0 ? void 0 : _this$el3.querySelector(`#item${buttonID}-ctrld`);
        const contentHeight = (_ctrld$firstElementCh = ctrld.firstElementChild) === null || _ctrld$firstElementCh === void 0 ? void 0 : _ctrld$firstElementCh.offsetHeight;
        this.animateItemAction(button, ctrld, contentHeight, wasExpanded);
      }
    } else if (item) {
      var _this$el4, _this$el5, _ctrld$firstElementCh2;
      const button = (_this$el4 = this.el) === null || _this$el4 === void 0 ? void 0 : _this$el4.querySelector(`[data-item="${item}"]`);
      const expanded = button === null || button === void 0 ? void 0 : button.getAttribute("aria-expanded");
      if (!expanded) return;
      const wasExpanded = expanded === "true";
      const ctrld = (_this$el5 = this.el) === null || _this$el5 === void 0 ? void 0 : _this$el5.querySelector(`#item${item}-ctrld`);
      const contentHeight = (_ctrld$firstElementCh2 = ctrld.firstElementChild) === null || _ctrld$firstElementCh2 === void 0 ? void 0 : _ctrld$firstElementCh2.offsetHeight;
      this.animateItemAction(button, ctrld, contentHeight, wasExpanded);
    }
  }
}