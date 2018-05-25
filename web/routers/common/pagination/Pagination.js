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

    //显示上5页
    handlePrevMore() {
        let currentPage = this.props.currentPage;
        let maxPrev = currentPage - 3;
        let minprev = currentPage - 7 > 0 ? currentPage - 7 : 1;
        let prevPage = (maxPrev + minprev) / 2;
        this.props.handleChangePage(Math.ceil(prevPage));
    }

    //显示上5页
    handleNextMore() {
        let currentPage = this.props.currentPage;
        let totalPages = this.props.totalPages;
        let maxNext = currentPage + 3;
        let minNext = currentPage + 7 > totalPages ? totalPages : currentPage + 7;
        let nextPage = (maxNext + minNext) / 2;
        this.props.handleChangePage(Math.ceil(nextPage));
    }

    //跳到上一页
    jumpPrevPage() {
        let currentPage = this.props.currentPage;
        if (currentPage - 1 > 0) {
            this.props.handleChangePage(currentPage - 1);
        }
    }

    //跳到下一页
    jumpNextPage() {
        let currentPage = this.props.currentPage;
        let totalPages = this.props.totalPages;
        if (currentPage + 1 <= totalPages) {
            this.props.handleChangePage(currentPage + 1);
        }
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

        //总页数小于7页时，展示全部页数
        if (totalPages < 7) {
            for (let i = 2; i < totalPages; i++) {
                if (currentPage == i) {
                    pageNumList.push(<a className={`${styles.pageNum} ${styles.activePage}`}
                        onClick={this.handleChangePage.bind(this, i)} key={`page${i}`}>{i}</a>)
                } else {
                    pageNumList.push(<a className={styles.pageNum}
                        onClick={this.handleChangePage.bind(this, i)} key={`page${i}`}>{i}</a>)
                }
            }
        } else {//总页数大于等于7页时，根据当前页数展示
            //如果当前页数小于4页，则展示1-5页
            if (currentPage - 4 < 0) {
                for (let i = 2; i < 6; i++) {
                    if (currentPage == i) {
                        pageNumList.push(<a className={`${styles.pageNum} ${styles.activePage}`}
                            onClick={this.handleChangePage.bind(this, i)} key={`page${i}`}>{i}</a>)
                    } else {
                        pageNumList.push(<a className={styles.pageNum}
                            onClick={this.handleChangePage.bind(this, i)} key={`page${i}`}>{i}</a>)
                    }
                }
                pageNumList.push(<a className={styles.pageMore} key={`page-more-next`}
                    onClick={this.handleNextMore.bind(this)}>...</a>)
            } else if (currentPage - 4 == 0) {//当前页数等于4，显示1-6页 
                for (let i = 2; i <= 6; i++) {
                    if (currentPage == i) {
                        pageNumList.push(<a className={`${styles.pageNum} ${styles.activePage}`}
                            onClick={this.handleChangePage.bind(this, i)} key={`page${i}`}>{i}</a>)
                    } else {
                        pageNumList.push(<a className={styles.pageNum}
                            onClick={this.handleChangePage.bind(this, i)} key={`page${i}`}>{i}</a>)
                    }
                }
                pageNumList.push(<a className={styles.pageMore} key={`page-more-next`}
                    onClick={this.handleNextMore.bind(this)}>...</a>)
            } else {
                pageNumList.push(<a className={styles.pageMore} key={`page-more-prev`}
                    onClick={this.handlePrevMore.bind(this)}>...</a>)

                if (totalPages - currentPage > 3) {//显示后省略号
                    for (let i = currentPage - 2; i <= (currentPage + 2); i++) {
                        if (currentPage == i) {
                            pageNumList.push(<a className={`${styles.pageNum} ${styles.activePage}`}
                                onClick={this.handleChangePage.bind(this, i)} key={`page${i}`}>{i}</a>)
                        } else {
                            pageNumList.push(<a className={styles.pageNum}
                                onClick={this.handleChangePage.bind(this, i)} key={`page${i}`}>{i}</a>)
                        }
                    }
                    pageNumList.push(<a className={styles.pageMore} key={`page-more-next`}
                        onClick={this.handleNextMore.bind(this)}>...</a>)
                } else {//显示最后5位
                    for (let i = totalPages - 4; i < totalPages; i++) {
                        if (currentPage == i) {
                            pageNumList.push(<a className={`${styles.pageNum} ${styles.activePage}`}
                                onClick={this.handleChangePage.bind(this, i)} key={`page${i}`}>{i}</a>)
                        } else {
                            pageNumList.push(<a className={styles.pageNum}
                                onClick={this.handleChangePage.bind(this, i)} key={`page${i}`}>{i}</a>)
                        }
                    }
                }
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
                        title='上一页'
                        onClick={this.jumpPrevPage.bind(this)}
                    />
                    {this.renderPageNum()}
                    <FontAwesome name='angle-right'
                        className={this.props.currentPage == this.props.totalPages ? `${styles.changePageIcon} ${styles.noPage}` : `${styles.changePageIcon}`}
                        title='下一页'
                        onClick={this.jumpNextPage.bind(this)}
                    />
                    <div className={styles.count}>共:{this.props.count}条记录</div>
                </div>
            </div>
        )
    }
}