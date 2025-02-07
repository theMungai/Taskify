const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [40, 10],
        borderRadius : 20,
        borderWidth: 0.05,
        backgroundColor :["rgb(49, 104, 223)","rgb(35, 34, 40)"],
        cutout: "85%",        
      }]
    },
    options: {
      responsive : true,
      plugins :{
        datalabels : {
          display : false
        },
        tooltip: {
            enabled : false
          },
      },
      scales: {
        r: {
          display : false
        }
      }
      
    }
  });