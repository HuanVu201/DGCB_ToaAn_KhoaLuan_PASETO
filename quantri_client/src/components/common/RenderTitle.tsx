import { Typography } from "antd"

export const RenderTitle = ({ title, level = 5 }: { title: React.ReactNode, level?: 1 | 2 | 3 | 4 | 5 }) => {
    return <Typography.Title level={level} style={{ color: "#3498db" }} className="title-primary">{title}</Typography.Title>
}