import React, { useState } from 'react';

const ImportData = ({ data, updateall, display }) => {
  const [selectedFileType, setSelectedFileType] = useState(null);

  const readCsvFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // Set up the onload event handler
      reader.onload = (event) => {
        // Resolve with the file content as a string
        resolve(event.target.result);
      };

      // Set up the onerror event handler
      reader.onerror = (error) => {
        // Reject with the error
        reject(error);
      };

      // Read the file as text
      reader.readAsText(file);
    });
  };


  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      if (selectedFileType === 'txt') {
        try {
          const fileContents = await readTextFile(selectedFile);
          const emailsArray = fileContents.split('\n').map(email => email.trim()).filter(email => email !== '');

          // Assuming data is an array of categories as described in the previous conversation
          const storedData = JSON.parse(localStorage.getItem('data')) || [];

          // Replace 'yourCategoryTitle' with the selected category title
          const selectedCategoryData = storedData.find(category => category.title === data.title);

          if (selectedCategoryData) {
            // Filter out duplicate emails
            const uniqueEmailsArray = [...new Set(emailsArray)];

            // Check if email already exists in the category
            const existingEmails = selectedCategoryData.data.map(item => item.email);
            const newEmails = uniqueEmailsArray.filter(email => !existingEmails.includes(email));
            console.log(newEmails)
            const updatedData = newEmails.map(email => ({
              email,
              firstName: '',
              lastName: '',
              phone: '',
              address: '',
              city: '',
              company: '',
              website: '',
              fax: '',
              subscribedOn: '',
              birthday: '',
              facebook: '',
              yahoo: '',
              skype: '',
              msn: '',
              note: '',
              status: null
            }));

            selectedCategoryData.data = [...selectedCategoryData.data, ...updatedData];

            // Update local storage with the modified data
            localStorage.setItem('data', JSON.stringify(storedData));
          }
          updateall();
          // Handle other logic or state updates as needed
        } catch (error) {
          console.error('Error reading file:', error);
        }
      }


      if (selectedFileType === 'csv') {
        try {
          const fileContents = await readCsvFile(selectedFile);
          const lines = fileContents.split('\n');

          if (lines.length > 1) {
            // Extract headers from the first line
            const headers = lines[0].split(',');
            // Extract data rows
            const dataRows = lines.slice(1);

            // Parse each data row
            const parsedData = dataRows.map((row) => {
              const values = row.split(',');

              // Ensure the row has the expected number of columns
              if (values.length !== headers.length) {
                throw new Error('Number of columns does not match the header');
              }

              // Ensure each value is defined before calling trim()
              const rowData = {
                email: values[0] ? values[0].trim() : '', // Assuming email is the first column
                firstName: values[1] ? values[1].trim() : '', // Assuming firstName is the second column
                lastName: values[2] ? values[2].trim() : '', // Assuming lastName is the third column
                phone: values[3] ? values[3].trim() : '',
                address: values[4] ? values[4].trim() : '',
                city: values[5] ? values[5].trim() : '',
                company: values[6] ? values[6].trim() : '',
                website: values[7] ? values[7].trim() : '',
                fax: values[8] ? values[8].trim() : '',
                subscribedOn: values[9] ? values[9].trim() : '',
                birthday: values[10] ? values[10].trim() : '',
                facebook: values[11] ? values[11].trim() : '',
                yahoo: values[12] ? values[12].trim() : '',
                skype: values[13] ? values[13].trim() : '',
                msn: values[14] ? values[14].trim() : '',
                note: values[15] ? values[15].trim() : '',
                status: null // Assuming you want to set status as null for each imported entry
              };
              return rowData;
            });

            // Remove duplicates from parsedData
            const uniqueData = [];
            const emailSet = new Set();
            parsedData.forEach((rowData) => {
              if (!emailSet.has(rowData.email)) {
                uniqueData.push(rowData);
                emailSet.add(rowData.email);
              }
            });

            // Assuming data is an array of categories as described in the previous conversation
            const storedData = JSON.parse(localStorage.getItem('data')) || [];
            const selectedCategoryData = storedData.find(category => category.title === data.title);

            if (selectedCategoryData) {
              selectedCategoryData.data = [...selectedCategoryData.data, ...uniqueData];

              // Update local storage with the modified data
              localStorage.setItem('data', JSON.stringify(storedData));
            }

            updateall();
          }
        } catch (error) {
          console.error('Error reading file:', error);
        }
      }



    }

  };

  const readTextFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  const handleFileTypeChange = (fileType) => {
    setSelectedFileType(fileType);
  };

  return (
    <div>
      <div
        className={
          "w-screen h-screen  fixed z-10 flex justify-center items-center  bg-[#0c0d0c7a]"
        }
      >
        <div className="w-[300px] h-[auto] bg-slate-100 rounded-lg overflow-hidden">
          <div className="cntrl w-full bg-[rgb(0 0 204 / var(--tw-bg-opacity))] h-8 px-2 flex justify-between items-center pr-3">
            <div>Import data</div>
            <div onClick={display} className='cursor-pointer '>X</div>
          </div>
          <div className="p-2 text-red-700">Select file type to import</div>
          <div className="pl-4">
            <div className="flex h-8 items-center  gap-4 pl-4 mb-2">
              <input
                type="radio"
                name="fileType"
                id="csv"
                className="w-4 h-4"
                onChange={() => handleFileTypeChange('csv')}
              />
              Import from csv
            </div>
            <div className="flex h-8 items-center gap-4 pl-4 mb-2">
              <input
                type="radio"
                name="fileType"
                id="txt"
                className="w-4 h-4"
                onChange={() => handleFileTypeChange('txt')}
              />
              Import from txt
            </div>
          </div>
          {selectedFileType && (
            <div className="pl-4 mt-2">
              <input type="file" accept={`.${selectedFileType}`} onChange={handleFileChange} />
            </div>
          )}
          <div className="w-[315px] h-[42px] bg-[rgb(0 0 204 / var(--tw-bg-opacity))] flex border-2 justify-evenly items-center mt-20 gap-2 ml-[-5px]">
            <div className="bg-yellow-500 px-4 cursor-pointer mb-1 rounded" onClick={display}>
              Close
            </div>
            <div className="bg-yellow-500 px-4 cursor-pointer mb-1 rounded" onClick={display}>OK</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportData;
