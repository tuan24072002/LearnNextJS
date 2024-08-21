'use client'
import { Layout } from 'antd';

const AdminFooter = () => {
    const { Footer } = Layout;

    return (
        <>
            <Footer style={{ textAlign: 'center' }}>
                Learn NestJS NextJS ©{new Date().getFullYear()} Created by Trần Lê Anh Tuấn
            </Footer>
        </>
    )
}

export default AdminFooter;