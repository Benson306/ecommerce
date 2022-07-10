import {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

const Preview = () => {

    const { id } = useParams();
    console.log(id);

    return ( <div className="preview">
        {id}
    </div> );
}

export default Preview;