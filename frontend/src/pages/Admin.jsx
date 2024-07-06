import { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import "../css/admin.css";

const Admin = () => {
    const [data, setData] = useState([]);

    const fetchAll = async () => {
        try {
            const response = await fetch("https://dailynews-backend.vercel.app/api/display", {
                method: "GET",
            });

            const res_data = await response.json();
            setData(res_data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAll();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://dailynews-backend.vercel.app/api/delete/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchAll();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='admin'>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.title}</td>
                            <td>
                                <Link to={`/admin/update/${item._id}`}>
                                    <button className='edit'><FaEdit /></button>
                                </Link>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(item._id)} className='delete'><MdDelete /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='insert'> <Link to={`/upload`}>
            <IoMdAddCircle style={{ color: "black" }} />
            </Link></div>
        </div>
    );
};

export default Admin;
