import { useEffect } from 'react';
import { Chart, registerables, ChartDataset } from 'chart.js';
import { Card } from 'antd';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useAppSelector } from '@/lib/redux/Hooks';
import { useDashBoardContext } from '../../contexts/DashBoardContext';
import Item from 'antd/es/list/Item';

Chart.register(...registerables);
ChartJS.register(ArcElement, Tooltip, Legend);

type BaseDataset = {
    label: string;
    data: number[];
    type: 'line' | 'bar';
    borderColor: string;
    borderWidth: number;
    fill: boolean;
    backgroundColor?: undefined;
    barThickness?: undefined;
};

type OtherDataset = {
    label: string;
    data: number[];
    backgroundColor: string;
    type?: undefined;
};

const datasets: (BaseDataset | OtherDataset)[] = [
    {
        label: 'Cán bộ đánh giá',
        data: [70, 76, 60, 73, 86, 78],
        type: 'line',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        fill: false,
    },
    {
        label: 'Cán bộ được cấp tài khoản',
        data: [28, 21, 30, 19, 22, 16],
        type: 'line',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        fill: false,
    },
    {
        label: 'Hoàn thành xuất sắc nhiệm vụ',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: '#32C3F7',
    },
    {
        label: 'Hoàn thành tốt nhiệm vụ',
        data: [50, 60, 70, 90, 40, 65],
        backgroundColor: '#36FDD6',
    },
    {
        label: 'Hoàn thành nhiệm vụ',
        data: [50, 60, 70, 90, 40, 65],
        backgroundColor: '#FEB252',
    },
    {
        label: 'Không hoàn thành nhiệm vụ',
        data: [0, 0, 3, 0, 0, 0],
        backgroundColor: 'red',
    },
];

export const BieuDoCotDong = () => {
    const { listTkDonViNotChild } = useAppSelector(state => state.dashboards);
    const labels = listTkDonViNotChild?.map(item => item.namDanhGia) || [];
    // Tạo datasets từ dữ liệu của từng đối tượng trong mảng
    const datasets: ChartDataset<'bar', number[]>[] = [
        {
            label: 'Hoàn thành xuất sắc nhiệm vụ', // Ví dụ là số cán bộ
            data: listTkDonViNotChild?.map(item => item.danhGiaLoaiA || 0) || [], // Dữ liệu từ trường tongSoCanBo
            backgroundColor: '#4D90FE',
            borderColor: '#4D90FE',
            borderWidth: 1,
        },
        {
            label: 'Hoàn thành tốt nhiệm vụ', // Ví dụ là số đã xếp loại
            data: listTkDonViNotChild?.map(item => item.danhGiaLoaiB || 0) || [], // Dữ liệu từ trường tongSoDaXepLoai
            backgroundColor: '#32DE8A',
            borderColor: '#32DE8A',
            borderWidth: 1,
        },
        {
            label: 'Hoàn thành nhiệm vụ', // Ví dụ là số tự đánh giá
            data: listTkDonViNotChild?.map(item => item.danhGiaLoaiC || 0) || [], // Dữ liệu từ trường tongSoTuDanhGia
            backgroundColor: '#F5A623',
            borderColor: '#F5A623',
            borderWidth: 1,
        },
        {
            label: 'Không hoàn thành nhiệm vụ', // Ví dụ là số tự đánh giá
            data: listTkDonViNotChild?.map(item => item.danhGiaLoaiD || 0) || [], // Dữ liệu từ trường tongSoTuDanhGia
            backgroundColor: 'red',
            borderColor: 'red',
            borderWidth: 1,
        },
    ];

    useEffect(() => {
        const canvas = document.getElementById('mixedChart') as HTMLCanvasElement | null;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const mixedChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: datasets as ChartDataset<'bar' | 'line', number[]>[],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            generateLabels: (chart) => {
                                const original = Chart.defaults.plugins.legend.labels.generateLabels;
                                const labels = original.call(this, chart);
                                labels.forEach((label, index) => {
                                    switch (index) {
                                        case 0:
                                            label.pointStyle = 'circle';
                                            label.fillStyle = '#4D90FE';
                                            break;
                                        case 1:
                                            label.pointStyle = 'circle';
                                            label.fillStyle = '#32DE8A';
                                            break;
                                        case 2:
                                            label.pointStyle = 'circle';
                                            label.fillStyle = '#F5A623';
                                            break;
                                        case 3:
                                            label.pointStyle = 'circle';
                                            label.fillStyle = '#EB5757';
                                            break;
                                        case 4:
                                            label.pointStyle = 'line';
                                            label.fillStyle = '#F2994A';
                                            break;
                                        case 5:
                                            label.pointStyle = 'line';
                                            label.fillStyle = '#56CCF2';
                                            break;
                                        default:
                                            break;
                                    }
                                });
                                return labels;
                            },
                        },
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                    y2: {
                        type: 'linear',
                        position: 'right',
                        beginAtZero: true,
                        grid: {
                            drawOnChartArea: false,
                        },
                    },
                },
            },
        });

        return () => {
            mixedChart.destroy();
        };
    }, [listTkDonViNotChild]);

    return (
        <Card title="Tình hình xếp loại của đơn vị theo thời gian">
            <canvas id="mixedChart" width="400" height="200"></canvas>
        </Card>
    );
};

export const BieuDoTron = () => {
    const dashboardscontext = useDashBoardContext(); // Lấy context từ hook của bạn
    const { listTkDonViNotChild } = useAppSelector(state => state.dashboards); // Lấy dữ liệu từ Redux store

    // Lọc dữ liệu theo KyDanhGia (hoặc các tiêu chí bạn muốn)
    const dataMoth = listTkDonViNotChild?.filter((item) => item.namDanhGia === dashboardscontext.DashBoardNamDanhGia);

    // Tạo dữ liệu cho biểu đồ từ các trường 'danhGiaLoaiA', 'danhGiaLoaiB', 'danhGiaLoaiC', 'danhGiaLoaiD'
    const data = {
        labels: ['Hoàn thành xuất xắc nhiệm vụ', 'Hoàn thành tốt nhiệm vụ', 'Hoàn thành nhiệm vụ', 'Không hoàn thành nhiệm vụ'],
        datasets: [
            {
                label: 'Số lượng đánh giá',
                data: [
                    dataMoth?.reduce((acc, item) => acc + (item.danhGiaLoaiA || 0), 0), // Tính tổng đánh giá Loại A
                    dataMoth?.reduce((acc, item) => acc + (item.danhGiaLoaiB || 0), 0), // Tính tổng đánh giá Loại B
                    dataMoth?.reduce((acc, item) => acc + (item.danhGiaLoaiC || 0), 0), // Tính tổng đánh giá Loại C
                    dataMoth?.reduce((acc, item) => acc + (item.danhGiaLoaiD || 0), 0), // Tính tổng đánh giá Loại D
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)', // Màu cho Loại A
                    'rgba(54, 162, 235, 0.6)', // Màu cho Loại B
                    'rgba(255, 206, 86, 0.6)', // Màu cho Loại C
                    'rgba(75, 192, 192, 0.6)', // Màu cho Loại D
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: true, // Hiển thị legend (chú thích)
            },
        },
    };

    return (
        <Card
            title={`Tình hình xếp loại của đơn vị năm ${dashboardscontext.DashBoardNamDanhGia}`}
            style={{ height: '100%', width: '100%' }}
        >
            <Pie data={data} options={options} />
        </Card>
    );
};

