import React, { useState, useEffect } from 'react';


function fetchJSON(props) {
    const [data, setData] = useState([]);
    const getData = () => {
        fetch(props.filename
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                console.log(response)
                return response.json();
            })
            .then(function (myJson) {
                console.log(myJson);
                setData(myJson)
            });
    }
    useEffect(() => {
        getData()
    }, [])
   
}

export default fetchJSON;