import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Task>([]);
  displayedColumns: string[] = ['id', 'title', 'completed', 'actions'];
  loading = true;

  @ViewChild('topPaginator') topPaginator!: MatPaginator;
  @ViewChild('bottomPaginator') bottomPaginator!: MatPaginator;

  constructor(
    private taskService: TaskService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        setTimeout(() => {
          this.dataSource.data = tasks;
          this.loading = false;

          // Wait for Angular to render paginators
          this.cdr.detectChanges();

          // Assign primary paginator
          this.dataSource.paginator = this.topPaginator;

          // Sync both paginators
          this.topPaginator.page.subscribe(() => {
            this.syncPaginator(this.topPaginator, this.bottomPaginator);
          });

          this.bottomPaginator.page.subscribe(() => {
            this.syncPaginator(this.bottomPaginator, this.topPaginator);
          });
        }, 1000); // Simulate loading delay
      }
    });
  }

  ngAfterViewInit(): void {
    // This ensures ViewChild is ready — handled more reliably now
    this.cdr.detectChanges();
  }

  syncPaginator(source: MatPaginator, target: MatPaginator) {
    if (!target) return;
    target.pageIndex = source.pageIndex;
    target.pageSize = source.pageSize;
    target.length = source.length;
  }


  deleteTask(id: number) {
  const confirmed = confirm('Are you sure you want to delete this task?');

  if (confirmed) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        // Update UI by removing from dataSource
        this.dataSource.data = this.dataSource.data.filter(task => task.id !== id);
      },
      error: (err) => {
        console.error('Delete failed', err);
        alert('Failed to delete task.');
      }
    });
  }
}


  



}
