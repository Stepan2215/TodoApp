import { OnChanges, TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Task } from './task';
import { TaskService } from './task.service';
import {Location} from '@angular/common'; 
import { Observable } from 'rxjs';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [TaskService]
})


export class AppComponent implements OnInit, OnChanges {
    editedTask: Task;
    tasks: Array<Task>;

    constructor(private serv: TaskService, private location: Location) {
        this.tasks = new Array<Task>();
    }

    ngOnInit() {
        this.loadTasks();
    }

    ngOnChanges() {

    }

    private loadTasks() {
        this.serv.getTasks().subscribe((data: Task[]) => {
            this.tasks = data.sort((a, b) => a.id - b.id);
        });
    }

    loadAsignedTasks(email: string) {
        this.serv.getTasksByEmail(email).subscribe((data: Task[]) => {
            this.tasks = data.sort((a, b) => a.id - b.id);
        });
    }

    addTask() {
        this.editedTask = new Task(0, "", "", "", 0);
    }

    
    saveTask() {     
        this.serv.createTask(this.editedTask).subscribe((data: Task) => {
            this.loadTasks();
        });
        this.editedTask = null;
    }

    
    cancel() {
        
        this.editedTask = null;
    }

    
    onDelete(id: number) {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }
}
