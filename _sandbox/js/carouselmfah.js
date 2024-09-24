t = Math.abs(this._deltaX); if (t <= 40) return; const e = t / this._deltaX; this._deltaX = 0, e && v(e > 0 ?
  this._config.rightCallback : this._config.leftCallback)}_initEvents(){
  this._supportPointerEvents ?
    (j.on(this._element, st, (t => this._start(t))), j.on(this._element, nt, (t => this._end(t))),
      this._element.classList.add("pointer-event")) : (j.on(this._element, tt, (t => this._start(t))),
        j.on(this._element, et, (t => this._move(t))), j.on(this._element, it, (t => this._end(t))))
}
_eventIsPointerPenTouch(t){
  return this._supportPointerEvents && ("pen" === t.pointerType ||
    "touch" === t.pointerType)
}static isSupported(){
  return "ontouchstart" in document.documentElement
    || navigator.maxTouchPoints > 0
}}const lt = ".bs.carousel", ct = ".data-api", ht = "next",
  dt = "prev", ut = "left", _t = "right", gt = `slide${lt}`, ft = `slid${lt}`, mt = `keydown${lt}`,
  pt = `mouseenter${lt}`, bt = `mouseleave${lt}`, vt = `dragstart${lt}`, yt = `load${lt}${ct}`,
  wt = `click${lt}${ct}`, At = "carousel", Et = "active", Ct = ".active", Tt = ".carousel-item",
  kt = Ct + Tt, $t = { ArrowLeft: _t, ArrowRight: ut }, St = {
    interval: 5e3, keyboard: !0, pause:
      "hover", ride: !1, touch: !0, wrap: !0
  }, Lt = {
    interval: "(number|boolean)", keyboard: "boolean",
    pause: "(string|boolean)", ride: "(boolean|string)", touch: "boolean", wrap: "boolean"
  }; class Ot
  extends W {
  constructor(t, e) {
    super(t, e), this._interval = null, this._activeElement = null,
      this._isSliding = !1, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement
      = K.findOne(".carousel-indicators", this._element), this._addEventListeners(), this._config.ride
      === At && this.cycle()
  } static get Default() { return St } static get DefaultType() { return Lt }
  static get NAME() { return "carousel" } next() { this._slide(ht) } nextWhenVisible() {
    !document.hidden && h(this._element) && this.next()
  } prev() { this._slide(dt) } pause() { this._isSliding && a(this._element), this._clearInterval() } cycle() {
    this._clearInterval(),
      this._updateInterval(), this._interval = setInterval((() => this.nextWhenVisible()),
        this._config.interval)
  } _maybeEnableCycle() {
    this._config.ride && (this._isSliding ?
      j.one(this._element, ft, (() => this.cycle())) : this.cycle())
  } to(t) {
    const e =
      this._getItems(); if (t > e.length - 1 || t < 0) return; if (this._isSliding)
      return void j.one(this._element, ft, (() => this.to(t))); const i =
        this._getItemIndex(this._getActive()); if (i === t) return; const s =
          t > i ? ht : dt; this._slide(s, e[t])
  } dispose() {
    this._swipeHelper && this._swipeHelper.dispose(), super.dispose()
  }
  _configAfterMerge(t) {
    return t.defaultInterval = t.interval,
      t
  } _addEventListeners() {
    this._config.keyboard && j.on(this._element,
      mt, (t => this._keydown(t))), "hover" === this._config.pause &&
      (j.on(this._element, pt, (() => this.pause())), j.on(this._element, bt, (()
        => this._maybeEnableCycle()))), this._config.touch && at.isSupported() &&
      this._addTouchEventListeners()
  } _addTouchEventListeners() {
    for (const t
      of K.find(".carousel-item img", this._element)) j.on(t, vt, (t => t.preventDefault())); const t =
      {
        leftCallback: () => this._slide(this._directionToOrder(ut)), rightCallback: () =>
          this._slide(this._directionToOrder(_t)), endCallback: () => {
            "hover" === this._config.pause && (this.pause(),
              this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout((() =>
                this._maybeEnableCycle()), 500 + this._config.interval))
          }
      }; this._swipeHelper = new at(this._element, t)
  } _keydown(t) {
    if (/input|textarea/i.test(t.target.tagName)) return; const e = $t[t.key]; e &&
      (t.preventDefault(), this._slide(this._directionToOrder(e)))
  } _getItemIndex(t) {
    return this._getItems()
      .indexOf(t)
  } _setActiveIndicatorElement(t) {
    if (!this._indicatorsElement) return; const e = K.findOne(Ct,
      this._indicatorsElement); e.classList.remove(Et), e.removeAttribute("aria-current"); const i = K.findOne
        (`[data-bs-slide-to="${t}"]`, this._indicatorsElement); i && (i.classList.add(Et), i.setAttribute("aria-
                                                  
                                                  current", "true")) } _updateInterval() { const t = this._activeElement || this._getActive(); if (!t) re
                                                    turn; const e = Number.parseInt(t.getAttribute("data-bs-interval"), 10); this._config.interval = e ||
      this._config.defaultInterval
  } _slide(t, e = null) {
    if (this._isSliding) return; const i = this._ge
    tActive(), s = t === ht, n = e || w(this._getItems(), i, s, this._config.wrap); if (n === i) return
      ; const o = this._getItemIndex(n), r = e => j.trigger(this._element, e, {
        relatedTarget: n, directi
                                                        on: this._orderToDirection(t), from: this._getItemIndex(i), to: o
      }); if (r(gt).defaultPrevented)
      return; if (!i || !n) return; const a = Boolean(this._interval); this.pause(), this._isSliding
        = !0, this._setActiveIndicatorElement(o), this._activeElement = n; const l = s ? "carousel-item-
                                                         start" : "carousel - item - end", c = s ? "carousel - item - next" : "carousel - item - prev"; n.classList.a
    dd(c), g(n), i.classList.add(l), n.classList.add(l), this._queueCallback((() => {
      n.classList.re
      move(l, c), n.classList.add(Et), i.classList.remove(Et, c, l), this._isSliding = !1, r(ft)
    }),
      i, this._isAnimated()), a && this.cycle()
  } _isAnimated() {
    return this._element.classList.cont
    ains("slide")
  } _getActive() { return K.findOne(kt, this._element) } _getItems() {
    return K.f
    ind(Tt, this._element)
  } _clearInterval() {
    this._interval && (clearInterval(this._interval

    ), this._interval = null)
  } _directionToOrder(t) {
    return p() ? t === ut ? dt : ht : t ===
      ut ? ht : dt
  } _orderToDirection(t) {
    return p() ? t === dt ? ut : _t : t === dt ? _t : ut

  } static jQueryInterface(t) {
    return this.each((function () {
      const e = Ot.getOrCreateIns
      tance(this, t); if ("number" != typeof t) {
        if ("string" == typeof t) {
          if (void 0 === e[t

          ] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"
                                                                    `); e[t]()
        }
      } else e.to(t)
    }))
  }
} j.on(document, wt, "[data-bs-slide], [data-bs-slide-
                                                                      to]", (function (t) { const e = K.getElementFromSelector(this); if (!e || !e.classList
  .contains(At)) return; t.preventDefault(); const i = Ot.getOrCreateInstance(e), s = th
is.getAttribute("data-bs-slide-to"); return s ? (i.to(s), void i._maybeEnableCycle())
  : "next" === B.getDataAttribute(this, "slide") ? (i.next(), void i._maybeEnableCycle()
  ) : (i.prev(), void i._maybeEnableCycle()) })), j.on(window, yt, (() => {
    const t = K.fi
    nd('[data-bs-ride="carousel"]'); for (const e of t) Ot.getOrCreateInstance(e)
  })), b(O
                                                                        t); const It = ".bs.collapse", Dt = `show${It}`, Nt = `shown${It}`, Pt = `hide${It}`
  , xt = `hidden${It}`, Mt = `click${It}.data-api`, jt = "show", Ft = "collapse", zt =
    "collapsing", Ht = `:scope .${Ft} .${Ft}`, Bt = '[data-bs-toggle="collapse"]', qt =
    { parent: null, toggle: !0 }, Wt = { parent: "(null|element)", toggle: "boolean" }
  ; class Rt extends W {
  constructor(t, e) {
    super(t, e), this._isTransitioning = !1
      , this._triggerArray = []; const i = K.find(Bt); for (const t of i) {
        const e =
          K.getSelectorFromElement(t), i = K.find(e).filter((t => t === this._element));
        null !== e && i.length && this._triggerArray.push(t)
      } this._initializeChildr
    en(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArra
                                                                                y, this._isShown()), this._config.toggle && this.toggle()
  } static get Defau
                                                                                lt() { return qt } static get DefaultType() { return Wt } static get NAME() { return "collapse" } toggle() {
    this._isShown() ? this.hide() : this.show()

  } show() {
    if (this._isTransitioning || this._isShown()) return; let t = []
      ; if (this._config.parent && (t = this._getFirstLevelChildren(".collapse.show, .collapse.collapsing")
        .filter((t => t !== this._element)).map((t => Rt.getOrCreateInstance(t, { toggle: !1 })))), t.length && t[0]._
                                                                                  isTransitioning) return; if (j.trigger(this._element, Dt).defaultPrevented) return; for (const e of t) e.hide();
    const e = this._getDimension(); this._element.classList.remove(Ft), this._element.classList.add(zt), this._element
      .style[e]

      = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning =
      !0; const i = `scroll${e[0].toUpperCase() + e.slice(1)}`; this._queueCallback((() => { this._isTransitioning = !