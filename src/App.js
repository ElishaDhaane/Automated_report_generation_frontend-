import React, { useState } from "react";
import Select from "react-select";
import "./App.css";

function App() {
  const vulnerabilities = [
    "Injection",
    "Broken Authentication",
    "Sensitive Data Exposure",
    "XML External Entities (XXE)",
    "Broken Access Control",
    "Security Misconfiguration",
    "Cross-Site Scripting (XSS)",
    "Insecure Deserialization",
    "Using Components with Known Vulnerabilities",
    "Insufficient Logging & Monitoring",
  ];

  const options = vulnerabilities
    .sort()
    .map((item) => ({ value: item, label: item }));

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleDownloadClick = () => {
  if (selectedOptions.length === 0) {
    alert("Please select an option");
    return;
  }

  const payload = {
    vulnerabilities: selectedOptions.map(opt => opt.label),
    format: "pdf"
  };

  // Simulate sending POST request to abc.com
  console.log("POST request to https://abc.com/generate-report", payload);

};


  return (
    <div className="app-wrapper">
      <div className="container">
        <h1>OWASP Top 10</h1>

        <div className="row-wrapper">
          <div className="dropdown-wrapper">
            <Select
              options={options}
              isMulti
              value={selectedOptions}
              onChange={setSelectedOptions}
              placeholder="Select Vulnerabilities..."
              isClearable
              isSearchable
              closeMenuOnSelect={false}
              menuPosition="fixed"
              menuPlacement="auto"
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: "#555",
                  boxShadow: "none",
                  "&:hover": { borderColor: "#1976d2" },
                  borderRadius: "8px",
                  padding: "2px",
                  minWidth: "200px",
                }),
                valueContainer: (base) => ({ ...base, overflowY: "visible" }),
                multiValue: (base) => ({ ...base, backgroundColor: "#1976d2" }),
                multiValueLabel: (base) => ({ ...base, color: "white" }),
                multiValueRemove: (base) => ({
                  ...base,
                  color: "white",
                  ":hover": { backgroundColor: "#1565c0", color: "white" },
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected
                    ? "#1976d2"
                    : state.isFocused
                    ? "#d6e4ff"
                    : null,
                  color: state.isSelected ? "white" : "#1c1c1c",
                  ":active": { backgroundColor: "#1976d2", color: "white" },
                }),
                menuList: (base) => ({ ...base, maxHeight: "200px" }),
              }}
            />
          </div>

          <button className="download-button" onClick={handleDownloadClick}>
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
