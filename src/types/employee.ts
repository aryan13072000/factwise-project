export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  hireDate: string;
  age: number;
  location: string;
  performanceRating: number;
  projectsCompleted: number;
  isActive: boolean;
  skills: string[];
  manager: string | null;
}

export interface KPIStats {
  total: number;
  active: number;
  avgSalary: number;
  avgPerf: string;
}

export type NewEmployeePayload = Omit<Employee, "id"> & { id: number | null };
