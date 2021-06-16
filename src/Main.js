import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Style.css';


export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      citiesName: '',
      dataForCities: {},
      weatherData: [],
      showingData: false,
      alert: false,
      error: '',
      lat :'',
      lon : ''
    }
  };

  changecitiesName = (event) => {
    this.setState({
      citiesName: event.target.value
    });
  }

  getdataForCities = async (event) => {
    event.preventDefault();
    try {
       await axios.get(`https://us1.locationiq.com/v1/search.php?key=pk.bd985e4e701a5b53341ec9e721b6098a
        &city=${this.state.citiesName}&format=json`).then(locationResponse => {

          this.setState({
            cityData: locationResponse.data[0],
            lat: locationResponse.data[0].lat,
            lon: locationResponse.data[0].lon,
          });
          axios.get(`${process.env.REACT_APP_URL}/weather?lat=${this.state.lat}&lon=${this.state.lon}`).then(weatherResponse => {
            this.setState({
              weatherData: weatherResponse.data,
              displayData: true
            })
    
          });
        });

      // const dataFromBackEnd = await axios.get(`${process.env.REACT_APP_URL}/weather`);

      // this.setState({
      //   dataForCities: axiosResponse.data[0],
      //   weatherData: dataFromBackEnd.data,
      //   showingData: true,
      //   alert: false
      // });

    } catch (error) {
      this.setState({
        error: error.message,
        alert: true
      })
    }

  }
  render() {
    return (
      <div>
        {this.state.alert &&

          <div class="alert alert-warning" role="alert">
            {this.state.error} ,Please type the city
          </div>
        }
        <Form onSubmit={this.getdataForCities}>

          <Form.Group className="mb-3" controlId="formBasicEmail">

            <Form.Label class='formClass'>City Name</Form.Label>
            <br></br>
            <br></br>
            <input onChange={this.changecitiesName} type="text" />

          </Form.Group>
          <br></br>
          <br></br>

          <Button class='buttonClass' variant="primary" type="submit"> Explore!</Button>

          <p class='amman'>{this.state.dataForCities.display_name}</p>
          <p> latitude : {this.state.dataForCities.lat}</p>
          <p>longitude : {this.state.dataForCities.lon}</p>
          {this.state.showingData &&

            <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.bd985e4e701a5b53341ec9e721b6098a&q&center=${this.state.dataForCities.lat},${this.state.dataForCities.lon}&zoom=10`} alt='' />
          }
          {
            this.state.weatherData.map(value => {
              return (
                <>
                  <p>
                    {value.description}
                  </p>

                  <p>   
                    {value.date}
                  </p>
                </>
              )
            })
          }
        </Form>


      </div>

    )
  }
}

export default Main
