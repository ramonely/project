import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Container, Form, FormGroup, Input, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.css';

export class ViewAll extends Component {
    state = {
      trucks: []
    };

      componentDidMount() {
        this.getTable();
    } 

      handleDelete(ID) {
        fetch('/' + ID, {
            method: 'DELETE',
        }).then(res => res.json())
            .then(
                (result) => {
                  this.getTable();
                  if(result){
                    Swal.fire ({
                      title: result.applicant,
                      html: "Has Been Deleted!",
                      confirmButtonText: 'All Done!'
                    })
                  }
                }
            ); 
    }

    jokesIfYouDare() {
      fetch('https://api.chucknorris.io/jokes/random', {   
      method: 'GET', 
    }).then(res => res.json())
    .then(
      (result) => {   
          if(result){
            Swal.fire ({
              title: result.value,
              confirmButtonText: 'That Was Not Too Bad!'
            })
          }        
      }
  );  
}

    createTruck() {
      Swal.fire({
        title: 'New Food Truck',
        html: `<input type="text" id="applicant" class="swal2-input" placeholder="applicant">
        <input type="text" id="address" class="swal2-input" placeholder="address">,
        <input type="text" id="fooditems" class="swal2-input" placeholder="fooditems">`,
        
        confirmButtonText: 'ADD',
        preConfirm: () => {
          const applicant = Swal.getPopup().querySelector('#applicant').value
          const address = Swal.getPopup().querySelector('#address').value
          const fooditems = Swal.getPopup().querySelector('#fooditems').value
          if (!applicant || !address || !fooditems) {
            Swal.showValidationMessage('Please all 3 values')
          }
          return { applicant: applicant, address: address, fooditems: fooditems }
        }
      }).then((result) => {

        var applicant = result.value.applicant
        var address = result.value.address
        var fooditems = result.value.fooditems

      fetch('/create', {
        
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "applicant": applicant,
      "address": address,
      "foodItems": fooditems})
    }) 
    window.location.reload()
      })
  }

    moreDetails(ID) {
      fetch('/' + ID, {
          method: 'GET',
      }).then(res => res.json())
          .then(
              (result) => {   
                  if(result){
                    Swal.fire ({
                      title: result.applicant,
                      html: "Address </br></br>"+result.address+ "</br></br>" + "Menu </br></br>"+result.foodItems,
                      confirmButtonText: 'This May be Nice!'
                    })
                  }        
              }
          );   
  }

    getTable() {
      fetch('/all', {
          method: 'GET',
      }).then(res => res.json())
          .then(
              (res) => { 
                this.setState({trucks: res})
              },
          );
  }
  
    render() {
      const {trucks} = this.state;

      return (
          <div className="App">
            <header>
              <div className="App-intro">
                <h1><Button onClick={() => { this.jokesIfYouDare() }} >Click If You Dare</Button>&nbsp;&nbsp;&nbsp;Food Trucks in San Francisco 
                &nbsp;&nbsp;&nbsp;<Button onClick={() => { this.createTruck() }} >ADD FOOD TRUCK</Button></h1>
                  
                 <Container>
                <Table stripped bordered hover>
                <thead>
                    <tr>
                        <th width="30%">Name</th>
                        <th width="40%">Info</th>
                        <th width="40%">Actions</th>
                    </tr>
                </thead>
                <tbody>
                  {trucks.map((trucks) => (
                    <tr key={trucks.id}>             
                    <td>{trucks.applicant}</td>
                    <td><Button onClick={() => { this.moreDetails(trucks.id) }} >More Details</Button></td> 
                    <td><Button>Edit</Button>&nbsp;&nbsp;&nbsp;  
                    <Button onClick={() => { this.handleDelete(trucks.id)}}>Delete</Button>
                    </td>    
                    </tr>
                    ))}
                    </tbody>
                </Table>
                 </Container> 
              </div>
            </header>
          </div>
      );
    }
  } 