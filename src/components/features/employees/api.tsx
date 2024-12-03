import { faker } from "@faker-js/faker";
import { Employee } from "./types";

export const generateFakeEmployees = (count: number): Employee[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: faker.person.fullName(),
    nationalNumber: faker.string.numeric(10),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(["Admin", "Manager", "Staff"]),
  }));
};

export const fetchEmployees = async (): Promise<Employee[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
  return generateFakeEmployees(50);
};

export const deleteEmployee = async (id: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
  console.log(`Employee with id ${id} deleted`);
};

export const updateEmployee = async (employee: Employee): Promise<Employee> => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
  return employee;
};

export const addEmployee = async (
  employee: Omit<Employee, "id">
): Promise<Employee> => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
  return { ...employee, id: faker.number.int({ min: 1000, max: 9999 }) };
};
