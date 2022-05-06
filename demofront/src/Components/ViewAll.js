import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/Button';
import { Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import MaterialTable from "material-table";
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

export class ViewAll extends Component {
    state = {
      trucks: []
    };
  
    async componentDidMount() {
        const response = await fetch('/all');
        const body = await response.json();
        this.setState({trucks: body});
    }
  
    render() {
      const {trucks} = this.state;
      return (
          <div className="App">
            <header>
              <div className="App-intro">
                <h1>Food Trucks in San Francisco</h1>
    
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
                    <td><Button>More Details</Button></td> 
                    <td><ButtonGroup>
                    <td><Button>Edit</Button></td>
                    <td><Button>Delete</Button></td> 
                    </ButtonGroup></td>       
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