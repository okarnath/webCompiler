import React, { useState } from "react";
import "./Input.css";
import axios from "axios";
import  MonacoEditor from "@monaco-editor/react";

export const Input = () => {

    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("python");
    const [output, setOutput] = useState("");
    
    const handleCompile = async ()=>{
        try{
            const postRequest = await axios.post("http://localhost:8080/api/compile",{
                language : language,
                code : code
            })
            setOutput(postRequest.data)
        }
        catch (error){
            console.log("Error Compiling the code", error);
            setOutput("Error Compiling the Code: " , error);
        }
    }

  return (

    <>
      <h1>Web Compiler</h1>
      <div className="selectLanguage">
        <select value={language} name="" id="" onChange={(e)=>{setLanguage(e.target.value)}}>
          <option value="java">Java</option>
          <option value="python">Python</option>
        </select>
        <button onClick={handleCompile} className="">Run Code</button>
      </div>
      <div className="container">
        <div className="inputLeftArea">
        <MonacoEditor
            height="80vh"
            language={language}
            theme="vs-light"
            value={code}
            options={{
               automaticLayout: true,
               cursorBlinking:"smooth",
               lineHeight: 22,
               fontSize:"16px",
               scrollbar:{
                vertical:"hidden"
               },
               padding:{
                top:10
               }
              }}
            onChange={(newValue) => setCode(newValue)}
          />
        </div>
        <div className="outputRightArea">
          <textarea
            placeholder="Output..."
            name=""
            id=""
            className="outputTextArea"
            value={output}
            readOnly
          ></textarea>
        </div>
      </div>
    </>
  );
};
