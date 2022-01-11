import { useRoutes } from 'react-router-dom';
import React from 'react';
import AnswerPage from './page/AnswerPage';
import IndexPage from './page/IndexPage';
import CategoryPage from './page/CategoryPage';
import SearchPage from './page/SearchPage';
import AdminMain from './page/admin/AdminMain';
import LoginPage from './page/Login';
import CategoryManage from './page/admin/CategoryManage';
import QuestionManage from './page/admin/QuestionManage';



function RequireAuth({ children }) {
    let token = localStorage.token

    if (!token) {
        return <div>403</div>
    }

    return children;
}

function Routers() {
    return useRoutes([
        {path: '/', element: <IndexPage></IndexPage>},
        {path: '/answer/:id', element: <AnswerPage/>},
        {path: '/category/:id', element: <CategoryPage/>},
        {path: '/search/:key', element: <SearchPage/>},
        {path: '/login', element: <LoginPage/>},
        {path: '/admin', element: <RequireAuth><AdminMain/></RequireAuth>, children: [
            {index: true, path: '', element: <RequireAuth><CategoryManage/></RequireAuth>},
            {path: 'question', element: <RequireAuth><QuestionManage/></RequireAuth>},
            {path: 'category', element: <RequireAuth><CategoryManage/></RequireAuth>},
        ]}
    ])
}

export default Routers;