import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Task } from './task';
import { tokenReference } from '@angular/compiler';
import { Token } from '@angular/compiler/src/ml_parser/lexer';

@Injectable()
export class TaskService {
    constructor(private http: HttpClient) { 
        
    }

    private url = "https://localhost:5001/api/Todo"; 

    async getToken() { 
    
        if (localStorage.token == null || localStorage.token == '') {
            const headers = new HttpHeaders().set("Content-Type", "application/json")
        .set("accept", "*/*");
            const t = await this.http.post<any>("https://localhost:5001/api/AuthManagement/Login", { headers, email: "admin@gmail.com", password: "Password@1" }).toPromise();
    
            localStorage.token = "Bearer " + t.token;     
            return t.token;
        }
        else 
        {
            return localStorage.token;
        }
    }

    getTasks() {
        this.getToken();
        console.log("localStorage.token " + localStorage.token);
        const headers = new HttpHeaders().set("Authorization", localStorage.token);
        return this.http.get("https://localhost:5001/api/Todo", { headers });
    }

    getTasksByEmail(email: string) {
        this.getToken();
        const headers = new HttpHeaders().set("Authorization", localStorage.token);
        headers.set("Content-Type", "application/json");
        let params = new HttpParams().set("email", email);
        return this.http.get("https://localhost:5001/api/Todo/GetTasksByEmail", { headers, params });
    }
    

    getTask(id: number) {
        this.getToken();
        const headers = new HttpHeaders().set("Authorization", localStorage.token);
        return this.http.get(this.url + '/' + id, { headers }); 
    }

    createTask(task: Task) {
        this.getToken();
        const headers = new HttpHeaders().set("Authorization", localStorage.token)
        .set("Content-Type", "application/json");
        return this.http.post(this.url + "/Create", JSON.stringify(task), { headers });
    }
    updateTask(task: Task) {
        this.getToken();
        const headers = new HttpHeaders().set("Authorization", localStorage.token)
        .set("Content-Type", "application/json");
        return this.http.put(this.url + '/' + task.id, JSON.stringify(task), { headers });
    }
    deleteTask(id: number) {
        this.getToken();
        const headers = new HttpHeaders().set("Authorization", localStorage.token);
        return this.http.delete(this.url + '/' + id, { headers });
    }
}