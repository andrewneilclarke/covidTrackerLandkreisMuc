// const { request } = require("node:http");
const county = document.querySelector('.county');
const weeklyIncidence = document.querySelector('.weekly-incidence');

// const request = new XMLHttpRequest();
// request.open("GET", "https://api.corona-zahlen.org/districts");
// request.send();
// request.onload = () => {
//     if (request.status === 200) {
//         console.log(JSON.parse(request.response))}
//     else { console.log(`error ${request.status}`)
// }
// };


// window.fetch('https://api.corona-zahlen.org/districts')
// .then(response => {
//     return response.json
// }).then(json => console.log(json))


// async
// async function getData () {
//     let response = await fetch('https://api.corona-zahlen.org/districts');
//     let data = await response.json();
//     return data;
// }

//getData().then(response => {
//     //console.log(response.data);
//     response.json());
//     .then
//     const parseData = JSON.parse(response);
//     console.log(response);
//     apiText.innerText = response;
// })
let prevValues = [129, 135, 132.4, 135.0, 124.1, 128.4, 123.5, 122.4, 122.4, 150.1, 174.3, 176.9, 180.6, 172.3].reverse();
newValues = prevValues.concat([]);
const prevDates = ['19-04-2021', '20-04-2021', '21-04-2021', '22-04-2021', '23-04-2021', '25-04-2021', '26-04-2021', '27-04-2021', 
'28-04-2021', '29-04-2021', '30-04-2021', '01-05-2021', '02-05-2021', '03-05-2021'];
prevDates2 = prevDates.map((d) => {
    return d.replaceAll('-', '.');
});
console.log(prevDates2);
//console.log(new Date(prevDates));

fetch('https://api.corona-zahlen.org/districts')
.then(data => data.json())
.then(data => {
    //console.log(data.data["09184"]);
    let countyName = data.data["09184"].county;
    let sevenDayIncidence = parseInt(data.data["09184"].weekIncidence);
    weeklyIncidence.innerText = sevenDayIncidence;
    county.innerText = countyName;
});

CHART = document.getElementById('lineChart');
console.log(CHART);
let line_Chart = new Chart(CHART, {
    type: 'line',
    data:  {
        labels: prevDates2,
        datasets: [{
            label: 'Total',
            data: prevValues,
            fill: true,
            backgroundColor: [
                'rgba(54, 68, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(54, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
                
                
            }
        }
    }
}); 