function createChart(element) {
    const ctx = document.getElementById('chart').getContext('2d');

    const data = []
    const sumData = 68 + 69 + 84
    const breakpointLg = 1200

    const darkenColor = (ctx) => ctx.dataset.backgroundColor[ctx.dataIndex] === '#ffc200' ? '#ad8402' : '#918f88'

    const chart = new Chart(ctx, {
        type: 'doughnut',
        plugins: [ChartDataLabels],
        data: {
            labels: [],
            datasets: [{
                data: data,
                backgroundColor: [
                    '#ffc200',
                    '#c0c0c0',
                    '#f3f3f3',
                ],
                hoverOffset: 4,
                datalabels: {
                    labels: {
                        index: {
                            align: 'end',
                            anchor: 'end',
                            color: darkenColor,
                            font: {
                                size: window.innerWidth > breakpointLg ? 20 : 14
                            },
                            formatter: function (value, ctx) {
                                return ctx.chart.data.labels[ctx.dataIndex]
                            },
                            offset: 8,
                            opacity: function (ctx) {
                                return ctx.active ? 1 : 0.5;
                            }
                        },
                        value: {
                            align: 'bottom',
                            font: {
                                size: 20
                            },
                            borderWidth: 2,
                            borderRadius: 4,
                            color: darkenColor,
                            formatter: function (value, ctx) {
                                return ctx.active ?
                                    ((value / sumData) * 100).toFixed(0) + '%' :
                                    Math.round(value * 1000) / 1000;
                            },
                            padding: 4
                        }
                    }
                }
            }],
        },
        options: {
            layout: {
                padding: {
                    left: window.innerWidth > breakpointLg ? 120 : 80,
                    right: window.innerWidth > breakpointLg ? 120 : 80,
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false,
                },
                datalabels: {
                    color: 'black',
                    display: function (ctx) {
                        return ctx.dataset.data[ctx.dataIndex] > 10;
                    },
                    font: {
                        weight: 'bold',
                    },
                    offset: 0,
                    padding: 0
                }
            },
        }
    })

    function addData(entries, observer) {
        if (entries[0].intersectionRatio < 0.5) return
        chart.data.labels = [
            'Construction \n& Demolition',
            'Excavation',
            'Other'
        ];
        if (!chart.data) return
        chart.data.datasets.forEach((dataset) => {
            dataset.data = [68, 69, 84];
        });
        chart.update();
    }

    let observer = new IntersectionObserver(addData, {
        root: null,
        rootMargin: "0px",
        threshold: .5
    });
    observer.observe(element);

}