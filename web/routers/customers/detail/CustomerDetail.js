import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import FontAwesome from 'react-fontawesome';
import { Form, FormControl, FormGroup, ControlLabel, HelpBlock, Button } from 'react-bootstrap'
import Pagination from '../../common/pagination/Pagination';
import BootstrapForm from '../../common/BootstrapForm/BootstrapForm';
import FormItem from '../../common/BootstrapForm/FormItem';
import utils from '../../../utils/utils';
import validate from '../../../utils/validate'
import BodyHeader from '../../common/bodyHeader/BodyHeader';
import styles from './CustomerDetail.less';

class CustomerDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            form: this.props.customers.customer || {},
            formValidList: []
        }
    }



    //返回
    headerGoBack() {
        this.props.history.goBack()
    }


    //表单提交
    submitForm() {
        this.formRef.vaildForm((errors) => {
            if (errors && errors.length == 0) {//校验成功
                let customer = this.formRef.getFieldValues();
                this.props.dispatch({
                    type: 'customers/createCustomer',
                    customer:customer
                })
            }
        })
    }

    render() {

        return (
            <div className={styles.cardBody}>
                <BodyHeader downList={this.props.customers.downList} dispatch={this.props.dispatch}
                    currentTitle={'新增客户'} goBack={this.headerGoBack.bind(this)} />
                <div className={styles.detailBody}>
                    <div className={styles.detailCard}>
                        <BootstrapForm className={styles.formCard} ref={(formRef) => { this.formRef = formRef }}>
                            <FormItem field='company' label='公司名称' initValue={''}
                                rules={[{ type: 'length', max: 100, msg: '公司名称不能超过100个字' }]}
                            >
                                <FormControl
                                    type="text"
                                    placeholder="请填写公司名称"
                                />
                            </FormItem>
                            <FormItem field='name' label='客户姓名' initValue={''}
                                rules={[
                                    { type: 'required', msg: '客户名称不能为空' },
                                    { type: 'length', max: 100, msg: '客户名称不能超过50个字' }
                                ]}
                            >
                                <FormControl
                                    type="text"
                                    placeholder="请填写客户姓名"
                                />
                            </FormItem>
                            <FormItem field='department' label='客户职称' initValue={''}
                                rules={[{ type: 'length', max: 100, msg: '客户职称不能超过20个字' }]}
                            >
                                <FormControl
                                    type="text"
                                    placeholder="请填写客户职称"
                                />
                            </FormItem>
                            <FormItem field='phone' label='联系电话' initValue={''}
                                rules={[{ type: 'regex', regex: /^[1][3,4,5,7,8][0-9]{9}$/, msg: '手机号码格式不正确' }]}
                            >
                                <FormControl
                                    type="text"
                                    placeholder="请填写联系电话"
                                />
                            </FormItem>
                            <FormItem field='address' label='详细地址' initValue={''}
                                rules={[{ type: 'length', max: 200, msg: '客户地址不能超过100个字' }]}
                            >
                                <FormControl
                                    type="text"
                                    placeholder="请填写详细地址"
                                />
                            </FormItem>
                            <FormItem className={styles.submitBtn}>
                                <Button bsStyle="primary" type="button" className={styles.btnPadding} onClick={this.submitForm.bind(this)}>
                                    提交
                              </Button>
                            </FormItem>
                        </BootstrapForm>
                    </div>
                </div>
            </div>
        )
    }
}


export default CustomerDetail;