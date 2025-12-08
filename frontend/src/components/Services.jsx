import { useState } from "react";
import "../Styles/services.css"; 

export default function ImageUpload() {
    const [file, setFile] = useState(null);
    const [prediction, setPrediction] = useState("");

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!file) {
            alert("Please select an image first!");
            return;
        }

        const form = new FormData();
        form.append("image", file);

        try {
            const res = await fetch("http://127.0.0.1:8000/api/predict/", {
                method: "POST",
                body: form,
            });

            const data = await res.json();
            setPrediction(data.prediction);
        } catch (err) {
            console.error("Error uploading image:", err);
            alert("Failed to get prediction. Try again.");
        }
    };

    return (
        <div className="upload-container">
            <h2 className="upload-title">Upload Image for Prediction</h2>
            <form className="upload-form" onSubmit={handleUpload}>
                <input
                    type="file"
                    className="file-input"
                    onChange={(e) => setFile(e.target.files[0])}
                    accept="image/*"
                />
                <button type="submit" className="predict-btn">Predict</button>
            </form>

            {prediction && <h3 className="prediction-result">Result: {prediction}</h3>}
        </div>
    );
}
