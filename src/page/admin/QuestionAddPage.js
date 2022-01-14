import { Col, Layout, Row } from "antd";
import { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { EditFilled } from "@ant-design/icons/lib/icons";

class QuestionAddPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    render() {
        return <Layout>
            <Row>
                <Col md={{ span: 18, offset: 3}} sm={24} xs={24}>
                    <ReactQuill theme="snow" value={"init.."}modules={{imageUpload: true, toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                        ['blockquote', 'code-block'],
                             // custom button values
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                        [{ 'direction': 'rtl' }],                         // text direction
                        
                        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        [{'link': []},{'image': []}]
                        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                        // [{ 'font': [] }],
                        [{ 'align': [] }],
                        
                        ['clean']                                         // remove formatting button
                        ]}}  onChange={(e)=> console.log(e)}/>
                </Col>
            </Row>
        </Layout>
    }
}

function WithNavigate(props) {
    let navigate = useNavigate();
    let params = useParams()
    
    return <QuestionAddPage {...props} params={params} navigate={navigate} />
}

export default WithNavigate;