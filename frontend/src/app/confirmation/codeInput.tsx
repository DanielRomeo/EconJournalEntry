import { useState } from "react";
import OtpInput from 'react-otp-input';

const inputStyle = {
    'border': '1px solid grey',
    'width': '60px',
    'height': '60px',
    'borderRadius': '5%'
}

function PinCodeInput() {
    const [otp, setOtp] = useState('');

  
    return (
        <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={4}
        renderSeparator={<span> &nbsp;&nbsp;</span>}
        renderInput={(props) => <input {...props} />}
        inputStyle={inputStyle}
        />
    );
  }

  export default PinCodeInput;