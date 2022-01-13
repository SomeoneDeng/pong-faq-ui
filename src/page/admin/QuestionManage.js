
import { Button, Col, Dropdown, Layout, Popconfirm, Row, Select, Space, Table, Label } from "antd";
import ButtonGroup from "antd/lib/button/button-group";
import axios from "axios";
import { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import urls from "../../urls";
const { Option } = Select;

class QuestionManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            selectCate: null,
            categories: []
        }
    }

    componentDidMount() {
        this.loadData()
        this.loadCates()
    }

    loadCates = () => {
        axios.get(urls.MAIN + urls.CATEGORY_ALL).then(resp => this.setState({categories: resp.data}))
    }

    loadData = () => {
        const {MAIN, QUESTION_PAGE} = urls;
        axios.get(MAIN + QUESTION_PAGE + "?page=1&size=1000000" + (this.state.selectCate != null ? "&cid=" + this.state.selectCate : "")).then(resp => this.setState({items: resp.data.records}))
    }

    delete = (id) => {
        const {MAIN, QUESTION_PAGE} = urls;
        axios.delete(MAIN + QUESTION_PAGE + id).then(resp => this.loadData())
    }

    render() {
        return <Layout>
            <Row>
                <Col span={24}>
                    <div style={{width: '100%'}}>
                        <Button style={{float: 'right'}} onClick={()=>this.setState({visibleAdd: true})}>添加</Button>
                    </div>
                </Col>
                <Col span={24}>
                
                    <Select label="分类" defaultValue={"--分类--"} style={{ width: 120 }}
                    onClear={() => this.setState({selectCate: null}, this.loadData)}
                    onChange={(e)=> this.setState({selectCate: e}, this.loadData)}
                    allowClear>
                        {
                            this.state.categories.map(c => <Option key={c.id} value={c.id}>{c.name}</Option>)
                        }
                        
                    </Select>
                </Col>
            </Row>
            <Row>
                <Col >
                <Table pagination={{pageSize: 20}} dataSource={this.state.items} columns={[
                    {
                        title: 'id',
                        dataIndex: 'id',
                        key: 'id'
                    },
                    {
                        title: '标题',
                        dataIndex: 'title',
                        key: 'title'
                    },
                    {
                        title: '分类',
                        dataIndex: 'category',
                        key: 'category'
                    },
                    {
                        title: '问题内容',
                        dataIndex: 'content',
                        key: 'content'
                    },
                    {
                        title: '回答内容',
                        dataIndex: 'answer',
                        key: 'answer'
                    },
                    {
                        title: '创建时间',
                        dataIndex: 'created',
                        key: 'created'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        render: (text, record) => (
                            <ButtonGroup>
                                <Button onClick={() => this.setState({seleted: record}, ()=>this.setState({visibleEdit: true}))}>编辑</Button>
                                <Popconfirm placement="left" title="确认删除？" okText="确定" cancelText="取消" onConfirm={()=> this.delete(record.id)}>
                                    <Button type="danger">删除</Button>
                                </Popconfirm>
                            </ButtonGroup>
                        ),
                    },
                ]}></Table>
                </Col>

            </Row>
        </Layout>
    }
}


function WithNavigate(props) {
    let navigate = useNavigate();
    let params = useParams()
    
    return <QuestionManage {...props} params={params} navigate={navigate} />
}

export default WithNavigate;