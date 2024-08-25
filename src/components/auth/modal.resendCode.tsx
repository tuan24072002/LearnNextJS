'use client'
import { sendRequest } from "@/utils/api";
import { useHasMounted } from "@/utils/customHook";
import { Button, Form, Input, message, Modal, notification } from "antd"
import { useRouter } from "next/navigation";
import { SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Steps } from 'antd';
import { useEffect, useState } from "react";

const ModalResendCode = ({ isModalOpen, setIsModalOpen, userEmail }: {
    isModalOpen: boolean
    setIsModalOpen: any
    userEmail: string
}) => {
    const router = useRouter()
    const hasMounted = useHasMounted()
    const [current, setCurrent] = useState(0);
    const [userId, setUserId] = useState('');
    const [form] = Form.useForm() //Bắt form cập nhật
    useEffect(() => {
        if (userEmail) {
            form.setFieldValue('email', userEmail)
        }
    }, [userEmail, form])
    if (!hasMounted) return <></>
    const onFinishStep0 = async (values: any) => {
        const { email } = values;
        const res = await sendRequest<IBackendRes<any>>({
            method: "POST",
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/resend-code`,
            body: { email },
        })
        if (res?.error) {
            return notification.error({
                message: "Error verify",
                description: res?.message
            })
        }
        if (res?.data) {
            setCurrent(1)
            setUserId(res.data._id)
        }
    }
    const onFinishStep1 = async (values: any) => {
        const { code } = values;
        const res = await sendRequest<IBackendRes<any>>({
            method: "POST",
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/check-code`,
            body: { _id: userId, code },
        })
        if (res?.error) {
            return notification.error({
                message: "Error verify",
                description: res?.message
            })
        }
        if (res?.data) {
            setCurrent(2)
        }
    };
    return (
        <Modal
            title="Kích hoạt tài khoản"
            maskClosable={false}
            open={isModalOpen}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
        >
            <Steps
                current={current}
                items={[
                    {
                        title: 'Login',
                        icon: <UserOutlined />,
                    },
                    {
                        title: 'Verification',
                        icon: <SolutionOutlined />,
                    },
                    {
                        title: 'Done',
                        icon: <SmileOutlined />,
                    },
                ]}
            />
            {
                current === 0 &&
                <>
                    <div style={{ margin: '20px 0' }}>
                        <p style={{ color: 'red' }}>* Tài khoản của bạn chưa được kích hoạt !</p>
                    </div>
                    <Form
                        name="resendCode"
                        onFinish={onFinishStep0}
                        autoComplete="off"
                        layout='vertical'
                        form={form}
                    >
                        <Form.Item
                            label=""
                            name="email"
                        // initialValue={userEmail}
                        >
                            <Input disabled value={userEmail} />
                        </Form.Item>
                        <Form.Item
                        >
                            <Button type="primary" htmlType="submit">
                                Gửi lại mã
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            }
            {
                current === 1 &&
                <>
                    <div style={{ margin: '20px 0' }}>
                        <p style={{ color: 'red' }}>* Mã code đã được gửi tới email. Vui lòng kiểm tra email !</p>
                    </div>
                    <Form
                        name="resendCode"
                        onFinish={onFinishStep1}
                        autoComplete="off"
                        layout='vertical'
                        form={form}
                    >
                        <Form.Item
                            label="Code"
                            name="code"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your code !',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                        >
                            <Button type="primary" htmlType="submit">
                                Kích hoạt
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            }
            {
                current === 2 &&
                <div style={{ margin: '20px 0' }}>
                    <p style={{ color: 'red' }}>Tài khoản của bạn đã được kích hoạt thành công. Vui lòng đăng nhập lại !</p>
                </div>
            }
        </Modal>
    )
}
export default ModalResendCode;