import React, { useState } from "react"; 
import Select from "react-select";
import "./App.css";

function App() {
  const vulnerabilities = [
    "Cryptographic Failures",
    "Broken Access Control",
    "Injection",
    "Insecure Design",
    "Security Misconfiguration",
    "Vulnerable and Outdated Components",
    "Identification and Authentication Failures",
    "Software and Data Integrity Failures",
    "Security Logging and Monitoring Failures",
    "Server-Side Request Forgery (SSRF)"
  ];

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const options = vulnerabilities
    .sort()
    .map((item) => ({ value: item, label: item }));

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false); // ✅ Loading state

  const handleDownloadClick = async () => {
    if (selectedOptions.length === 0) {
      alert("Please select an option");
      return;
    }

    const payload = {
      vulnerabilities: selectedOptions.map(opt => opt.label),
    };

    try {
      setIsDownloading(true); // ✅ Start loading

      const response = await fetch(`${BACKEND_URL}/generate-report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to generate report");

      const data = await response.json();
      if (data.status !== "success") throw new Error(data.message || "Report generation failed");

      const fileUrl = `${BACKEND_URL}${data.file_url}`;

      // ✅ Trigger download
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = fileUrl.split("/").pop();
      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (err) {
      console.error(err);
      alert("Error generating or downloading report: " + err.message);
    } finally {
      setIsDownloading(false); // ✅ Stop loading
    }
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

          <button
            className="download-button"
            onClick={handleDownloadClick}
            disabled={isDownloading} // ✅ Disable while downloading
          >
            {isDownloading ? (
              <span className="spinner"></span> // ✅ Show spinner animation
            ) : (
              "Download"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
