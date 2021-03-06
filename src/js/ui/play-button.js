/**
 * @file playButton.js
 * @author yuhui<yuhui06@baidu.com>
 * @date 2017/11/7
 */

import Component from '../component';
import * as Dom from '../utils/dom';
import * as Events from '../utils/events';
import featureDetector from '../utils/feature-detector';

export default class PlayButton extends Component {
    constructor(player, options) {
        super(player, options);

        // 注意 这里需要将 context（第二个参数） 设置为 this.el，因为这时 DOM 元素还没有插入到 document 里，所以在 document 里是查不到这个元素的
        this.playBtn = Dom.$('.lark-play-button__play', this.el);
        this.pauseBtn = Dom.$('.lark-play-button__pause', this.el);

        const eventName = featureDetector.touch ? 'touchend' : 'click';

        Events.on(this.playBtn, eventName, event => this.togglePlay(event, true));
        Events.on(this.pauseBtn, eventName, event => this.togglePlay(event, false));
    }

    togglePlay(event, isPlay) {
        if (isPlay) {
            if (this.player.paused()) {
                this.player.play();
            }
        } else {
            if (!this.player.paused()) {
                this.player.pause();
            }
        }
    }

    createEl() {
        const playIcon = Dom.createElement('div', {
            className: 'lark-play-button__play lark-icon-play',
            title: 'play'
        });

        const pauseIcon = Dom.createElement('div', {
            className: 'lark-play-button__pause lark-icon-pause',
            title: 'pause'
        });

        const playButton = Dom.createElement('div', {
            className: 'lark-play-button'
        }, playIcon, pauseIcon);

        if (!this.options.className) {
            Dom.addClass(playButton, 'lark-play-button-mobile');
        } else {
            Dom.addClass(playButton, this.options.className);
        }

        return playButton;
    }
}

Component.registerComponent('PlayButton', PlayButton);