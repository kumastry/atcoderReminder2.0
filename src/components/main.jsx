import { useEffect, useState } from "react";
import Form from "./form";

function Main(props) {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (localStorage.user) {
      const userName_localst = JSON.parse(localStorage.user);
      userform.value = userName_localst;
      setUserName(userName_localst);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(userName));
  }, [userName]);

  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="main nabigation">
        <div className="navbar-brand">
          <input
            className="navbar-item"
            id="userform"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="Username"
          ></input>
        </div>
      </nav>
      <Form userName={userName} />
    </div>
  );
}

export default Main;
