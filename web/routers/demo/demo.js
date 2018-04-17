import React from 'react';
import { connect } from 'dva';
import styles from './demo.less';

@connect(state => ({
    demo: state.demo
}))
export default class Demo extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            title:null,
            content:null
        }
    }

    componentWillMount() {
        this.props.dispatch({
            type: 'demo/findAll'
        })
    }

    //新增提交
    addDemo() {
        this.props.dispatch({
            type: 'demo/addDemo',
            data: {
                title:this.state.title,
                content:this.state.content
            }
        })
    }

    //删除
    deleteDemo(id) {
        this.props.dispatch({
            type: 'demo/deleteDemo',
            id: id
        })
    }

    //标题修改
    titleChange(e){
        this.setState({
            title:e.target.value
        })
    }

    //内容修改
    contentChange(e){
        this.setState({
            content:e.target.value
        })
    }

    render() {
        const demo = this.props.demo;
        return (
            <div>
                <div className={styles.demoLeft}>
                    {
                        demo.demoList.map((item, index) => {
                            return (
                                <div className={styles.demoItem} key={item.id}>
                                    <div key={index} className={styles.demoContent}>
                                        <h3>{item.title}</h3>
                                        <p>{item.content}</p>
                                    </div>
                                    <div className={styles.demoDelete}>
                                        <a onClick={this.deleteDemo.bind(this, item.id)}>删除</a>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={styles.demoRight}>
                    <form>
                        <div className="form-group input-group">
                            <span className="input-group-addon" id="title-text">标题</span>
                            <input type="text" className="form-control" id="title" aria-describedby="title-text"
                                onChange={this.titleChange.bind(this)} />
                        </div>
                        <div className="form-group input-group">
                            <span className="input-group-addon" id="content-text">内容</span>
                            <input type="text" className="form-control" id="content" aria-describedby="content-text"
                                onChange={this.contentChange.bind(this)} />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={this.addDemo.bind(this)}>提交</button>
                    </form>
                </div>
            </div>
        )
    }
}