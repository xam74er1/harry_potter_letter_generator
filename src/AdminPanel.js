import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import "./AdminPanel.css";

const letterTypes = ["claude", "mistral"];

// LocalStorage key for persisting form data
const STORAGE_KEY = "hogwarts_admin_form";

function AdminPanel() {
  const [form, setForm] = useState(() => {
    // Initialize state with localStorage data if available, otherwise use defaults
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error("Error loading saved data:", error);
      }
    }
    
    // Default values if no saved data
    return {
      firstName: "Harry",
      lastName: "Potter",
      signature: "Minerva McGonagall",
      address: "Hogwarts School of Witchcraft and Wizardry\nHogsmeade, Scotland",
      logoUrl: "",
      logoSize: "100",
      type: "mistral",
      content: `# Welcome, $fname $lname!\n\nWe are pleased to inform you that you have been accepted at Hogwarts School of Witchcraft and Wizardry.\n\nPlease find enclosed a list of all necessary books and equipment.\n\nYours sincerely,\n\n$signature`,
    };
  });

  const navigate = useNavigate();

  // Save to localStorage whenever form changes (but skip initial render)
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (value) => {
    setForm((prev) => ({ ...prev, content: value || "" }));
  };

  const replacePlaceholders = (text) => {
    return text
      .replace(/\$fname/g, form.firstName)
      .replace(/\$lname/g, form.lastName)
      .replace(/\$signature/g, form.signature)
      .replace(/\$address/g, form.address)
      .replace(/\$logo/g, form.logoUrl ? `<img src="${form.logoUrl}" alt="Logo" style="max-width: ${form.logoSize}px; height: auto;" />` : "");
  };

  // Custom components for MDEditor to show replaced variables in preview
  const customComponents = {
    preview: (source, state, dispatch) => {
      const processedSource = replacePlaceholders(source);
      return <MDEditor.Markdown source={processedSource} />;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const processedForm = {
      ...form,
      content: replacePlaceholders(form.content),
    };

    const query = new URLSearchParams(processedForm).toString();
    navigate(`/${form.type}?${query}`);
  };

  const clearStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
    // Reset to default values
    setForm({
      firstName: "Harry",
      lastName: "Potter",
      signature: "Minerva McGonagall",
      address: "Hogwarts School of Witchcraft and Wizardry\nHogsmeade, Scotland",
      logoUrl: "",
      logoSize: "100",
      type: "mistral",
      content: `# Welcome, $fname $lname!\n\nWe are pleased to inform you that you have been accepted at Hogwarts School of Witchcraft and Wizardry.\n\nPlease find enclosed a list of all necessary books and equipment.\n\nYours sincerely,\n\n$signature`,
    });
  };

  return (
    <div className="admin-bg">
      <div className="admin-panel" data-color-mode="light">
        <h1 className="admin-title">Hogwarts Letter Generator</h1>
        <p className="admin-desc">
          Create a magical Hogwarts letter with your own message and generate a shareable URL.
        </p>
        <p className="admin-desc">
          You can use <code>$fname</code> for First Name, <code>$lname</code> for Last Name, <code>$signature</code> for the signature, <code>$address</code> for the address, and <code>$logo</code> for the logo.
          These will be automatically replaced when the letter is generated and in the preview below.
        </p>

        <form onSubmit={handleSubmit} className="admin-form">
          <label>First Name</label>
          <input type="text" name="firstName" value={form.firstName} onChange={handleChange} />

          <label>Last Name</label>
          <input type="text" name="lastName" value={form.lastName} onChange={handleChange} />

          <label>Signature</label>
          <input type="text" name="signature" value={form.signature} onChange={handleChange} />

          <label>Address</label>
          <textarea 
            name="address" 
            value={form.address} 
            onChange={handleChange}
            rows="3"
            placeholder="Enter the address (use line breaks for multiple lines)"
          />

          <label>Logo URL</label>
          <input 
            type="url" 
            name="logoUrl" 
            value={form.logoUrl} 
            onChange={handleChange}
            placeholder="https://example.com/logo.png"
          />

          <label>Logo Size (pixels)</label>
          <input 
            type="number" 
            name="logoSize" 
            value={form.logoSize} 
            onChange={handleChange}
            min="10"
            max="500"
            placeholder="100"
          />

          <label>Letter Type</label>
          <select name="type" value={form.type} onChange={handleChange}>
            {letterTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <label>Letter Content</label>
          <div className="editor-container">
            <MDEditor
              value={form.content}
              onChange={handleEditorChange}
              height={200}
              components={customComponents}
            />
          </div>

          <div className="button-container">
            <button type="submit">Generate Magical URL</button>
          </div>
        </form>

        <div className="storage-info">
          <small>💾 Your changes are automatically saved and will be restored when you return to this page.</small>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;