import React, { Component } from "react";
import Chart from "react-apexcharts";
import '../css/educateur.css'
class Progress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      donutOptions: {},
      donutSeries: [44, 55, 41, 17, 15],
      donutLabels: ['A', 'B', 'C', 'D', 'E'],
      barOptions: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      barSeries: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ]
    };
  }

  render() {
    return (
      <div className="charts">
        <div className="texts">
            Progress of your students
        </div>
        <div className="row-charts">
     

          <div className="bar-chart">
            <h3>chart represent chaque student with </h3>
            <Chart
              options={this.state.barOptions}
              series={this.state.barSeries}
              type="bar"
              width="500"
            />
          </div>
          <div className="donut-chart">
            <Chart
              options={this.state.donutOptions}
              series={this.state.donutSeries}
              type="donut"
              width="380"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Progress;
