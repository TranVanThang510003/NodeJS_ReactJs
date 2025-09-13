import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";
import { store }  from './redux/store.js';
import { Button, ConfigProvider, Space } from 'antd';
import App from './App.jsx';
import  '../src/style/global.css';
import './index.css'
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ConfigProvider
      // theme={{
      //   token: {
      //     // Seed Token
      //     colorPrimary: '#00b96b',
      //     borderRadius: 8,
      //     colorText: '#1a1a1a',        // chữ chính đậm
      //     colorTextSecondary: '#595959', // chữ phụ
      //     // Alias Token
      //     colorBgContainer: '#f5f5f5',
      //   },
      // }}
    >
      <BrowserRouter>
        <StrictMode>
          <App />
        </StrictMode>
      </BrowserRouter>
    </ConfigProvider>
  </Provider>
);
