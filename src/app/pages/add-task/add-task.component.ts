import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  taskForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder, //FormGroup is a Form, Form control are the fields
    private taskService: TaskService,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      completed: [false]
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid)
       return;

    this.isSubmitting = true;

    this.taskService.addTask(this.taskForm.value).subscribe({
      next: (newTask) => { //next is the response from the server
        console.log('Task created:', newTask);
        this.router.navigate(['/']); // Redirect to task list
      },
      error: (err) => {
        console.error('Error adding task:', err);
        this.isSubmitting = false;
      }
    });
  }

}
