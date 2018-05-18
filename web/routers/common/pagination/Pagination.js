import React from 'react';
import FontAwesome from 'react-fontawesome';
import styles from './Pagination.less';

export default class Pagination extends React.Component {

    constructor(props) {
        super(props)
    }

    static defaultProps = {
        handleChangePage: (page) => { }
    }

    //页码改变
    handleChangePage(page) {
        if (page != this.props.currentPage) {
            this.props.handleChangePage(page);
        }
    }

    //更多页面改变
    handleMorePage(page){

    }


    //页数渲染
    renderPageNum() {
        let totalPages = this.props.totalPages || 1;
        let currentPage = this.props.currentPage || 1;
        let pageNumList = []
        //第一页必显示
        pageNumList.push(<a key={`page1`}
            className={currentPage == 1 ? `${styles.pageNum} ${styles.activePage}` : styles.pageNum}
            onClick={this.handleChangePage.bind(this, 1)}
        >1</a>)

        if (totalPages <= 7) {
            for (let i = 2; i < totalPages; i++) {
                if (currentPage == i) {
                    pageNumList.push(<a className={`${styles.pageNum} ${styles.activePage}`}
                        onClick={this.handleChangePage.bind(this, i)} key={`page${i}`}>{i}</a>)
                } else {
                    pageNumList.push(<a className={styles.pageNum}
                        onClick={this.handleChangePage.bind(this, i)} key={`page${i}`}>{i}</a>)
                }
            }
        } else {
            //如果当前页数小于4页，则展示1-6页
            if (currentPage - 4 <= 0) {
                for (let i = 2; i < 7 && i < totalPages; i++) {
                    if (currentPage == i) {
                        pageNumList.push(<a className={`${styles.pageNum} ${styles.activePage}`}
                            onClick={this.handleChangePage.bind(this, i)} key={`page${i}`}>{i}</a>)
                    } else {
                        pageNumList.push(<a className={styles.pageNum}
                            onClick={this.handleChangePage.bind(this, i)} key={`page${i}`}>{i}</a>)
                    }
                }
            } else {//如果总页数大于7，根据当前页数显示中间5页
                pageNumList.push(<a className={styles.pageMore} key={`page-more-prev`}>...</a>)
                for (let i = currentPage - 2; i <= (currentPage + 2) && i < totalPages; i++) {
                    if (currentPage == i) {
                        pageNumList.push(<a className={`${styles.pageNum} ${styles.activePage}`}
                            onClick={this.handleChangePage.bind(this, i)} key={`page${i}`}>{i}</a>)
                    } else {
                        pageNumList.push(<a className={styles.pageNum}
                            onClick={this.handleChangePage.bind(this, i)} key={`page${i}`}>{i}</a>)
                    }
                }

            }
            //是否显示后省略号
            if (currentPage + 4 <= totalPages) {
                pageNumList.push(<a className={styles.pageMore} key={`page-more-next`}>...</a>)
            }
        }

        //最后一页显示
        if (totalPages > 1) {
            pageNumList.push(<a key={`page${totalPages}`}
                className={currentPage == totalPages ? `${styles.pageNum} ${styles.activePage}` : styles.pageNum}
                onClick={this.handleChangePage.bind(this, totalPages)} >{totalPages}</a>)
        }
        return pageNumList;
    }

    render() {
        return (
            <div className={styles.pagination}>
                <div className={styles.pageShow}>
                    <FontAwesome name='angle-left'
                        className={this.props.currentPage == 1 ? `${styles.changePageIcon} ${styles.noPage}` : `${styles.changePageIcon}`}
                        title='上一页' />
                    {this.renderPageNum()}
                    <FontAwesome name='angle-right'
                        className={this.props.currentPage == this.props.totalPages ? `${styles.changePageIcon} ${styles.noPage}` : `${styles.changePageIcon}`}
                        title='下一页' />
                    <div className={styles.count}>共:{this.props.count}条记录</div>
                </div>
            </div>
        )
    }
}