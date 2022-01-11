import { useRoutes } from 'react-router-dom';
import React from 'react';
import AnswerPage from './page/AnswerPage';
import IndexPage from './page/IndexPage';
import CategoryPage from './page/CategoryPage';
import SearchPage from './page/SearchPage';

function Routers() {
    return useRoutes([
        {path: '/', element: <IndexPage></IndexPage>},
        {path: '/answer/:id', element: <AnswerPage/>},
        {path: '/category/:id', element: <CategoryPage/>},
        {path: '/search/:key', element: <SearchPage/>},
    ])
}

export default Routers;