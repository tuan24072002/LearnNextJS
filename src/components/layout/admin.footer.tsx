'use client'
import { Footer } from "antd/es/layout/layout";

const AdminFooter = () => {
    return (
        <Footer style={{ textAlign: 'center' }}>
            Learn NestJS NextJS ©{new Date().getFullYear()} Created by Trần Lê Anh Tuấn
        </Footer>
    )
}
export default AdminFooter;