import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import FontAwesome from 'react-fontawesome';
import { Form, FormControl, FormGroup, ControlLabel, HelpBlock, Button } from 'react-bootstrap'
import { RadioGroup, Radio, Pagination, BootstrapForm, FormItem, Select, message } from '../../common/FormComponent/index';
import BodyHeader from '../../common/bodyHeader/BodyHeader';
import styles from './CustomerDetail.less';

const Option = Select.Option;

@connect(state => ({
    customers: state.customers
}))
class CustomerDetail extends React.Component {
    constructor(props) {
        super(props)
    }


    //返回
    headerGoBack() {
        this.props.history.goBack()
    }

    componentDidMount() {
        let id = this.props.location.search.split('?')[1];
        if (id) {
            this.props.dispatch({
                type: 'customers/findCustomer',
                id: id
            })
        } else {
            this.props.dispatch({
                type: 'customers/resetCustomer'
            })

        }
    }


    //表单提交
    submitForm() {
        let id = this.props.location.search.split('?')[1];
        this.formRef.vaildForm((errors) => {
            if (errors && errors.length == 0) {//校验成功
                let customer = this.formRef.getFieldValues();
                if (id) {
                    customer.id = parseInt(id);
                    this.props.dispatch({
                        type: 'customers/editCustomer',
                        customer: customer
                    })
                } else {
                    this.props.dispatch({
                        type: 'customers/createCustomer',
                        customer: customer
                    })
                }
            }
        })
    }

    render() {
        const customerDetail = this.props.customers.customerDetail;
        return (
            <div className={styles.cardBody}>
                <BodyHeader downList={this.props.customers.downList} dispatch={this.props.dispatch}
                    currentTitle={customerDetail.id ? '客户详情' : '新增客户'} goBack={this.headerGoBack.bind(this)} />
                <div className={styles.detailBody}>
                    <div className={styles.detailCard}>
                        <BootstrapForm className={styles.formCard} ref={(formRef) => { this.formRef = formRef }}>
                            <FormItem field='company' label='公司名称' initValue={customerDetail.company || ''}
                                rules={[{ type: 'length', max: 100, msg: '公司名称不能超过100个字' }]}
                            >
                                <FormControl
                                    type="text"
                                    placeholder="请填写公司名称"
                                />
                            </FormItem>
                            <FormItem field='name' label='客户姓名' initValue={customerDetail.name || ''}
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
                            <FormItem field='department' label='客户职称' initValue={customerDetail.department || ''}
                                rules={[{ type: 'length', max: 100, msg: '客户职称不能超过20个字' }]}
                            >
                                <FormControl
                                    type="text"
                                    placeholder="请填写客户职称"
                                />
                            </FormItem>
                            <FormItem field='phone' label='联系电话' initValue={customerDetail.phone || ''}
                                rules={[{ type: 'regex', regex: /^[1][3,4,5,7,8][0-9]{9}$/, msg: '手机号码格式不正确' }]}
                            >
                                <FormControl
                                    type="text"
                                    placeholder="请填写联系电话"
                                />
                            </FormItem>
                            <FormItem field='address' label='详细地址' initValue={customerDetail.address || ''}
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