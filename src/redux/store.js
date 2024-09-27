import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './features/authSlice.js';
import extensionSliceReducer from './features/extension.js';
import categorySliceReducer from './features/category.js'
import domainSliceReducer from './features/domain.js'
import currencySliceReducer from './features/currency.js'
import languageSliceReducer from './features/language.js'

const store = configureStore({
    reducer:{
    auth:authSliceReducer,
    extension:extensionSliceReducer,
    category:categorySliceReducer,
    domain:domainSliceReducer,
    currency:currencySliceReducer,
    language:languageSliceReducer
   }
})

export default store;