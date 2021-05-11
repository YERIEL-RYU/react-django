import React from 'react';

const RouteTest = ({match, location, history}) => {
    return (
        <div>
            {console.log("match : ", match)}
            {console.log("location : ", location)}
            {console.log("history : ", history)}
            <div>route test</div>
        </div>
    );
};

export default RouteTest;