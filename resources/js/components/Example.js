import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Example() {
    const [studentId, setStudentId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [students, setStudents] = useState([]);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    const fetchStudents = async () => {
        try {
            const res = await axios.get('/api/students');
            setStudents(res.data);
        } catch (e) {
            console.error('Failed to fetch students', e);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setMessage('');
        try {
            const res = await axios.post('/api/students', {
                student_id: studentId,
                first_name: firstName,
                last_name: lastName,
                middle_name: middleName || null,
            });
            setMessage('Student created');
            setStudentId('');
            setFirstName('');
            setLastName('');
            setMiddleName('');
            setStudents((prev) => [res.data.student, ...prev]);
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors || {});
            } else {
                setMessage('Error creating student');
            }
        }
    };

    return (
        <div className="container" style={{ maxWidth: 720, marginTop: 24 }}>
            <h2 style={{ marginBottom: 12 }}>Students</h2>
            {message && <div style={{ marginBottom: 8 }}>{message}</div>}
            {Object.keys(errors).length > 0 && (
                <div style={{ color: 'red', marginBottom: 8 }}>
                    {Object.entries(errors).map(([k, v]) => (
                        <div key={k}>{Array.isArray(v) ? v.join(' ') : v}</div>
                    ))}
                </div>
            )}
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8 }}>
                <input placeholder="Student ID" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
                <input placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <input placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <input placeholder="Middle Name (optional)" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
                <button type="submit">Save</button>
            </form>

            <table style={{ width: '100%', marginTop: 16, borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Student ID</th>
                        <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>First</th>
                        <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Last</th>
                        <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Middle</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((s) => (
                        <tr key={s.id}>
                            <td style={{ padding: '6px 0' }}>{s.student_id}</td>
                            <td>{s.first_name}</td>
                            <td>{s.last_name}</td>
                            <td>{s.middle_name || ''}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
