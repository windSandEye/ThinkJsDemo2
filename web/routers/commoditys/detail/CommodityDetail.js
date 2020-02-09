import React from 'react';
import { connect } from 'dva';
import { FormControl, Button } from 'react-bootstrap'
import { BootstrapForm, FormItem, Select } from '../../common/FormComponent/index';
import BodyHeader from '../../common/bodyHeader/BodyHeader';
import styles from '../../customers/detail/CustomerDetail.less';

const Option = Select.Option;

@connect(state => ({
    commoditys: state.commoditys
}))
class CommodityDetail extends React.Component {
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
                type: 'commoditys/findCommodity',
                id: id
            })
        } else {
            this.props.dispatch({
                type: 'commoditys/resetCommodity'
            })

        }
    }


    //表单提交
    submitForm() {
        let id = this.props.location.search.split('?')[1];
        this.formRef.vaildForm((errors) => {
            if (errors && errors.length == 0) {//校验成功
                let commodity = this.formRef.getFieldValues();
                if (id) {
                    commodity.id = parseInt(id);
                    this.props.dispatch({
                        type: 'commoditys/editCommodity',
                        commodity: commodity
                    })
                } else {
                    this.props.dispatch({
                        type: 'commoditys/createCommodity',
                        commodity: commodity
                    })
                }
            }
        })
    }

    render() {
        const commodityDetail = this.props.commoditys.commodityDetail;
        return (
            <div className={styles.cardBody}>
                <BodyHeader downList={this.props.commoditys.downList} dispatch={this.props.dispatch}
                    currentTitle={commodityDetail.id ? '供应商详情' : '新增供应商'} goBack={this.headerGoBack.bind(this)} />
                <div className={styles.detailBody}>
                    <div className={styles.detailCard} style={{ backgroundImage:'url(/static/img/commodity-background.png)'}}>
                        <BootstrapForm className={styles.formCard} ref={(formRef) => { this.formRef = formRef }}>
                            <FormItem field='company' label='公司名称' initValue={commodityDetail.company || ''}
                                rules={[{ type: 'length', max: 100, msg: '公司名称不能超过100个字' }]}
                            >
                                <FormControl
                                    type="text"
                                    placeholder="请填写公司名称"
                                />
                            </FormItem>
                            <FormItem field='name' label='客户姓名' initValue={commodityDetail.name || ''}
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
                            <FormItem field='department' label='客户职称' initValue={commodityDetail.department || ''}
                                rules={[{ type: 'length', max: 100, msg: '客户职称不能超过20个字' }]}
                            >
                                <FormControl
                                    type="text"
                                    placeholder="请填写客户职称"
                                />
                            </FormItem>
                            <FormItem field='phone' label='联系电话' initValue={commodityDetail.phone || ''}
                                rules={[{ type: 'regex', regex: /^[1][3,4,5,7,8][0-9]{9}$/, msg: '手机号码格式不正确' }]}
                            >
                                <FormControl
                                    type="text"
                                    placeholder="请填写联系电话"
                                />
                            </FormItem>
                            <FormItem field='address' label='详细地址' initValue={commodityDetail.address || ''}
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


export default CommodityDetail;