const county = document.querySelector('.county');
const weeklyIncidence = document.querySelector('.weekly-incidence');
let apiCurrentValue;
console.log(localStorage);

fetch('https://api.corona-zahlen.org/districts')
  .then((data) => data.json())
  .then((data) => {
    console.log(data.data['09184']);
    let countyName = data.data['09184'].county;
    let sevenDayIncidence = parseInt(data.data['09184'].weekIncidence);

    apiCurrentValue = sevenDayIncidence;
    // console.log(apiCurrentValue);
    weeklyIncidence.innerText = sevenDayIncidence;
    county.innerText = countyName;
    let prevValues = [
      93,
      104,
      117,
      129,
      135,
      132.4,
      135.0,
      124.1,
      128.4,
      123.5,
      122.4,
      122.4,
      150.1,
      174.3,
      176.9,
      180.6,
      172.3,
    ].reverse();
    //let newValues = prevValues.concat(apiValues);
    let newValues = [...prevValues, apiCurrentValue];
    const prevDates = [
      '19-04-2021',
      '20-04-2021',
      '21-04-2021',
      '22-04-2021',
      '23-04-2021',
      '24-04-2021',
      '25-04-2021',
      '26-04-2021',
      '27-04-2021',
      '28-04-2021',
      '29-04-2021',
      '30-04-2021',
      '01-05-2021',
      '02-05-2021',
      '03-05-2021',
      '04-05-2021',
      '05-05-2021',
      //'06-05-2021',
    ];
    prevDates2 = prevDates.map((d) => {
      return d.replaceAll('-', '.');
    });

    if (prevValues[prevValues.length - 1] != apiCurrentValue) {
      prevValues.push(apiCurrentValue);
      let todaysDate = new Date()
        .toLocaleDateString('en-GB')
        .replaceAll('/', '.');
      prevDates2.push(todaysDate);
      //console.log(prevValues, prevDates2);
      localStorage.setItem(prevValues, prevDates2);
      console.log(localStorage);
    }

    CHART = document.getElementById('lineChart');
    let line_Chart = new Chart(CHART, {
      type: 'line',
      data: {
        labels: prevDates2,
        datasets: [
          {
            label: 'Total',
            data: prevValues,
            fill: true,
            backgroundColor: [
              'rgba(54, 68, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(54, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    console.log(prevValues, prevDates2);
  });
