import { lazy, Suspense, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { Navigate, Outlet } from 'react-router-dom';
import Page from '../components/page/index.jsx';
import Header from '../app/header/index.jsx';
import Footer from '../app/footer/index.jsx';
import PropTypes from 'prop-types';
import { Loading } from '../components/Loading/index.jsx';

export const Login = lazy(() => import('../pages/auth/login'))
export const Register = lazy(() => import('../pages/auth/register'))
export const ForgetPassword = lazy(() => import('../pages/auth/forget-password'))
export const Home = lazy(() => import('../pages/home'))
export const ProductList = lazy(() => import('../pages/product/product-list'))
export const ProductDetail = lazy(() => import('../pages/product/product-detail'))
export const Cart = lazy(() => import('../pages/cart/index.jsx'))


function ProtectedRoute() {
    const { isLogin } = useContext(AuthContext)
    return isLogin ? <Outlet/> : <Navigate to={Routes.AUTH.LOGIN.path}/>
}

function RejectedRoute() {
    const { isLogin } = useContext(AuthContext)
    return !isLogin ? <Outlet/> : <Navigate to={Routes.HOME.path}/>
}

function AppLayout({ children }) {
    return (
        <div>
            <Header/>
            <Page>
                <Suspense fallback={
                    <Loading
                        size="large"
                    />
                }>
                    {children}
                </Suspense>
            </Page>
            <Footer/>
        </div>

    )
}


const Routes = {
    AUTH: {
        path: '/auth',
        LOGIN: 'login',
        REGISTER: 'register',
        FORGET_PASSWORD: 'forget-password',
    },
    HOME: {
        path: '/',
    },
    PRODUCT: {
        path: '/product',
        PRODUCT_lIST: 'list',
        PRODUCT_DETAIL: 'detail/:productId',
    },
    CART: {
        path: '/cart/products',
    },
}


AppLayout.propTypes = {
    children: PropTypes.any
};

export { Routes, ProtectedRoute, RejectedRoute, AppLayout }
