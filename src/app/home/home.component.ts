import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from "@angular/platform-browser";
import { ServicesService } from '../services/shared-services.service';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  employees = [];
  employeeDialog : boolean;
  projectDialog : boolean;
  submitted : boolean;
  dataSource : any;
  projectDataSource : any;
  editing = false;
  projectEditing = false;
  employeeName ='';
  employeeEmail ='';
  employeeId ='';
  projectName ='';
  projectId ='';
  selectedProject:any;
  pDisplayedColumns = [
    //{ field: 'employeeId', header: 'ID' },
    { field: 'employeeName', header: 'Name' },
    { field: 'employeeEmail', header: 'Email' }
  ];
  
  projectDisplayedColumns = [
    //{ field: 'projectId', header: 'ID' },
    { field: 'projectName', header: 'Name' }
  ];
  projectEmployees =[];

  constructor(private router: Router, private sharedService: ServicesService, private titleService: Title,
    private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.titleService.setTitle("home");
  }

  ngOnInit(): void {
    this.getEmployees();
    this.getProjects();
  }

  getEmployees() {
    this.dataSource = [];
    this.employees =[];
    this.sharedService.getEmployees().subscribe(res => {
      Object.keys(res).map(r => {
        this.employees[r] = {
          employeeId: res[r].employeeID,
          employeeName: res[r].employeeName,
          employeeEmail: res[r].employeeEmail
        }
      })
      this.dataSource = this.employees; //new MatTableDataSource(this.employees);
    })
  };

  addEditEmployee() {
    let body: any =
    {
      EmployeeName : this.employeeName,
      EmployeeEmail : this.employeeEmail
    };

    if(this.editing){
    this.sharedService.editEmployee(this.employeeId,body).subscribe((res: any) => {
      this.getEmployees();
      this.hideDialog();
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Employee data updated successfully', life: 3000});
    },
      error => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Something went wrong', life: 3000});
      });
    }
    else{
    this.sharedService.addEmployee(body).subscribe((res: any) => {
      this.getEmployees();
      this.hideDialog();
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Employee created successfully', life: 3000});
    },
      error => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Something went wrong', life: 3000});
      });
    }
  }

  editEmployee(row:any){
    this.employeeName = row.employeeName;
    this.employeeEmail = row.employeeEmail;
    this.employeeId = row.employeeId;
    this.editing = true;
    this.employeeDialog = true;
  }

  removeEmployee(row:any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected user?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.sharedService.removeEmployee(row.employeeId).subscribe((res: any) => {
          this.getEmployees();
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Deleted', life: 3000});
        },
          error => {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Something went wrong', life: 3000});
          });
      }
  });

  }

  getProjects() {
    this.projectDataSource = [];
    this.sharedService.getProjects().subscribe(res => {
      Object.keys(res).map(r => {
        this.projectDataSource[r] = {
          projectId: res[r].projectID,
          projectName: res[r].projectName
        }
      })
    })
  };

  addEditProject() {
    let body: any =
    {
      ProjectName : this.projectName
    };

    if(this.projectEditing){
    this.sharedService.editProject(this.projectId,body).subscribe((res: any) => {
      this.getProjects();
      this.hideProjectDialog();
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Project data updated successfully', life: 3000});
    },
      error => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Something went wrong', life: 3000});
      });
    }
    else{
    this.sharedService.addProject(body).subscribe((res: any) => {
      this.getProjects();
      this.hideProjectDialog();
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Project created successfully', life: 3000});
    },
      error => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Something went wrong', life: 3000});
      });
    }
  }

  editProject(row:any){
    this.projectName = row.projectName;
    this.projectId = row.projectId;
    this.projectEditing = true;
    this.projectDialog = true;
  }

  removeProject(row:any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected user?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.sharedService.removeProject(row.projectId).subscribe((res: any) => {
          this.getProjects();
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Project Deleted', life: 3000});
        },
          error => {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Something went wrong', life: 3000});
          });
      }
  });

  }
  openNew(){
    this.editing = false;
    this.employeeId = '';
    this.employeeName = '';
    this.employeeEmail = '';
    this.employeeDialog = true;
    this.submitted = false;
  }

  hideDialog() {
    this.editing = false;
    this.employeeId = '';
    this.employeeName = '';
    this.employeeEmail = '';
    this.employeeDialog = false;
    this.submitted = false;
  }

  hideProjectDialog() {
    this.projectEditing = false;
    this.projectId = '';
    this.projectName = '';
    this.projectDialog = false;
  }

  openNewProject(){
    this.projectEditing = false;
    this.projectId = '';
    this.projectName = '';
    this.projectDialog = true;
  }

  getProjectEmployees(){
    console.log("selected ", this.selectedProject)
    this.projectEmployees = [];
    this.sharedService.getProjectEmployees(this.selectedProject.projectId).subscribe(res => {
      console.log("res",res)
      //Object.keys(res).map(r => {
      //  this.projectEmployees[r] = {
      //    projectId: res[r].projectID,
      //    projectName: res[r].projectName
      //  }
      //})
    })
  }
}