import React, { Component } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import '../css/educateur.css';

class Progress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      donutOptions: {
        chart: {
          type: 'donut',
        },
        labels: [],
      },
      donutSeries: [],
      barOptions: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: []
        }
      },
      barSeries: [
        {
          name: "Total Score",
          data: []
        }
      ],
      students: [], // State to store student data
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");

    axios.all([
      axios.get('http://localhost:4000/api/educator/StudentsOfEducator', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
      axios.get('http://localhost:4000/api/educator/StudentsScores', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    ])
    .then(axios.spread((quizResponse, scoresResponse) => {
      const quizData = quizResponse.data;
      const scoresData = scoresResponse.data;

      if (!Array.isArray(quizData) || quizData.length === 0) {
        throw new Error("Quiz data received from backend is not in the expected format");
      }

      if (!Array.isArray(scoresData.totalScores) || scoresData.totalScores.length === 0) {
        throw new Error("Total scores data received from backend is not in the expected format");
      }

      const donutSeries = quizData.map(student => student.quizzes.length);
      const donutLabels = quizData.map(student => student.fullname);
      const barCategories = scoresData.totalScores.map(student => student.fullname);
      const barData = scoresData.totalScores.map(student => student.totalScore);

      this.setState({
        donutSeries,
        donutOptions: { ...this.state.donutOptions, labels: donutLabels },
        barOptions: { ...this.state.barOptions, xaxis: { ...this.state.barOptions.xaxis, categories: barCategories } },
        barSeries: [{ ...this.state.barSeries[0], data: barData }],
        loading: false
      });
    }))
    .catch(error => {
      this.setState({ error: error.message, loading: false });
    });
  }

  getallstudent = async () => {
    const token = localStorage.getItem('token');
  
    try {
      const response = await axios.get('http://localhost:4000/api/educator/StudentsOfEducator', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      const data = response.data;
      console.log('Fetched data:', data);
  
      this.setState({ students: data }); // Update state with fetched student data
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  render() {
    const { donutOptions, donutSeries, barOptions, barSeries, loading, error, students } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div style={{color:'red',textAlign:'center',marginTop:'150px',fontSize:'30px'}}> No student yet !</div>;
    }

    return (
      <div style={{ marginLeft: '100px', marginTop: '80px' }}>
        <div className="get-students">
          <button type="button" data-bs-toggle="modal" data-bs-target="#studentsModal" onClick={this.getallstudent}>
            See Your Class
          </button>
        </div>

        <div className="modal fade" id="studentsModal" tabIndex="-1" aria-labelledby="studentsModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header text-center">
                <h1 style={{textAlign:'center'}}>Your Student List</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {students.length > 0 ? (
                  <ul>
                    {students.map(student => (
                      <li key={student._id} style={{color:'purple' ,fontWeight:'bold',fontSize:'20px'}}>
                        Full Name: {student.fullname}, Email: {student.email}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No students found.</p>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ color: "purple", textAlign: 'center' }}>Bar Chart represents the total score of each student</h3>
          <div className="bar-chart" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', width: '100%' }}>
            <Chart options={barOptions} series={barSeries} type="bar" width="250%" />
          </div>
        </div>
        <div style={{ marginTop: '80px' }}>
          <h3 style={{ color: "purple", textAlign: 'center' }}>Chart represents the students in your class and the number of quizzes passed by each student</h3>
          <div className="donut-chart" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', width: '100%' }}>
            <Chart options={donutOptions} series={donutSeries} type="donut" width="170%" />
          </div>
        </div>
      </div>
    );
  }
}

export default Progress;
