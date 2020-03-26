import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange , onSubmit }) => {
    return (
        <div>
            <p className="f3 center navy">This App will detect any head in your photo</p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5 center">
                    <input type="text" placeholder="Put your photo link here!" className='f4 pa2 w-70 center' onChange={onInputChange}/>
                    <button className="w-30 grow f4 link ph3 pv2 dib bg-light-purple" onClick={onSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;