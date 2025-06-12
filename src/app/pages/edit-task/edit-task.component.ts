import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {
  taskForm!: FormGroup;
  taskId!: number;
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get ID from route
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));

    // Set Up form
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      completed: [false]
    });

    // Fetch task data and pre-fill form
    this.taskService.getTaskById(this.taskId).subscribe({
      next: (task) => {
        //Filling form
        this.taskForm.patchValue({
          title: task.title,
          completed: task.completed
        });
      },
      error: (err) => console.error('Error loading task:', err)
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid)
       return;

    const updatedTask: Task = {
      ...this.taskForm.value,
      id: this.taskId
    };

    this.isSubmitting = true;

    //Update the task
    this.taskService.updateTask(updatedTask).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        console.error('Error updating task:', err);
        this.isSubmitting = false;
      }
    });
  }

}
