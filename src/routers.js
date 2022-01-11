import { useRoutes } from 'react-router-dom';
import React from 'react';
import AnswerPage from './page/AnswerPage';
import IndexPage from './page/IndexPage';
import CategoryPage from './page/CategoryPage';
import SearchPage from './page/SearchPage';
import AdminMain from './page/admin/AdminMain';
import CategoryManage from './page/admin/CategoryManage';
import QuestionManage from './page/admin/QuestionManage';

function Routers() {
    return useRoutes([
        {path: '/', element: <IndexPage></IndexPage>},
        {path: '/answer/:id', element: <AnswerPage/>},
        {path: '/category/:id', element: <CategoryPage/>},
        {path: '/search/:key', element: <SearchPage/>},
        {path: '/admin', element: <AdminMain/>, children: [
            {index: true, path: '', element: <QuestionManage/>},
            {path: 'question', element: <QuestionManage/>},
            {path: 'category', element: <CategoryManage/>},
        ]}
    ])
}

export default Routers;