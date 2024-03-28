import React from 'react'

const Ask = () => {
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