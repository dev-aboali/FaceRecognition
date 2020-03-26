import React from 'react';


function Rank({name, entries}) {
    return (
        <div className="ma4 mt0 center f1 gold">
            Hi {name}, Your rank count is {entries}
        </div>
    );
}

export default Rank;