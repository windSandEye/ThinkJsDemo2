import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import FontAwesome from 'react-fontawesome';
import styles from './message.less';

export default class Message extends React.Component {
    static info(content, duration) {
        content = this.contentFull('info', content);
        this.showMessage(content, duration);
    }

    static success(content, duration) {
        content = this.contentFull('success', content);
        this.showMessage(content, duration);
    }

    static error(content, duration) {
        content = this.contentFull('error', content);
        this.showMessage(content, duration);
    }

    static warn(content, duration) {
        content = this.contentFull('warn', content);
        this.showMessage(content, duration);
    }

    static contentFull(type, content) {
        let typeIcon = 'info';
        switch (type) {
            case 'info':
                typeIcon = 'info';
                break;
            case 'success':
                typeIcon = 'check';
                break;
            case 'error':
                typeIcon = 'times';
                break;
            case 'warn':
                typeIcon = 'exclamation';
                break;
        }
        return (
            <div className={styles.content}>
                <FontAwesome
                    className={styles[type]}
                    name={typeIcon}
                />
                <p>{content}</p>
            </div>
        )
    }


    static showMessage(content, duration = 3000) {
        let container = document.createElement('div');
        container.setAttribute('class', styles.messageContainer);
        container.setAttribute('style', `-webkit-animation-duration: ${duration}ms`);
        container.setAttribute('style', `animation-duration: ${duration}ms`);
        document.body.appendChild(container);
        render(content, container);
        setTimeout(() => {
            unmountComponentAtNode(container);
            container.parentNode.removeChild(container);
        }, duration);
    }
}



