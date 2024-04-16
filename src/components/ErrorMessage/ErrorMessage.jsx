import React from "react";

const ErrorMessage = ({errorMsg}) => {
    return(
        <>
            <p className="error-msg">{errorMsg}</p>
        </>
    )
}

export default ErrorMessage;