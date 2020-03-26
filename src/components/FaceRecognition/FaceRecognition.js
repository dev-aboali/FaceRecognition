import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl , box }) => {
    return (
        <div className="  mt4 mb4 center">
            <div className="image-container">
                <img id='imageInput' src={imageUrl} alt="imgrecognition" width='500px' height='auto'/>
                <span className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></span>
           </div>
           
        </div>
    );
}

export default FaceRecognition;