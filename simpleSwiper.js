class SimpleSwiper {
    constructor(id, option) {
        let container = document.getElementById(id);
        let wapper = container.children[0];

        this.container = container;
        this.wapper = wapper;
        this.option = option;
        this.height = this.option.height;
        this.offset = 0 - this.height;

        this.wapper.style.transform = `translate3d(0, ${this.offset}px, 0)`; // 初始化定位到第0号slide

        this.timer = setInterval(() => {
            this.wapper.style.transform = `translate3d(0, ${this.calOffset()}px, 0)`;
            this.wapper.style['transition-duration'] = `${this.option.speed}ms`;
        }, this.option.duration);

        this.container.onmouseenter = this.onMouseEnter;
        this.container.onmouseleave = this.onMouseLeave;

        this.wapper.addEventListener('transitionend', this._onTransitonEnd);
    }

    calOffset = () => {
        this.offset -= this.height;

        return this.offset;
    };

    stopAutoPlay = () => {
        clearInterval(this.timer);
        this.timer = null;
    };

    startAutoPlay = () => {
        this.timer = setInterval(() => {
            this.wapper.style.transform = `translate3d(0, ${this.calOffset()}px, 0)`;
            this.wapper.style['transition-duration'] = `${this.option.speed}ms`;
        }, this.option.duration);
    };

    destroy = () => {
        clearInterval(this.timer);
        this.timer = null;
        this.wapper.removeEventListener('transitionend', this._onTransitonEnd);
    };

    onMouseEnter = () => {
        this.stopAutoPlay();

        /* 一期不用滚动，暂时不研究了
           function MouseWheelHandler(e) {
            // cross-browser wheel delta
            // e.stopPropagation();
            e.preventDefault();
            e = window.event || e; // old IE support
            let delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));

            console.log(delta);
            return false;
        }
        if (this.container.addEventListener) {
            // IE9, Chrome, Safari, Opera
            this.container.addEventListener('mousewheel', MouseWheelHandler, false);
            // Firefox
            this.container.addEventListener('DOMMouseScroll', MouseWheelHandler, false);
        } */
    };

    onMouseLeave = () => {
        this.startAutoPlay();
    };

    _onTransitonEnd = () => {
        this.wapper.style['transition-duration'] = `0ms`;

        let { slideCnt, height } = this.option;
        if (this.offset + (slideCnt + 1) * height <= 0) {
            this.offset = 0 - height;
            this.wapper.style.transform = `translate3d(0, ${this.offset}px, 0)`;
        }
    };
}

export default SimpleSwiper;
