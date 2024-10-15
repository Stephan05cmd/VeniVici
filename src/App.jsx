import React, { useEffect, useState } from 'react';
import './App.css'; 

const App = () => {
    const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY; 

    const [dogImage, setDogImage] = useState('');
    const [dogHistory, setDogHistory] = useState([]); 
    const [error, setError] = useState(null);

    const fetchDogData = async () => {
        try {
            const response = await fetch(`https://api.thedogapi.com/v1/images/search?api_key=${ACCESS_KEY}`);
            const data = await response.json();
            if (data.length > 0) {
                setDogImage(data[0].url);
                setDogHistory((prevHistory) => [...prevHistory, data[0].url]);
                setError(null); 
            }
        } catch (error) {
            console.error('Error fetching the dog data:', error);
            setError('Error fetching dog data');
        }
    };

    useEffect(() => {
        fetchDogData();
    }, []);

    return (
        <div className="Entire-Page">
            <h1>Dog Discovery</h1>
            <button onClick={fetchDogData}>IT'S DOGGY TIME 🐾🐶</button>
            {error && <p>{error}</p>}
            {dogImage && <img src={dogImage} alt="A cute dog" />}
            <h2>Seen Dog Images:</h2>
            <div className="dog-history">
                {dogHistory.map((image, index) => (
                    <img key={index} src={image} alt={`Seen dog ${index + 1}`} className="dog-thumbnail" />
                ))}
            </div>
        </div>
    );
};

export default App;
