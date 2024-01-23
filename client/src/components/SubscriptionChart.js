import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Import to register the chart type

const SubscriptionChart = ({ subscriptions }) => {
    const data = {
        labels: subscriptions.map(sub => sub.service),
        datasets: [{
            label: 'Monthly Cost',
            data: subscriptions.map(sub => parseFloat(sub.monthlyCost)),
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                
            ]
        }]
    };

    return (
        <div className="chart">
            <Pie data={data} />
        </div>
    );
    
};

export default SubscriptionChart;
