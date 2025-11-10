import { useState } from "react";

export default function XModal() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");

  const handleSubmit = () => {
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

    if (!username || !email || !phone || !dob) {
      alert("All fields are required.");
      return;
    }

    alert("Form Submitted!");
    setOpen(false);
    setUsername("");
    setEmail("");
    setPhone("");
    setDob("");
  };

  return (
    <div>
      {!open && <button onClick={() => setOpen(true)}>Open Form</button>}

      {open && (
        <div className="modal">
          {/* ✅ FULL SCREEN OVERLAY */}
          <div className="overlay" onClick={() => setOpen(false)}></div>

          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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