import React, { useState } from "react";

/** === Ask Page ===
 *
 * This component represents the "Ask Us" Page.
 *
 * Layout:
 * - .ask-us: The main container for the "Ask Us" section.
 *   - .container: The container for the section contents.
 *     - .form-container: The container for the form.
 *       - .title: The container for the section title and description.
 *         - <h2>: The heading element for the section title.
 *         - <p>: The paragraph element for the section description.
 *       - .form-group: The container for the form inputs and submit button.
 *         - <form>: The form element.
 *           - <input>*3: The input element field.
 *           - <textarea>: The textarea element for the message field.
 *           - div.submit: The submit button element.
 */
const Ask = () => {
  //========================================================================================Handle input Data ForMobile
  const [inputData, setInputData] = useState({
    userNamer: "",
    email: "",
    phone: "",
    message: "",
  });
  const onInputHandler = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };
  //=============================================================Return==============================================================//
  return (
    <>
      <section className="ask-us">
        <div className="container">
          <div className="form-container">
            <div className="title">
              <h2>ask us</h2>
              <p>we are here to help and answer any question you might have.</p>
            </div>
            <div className="form-group">
              <form action="">
                <input
                  name="userName"
                  id="userName"
                  type="text"
                  placeholder="Enter your name"
                  onInput={onInputHandler}
                  value={inputData.name}
                />
                <input
                  name="phone"
                  id="phone"
                  type="text"
                  placeholder="Enter your phone number"
                  onInput={onInputHandler}
                  value={inputData.name}
                />
                <input
                  name="email"
                  id="email"
                  type="text"
                  placeholder="Enter your email adress"
                  onInput={onInputHandler}
                  value={inputData.name}
                />
                <textarea
                  name="message"
                  id="message"
                  type="text"
                  placeholder="Enter your message.."
                  onInput={onInputHandler}
                  value={inputData.name}
                />
                <div className="submit">submit</div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Ask;
