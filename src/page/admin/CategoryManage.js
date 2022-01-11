import { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";

class CategoryManage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div>CategoryManage</div>
    }
}


function WithNavigate(props) {
    let navigate = useNavigate();
    let params = useParams()
    
    return <CategoryManage {...props} params={params} navigate={navigate} />
}

export default WithNavigate;