import { useEffect, useState } from "react";
import "./App.css";

const PAGE_SIZE = 10;
const API = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

export default function EmployeeTable() {
    const [employees, setEmployees] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch(API)
            .then((res) => {
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then(setEmployees)
            .catch(() => alert("failed to fetch data"));
    }, []);

    const totalPages = Math.ceil(employees.length / PAGE_SIZE) || 1;
    const rows = employees.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const handlePrev = () => {
        if (page > 1) setPage((p) => p - 1);
    };

    const handleNext = () => {
        if (page < totalPages) setPage((p) => p + 1);
    };

    return (
        <div className="container">
            <h2>Employee Data Table</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody>
                {rows.map((emp) => (
                    <tr key={emp.id}>
                        <td>{emp.id}</td>
                        <td>{emp.name}</td>
                        <td>{emp.email}</td>
                        <td>{emp.role}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={handlePrev} disabled={page === 1}>
                    Previous
                </button>
                <span className="page-number">{page}</span>
                <button onClick={handleNext} disabled={page === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}