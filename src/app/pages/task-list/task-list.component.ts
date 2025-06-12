import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit{
  tasks: Task[] = [];
  isLoading = true;
  loading = true;

  constructor(private taskService: TaskService){

    
  }

  ngOnInit() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        setTimeout(() => { // artificial delay
        this.tasks = tasks;
        this.loading = false;
      }, 1000); // 1 second delay
      },
      error: (err) => {
        console.error('Error fetching tasks', err);
        this.isLoading = false;
      }
    });
  }

  deleteTask(id: number): void {
  const confirmed = confirm('Are you sure you want to delete this task?');

  if (confirmed) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        // Remove task from list locally after successful delete
        this.tasks = this.tasks.filter(task => task.id !== id);
        console.log(`Task ${id} deleted.`);
      },
      error: (err) => {
        console.error('Error deleting task:', err);
      }
    });
  }
}

  



}
