import {
    AppLayout,
    Cart,
    ForgetPassword,
    Home,
    Login,
    ProductDetail,
    ProductList,
    ProtectedRoute,
    Register,
    RejectedRoute,
    Routes
} from './routes.jsx';
import { Outlet, useRoutes } from 'react-router-dom';
import { Suspense } from 'react';

export default function useRouteElements() {
    return useRoutes(
        [
            {
                path: Routes.AUTH.path,
                element: <RejectedRoute />,
                children: [
                    {
                        path: Routes.AUTH.LOGIN,
                        element: (
                            <Suspense>
                                <Login/>
                            </Suspense>
                        )
                    },
                    {
                        path: Routes.AUTH.REGISTER,
                        element: (
                            <Suspense>
                                <Register/>
                            </Suspense>
                        )
                    },
                    {
                        path: Routes.AUTH.FORGET_PASSWORD,
                        element: (
                            <Suspense>
                                <ForgetPassword/>
                            </Suspense>
                        )
                    },
                ]
            },
            {
                path: Routes.HOME.path,
                element: (
                    <AppLayout>
                        <Home/>
                    </AppLayout>
                )
            },
            {
                path: Routes.PRODUCT.path,
                element: <Outlet/>,
                children: [
                    {
                        path: Routes.PRODUCT.PRODUCT_lIST,
                        element: (
                            <AppLayout>
                                <ProductList/>
                            </AppLayout>
                        )
                    },
                    {
                        path: Routes.PRODUCT.PRODUCT_DETAIL,
                        element: (
                            <AppLayout>
                                <ProductDetail/>
                            </AppLayout>
                        )
                    },
                ]
            },
            {
                path: '',
                element: <ProtectedRoute />,
                children: [
                    {
                        path: Routes.CART.path,
                        element: (
                            <AppLayout>
                                <Cart/>
                            </AppLayout>
                        )
                    }
                ]
            },
            {
                path: '*',
                element: <div>Not Found</div>
            }
        ]
    )
}
