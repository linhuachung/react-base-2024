import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from 'src/services/auth/apis.js';
import { API_URL_APP } from 'src/apis/index.js';

const keyReducer = {
    getList: 'product/getList'
}

const GetListProducts = createAsyncThunk(keyReducer.getList, async () => {
    const res = await callApi({
        method: 'get',
        url: API_URL_APP.product.getListProducts
    })
    return res
})

export {
    GetListProducts
}
