var employeeLabel = [], employeeSalaryData = [], employeeAgeData = []

async function dummyChart() {
await getDummyData()

const labels = employeeLabel;

  const data = {
    labels: labels,
    datasets: [{
      label: 'Employee Salary',
      backgroundColor: 'blue',
      borderColor: 'rgb(255, 99, 132)',
      data: employeeSalaryData,
    },
    {
        label: 'Employee Age',
        backgroundColor: 'pink',
        borderColor: 'rgb(255, 99, 132)',
        data: employeeAgeData,
      }
    ]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
        tooltips: {
            mode: 'index'
        }
    }
  };


let myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
}

dummyChart();

// Fetch data from Dummy REST API
async function getDummyData () {
    const apiUrl = "https://dummy.restapiexample.com/api/v1/employees"

    const response = await fetch(apiUrl)
    const barChartData = await response.json()

    const salary = barChartData.data.map((x) => x.employee_salary)
    const age = barChartData.data.map((x) => x.employee_age)
    const name = barChartData.data.map((x) => x.employee_name)

    console.log(salary, age, name)

    employeeLabel = name
    employeeSalaryData = salary
    employeeAgeData = age

}


 