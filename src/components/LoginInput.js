import React from 'react';
import "./LoginInput.css";

const LoginInput = (props) => {
  return (
    <div className="LoginInput">
      <form>
        <label htmlFor="LoginInput__FieldUser"></label>
        <label htmlFor="LoginInput__FieldPassword"></label>
        <input className="LoginInput__Field" id="LoginInput__FieldUserName" type="text" name="name" placeholder="Användarnamn" />
        <input className="LoginInput__Field" id="LoginInput__FieldPassword" type="text" name="password" placeholder="Lösenord" />
        <input className="LoginInput__Submit" type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default LoginInput;