import React, { useState, useEffect } from "react";
import { nanoid } from 'nanoid';

export const Home = () => {
    // setting the habitlist in localStorage
    const [habitList, setHabitList] = useState(() => {

        const storedHabits = localStorage.getItem('habitdata');
        return storedHabits ? JSON.parse(storedHabits) : [];
    });
    
     // setting the habit of the user
    const [habit, setHabit] = useState({
        habit: '',
        date: new Date().toLocaleString(),
        key: '',
        count: Array(7).fill().map((_, i) => ({
            status: 'None',
            date: new Date().getDay() + i,
        })),
    });
// performing side effect when ever page reloads so fetching the data
    useEffect(() => {

        localStorage.setItem('habitdata', JSON.stringify(habitList));
    }, [habitList]);

// handling the habit submission
    function handleSubmit(e) {
        e.preventDefault();

        const newHabit = { ...habit, key: nanoid() };
        setHabitList((prev) => [...prev, newHabit]);


        setHabit({
            habit: '',
            date: new Date().toLocaleString(),
            key: '',
            count: Array(7).fill().map((_, i) => ({
                status: 'None',
                date: new Date().getDate() + i,
            })),
        });
    }

// keep tracking the habit 
    function handleChange(e) {
        const { name, value } = e.target;
        setHabit((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

// handling the habit deletion
    function handleDelete(id) {
        const updatedList = habitList.filter((ele) => ele.key !== id);
        setHabitList(updatedList);
    }
    
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#81C784', padding: 3 }}>
                <h3 style={{ margLeft: '15px' }}>Habit Tracker</h3>

            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap:'25px' }}>
                <h3>Add Habit Below !!!</h3>
                <div style={{
                    backgroundColor: '#f2f2f2',
                    width: "450px",
                    height: '120px',
                    borderRadius: '8px',
                    padding: '20px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <input
                            type="text"
                            name="habit"
                            placeholder="Enter habit"
                            value={habit.habit}
                            onChange={handleChange}
                            style={{
                                padding: '10px',
                                fontSize: '16px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                outline: 'none',
                                width: '100%',
                                boxSizing: 'border-box',
                                backgroundColor: '#ffffff',
                            }}
                        />
                        <button
                            type="submit"
                            style={{
                                padding: '10px',
                                backgroundColor: '#007bff',
                                color: '#ffffff',
                                fontWeight: 'bold',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease',
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                        >
                            Add
                        </button>
                    </form>
                </div>


                <div style={{ display: 'flex', flexDirection:'column', width: '99%', gap:3 , padding:2 }}>
                    {habitList.length > 0 && habitList.map((ele, index) => (
                        <div key={ele.key} style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor:'lightgrey' }}>
                          
                            <h3>{index+1}</h3>
                            <h3>{ele.habit}</h3>
                            <h3>{ele.date}</h3>

                            <button>
                                {`${Array.isArray(ele.count)
                                    ? ele.count.reduce((acc, item) => item.status !== 'None' ? acc + 1 : acc, 0)
                                    : 0}/7`}
                            </button>
                            <button style={{ maxHeight: '50px', marginRight: '15px' }}><a href={`/trackHabit/${ele.key}`} style={{ textDecoration: 'none', color: 'black' }}>Track Weekly</a></button>
                            <button onClick={() => handleDelete(ele.key)}>Delete Habit</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
