import React from 'react';
import "./RegisterInput.css";

const LoginInput = (props) => {
  return (
    <div className="RegisterInput">
      <form>
        <label htmlFor="RegisterInput__FieldUser"></label>
        <label htmlFor="RegisterInput__FieldPassword"></label>
        <input className="RegisterInput__Field" id="RegisterInput__FieldUserName" type="text" name="name" placeholder="Användarnamn" />
        <input className="RegisterInput__Field" id="RegisterInput__FieldPassword" type="text" name="password" placeholder="Lösenord" />
        <input className="RegisterInput__Submit" type="submit" value="Register" />
      </form>
    </div>
  )
}

export default LoginInput;