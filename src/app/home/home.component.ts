import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from "@angular/platform-browser";
import { ServicesService } from '../services/shared-services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  employees = [];
  displayedColumns = [];
  test = "test";
  ELEMENT_DATA: [
    {employeeId: 1, employeeName: 'Hydrogen', employeeEmail: 1.0079},
    {employeeId: 2, employeeName: 'Helium', employeeEmail: 4.0026},
    {employeeId: 3, employeeName: 'Lithium', employeeEmail: 6.941}
  ];
  constructor(private router: Router, private sharedService: ServicesService, private titleService: Title) {
    this.titleService.setTitle("home");
  }

  ngOnInit(): void {
    this.getEmployees();
    this.tableInilizer();
    console.log("emm", this.employees);
    console.log("emm", this.employees[2]);
  }

  getEmployees() {
    this.sharedService.getEmployees().subscribe(res => {
      
      Object.keys(res).map(r => {
        this.employees[r] = {
          employeeId: res[r].employeeID,
          employeeName: res[r].employeeName,
          employeeEmail: res[r].employeeEmail
        }
      })

    })
  };

  tableInilizer () {
    this.displayedColumns = ['employeeId', 'employeeName', 'employeeEmail'];
  }
}
