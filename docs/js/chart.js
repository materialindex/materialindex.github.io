function createChart(element) {
  const ctx = document.getElementById('chart').getContext('2d');

  const data = [137.8, 42.6, 26.4, 15.4];
  const labels = ['Construction,\ndemolition &\nexcavation', 'Commercial &\nindustrial', 'Households', 'Other'];
  const sumData = data.reduce((a, b) => a + b, 0);
  const breakpointLg = 1200;

  const darkenColor = (ctx) => (ctx.dataset.backgroundColor[ctx.dataIndex] === '#ffc200' ? '#ad8402' : '#918f88');

  const chart = new Chart(ctx, {
    type: 'doughnut',
    plugins: [ChartDataLabels],
    data: {
      labels: [],
      datasets: [
        {
          data: data,
          backgroundColor: ['#ffc200', '#c0c0c0', '#f3f3f3', '#e3e3e3'],
          hoverOffset: 4,
          datalabels: {
            labels: {
              index: {
                align: 'end',
                anchor: 'end',
                color: darkenColor,
                font: {
                  size: window.innerWidth > breakpointLg ? 16 : 12
                },
                formatter: function (value, ctx) {
                  return ctx.chart.data.labels[ctx.dataIndex];
                },
                offset: 8,
                opacity: function (ctx) {
                  return ctx.active ? 1 : 0.5;
                }
              },
              value: {
                align: 'center',
                font: {},
                borderWidth: 2,
                borderRadius: 4,
                color: darkenColor,
                formatterX: function (value, ctx) {
                  return ctx.active ? ((value / sumData) * 100).toFixed(0) + '%' : Math.round(value * 1000) / 1000;
                },
                padding: 4
              }
            }
          }
        }
      ]
    },
    options: {
      defaults: {
        font: {
          size: 15
        }
      },
      layout: {
        padding: {
          left: window.innerWidth > breakpointLg ? 120 : 80,
          right: window.innerWidth > breakpointLg ? 120 : 80
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: false
        },
        datalabels: {
          color: 'black',
          display: function (ctx) {
            return ctx.dataset.data[ctx.dataIndex] > 10;
          },
          font: {},
          offset: 0,
          padding: 0
        }
      }
    }
  });

  function addData(entries, observer) {
    if (entries[0].intersectionRatio < 0.5) return;
    chart.data.labels = labels;
    if (!chart.data) return;
    chart.data.datasets.forEach((dataset) => {
      dataset.data = data;
    });
    chart.update();
  }

  let observer = new IntersectionObserver(addData, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  });
  observer.observe(element);
}
