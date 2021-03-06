/**
 * @file error.js 播放器出错时显示 pc 版
 * @author yuhuiyuhui06
 * @date 2018/3/8
 */
import Component from '../component';
import * as Dom from '../utils/dom';

import './error';

export default class ErrorPc extends Component {
    constructor(player, options) {
        super(player, options);

        this.handleError = this.handleError.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.player.on('error', this.handleError);
        this.on('click', this.handleClick);

        this.textEl = Dom.$('.lark-error-text', this.el);
    }

    handleClick() {
        const src = this.player.src();
        this.player.reset();
        setTimeout(() => {
            this.player.src(src);
            this.player.play();
        }, 0);
    }

    handleError(event, error) {
        let text;
        switch (parseInt(error.code, 10)) {
            // MEDIA_ERR_ABORTED 
            case 1:
                text = '加载失败，点击重试(MEDIA_ERR_ABORTED)';
                break;
            // MEDIA_ERR_NETWORK 
            case 2:
                text = '加载失败，请检查您的网络(MEDIA_ERR_NETWORK)';
                break;
            // MEDIA_ERR_DECODE
            case 3:
                text = '视频解码失败(MEDIA_ERR_DECODE)';
                break;
            // MEDIA_ERR_SRC_NOT_SUPPORTED 
            case 4:
                text = '加载失败，该资源无法访问或者浏览器不支持该视频类型(MEDIA_ERR_SRC_NOT_SUPPORTED)';
                break;
            default:
                text = '加载失败，点击重试'
        }

        Dom.replaceContent(this.textEl, text);
    }

    createEl() {
        return this.createElement(
            'div',
            {className: 'lark-error-pc'},
            this.createElement(
                'div',
                {className: 'lark-error-area'},
                this.createElement(
                    'div',
                    {className: 'lark-error-text'},
                    '加载失败，请稍后重试'
                )
            )
        );
    }
}

Component.registerComponent('ErrorPc', ErrorPc);