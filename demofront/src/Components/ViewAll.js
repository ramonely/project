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

updateTruck(ID) {
  fetch('/' + ID, {
    method: 'GET',
}).then(res => res.json())
    .then(
        (result) => {   
            if(result){
              Swal.fire({
                title: "Updating: "+result.applicant,
                html: `Applicant: <input type="text" id="applicant" class="swal2-input" value="${result.applicant}" placeholder="${result.applicant}">
                Address: <input type="text" id="address" class="swal2-input" value="${result.address}" placeholder="${result.address}">
                Menu: <textarea rows="3" cols="19" type="text" id="fooditems" class="swal2-input" placeholder="${result.foodItems}">${result.foodItems}</textarea>`,
                
                confirmButtonText: 'Update',
                preConfirm: () => {
                  const applicant = Swal.getPopup().querySelector('#applicant').value
                  const address = Swal.getPopup().querySelector('#address').value
                  const fooditems = Swal.getPopup().querySelector('#fooditems').value

                  return { applicant: applicant, address: address, fooditems: fooditems }
                }
              }).then((result) => {
            
                var applicant = result.value.applicant
                var address = result.value.address
                var fooditems = result.value.fooditems
            
              fetch('/' + ID, {
                
              method: 'PUT', 
              headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              "applicant": applicant,
              "address": address,
              "foodItems": fooditems})
            }) 
            window.location.reload()
              })
            }        
        }
    );   

}

    createTruck() {
      Swal.fire({
        title: 'New Food Truck',
        html: `Applicant: <input type="text" id="applicant" class="swal2-input" placeholder="applicant">
        Address: <input type="text" id="address" class="swal2-input" placeholder="address">,
        Menu: <textarea rows="3" cols="19" type="text" id="fooditems" class="swal2-input" placeholder="fooditems"></textarea>`,
        
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

  abcN() {
    fetch('/abcN', {
        method: 'GET',
    }).then(res => res.json())
        .then(
            (res) => { 
              this.setState({trucks: res})
            },
        );
}

abcA() {
  fetch('/abcA', {
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
                &nbsp;&nbsp;&nbsp;<Button variant="success" onClick={() => { this.createTruck() }} >ADD FOOD TRUCK</Button></h1>
                <Button variant="link" size="sm" onClick={() => { this.abcA() }} > Sort by Address</Button>
                <Button variant="link" size="sm" onClick={() => { this.abcN() }} >Sort by Name</Button> 

                 <Container>
                <Table stripped bordered hover>
                <thead>
                    <tr>
                        <th width="30%">Name </th>
                        <th width="40%"> Info </th>
                        <th width="40%">Actions</th>
                    </tr>
                </thead>
                <tbody>
                  {trucks.map((trucks) => (
                    <tr key={trucks.id}>             
                    <td>{trucks.applicant}</td>
                    <td><Button variant="info" onClick={() => { this.moreDetails(trucks.id) }} >More Details</Button></td> 
                    <td><Button variant="warning" onClick={() => { this.updateTruck(trucks.id) }} >Edit</Button>&nbsp;&nbsp;&nbsp;  
                    <Button variant="danger" onClick={() => { this.handleDelete(trucks.id)}}>Delete</Button>
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