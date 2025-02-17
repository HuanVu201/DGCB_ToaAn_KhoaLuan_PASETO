import { SelectProps } from "antd";

export const getYearsFrom = (year: number = 1900) => {
    const currentYear = new Date().getFullYear()
    const res : SelectProps["options"] = []
    for (let index = currentYear; index >= year; index--) {
        res.push({label: `${index}`, value: `${index}`})
    }
    return res;
}

export const getMonths = () => {
    const res : SelectProps["options"] = []
    for (let index = 1; index <= 12; index++) {
        res.push({label: `Tháng ${index < 10 ? `0${index}` : index}`, value: `${index}`})
    }
    return res;
}