import React, { useEffect } from "react";
import { useState,useRef } from "react";
import "../styles/home.css";
import { FaUpload } from "react-icons/fa";


function Home() {
  const [text1,setText1]=useState("");
  const [text2,setText2]=useState("");
  const [score,setScore]=useState(-1);
  const refContainer = useRef(null);

  const [upload1,setUpload1]=useState("upload file");
  const [upload2,setUpload2]=useState("upload file");


useEffect(()=>{ 
  refContainer.current?.scrollIntoView({ behavior: "smooth" });
},[score])
  const btnHnadler=()=>{
    // refContainer.current?.scrollIntoView({ behavior: "smooth" });
    console.log(text1);
    console.log(text2);
    fetch("http://127.0.0.1:5000/",{
      method: 'POST',
      body: JSON.stringify({t1:text1,t2:text2}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((data)=>data.json())
    .then((res)=>setScore(res))
    .catch((err)=>console.warn(err))
  }

  const Inputhandler1 = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result)
      setText1(text);
      setUpload1("File Selected")
      console.log(text)
    };
    reader.readAsText(e.target.files[0])
  }

  const Inputhandler2 = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result);
      setText2(text);
      setUpload2("File Selected")
      console.log(text)
    };
    reader.readAsText(e.target.files[0])
  }

  return (
    <div className="home">
      <h3 className="heading">Enter or Upload Input 1 and Input 2</h3>

      <div className="content">

        <div className="text">
          <h4 className="text-heading">Input1</h4>
          <label for="fileInput1" className="fileInput1l">{upload1}&nbsp;<FaUpload size={13} style={{ fill: 'black' }}/></label>
          <input type="file" id="fileInput1" onChange={(e)=>Inputhandler1(e)} accept=".txt"></input>
          <textarea  name="text1" id="text1" placeholder="Enter Text" onChange={(e)=>setText1(e.target.value)} value={text1}/>
        </div>

        <div className="text">
          <h4 className="text-heading">Input2</h4>
          <label for="fileInput2" className="fileInput2l">{upload2}&nbsp;<FaUpload size={13} style={{ fill: 'black' }}/></label>
          <input type="file" id="fileInput2" onChange={(e)=>Inputhandler2(e)} accept=".txt"></input>
          <textarea  name="text2" id="text2" placeholder="Enter Text" onChange={(e)=>setText2(e.target.value)} value={text2}/>
        </div>

      </div>

      <div className="submit">
        <button className="btn" onClick={(e)=>btnHnadler(e)}>Check For Plagiarism</button>
      </div>

      {score!=-1 &&
      <p className="output-text" ref={refContainer} >The texts are <b>{(score*100).toFixed(2)}%</b> similar</p>
      }
   
    </div>
  );
}

export default Home;
