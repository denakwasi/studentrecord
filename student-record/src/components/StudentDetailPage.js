import React, {useEffect, useState} from 'react'
import './StudentDetailPage.css'


function StudentDetailPage() {

        const [inputFiles, setInputFiles] = useState([])
        const [rotate, setRotate] = useState(false)
        //  Drag Events
        const drop = () => {
            let info = document.querySelector("#info")
            let overlay = document.querySelector("#input-overlay")
            let wrapper = document.querySelector("#input-wrapper")
            wrapper.style.backgroundColor = "#f8f8f8"
            // info.style.display = "block"
            overlay.style.zIndex = "1"
            wrapper.style.zIndex = "-1"
        }

        const dragOver = () => {
            let info = document.querySelector("#info")
            let overlay = document.querySelector("#input-overlay")
            let wrapper = document.querySelector("#input-wrapper")
            wrapper.style.backgroundColor = "#e0e0e0"
            // info.style.display = "none"
            overlay.style.zIndex = "-1"
            wrapper.style.zIndex = "1"
        }

        const mouseLeave = () => {
            let overlay = document.querySelector("#input-overlay")
            let wrapper = document.querySelector("#input-wrapper")
            wrapper.style.backgroundColor = "#f8f8f8"
            overlay.style.zIndex = "1"
            wrapper.style.zIndex = "-1"
        }

        const dragLeave = () => {
            let info = document.querySelector("#info")
            let overlay = document.querySelector("#input-overlay")
            let wrapper = document.querySelector("#input-wrapper")
            wrapper.style.backgroundColor = "#f8f8f8"
            // info.style.display = "block"
            overlay.style.zIndex = "1"
            wrapper.style.zIndex = "-1"
        }

        const getFile = (e) => {
            let key = new Date().getMilliseconds()
            // chech file extension
            let file = e.target.files[0]
            let ext = file.name.split(".").pop()
            if(ext !== "pdf") return
            setInputFiles([...inputFiles, {key:key, file:file}])
        }

        const removeFile = (fileKey) => {
            let remFile = inputFiles.filter(file => {
                if(file.key !== fileKey) {
                    return file
                }
            })
            setInputFiles(remFile)
        }

        const handleRotate = () => {
            setRotate(!rotate)
        }

        console.log(inputFiles)
   
    return (
        <div className="StudentDetailPage">
            <div className="container">
                <div className="course__title">Integral Equations</div>
                <section className="submitted__work">
                    <div className="sent__activities"></div>
                    <div className="submitted__activities"></div>
                </section>
                <section className="submit__work">
                    <div className="input__overlay" id="input-overlay" onDragOver={dragOver}>
                        <div className="choose__file">
                            <label htmlFor="file">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path style={{fill:"white"}} d="M11.363 2c4.155 0 2.637 6 2.637 6s6-1.65 6 2.457v11.543h-16v-20h7.363zm.826-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-2.628v3.686h.907v-1.472h1.49v-.732h-1.49v-.698h1.721v-.784zm-4.9 0h-1.599v3.686h1.599c.537 0 .961-.181 1.262-.535.555-.658.587-2.034-.062-2.692-.298-.3-.712-.459-1.2-.459zm-.692.783h.496c.473 0 .802.173.915.644.064.267.077.679-.021.948-.128.351-.381.528-.754.528h-.637v-2.12zm-2.74-.783h-1.668v3.686h.907v-1.277h.761c.619 0 1.064-.277 1.224-.763.095-.291.095-.597 0-.885-.16-.484-.606-.761-1.224-.761zm-.761.732h.546c.235 0 .467.028.576.228.067.123.067.366 0 .489-.109.199-.341.227-.576.227h-.546v-.944z"/></svg>
                            </label>
                            <input type="file" id="file" accept="application/pdf" onChange={getFile} />
                        </div>
                        <div className="file__info">
                            <div className="number__of__files" style={{display:inputFiles.length===0?"none":"block"}}>{inputFiles.length} files</div>
                            <div className="files__wrapper" style={{overflowY:inputFiles.length>=5?"scroll":""}}>
                                {/* <div className="number__of__files2" style={{display:inputFiles.length===0?"none":"block"}}>{inputFiles.length} files</div> */}
                                {inputFiles.map((inputFile, index)=> (
                                    <div key={index} className="file">
                                        <span>{inputFile.file.name}</span> 
                                        <svg onClick={() => removeFile(inputFile.key)} style={{float:"right"}} xmlns="http://www.w3.org/2000/svg" width="15" height="24" viewBox="0 0 24 24"><path style={{fill:"grey"}} d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"/></svg>
                                        <br />
                                        <progress min="0" value="100"></progress>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="input__wrapper" id="input-wrapper" onDrop={drop} onMouseLeave={mouseLeave} onDragLeave={dragLeave}>
                        <svg style={{display:inputFiles.length===0?"block":"none"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path style={{fill:"#81d4fa"}} d="M12 21l-8-9h6v-12h4v12h6l-8 9zm9-1v2h-18v-2h-2v4h22v-4h-2z"/></svg>
                        <input type="file" accept="application/pdf" onChange={getFile} />
                        <span id="inform" style={{color:"grey", display:inputFiles.length===0?"block":"none"}}>Drag & Drop file(s) here</span>
                    </div>

                    <div className="buttons__wrapper">
                        <button>Submit</button><button>Cancel</button>
                    </div>
                    
                </section>
                <section className="results">
                    <div className="score__card">
                        <div className="lecturer">
                            <div>Lecturer</div>
                            <div>Prof. Dontwi</div>
                        </div>
                        <div className="ta">
                            <div>T.A</div>
                            <div>Akowuah Dennis</div>
                        </div>
                        
                        <div className="score__info" style={{height:rotate?"50%":"100%", 
                                                            display:rotate&&"grid",
                                                             placeItems:rotate&&"center",
                                                             transition:"0.5s"
                                                             }}>
                            <div className="status__wrapper">
                                <div>status:</div>
                                <div>graded</div>
                            </div>
                            <div className="score__number">7 / 10</div>
                            <svg onClick={handleRotate} style={{transform:rotate?"rotate(180deg)":"rotate(0)", transition:"0.5s"}} xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 24 24"><path style={{fill:"white"}} d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/></svg>
                        </div>
                    </div>
                </section>
            </div>
            <footer>
                &copy; All right reserved
            </footer>
        </div>
    )
}

export default StudentDetailPage
