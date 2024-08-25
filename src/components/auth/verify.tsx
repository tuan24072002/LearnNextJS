'use client'
import React from 'react';
import { Button, Col, Divider, Form, Input, message, notification, Row } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { sendRequest } from '@/utils/api';
import { useRouter } from 'next/navigation';

const Verify = ({ _id }: { _id: string }) => {
    const router = useRouter()
    const onFinish = async (values: any) => {
        const { _id, code } = values;
        const res = await sendRequest<IBackendRes<any>>({
            method: "POST",
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/check-code`,
            body: { _id, code },
        })
        if (res?.error) {
            return notification.error({
                message: "Error verify",
                description: res?.message
            })
        }
        if (res?.data) {
            message.success(res.data.message)
            router.push('/auth/login')
        }
        console.log(res);
    };
    const handleResendCode = () => {

    }
    return (
        <Row justify={"center"} style={{ marginTop: "30px" }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{
                    padding: "15px",
                    margin: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "5px"
                }}>
                    <legend>Kích hoạt Tài Khoản</legend>
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        autoComplete="off"
                        layout='vertical'
                    >
                        <Form.Item
                            label="Id"
                            name="_id"
                            initialValue={_id}
                            hidden
                        >
                            <Input disabled />
                        </Form.Item>
                        <div style={{ color: 'red' }}>
                            *Mã code đã được gửi tới email đăng ký. Vui lòng kiểm tra email !
                        </div>
                        <Divider />
                        <Form.Item
                            label="Code"
                            name="code"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your code!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Form.Item
                            >
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                            <a onClick={handleResendCode}>Gửi lại mã code</a>
                        </div>
                    </Form>
                    <Link href={"/"}><ArrowLeftOutlined /> Quay lại trang chủ</Link>
                    <Divider />
                    <div style={{ textAlign: "center" }}>
                        Đã có tài khoản? <Link href={"/auth/login"}>Đăng nhập</Link>
                    </div>
                </fieldset>
            </Col>
        </Row>

    )
}

export default Verify;