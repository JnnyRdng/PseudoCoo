import React, {Component} from 'react';
import './ImageUpload.css';
import {uploadImage} from "../helpers/requests.js";
import ImageParser from '../helpers/ImageParser'
import CowTimer from '../helpers/CowTimer'

export default class ImageUpload extends Component{
    constructor(props){
        super(props);
        this.state = {
            imageFile: null,
            parsedOutput: "",
        }
    }

    handleImageClick = () => {
        const virtualInput = this.createUpload();
        virtualInput.click();
    }

    createUpload = () => {
        const virtualInput = document.createElement("input");
        virtualInput.type = "file";
        virtualInput.accept = "image/*";
        virtualInput.addEventListener('change', this.handleUpload);
        return virtualInput;
    }

    handleUpload = async (event) => {
        new CowTimer(10, 15, "joke")
        this.handleClear();
        await this.setState({imageFile : event.target.files[0]});
        this.createPreview();
        this.analyseImage();
    }

    createPreview = async () => {
        let fileReader = new FileReader();
        fileReader.onload = function (){
            document.getElementById("preview").src = fileReader.result;
        }
        fileReader.readAsDataURL(this.state.imageFile);
    }

    analyseImage = async () => {
        const cleanImage = await uploadImage(this.state.imageFile);
        let output = "";

        let fileReader2 = new FileReader();
        fileReader2.onload = async () => {
            output = await ImageParser(fileReader2.result, false, false)
            document.getElementById("test").src = fileReader2.result;
            this.setState ({parsedOutput: output}) 
        }
        fileReader2.readAsDataURL(cleanImage)
    }

    handleValidate = () => {
        if (this.state.parsedOutput !== ""){
            // check if solvable // still to be written
            this.props.createGameString(this.state.parsedOutput);
        }
        
    }

    // drag and drop methods
    handleClear = () => {
        this.setState({imageFile : null});
        document.getElementById("preview").src = "uploadDefault.png";
    }

    handleDragEnter = (event) => {
        event.preventDefault();
        document.getElementById("preview").classList.add("on-droppable");
    }

    handleDragLeave = (event) => {
        event.preventDefault();
        document.getElementById("preview").classList.remove("on-droppable");
    }

    handleDragOver = (event) => {
        event.preventDefault();
    }

    handleOnDrop = async (event) => {
        event.preventDefault();
        if (event.dataTransfer.files[0].type.includes("image")) {
            await this.setState({imageFile : event.dataTransfer.files[0]});
            this.createPreview();
            this.analyseImage();
        } else {
            this.handleClear();
        }
    }

    render(){

        return(
            <div>
                <p>grid component will go here</p>
                <button id="validate-upload" onClick={this.handleValidate}>Validate</button>
                <img id="preview" className="image" src="uploadDefault.png" alt="uploadImage" draggable="false"
                onClick={this.handleImageClick} onDragEnter={this.handleDragEnter} onDragLeave={this.handleDragLeave} onDragOver={this.handleDragOver} onDrop={this.handleOnDrop}/>
                <img id="test" className="image" src="uploadDefault.png" alt="uploadImage" draggable="false" />
            </div>
            
        )
    }


}
