
import { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";


class QuestionManage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div>QuestionManage</div>
    }
}


function WithNavigate(props) {
    let navigate = useNavigate();
    let params = useParams()
    
    return <QuestionManage {...props} params={params} navigate={navigate} />
}

export default WithNavigate;