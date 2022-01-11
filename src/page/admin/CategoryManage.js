import { Button, Col, Form, Input, List, Modal, Popconfirm, Row, Space, Table } from "antd";
import Layout from "antd/lib/layout/layout";
import axios from "axios";
import { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import urls from "../../urls";

class CategoryManage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            items: [{id: 1, name: '11'}, {id: 2, name: 'aaaa'}],
            visibleEdit: false,
            seleted: '',

            visibleAdd: false,
            newName: ''
        }
    }


    componentDidMount() {
        this.loadData()
    }

    loadData = () => {
        axios.get(urls.MAIN + urls.CATEGORY_ALL).then(resp => this.setState({items: resp.data, visibleEdit: false}))
    }

    handleEditOk = (e) => {
        console.log(this.state.seleted)
        axios.put(urls.MAIN + urls.CATEGORY, this.state.seleted).then(resp => {
            this.loadData()
        })
    }

    handleAddOk = (e) => {
        console.log(this.state.seleted)
        axios.post(urls.MAIN + urls.CATEGORY, {
            name: this.state.newName
        }).catch(()=> this.setState({visibleAdd: false}, this.loadData)).then(resp => {
            this.setState({visibleAdd: false}, this.loadData)
        })
    }

    delete = (id) => {
        axios.delete(urls.MAIN + urls.CATEGORY + "/" + id).then(this.loadData)
    }

    render() {
        return <Layout>
            <Row>
                <Col span={24}>
                    <div style={{width: '100%'}}>
                        <Button style={{float: 'right'}} onClick={()=>this.setState({visibleAdd: true})}>添加</Button>
                        <Modal
                            title="添加"
                            visible={this.state.visibleAdd}
                            onOk={this.handleAddOk}
                            onCancel={()=> this.setState({visibleAdd: false})}
                        >
                            <Form
                                name="basic"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                // initialValues={this.state.seleted}
                                >
                                <Form.Item label="分类名称">

                                    <Input 
                                    // value={this.state.seleted.name}
                                    onChange={(e) => {
                                        this.setState({newName: e.target.value})
                                    }}></Input>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                </Col>
            </Row>
            <Table dataSource={this.state.items} columns={[{
            title: 'id',
            dataIndex: 'id',
            key: 'id'
        },{
            title: 'name',
            dataIndex: 'name',
            key: 'name'
        },{
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <Space size="middle">
                
                <Button onClick={() => this.setState({seleted: record}, ()=>this.setState({visibleEdit: true}))}>编辑</Button>
                <Popconfirm placement="left" onConfirm={()=> this.delete(record.id)}>
                    <Button >删除</Button>
                </Popconfirm>
              </Space>
            ),
          },]}>

        </Table>
        <Modal
            title={this.state.seleted.name}
            visible={this.state.visibleEdit}
            onOk={this.handleEditOk}
            onCancel={()=> this.setState({visibleEdit: false})}
        >
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={this.state.seleted}
                >
                <Form.Item label="分类名称">

                    <Input 
                    value={this.state.seleted.name}
                    onChange={(e) => {
                        var tmp = this.state.seleted
                        tmp.name = e.target.value
                        this.setState({seleted: tmp})
                    }}></Input>
                </Form.Item>
            </Form>
        </Modal>
        </Layout>
    }
}


function WithNavigate(props) {
    let navigate = useNavigate();
    let params = useParams()
    
    return <CategoryManage {...props} params={params} navigate={navigate} />
}

export default WithNavigate;