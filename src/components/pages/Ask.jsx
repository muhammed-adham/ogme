import React from 'react'

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
                            <input name='name' id='name' type="text" placeholder='Enter your name'/>
                            <input name='phone' id='phone' type="text" placeholder='Enter your phone number'/>
                            <input name='email' id='email' type="text" placeholder='Enter your email adress'/>
                            <textarea name='message' id='message' type="text" placeholder='Enter your message..'/>
                            <div className="submit">submit</div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Ask