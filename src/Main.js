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
          showingData: false
        }
      };
    
      changecitiesName = (event) => {
        this.setState({
          citiesName: event.target.value
        });
      }
    
      getdataForCities = async (event) => {
        event.preventDefault();
        const axiosResponse = await axios.get(`https://us1.locationiq.com/v1/search.php?key=pk.bd985e4e701a5b53341ec9e721b6098a
        &city=${this.state.citiesName}&format=json`);
    
        console.log(axiosResponse);
        this.setState({
          dataForCities: axiosResponse.data[0],
          showingData: true
        });
        
      }
    
    
      render() {
        return (
          <div>
            <Form  onSubmit={this.getdataForCities}>
    
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
              {this.state.showingData &&

              <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.bd985e4e701a5b53341ec9e721b6098a&q&center=${this.state.dataForCities.lat},${this.state.dataForCities.lon}&zoom=10`} alt='' />
              }
            </Form>

            
          </div>
    
        )
      }
    }

export default Main
