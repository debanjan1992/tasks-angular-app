import { Routes } from '@angular/router';
import { AllTasksPageComponent } from './pages/all-tasks-page/all-tasks-page.component';

export const routes: Routes = [
    {
        path: "",
        component: AllTasksPageComponent,
        pathMatch: "full"
    },
    {
        path: "starred",
        loadComponent: () => import("./pages/starred-tasks-page/starred-tasks-page.component").then(c => c.StarredTasksPageComponent)
    },
    {
        path: "my-day",
        loadComponent: () => import("./pages/my-day/my-day.component").then(c => c.MyDayComponent),
    }
];
