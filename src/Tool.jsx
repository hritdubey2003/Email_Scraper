import React, { useState } from "react";
import "./Tool.css"
function Tool() {

    const [ url , seturl ] = useState('');
    const [ keyword , setKeyword ] = useState('');
    const [ email , setEmail ] = useState('');
    const [ Subject , setSubject ] = useState('');
    const [ Body , setBody ] = useState('');
    const [downloadStatus, setDownloadStatus] = useState("");

    const downloadJsonFile = async () => {
        try {
            // Make a GET request to the backend endpoint
            const response = await fetch("http://127.0.0.1:8000/scrapper/download_email", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                // No need to include a body for GET request
            });
    
            // Check if the request was successful
            if (response.ok) {
                // If successful, initiate the download by creating a Blob URL
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "email.json";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
    
                // Set download status
                setDownloadStatus("Download successful");
            } else {
                // If request fails, handle error
                setDownloadStatus("Download failed");
            }
        } catch (error) {
            console.error("Error downloading JSON file:", error);
            setDownloadStatus("Download failed");
        }
    };
    

    const scrap = () => {
        // Send data to the backend
        fetch('http://127.0.0.1:8000/scrapper/mail_scrap', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url, keyword , Subject , Body }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Handle response from the backend
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle error
        });
    };

    const toggleSidebar = () => {
        const wrapper = document.querySelector(".wrapper");
        wrapper.classList.toggle("active");
    };

    

    const handleItemClick = (event) => {
        const liItems = document.querySelectorAll(".side_bar_bottom ul li");
        liItems.forEach((li) => {
            li.classList.remove("active");
        });
        event.target.parentElement.classList.add("active");
    };

    const handleMenuClick = () => {
        const wrapper = document.querySelector(".wrapper");
        wrapper.classList.toggle("active");
    };

    const model = () => {
        alert("These services will be available soon!")
    }

    return (
        <>
            <div className="wrapper">
    <div className="shadow"></div>
    <div className="side_bar">
        <div className="side_bar_top">
            <div className="logo_wrap">
                <a href="#">
                    <img src="https://umidinfotech.in/wp-content/uploads/2024/04/Logooooooooooooo.png" alt="" />
                </a>
            </div>
            <div className="side_bar_menu" onClick={toggleSidebar}>
                <div className="menu">
                    <ion-icon className="i" name="arrow-forward-sharp"></ion-icon>
                </div>
            </div>
        </div>
        <div className="side_bar_bottom">
            <ul>
                <li className="active">
                    <span className="top_curve"></span>
                    <a href="#email-scrap" onClick={handleItemClick}>
                        <span className="icon"><ion-icon name="mail-sharp"></ion-icon></span>
                        <span className="item" onClick={handleItemClick}>Email Scrapping</span>
                    </a>
                    <span className="bottom_curve"></span>
                </li>
                <li>
                    <span className="top_curve"></span>
                    <a href="#email-send" onClick={handleItemClick}>
                        <span className="icon"><ion-icon name="mail-sharp"></ion-icon></span>
                        <span className="item">Email Sending</span>
                    </a>
                    <span className="bottom_curve"></span>
                </li>
                <li>
                    <span className="top_curve"></span>
                    <a href="#personal-cloud" onClick={handleItemClick}>
                        <span className="icon"><ion-icon name="cloud-sharp"></ion-icon></span>
                        <span className="item">Personal Cloud</span>
                    </a>
                    <span className="bottom_curve"></span>
                </li>
                <li>
                    <span className="top_curve"></span>
                    <a href="#Purchase" onClick={handleItemClick}>
                        <span className="icon"><ion-icon name="cash-sharp"></ion-icon></span>
                        <span className="item">Purchase</span>
                    </a>
                    <span className="bottom_curve"></span>
                </li>
                <li>
                    <span className="top_curve"></span>
                    <a href="#Services-C" onClick={handleItemClick}>
                        <span className="icon"><ion-icon name="pie-chart-sharp"></ion-icon></span>
                        <span className="item">Services-C</span>
                    </a>
                    <span className="bottom_curve"></span>
                </li>
                <li>
                    <span className="top_curve"></span>
                    <a href="#" onClick={handleItemClick}>
                        <span className="icon"><ion-icon name="pie-chart-sharp"></ion-icon></span>
                        <span className="item">Services-D</span>
                    </a>
                    <span className="bottom_curve"></span>
                </li>
            </ul>
        </div>
    </div>
    <div className="main_container">
        <section id="email-scrap">
            <h3 id="email" className="email">Email Scrapper</h3>
            <h1 id="email" className="email">Find the verified Email Addresses</h1>
            <h2 id="email" className="email">on the basis of Keyword</h2>
            <div className="scrap">
                <div className="scrapp">
                    <input
                     type="url"
                    placeholder="Paste URL Here!" 
                    onChange={(e) => {
                      seturl( e.target.value);
                    }}
                    />
                </div>
                <div className="scrapp">
                    <input 
                    type="text" 
                    placeholder="Keyword" 
                    onChange={ ( e ) => { setKeyword( e.target.value );
                    }}
                    />
                </div>
                <div className="scrapp">
                    <input type="text" placeholder="Subject of the mail" onChange={(e) => setSubject( e.target.value)}/>
                </div>
                <div className="scrapp">
                    <input type="text" placeholder="Body of the mail" onChange={(e) => setBody( e.target.value)} />
                </div>
                <div className="scrapp">
                    <button type="submit" onClick={scrap}>Scrap</button>
                </div>
            </div>
            <h1 id="email" className="email" >Download Your Scrapped Email Here!</h1>
            <div className="scrap">
                <div className="scrapp">
                    <button type="submit" onClick={downloadJsonFile}>Download</button>
                </div>
            </div>
        </section>
        <section id="email-send">
            <h1 id="email" className="email">Email Sender</h1>
            <div className="scrap">
                <div className="scrapp">
                    <input type="text" placeholder="Subject of the mail" />
                </div>
                <div className="scrapp">
                    <input type="text" placeholder="Body of the mail" />
                </div>
                <div className="scrapp">
                    <button type="submit" onClick={model}>Send</button>
                </div>
            </div>
        </section>
        <section id="personal-cloud">
            <h1 id="email" className="email">Personal Cloud</h1>
            <div className="scrap">
                <div className="scrapp">
                    <input type="text" placeholder="Subject of the mail" />
                </div>
                <div className="scrapp">
                    <input type="text" placeholder="Body of the mail" />
                </div>
                <div className="scrapp">
                    <button type="submit" onClick={model}>Send</button>
                </div>
            </div>
        </section>
        <section id="Purchase">
            <h1 id="email" className="email">Purchase</h1>
            <div className="scrap">
                <div className="scrapp">
                    <input type="text" placeholder="Subject of the mail" />
                </div>
                <div className="scrapp">
                    <input type="text" placeholder="Body of the mail" />
                </div>
                <div className="scrapp">
                    <button type="submit" onClick={model}>Send</button>
                </div>
            </div>
        </section>
        <section id="Services-C">
            <h1 id="email" className="email">Services-C</h1>
            <div className="scrap">
                <div className="scrapp">
                    <input type="text" placeholder="Subject of the mail" />
                </div>
                <div className="scrapp">
                    <input type="text" placeholder="Body of the mail" />
                </div>
                <div className="scrapp">
                    <button type="submit" onClick={model}>Send</button>
                </div>
            </div>
        </section>
    </div>
</div>

        </>
    );
}

export default Tool;
