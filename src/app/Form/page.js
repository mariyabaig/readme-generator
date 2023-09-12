"use client";
import { useState } from "react";

import MDEditor from "@uiw/react-md-editor";

const page = () => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    work: [
      { projectName: "", projectLink: "" },
      { projectName: "", projectLink: "" },
      { projectName: "", projectLink: "" },
    ],
    frameworks: "",
    contactEmail: "",
    portfolioLink: "",
    aboutMe: "",
    resumeLink: "",
    funnyStatement: "",
  });
  const [showMarkdownEditor, setShowMarkdownEditor] = useState(false);

  const [markdownContent, setMarkdownContent] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("work")) {
      const [field, index, property] = name.split("-");
      const updatedWork = [...formData.work];
      updatedWork[index][property] = value;
      setFormData({
        ...formData,
        work: updatedWork,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    // Handle file upload, you can use FormData or any other method to manage the file.
  };

  const generateMarkdown = () => {
    let markdown = `# ${formData.title}\n\n`;
    markdown += `## ${formData.subtitle}\n\n`;

    markdown += "### Work\n";
    formData.work.forEach((workItem, index) => {
      if (workItem.projectName && workItem.projectLink) {
        markdown += `- **Project Name ${index + 1}:** ${
          workItem.projectName
        }\n`;
        markdown += `  - **Project Link:** ${workItem.projectLink}\n`;
      }
    });

    if (formData.frameworks) {
      markdown += `### Frameworks, courses etc.\n${formData.frameworks}\n\n`;
    }

    if (formData.contactEmail) {
      markdown += `### Got something to say? Contact me at\n${formData.contactEmail}\n\n`;
    }

    if (formData.portfolioLink) {
      markdown += `### Portfolio Link\n[${formData.portfolioLink}](${formData.portfolioLink})\n\n`;
    }

    if (formData.aboutMe) {
      markdown += `### About Me\n${formData.aboutMe}\n\n`;
    }

    if (formData.resumeLink) {
      markdown += `### Resume Link\n[${formData.resumeLink}](${formData.resumeLink})\n\n`;
    }
    if (formData.contributorName && formData.contributorGitHub) {
      markdown += `## Contributors\n\n- [${formData.contributorName}](${formData.contributorGitHub})\n\n`;
    }
    if (formData.funnyStatement) {
      markdown += `### Funny Statement\n${formData.funnyStatement}\n\n`;
    }

    // New fields
    if (formData.projectTitle) {
      markdown += `### Project's Title\n${formData.projectTitle}\n\n`;
    }

    if (formData.projectDescription) {
      markdown += `### Project Description\n${formData.projectDescription}\n\n`;
    }

    if (formData.tableOfContents) {
      markdown += `### Table of Contents (Optional)\n${formData.tableOfContents}\n\n`;
    }

    if (formData.installInstructions) {
      markdown += "### How to Install and Run the Project\n\n";
      markdown += "```shell\n"; // Opening code block for shell/command-line
      markdown += formData.installInstructions + "\n";
      markdown += "```\n\n"; // Closing code block
    }

    if (formData.howToUse) {
      markdown += `### How to Use the Project\n${formData.howToUse}\n\n`;
    }

    if (formData.credits) {
      markdown += `### Include Credits\n${formData.credits}\n\n`;
    }
    if (formData.contributers) {
      markdown += `### Include Contributers\n${formData.contributer}\n\n`;
    }
    if (formData.liveProjectLink) {
      markdown += `### Live Project Link\n[${formData.liveProjectLink}](${formData.liveProjectLink})\n\n`;
    }

    return markdown;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const generatedMarkdown = generateMarkdown();
    setMarkdownContent(generatedMarkdown);
    console.log(generatedMarkdown);
  };

  const [formFields, setFormFields] = useState([
    { id: 'projectTitle', label: 'Project Title', isMultiLine: false },
    { id: 'projectDescription', label: 'Project Description', isMultiLine: true },
    { id: 'tableOfContents', label: 'Table of Contents', isMultiLine: true },
    { id: 'installInstructions', label: 'How to Install and Run the Project', isMultiLine: true },
    { id: 'howToUse', label: 'How to Use the Project', isMultiLine: true },
    { id: 'credits', label: 'Include Credits', isMultiLine: true },
    { id: 'liveProjectLink', label: 'Live Project Link', isMultiLine: false },
    { id: 'imageUpload', label: 'Upload Image', isMultiLine: false },
    { id: 'contributorName', label: 'Contributor Name', isMultiLine: false },
    { id: 'contributorGitHub', label: 'Contributor GitHub Profile', isMultiLine: false },
  ]);

  const toggleField = (fieldId) => {
    const updatedFields = formFields.map((field) => {
      if (field.id === fieldId) {
        return {
          ...field,
          isOpen: !field.isOpen,
        };
      }
      return field;
    });
    setFormFields(updatedFields);
  };

  const toggleMarkdownEditor = () => {
    setShowMarkdownEditor(!showMarkdownEditor);
  };

  const renderFormFields = () => {
    return formFields.map((field) => (
      <div key={field.id} className="mb-4">
        <div className="flex items-center justify-between">
          <label
            htmlFor={field.id}
            className="text-xl font-medium text-gray-700 cursor-pointer"
            onClick={() => toggleField(field.id)}
          >
            {field.label}
            {field.isOpen ? (
              <span className="ml-2 text-green-500">-</span>
            ) : (
              <span className="ml-2 text-blue-500">+</span>
            )}
          </label>
          {/* {field.isOpen && (
            <button
              onClick={() => toggleField(field.id)}
              className="text-red-500"
            >
            -
            </button>
          )} */}
        </div>
        {field.isOpen && (
          field.isMultiLine ? (
            <textarea
              id={field.id}
              name={field.id}
              value={formData[field.id]}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full h-40 focus:outline-none focus:border-blue-500"
              rows="6"
            />
          ) : (
            <input
              type="text"
              id={field.id}
              name={field.id}
              value={formData[field.id]}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
            />
          )
        )}
      </div>
    ));
  };

  const renderMarkdownEditor = () => {
    if (showMarkdownEditor) {
      return (
        <div>
          <MDEditor value={markdownContent} onChange={setMarkdownContent} />
        </div>
      );
    }
    return null;
  };

  const renderMarkdownPreview = () => {
    if (showMarkdownEditor) {
      return (
        <div>
          <MDEditor.Markdown
            source={generateMarkdown}
            style={{ whiteSpace: "pre-wrap" }}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 flex ">
      <div className="text-center bg-red-400 mx-12">
        <form onSubmit={handleSubmit}>
          {renderFormFields()}
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>

      <button
        onClick={toggleMarkdownEditor}
        className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        {showMarkdownEditor
          ? "Hide Markdown and Preview"
          : "Show Markdown and Preview"}
      </button>

   
      {renderMarkdownEditor()}
      {renderMarkdownPreview()}
    </div>
  );
};

export default page;
