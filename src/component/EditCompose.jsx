import { useState, useEffect, useRef } from "react";
// import QuillEditor from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import ReactQuill from 'react-quill';
// import 'quill-image-drop-module';
// import Quill from 'quill';


import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


let ipcRenderer;
if (window.require) {
    const electron = window.require("electron");
    ipcRenderer = electron.ipcRenderer;
}

const EditCompose = ({ display, updateall, data }) => {
    console.log(data)
    const imageUploader = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                const imageUrl = e.target.result;
                insertImage(imageUrl); // Call function to insert image
            };
        };
        input.click();
    };


    const insertImage = (imageUrl) => {
        const quill = this.quillInstance; // Assuming you have a reference to the Quill editor instance
        quill.insertEmbed(quill.getSelection().index, 'image', imageUrl, Quill.sources.USER);
    };

    const BASE_API_URL = "https://brahmastra.site/";
    const loginUrl = `${BASE_API_URL}accounts/login/`;
    const verifyUrl = `${BASE_API_URL}two_step`;
    const verifyRefreshTokenUrl = `${BASE_API_URL}verify-refresh-token/`;
    const countriesApiUrl = "https://restcountries.com/v2/all"; // Use a proper countries API

    const [rotateCheckbox, setRotateCheckbox] = useState(data ? data.rotateCheckbox : false);
    const [editorvalue, setEditorValue] = useState(data ? data.editorvalue[0] : "");
    const [subject, setSubject] = useState(data ? data.subject : "");
    const [showRotateCheckbox, setShowRotateCheckbox] = useState(data ? data.aiCheckbox : false);
    const [attachments, setAttachments] = useState(data ? data.attachments : []);
    const [attachmentType, setAttachmentType] = useState(data ? data.attachmentType : "Pdf");
    const [aiCheckbox, setAiCheckbox] = useState(data ? data.aiCheckbox : false);
    const [mode, setMode] = useState(data ? data.mode : "design");
    const [selectCategory, setSelectCategory] = useState(false);
    const [selected, setSelceted] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [countries, setCountries] = useState([]);

    const handleAttachmentTypeChange = (e) => {
        setAttachmentType(e.target.value);
    };

    const generateRandomFilename = (originalFilename) => {
        const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let filename = "";
        for (let i = 0; i < 8; i++) {
            filename += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        // Extract the original file extension
        const originalExtension = originalFilename.split('.').pop();

        // Append the original extension to the generated filename
        return `${filename}.${originalExtension}`;
    };


    const composeddata = {
        editorvalue, subject, attachments, attachmentType, aiCheckbox,
        rotateCheckbox, mode
    };

    const handleAiCheckboxChange = async (event) => {

        // Replace BASE_API_URL and bearer with your actual API endpoint and token
        const loginToken = localStorage.getItem("loginToken");
        const storedDataString = localStorage.getItem("loginToken");

        console.log(loginToken);
        // Parse the stored string to get the object
        const storedData = JSON.parse(storedDataString);
        if (storedData) {

            const access_token = storedData.access_token;
            console.log(access_token);
            if (access_token) {
                // If loginToken is present, verify the refresh token
                const response = await fetch(`${BASE_API_URL}random_subject/`, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setSubject(data.subject);
                    setShowRotateCheckbox(true);
                }
            }
        }

        if (!event.target.checked) {
            setShowRotateCheckbox(false);
            setRotateCheckbox(false);
        }


    };

    const handleRotateCheckboxChange = (event) => {
        setRotateCheckbox(event.target.checked);
    };

    const handleCategoryCheckboxChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
    };

    const handleAttachmentsChange = (e) => {
        const files = e.target.files;
        setSelectedFiles(files);
    };


    async function getPublicIp() {
        try {

            const response = await fetch('https://api.ipify.org?format=json');
            const datap = await response.json();
            return datap.ip;
        } catch (error) {
            console.error('Error getting public IP:', error);
            return null;
        }
    }

    // Example usage
    getPublicIp().then((ip) => {
        console.log('Public IP address:', ip);
    });

    useEffect(() => {
        // Fetch countries when the component mounts
        fetch(countriesApiUrl)
            .then((response) => response.json())
            .then((data) => setCountries(data))
            .catch((error) => console.error("Error fetching countries:", error));
    }, []);


    useEffect(() => {
        // Check for the presence of loginToken in localStorage
        const loginToken = localStorage.getItem("loginToken");
        const storedDataString = localStorage.getItem("loginToken");

        console.log(loginToken);
        // Parse the stored string to get the object
        const storedData = JSON.parse(storedDataString);
        if (storedData) {

            const refresh_token = storedData.refresh_token;
            console.log(refresh_token);
            if (refresh_token) {
                // If loginToken is present, verify the refresh token
                verifyRefreshToken(refresh_token);
            }
        }
        // Access the refresh_token property
    }, []); // Run this effect only once on component mount

    const verifyRefreshToken = async (refreshToken) => {
        try {
            let userIp = null;
            getPublicIp().then((ip) => {
                console.log('Public IP address:', ip);
                userIp = ip;
            });

            const response = await fetch(verifyRefreshTokenUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    refresh_token: refreshToken,
                    user_ip: userIp,
                }),
            });

            const dataa = await response.json();
            console.log(data)
            if (response.status === 200) {
                // Verification successful, navigate to Home
                // alert("verified");
            } else {
                // Verification failed, remove loginToken from localStorage
                // localStorage.removeItem("loginToken");
            }
        } catch (error) {
            console.error("Error during refresh token verification:", error);
        }
    };



    let getdata = JSON.parse(localStorage.getItem("data"));

    const selectCat = (e) => {

        let items = selected.filter((item) => item === e.target.value);


        if (items.length <= 0) {
            setSelceted((prevSelected) => [...prevSelected, e.target.value]);

        } else {
            setSelceted((prevSelected) =>
                prevSelected.filter((value) => value !== e.target.value)
            );

        }
    };


    console.log(selected);
    const updatedata = JSON.parse(localStorage.getItem("data"));

    const addtoPending = () => {
        for (let i = 0; i < selected.length; i++) {
            const update = updatedata.filter((item) => item.title === selected[i]);


            const serializableFiles = attachments.map((file) => ({
                filename: file.name,
                data: file,
            }));

            const attachmentsWithFilenames = composeddata.attachments.map((attachment) => ({
                filename: generateRandomFilename(attachment.name),
                data: attachment.path,
            }));



            if (ipcRenderer) {
                try {

                    console.log("Electron detected. IPC Renderer available.");

                    const filenames = attachmentsWithFilenames.map((attachment) => attachment.filename);
                    const filedata = attachmentsWithFilenames.map((attachment) => attachment.data);
                    const selected_category = selected[i]
                    ipcRenderer.send("saveFiles", { filenames: filenames, data: filedata, category: selected_category });

                } catch (error) {
                    console.error("Error loading Electron IPC Renderer:", error);
                }
            } else {
                console.warn("Electron not detected. IPC Renderer not available.");
            }



            if (composeddata.mode === 'upload') {

                const descriptionArray = [];
                const fileReadPromises = droppedFiles.map(file => {
                    return new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                            const fileContent = event.target.result;
                            descriptionArray.push(fileContent); // Push file content into description array
                            resolve(); // Resolve the promise
                        };
                        reader.onerror = (error) => {
                            reject(error);
                        };
                        reader.readAsText(file); // Read file as text
                    });
                });

                // Set the editor value once all files are read
                Promise.all(fileReadPromises).then(() => {
                    // Update the description field with the array of file contents
                    update[0].composedata.push({
                        editorvalue: descriptionArray, // Assuming this is already an array
                        subject: composeddata.subject,
                        attachments: attachmentsWithFilenames.map((attachment) => attachment.filename),
                        attachmentType: composeddata.attachmentType,
                        aiCheckbox: composeddata.aiCheckbox,
                        rotateCheckbox: composeddata.rotateCheckbox,
                        mode: composeddata.mode
                    });

                    localStorage.setItem("data", JSON.stringify(updatedata));
                    display();
                    updateall();
                }).catch(error => {
                    console.error('Error reading file:', error);
                });
            }
            else {

                update[0].composedata.push({
                    editorvalue: [composeddata.editorvalue],
                    subject: composeddata.subject,
                    attachments: attachmentsWithFilenames.map((attachment) => attachment.filename),
                    attachmentType: composeddata.attachmentType,
                    aiCheckbox: composeddata.aiCheckbox,
                    rotateCheckbox: composeddata.rotateCheckbox,
                    mode: composeddata.mode
                });
                localStorage.setItem("data", JSON.stringify(updatedata));
            }


            let initdata = JSON.parse(localStorage.getItem("data"));
            console.log(initdata)
            display();
            updateall();
        }
    };


    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        setAttachments(files);
    };

    console.log(composeddata);


    const quillRef = useRef(null);

    useEffect(() => {
        if (quillRef.current) {
            const quillInstance = quillRef.current.getEditor();
            console.log('Quill instance:', quillInstance);
        }
    }, [quillRef.current]);


    const [droppedFiles, setDroppedFiles] = useState([]);

    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        const filteredFiles = files.filter(file => file.type === 'text/html' || file.type === 'text/plain');
        setDroppedFiles(filteredFiles);

        // Read the content of each dropped file
        const fileReadPromises = filteredFiles.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    resolve(event.target.result); // Resolve with the file content
                };
                reader.onerror = (error) => {
                    reject(error);
                };
                reader.readAsText(file); // Read file as text
            });
        });

        // Set the editor value once all files are read
        Promise.all(fileReadPromises).then(fileContents => {
            const mergedContent = fileContents.join('\n\n'); // Merge content of all files with newlines
            setEditorValue(mergedContent);
        }).catch(error => {
            console.error('Error reading file:', error);
        });
    };


    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDFileSelect = (e) => {
        const files = Array.from(e.target.files);

        setDroppedFiles(files.filter(file => file.type === 'text/html' || file.type === 'text/plain'));

        // Read the content of each dropped file
        const fileReadPromises = files.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    resolve(event.target.result); // Resolve with the file content
                };
                reader.onerror = (error) => {
                    reject(error);
                };
                reader.readAsText(file); // Read file as text
            });
        });

        // Set the editor value once all files are read
        Promise.all(fileReadPromises).then(fileContents => {
            const mergedContent = fileContents.join('\n\n'); // Merge content of all files with newlines
            setEditorValue(mergedContent);
        }).catch(error => {
            console.error('Error reading file:', error);
        });
    };



    const switchMode = (selectedMode) => {
        console.log(selectedMode);
        console.log(editorvalue)
        setMode(selectedMode);
        if (selectedMode === "text") {
            setEditorValue(editorvalue);
        } else if (selectedMode === "html") {
            setEditorValue(editorvalue);
        } else if (selectedMode === "upload") {
            const fileReadPromises = droppedFiles.map(file => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        resolve(event.target.result); // Resolve with the file content
                    };
                    reader.onerror = (error) => {
                        reject(error);
                    };
                    reader.readAsText(file); // Read file as text
                });
            });

            // Set the editor value once all files are read
            Promise.all(fileReadPromises).then(fileContents => {
                const mergedContent = fileContents.join('\n\n'); // Merge content of all files with newlines
                setEditorValue(mergedContent);
            }).catch(error => {
                console.error('Error reading file:', error);
            });
        } else if (selectedMode === "design") {
            console.log(editorvalue)
            setEditorValue(editorvalue);
        }
    };


    return (
        <>
            <div className="main w-screen h-screen flex justify-center items-center fixed bg-[#80808072] z-10  backdrop-blur-[1px] flex-col">
                <div className=" w-[800px] h-[auto] rounded bg-white overflow-hidden">
                    <div className="topcontrol w-full ">
                        <div className=" h-[35px] bg-[rgb(0 0 204 / var(--tw-bg-opacity))]  flex justify-between">
                            <div className="flex gap-5  font-serif items-center h-full ml-5">

                                <button className="text-sm  border-neutral-900 text-decoration-none">
                                    Compose Now
                                </button>
                            </div>
                            <div
                                className=" h-full flex items-center mr-4 cursor-pointer "
                                onClick={display}
                            >
                                <div>X</div>
                            </div>
                        </div>
                    </div>
                    <div className="maineditor bg-white border-2 border-red-700 h-[550px]">
                        <div>
                            <div className="flex   gap-4 px-4 py-2 ">
                                <p>Subject</p>
                                <input
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="w-[70%] border-2 border-gray-900 rounded px-2 "
                                />
                                <input type="checkbox" onClick={handleAiCheckboxChange} checked={aiCheckbox}
                                    onChange={(e) => setAiCheckbox(e.target.checked)} /> AI
                                {showRotateCheckbox && (
                                    <>
                                        <input type="checkbox" className="w-4" checked={rotateCheckbox}
                                            onChange={handleRotateCheckboxChange} /> Rotate
                                    </>
                                )}
                            </div>
                            <div className="flex gap-4 px-4 py-2 ">
                                <p>Attachments</p>
                                <select style={{ border: "2px solid black", borderRadius: "4px" }} value={attachmentType}
                                    onChange={handleAttachmentTypeChange} >
                                    <option value="JpgToPdf">JpgToPdf</option>
                                    <option value="Pdf">Pdf</option>
                                    <option value="Jpg">Jpg</option>
                                    <option value="Png">Png</option>
                                    <option value="Normal">Normal</option>
                                </select>
                                {attachmentType === "Normal" ? (
                                    <input
                                        type="file"
                                        name="files[]"
                                        multiple
                                        onChange={handleFileSelect}
                                        className="w-[70%] border-2 border-gray-900 rounded px-2"
                                    />
                                ) : (
                                    <input multiple
                                        type="file"
                                        accept=".html"
                                        name="files[]"
                                        onChange={handleFileSelect}
                                        className="w-[70%] border-2 border-gray-900 rounded px-2"
                                    />
                                )}
                            </div>
                        </div>


                        <div className="maineditor bg-white border-2 border-red-700" style={{ height: "78%" }} >
                            {mode == 'design' ? (
                                <ReactQuill
                                    className="w-full h-[90%]"
                                    theme="snow"
                                    value={editorvalue}
                                    onChange={(value) => setEditorValue(value)}
                                    modules={{
                                        toolbar: [
                                            [{ header: [1, 2, false] }],
                                            ['bold', 'italic', 'underline'],
                                            [{ list: 'ordered' }, { list: 'bullet' }],
                                            ['image'],
                                        ],
                                        clipboard: {
                                            matchVisual: false,
                                        },
                                    }}
                                    ref={quillRef}
                                />
                            )
                                :
                                mode === 'upload' ? (
                                    <>
                                        <div
                                            className="maineditor bg-white border-2 border-red-700 h-[100%] flex flex-col items-center justify-center"
                                            onDrop={handleDrop}
                                            onDragOver={handleDragOver}
                                        >
                                            <div className="flex flex-wrap justify-center mt-4">
                                                {droppedFiles.map((file, index) => (
                                                    <div key={index} className="m-2 p-2 bg-gray-200 rounded">
                                                        <p>{file.name}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            <p className="mb-4 text-lg font-bold">Drag and drop files here</p>
                                            <p className="text-sm text-gray-500 mb-4">(HTML and TXT files only)</p>
                                            <input
                                                type="file"
                                                accept=".html,.txt"
                                                onChange={handleDFileSelect}
                                                multiple
                                                className="hidden"
                                                id="fileInput"
                                            />
                                            <label htmlFor="fileInput" className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer">
                                                Choose File
                                            </label>
                                        </div>

                                    </>
                                ) :
                                    (
                                        <textarea style={{ width: "100%", height: "100%" }}>{editorvalue}</textarea>
                                    )
                            }

                        </div>
                        <div className="w-full flex " style={{ justifyContent: "flex-end" }}>
                            <div className="h-[25px] flex justify-content-flex-end">
                                <button className={`text-sm border-2 border-neutral-900 ${mode === "text" ? "bg-gray-300" : ""}`} onClick={() => switchMode("text")}>&nbsp;Text&nbsp;</button> &nbsp;
                                <button className={`text-sm border-2 border-neutral-900 ${mode === "html" ? "bg-gray-300" : ""}`} onClick={() => switchMode("html")}>&nbsp;HTML&nbsp;</button> &nbsp;
                                <button className={`text-sm border-2 border-neutral-900 ${mode === "design" ? "bg-gray-300" : ""}`} onClick={() => switchMode("design")}>&nbsp;Design&nbsp;</button> &nbsp;
                                <button className={`text-sm border-2 border-neutral-900 ${mode === "upload" ? "bg-gray-300" : ""}`} onClick={() => switchMode("upload")}>&nbsp;Upload&nbsp;</button>
                            </div>
                        </div>

                    </div>


                    <div className="bottombar w-full bg-red-900 p-1 relative">
                        <div className="bottomcontro flex justify-around">
                            <button onClick={display} className="px-2 py-1 bg-white rounded">
                                Cancel
                            </button>
                            <button
                                className="px-2 py-1 rounded bg-white"
                                onClick={() => setSelectCategory(true)}
                            >
                                select category
                            </button>
                            <button
                                className="px-2 py-1 rounded bg-white"
                                onClick={addtoPending}
                            >
                                Add to pending
                            </button>
                        </div>
                        {selectCategory ? (
                            <div className="selectcategory absolute bottom-[40px] right-[340px] bg-white border-2 border-black rounded-md p-3">
                                {getdata.map((data, index) => (
                                    <div className="flex gap-2" key={index}>
                                        <input
                                            type="checkbox"
                                            name=""
                                            id=""
                                            className="w-4"
                                            value={data.title}
                                            onChange={selectCat}
                                        />
                                        <p>{data.title}</p>
                                    </div>
                                ))}

                                <button
                                    className="bg-green-500 px-4 rounded mt-2 ml-7"
                                    onClick={() => setSelectCategory(false)}
                                >
                                    Ok
                                </button>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditCompose;



