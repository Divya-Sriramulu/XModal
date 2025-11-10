import { useState, useRef, useEffect } from "react";

export default function App() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const modalRef = useRef(null);

  const handleSubmit = () => {
    // Priority checks for Cypress tests:
    if (email && !email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return;
    }

    if (phone && (phone.length !== 10 || isNaN(phone))) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    if (dob) {
      const today = new Date();
      const entered = new Date(dob);
      if (entered > today) {
        alert("Invalid date of birth. Date cannot be in the future.");
        return;
      }
    }

    // Required blank-field checks
    if (!username) {
      alert("Please enter username.");
      return;
    }
    if (!email) {
      alert("Please enter email.");
      return;
    }
    if (!phone) {
      alert("Please enter phone number.");
      return;
    }
    if (!dob) {
      alert("Please enter date of birth.");
      return;
    }

    // Success → close modal & clear form
    setOpen(false);
    setUsername("");
    setEmail("");
    setPhone("");
    setDob("");
  };

  // Close modal if click outside modal-content
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
    <div>
      {!open && <button onClick={() => setOpen(true)}>Open Form</button>}

      {open && (
        <div className="modal">
          <div className="modal-content" ref={modalRef}>
            <form onSubmit={(e) => e.preventDefault()}>
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

              <button
                type="submit"
                className="submit-button"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}