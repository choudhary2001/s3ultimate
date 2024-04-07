import React, { useState } from "react";

const CountrySelection = ({ onCountrySelect }) => {
    const [selectedCountry, setSelectedCountry] = useState("");

    const handleCountrySelection = () => {
        // Implement logic to handle country selection
        // For demonstration, assume a country is selected
        if (selectedCountry) {
            onCountrySelect(); // Call the parent component's onCountrySelect callback
        } else {
            alert("Please select a country");
        }
    };

    return (
        <div>
            <h2>Country Selection</h2>
            <div>
                <label>Select Country:</label>
                <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                >
                    <option value="">Select Country</option>
                    {/* Add your country options here */}
                    <option value="us">United States</option>
                    <option value="in">India</option>
                    {/* ... */}
                </select>
            </div>
            <button onClick={handleCountrySelection}>Continue</button>
        </div>
    );
};

export default CountrySelection;
