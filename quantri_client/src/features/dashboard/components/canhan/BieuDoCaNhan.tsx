import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const generateMonthsArray = () => {
    const months = [];
    const startDate = new Date(2023, 9);
    for (let i = 0; i < 12; i++) {
        const month = new Date(startDate.getFullYear(), startDate.getMonth() + i);
        const monthLabel = `${month.toLocaleString('vi-VN', { month: 'long' })} ${month.getFullYear()}`;
        months.push(monthLabel);
    }
    return months;
};

const BieuDoCaNhan = () => {
    const labels = generateMonthsArray();

    const data = {
        labels: labels,
        datasets: [{
            label: 'Điểm số',
            data: [65, 59, 80, 81, 56, 55, 40, 0, 0, 0, 0, 0],
            fill: false,
            borderColor: '#CD1B40',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.4,
            pointBorderColor: '#fff',
            pointHoverRadius: 6,
            pointRadius: 0,
        }]
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
            },
        },
        maintainAspectRatio: false,
    };

    return (
            <div style={{ height: '100%', width: '100%' }}>
                <Line data={data} options={options} />
            </div>
    );
};

export default BieuDoCaNhan;
