import { useState, useRef, useEffect } from "react";

export default function App() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const modalRef = useRef(null);

  const handleSubmit = () => {
    if (!username) {
      alert("Please enter username.");
      return;
    }
    if (!email) {
      alert("Please enter email.");
      return;
    }
    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return;
    }
    if (!phone) {
      alert("Please enter phone number.");
      return;
    }
    if (phone.length !== 10 || isNaN(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }
    if (!dob) {
      alert("Please enter date of birth.");
      return;
    }

    const today = new Date();
    const enteredDate = new Date(dob);

    if (enteredDate > today) {
      alert("Invalid date of birth. Date cannot be in the future.");
      return;
    }

    // success -> close modal
    setOpen(false);

    // Clear form
    setUsername("");
    setEmail("");
    setPhone("");
    setDob("");
  };

  // Close modal if clicked outside
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open]);

  return (
    <div className="modal">
      {!open && (
        <button onClick={() => setOpen(true)}>Open Form</button>
      )}

      {open && (
        <div className="modal">
          <div className="modal-content" ref={modalRef}>
            <h2>Form</h2>
            <input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />

            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />

            <input
              id="phone"
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <br />

            <input
              id="dob"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
            <br />

            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}