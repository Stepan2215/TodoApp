import _ from 'lodash';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import differenceInHours from 'date-fns/differenceInHours';


@Component({
  selector: 'tr[app-task]',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  taskDetails: Task;

  constructor(private serv: TaskService) { }

  ngOnInit(): void {
    this.loadDetails();
  }

  private loadDetails() {
    this.task.dueDate
    this.serv.getTask(this.task.id).subscribe((data: Task) => {
      this.taskDetails = data;
    });
    
  }

  asignTaskTo(email: string) {
    this.taskDetails.email = email;
    this.serv.updateTask(this.taskDetails).subscribe(data => {

    });
  }

  isPastDueDate() {
    return this.taskDetails && (new Date(this.taskDetails.dueDate) < new Date());
  }

  getProperties() {
    const properties = [];

    const hoursLeft = differenceInHours(new Date(this.taskDetails.dueDate), new Date());

    if (hoursLeft >= 12 && !this.taskDetails.isDone) properties.push('moreThan12')

    if (hoursLeft < 12 && !this.taskDetails.isDone && !this.isPastDueDate()) properties.push('lessThan12')

    if (this.isPastDueDate()) properties.push('past')

    if (this.taskDetails.isDone) properties.push('done')

    return properties;
  }

  completeTask() {
    this.taskDetails.isDone = true;
    this.serv.updateTask(this.taskDetails).subscribe(data => {

    });
  }

  deleteTask() {
    this.serv.deleteTask(this.task.id).subscribe(data => {
      this.onDelete.emit(this.task.id)
    });
  }
}
