import { Component, OnInit } from '@angular/core';
import { Task } from './model/task';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WebsocketService } from './service/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'realtime-dashboard-client';

  tasks: Task[] = [];

  form: FormGroup = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    days: new FormControl<number>(0 , Validators.required)
  });

  constructor(private webSocketService: WebsocketService) {
  }

  ngOnInit(): void {
    this.webSocketService.listen(task => {
      this.tasks.push(task);
    });
  }

  add(): void {

    const task: Task = {
      name: this.form.get('name')?.value,
      days: this.form.get('days')?.value
    };
    this.webSocketService.send(task);
  }
 
}
