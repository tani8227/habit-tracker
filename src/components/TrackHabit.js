import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function TrackHabit() {
    const param = useParams();
    console.log(param.id);

    // fetching the habitdata from the localStorage
    const [weeklyHabit, setWeeklyHabit] = useState(() => {

        const storedHabits = localStorage.getItem('habitdata');
        if (storedHabits) {
            const parseStoredHabits = JSON.parse(storedHabits);
            if (parseStoredHabits) {
                const data = parseStoredHabits.filter((ele) => ele.key === param.id)
                return data;
            }
        } else {
            return [];
        }

    });




 // handling the weekly habit status

    function handleSubmit(e) {
        e.preventDefault();


        const day = e.target.elements['day'].value;
        const status = e.target.elements['status'].value;


        const updatedHabit = weeklyHabit.map(habit => {

            if (habit.key === param.id) {
                const updatedCount = habit.count.map(item => {
                    if (item.date == day) {
                        return { ...item, status };
                    }
                    return item;
                });


                return { ...habit, count: updatedCount };
            }
            return habit;
        });


        setWeeklyHabit(updatedHabit);


        localStorage.setItem('habitdata', JSON.stringify(updatedHabit));

        console.log("Updated habit:", updatedHabit);
    }





    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#81C784', padding: 3 }}>
                <h3 style={{ margLeft: '15px' }}>Habit Tracker</h3>
                <h3 style={{ marginRight: '15px'}} ><a href="/" style={{ textDecoration: 'none', color: 'white' }}>Go Back</a></h3>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                {weeklyHabit && weeklyHabit.length > 0 ? (
                    weeklyHabit.map((ele) => (
                        <div key={ele.key} style={{
                            backgroundColor: '#f8f9fa',
                            padding: '20px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            marginBottom: '20px',
                            width: '80%',
                            maxWidth: '600px',
                        }}>
                            <h1 style={{ color: '#333', fontSize: '24px', marginBottom: '10px' }}>Habit: {ele.habit}</h1>
                            <h2 style={{ color: '#666', fontSize: '18px', marginBottom: '20px' }}>Created Date: {ele.date}</h2>
                            <ul style={{
                                display: 'flex',
                                justifyContent: "space-between",
                                flexWrap: 'wrap',
                                gap: '10px',
                                padding: '0',
                                listStyle: 'none'
                            }}>
                                {ele.count.map((item, index) => (
                                    <li key={index} style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #ddd',
                                        padding: '15px',
                                        borderRadius: '8px',
                                        width: '100px',
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    }}>
                                        <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>{`Day ${item.date}`}</span>
                                        <span style={{ fontSize: '14px', color: '#555', marginBottom: '10px' }}>{item.status}</span>
                                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <select name="status" style={{
                                                padding: '5px',
                                                borderRadius: '4px',
                                                border: '1px solid #ccc',
                                                marginBottom: '8px',
                                                cursor: 'pointer',
                                                fontSize: '14px',
                                            }}>
                                                <option value="">Select</option>
                                                <option value="None">None</option>
                                                <option value="Done">Done</option>
                                                <option value="Not Done">Not Done</option>
                                            </select>
                                            <input type="hidden" name="day" value={item.date} />
                                            <button type="submit" style={{
                                                padding: '5px 10px',
                                                backgroundColor: '#007bff',
                                                color: '#ffffff',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontSize: '14px',
                                                fontWeight: 'bold',
                                                transition: 'background-color 0.3s ease',
                                            }}
                                                onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                                                onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                                            >
                                                Save
                                            </button>
                                        </form>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                ) : (
                    <p style={{ color: '#888', fontSize: '18px' }}>No habit found</p>
                )}
            </div>

        </>
    );

}