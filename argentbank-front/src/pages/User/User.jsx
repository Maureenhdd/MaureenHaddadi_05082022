import Account from "../../components/Account/Account";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./User.scss";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { storeUser } from "../../redux/slice/userSlice";
import { Navigate } from "react-router";
import { useState } from "react";

const User = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.value);
  const [visible, setVisible] = useState(false);

  const handleEditUserName = () => {
    setVisible(!visible);
  };

  const handleSubmit = () => {
    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });
    fetch("http://localhost:3001/api/v1/user/profile", {
      method: "PUT",
      headers: headers,
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(storeUser(data.body));
      });
    setVisible(!visible);
  };

  useEffect(() => {
    if (token) {
      const headers = new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      });
      fetch("http://localhost:3001/api/v1/user/profile", {
        method: "POST",
        headers: headers,
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch(storeUser(data.body));
        });
    }
  }, [token]);

  const userInfo = useSelector((state) => state.user.value);
  const [lastName, setLastName] = useState(userInfo.lastName);
  const [firstName, setFirstName] = useState(userInfo.firstName);

  if (!token) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Navbar isConnected />
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {!visible ? (
              `${userInfo.firstName} ${userInfo.lastName}`
            ) : (
              <form>
                <input
                  placeholder={userInfo.firstName}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  placeholder={userInfo.lastName}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                ></input>
              </form>
            )}
          </h1>

          {visible ? (
            <>
              <button className="edit-button" onClick={handleSubmit}>
                Save
              </button>{" "}
              <button className="edit-button" onClick={handleEditUserName}>
                Cancel
              </button>
            </>
          ) : (
            <button className="edit-button" onClick={handleEditUserName}>
              Edit Name
            </button>
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>
        <Account
          title="Argent Bank Checking (x8349)"
          amount="$2,082.79"
          description="Available Balance"
        />
        <Account
          title="Argent Bank Savings (x6712)"
          amount="$10,928.42"
          description="Available Balance"
        />
        <Account
          title="Argent Bank Credit Card (x8349)"
          amount="$184.30"
          description="Current Balance"
        />
      </main>
      <Footer />
    </>
  );
};

export default User;
