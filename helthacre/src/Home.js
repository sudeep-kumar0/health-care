import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import doctor_1 from "../src/assets/doctor_1.jpg";
import doctor_2 from "../src/assets/doctor_2.jpg";
import doctor_3 from "../src/assets/doctor_3.jpg";
import './Chatbot.css';


import { saveFormData } from "./reducer";
import { useNavigate } from "react-router";

import { addToCart } from './reducer';



function Home() {



  //  Ai Chatapp

  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [userInfo, setUserInfo] = useState({ name: "", contact: "", problem: "" }); // To store user info
  const [step, setStep] = useState(1); // step tracker

  const generateBotReply = (userMessage) => {

    const lowerMessage = userMessage.toLowerCase();

    // Handle specific greetings like "hiii"
    if (lowerMessage === "hiii" || lowerMessage === "hi" || lowerMessage === "hello") {
      return "Hello , How are you? How can I assist you in my clinic?";
    }

    switch (step) {
      case 1:

        setUserInfo({ ...userInfo, name: userMessage });
        setStep(2);
        return `${userMessage} But first, can you help me with your name?`;

      case 2:

        setUserInfo({ ...userInfo, contact: userMessage });
        setStep(3);
        return `Thanks,${userMessage}! Can you please provide your contact number?`;

      case 3:

        setUserInfo({ ...userInfo, problem: userMessage });
        setStep(4);
        return `Got it,${userMessage}. What's the problem you're facing? Please describe it.`;

      case 4:
        // After the process is complete, confirm and ask for the name again
        setUserInfo({ name: "", contact: "", problem: "" }); // delet all info
        setStep(1); // Reset the step to start over
        return `Thank you, ${userMessage}. Your issue has been noted. Our team will connect with you shortly.  any other problem ?`;

      default:
        return "I didn't understand that. Please provide more details.";
    }
  };

  // Handle send button click
  const handleSend = () => {
    if (input.trim()) {

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: input },

      ]);
      setInput("");
      // loading
      setIsLoading(true);

      setTimeout(() => {
        const botReply = generateBotReply(input);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: botReply },
        ]);
        setIsLoading(false);
      }, 1500);
    }
  };


  const handleClear = () => {
    setMessages([{ sender: "bot", text: "Hello! How can I assist you?" }]);
    setUserInfo({ name: "", contact: "", problem: "" });
    setStep(1);
  };

  // Toggle chatbot visibility
  const [isShow, setisHide] = useState(false);
  const toggleshow = () => {
    setisHide(!isShow);
  };

  // Redux hooks (assuming data exists in Redux store)
  const users = useSelector((state) => state.usersData);
  const dispatch = useDispatch();



  // Image carousel state  Slider

  const [selectedImage, setSelectedImage] = useState(0);
  const images = [doctor_1, doctor_2, doctor_3];

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Image Slider end



  //  form appoinment


  const bookings = useSelector((state) => state.bookingsData);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    message: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    

    dispatch(saveFormData(formData));

    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      message: ''

    });


    alert("Form Submitted and cleared!");
  };


  // Add to Cart

  const navigate = useNavigate();

  const handleBuyNow = (user) => {
    dispatch(addToCart(user)); 
    navigate("/cart"); 
  };



  return (
    <div>
      <main>
        {/* Hero Section */}
        <section className="hero" id="hero">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={images[selectedImage]}
                  alt={`Doctor ${selectedImage + 1}`}
                />
                <div className="heroText d-flex flex-column justify-content-center">
                  <h1 className="mt-auto mb-2">
                    Better
                    <div className="animated-info">
                      <span className="animated-item">health</span>
                      <span className="animated-item">days</span>
                      <span className="animated-item">lives</span>
                    </div>
                  </h1>
                  <p className="mb-4">
                    Medic Care is a Bootstrap 5 Template provided by TemplateMo
                    website. Credits go to FreePik and RawPixel for images used
                    in this template.
                  </p>
                  <div className="heroLinks d-flex flex-wrap align-items-center">
                    <a className="custom-link me-4" href="#about" data-hover="Learn More">
                      Learn More
                    </a>
                    <p className="contact-phone mb-0">
                      <i className="bi-phone"></i> 010-020-0340
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Button */}

        <div className="ai_button" onClick={toggleshow}>
          Click for AI
        </div>



        {isShow && (
          <div className="ai_container">
            <div className="blue_line">
              Practice Chatbot{" "}
              <button onClick={handleClear} className="clear_btn">
                Clear
              </button>
            </div>

            <div className="display">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
              {isLoading && (
                <div className="message bot">
                  <em>Replay...</em>
                </div>
              )}
            </div>

            <div className="input-container">
              <input
                type="text"
                className="chat-input"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button className="send-button" onClick={handleSend}>
                Send
              </button>
            </div>
          </div>)}




        <section className="section-padding" id="about">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-12">
                <h2 className="mb-lg-3 mb-3">Meet Dr. Carson</h2>
                <p>
                  Protect yourself and others by wearing masks and washing hands
                  frequently. Outdoor is safer than indoor for gatherings or
                  holding events. People who get sick with Coronavirus disease
                  (COVID-19) will experience mild to moderate symptoms and
                  recover without special treatments.
                </p>
                <p>
                  You can feel free to use this CSS template for your medical
                  profession or health care related websites. You can{' '}
                  <a
                    rel="nofollow"
                    href="http://paypal.me/templatemo"
                    target="_blank"
                  >
                    support us a little
                  </a>{' '}
                  via PayPal if this template is good and useful for your work.
                </p>
              </div>

              <div className="col-lg-4 col-md-5 col-12 mx-auto">
                <div className="featured-circle bg-white shadow-lg d-flex justify-content-center align-items-center">
                  <p className="featured-text">
                    <span className="featured-number">12</span> Years
                    <br /> of Experiences
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Responsive Container for Treatments */}
        <section className="section-padding" id="services">
          <div className="container">
            <h2 className="text-center mb-4">Our Treatments</h2>
            <div className="row g-4">
              <div className="col-lg-4 col-md-6">
                <div className="p-3 border rounded">
                  <h4>General Treatment</h4>
                  <img src='general.jpg' style={{ width: '50%', height: '10vw' }} />
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec luctus dictum eros ut imperdiet.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="p-3 border rounded">
                  <h4>Teeth Whitening</h4>
                  <img src='theeth1.jpg' style={{ width: '50%', height: '10vw' }} />
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec luctus dictum eros ut imperdiet.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="p-3 border rounded">
                  <h4>Heart Surgery</h4>
                  <img src='Heart1.jpg' style={{ width: '50%', height: '10vw' }} />
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec luctus dictum eros ut imperdiet.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="p-3 border rounded">
                  <h4>Ear Treatment</h4>
                  <img src='ear.WEBP' style={{ width: '50%', height: '10vw' }} />
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec luctus dictum eros ut imperdiet.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="p-3 border rounded">
                  <h4>Vision Problems</h4>
                  <img src='vision.PNG' style={{ width: '50%', height: '10vw' }} />
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec luctus dictum eros ut imperdiet.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="p-3 border rounded">
                  <h4>Blood Transfusion</h4>
                  <img src='blood.PNG' style={{ width: '50%', height: '10vw' }} />
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec luctus dictum eros ut imperdiet.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="gallery">
          <div className="container">
            <div className="row">

              <div className="col-lg-6 col-6 ps-0">
                <img src="images/gallery/medium-shot-man-getting-vaccine.jpg" className="img-fluid galleryImage" alt="get a vaccine" title="get a vaccine for yourself" />
              </div>

              <div className="col-lg-6 col-6 pe-0">
                <img src="images/gallery/female-doctor-with-presenting-hand-gesture.jpg" className="img-fluid galleryImage" alt="wear a mask" title="wear a mask to protect yourself" />
              </div>

            </div>
          </div>
        </section> <br />


        <div className='service_container'>

          <h1>Medical Services</h1>


          <div className='all_services'>

            {users.map((user) => (

              <div className='service_data' key={user.id}>

                <div className='service_img'>
                  <img src={user.imgSrc} alt={user.heading} style={{ width: "170px", height: "130px", opacity: 0.8 }} />
                </div>

                <table>

                  <tbody>


                    <tr className=''>

                      <td>

                        <h2>{user.heading}</h2>

                      </td>


                    </tr>

                    <tr>


                      <td>

                        <h5>{user.Price}</h5>

                      </td>

                    </tr>

                    <tr className=''>

                      <td>

                        <p> {user.data}</p>

                      </td>

                    </tr>


                  </tbody>

                </table>

                <div className="book_button">
                 <button className="add_button" onClick={() => handleBuyNow(user)}>Buy Now</button>
                </div>

              </div>
            ))}

          </div>


        </div>


        <section className="section-padding pb-0" id="timeline">
          <div className="container">
            <div className="row">

              <h2 className="text-center mb-lg-5 mb-4">Our Timeline</h2>

              <div className="timeline">
                <div className="row g-0 justify-content-end justify-content-md-around align-items-start timeline-nodes">
                  <div className="col-9 col-md-5 me-md-4 me-lg-0 order-3 order-md-1 timeline-content bg-white shadow-lg">
                    <h3 className=" text-light">Get the vaccine</h3>

                    <p>Donec facilisis urna dui, a dignissim mauris pretium a. Quisque quis libero fermentum, tempus felis eu, consequat nibh.</p>
                  </div>

                  <div className="col-3 col-sm-1 order-2 timeline-icons text-md-center">
                    <i className="bi-patch-check-fill timeline-icon"></i>
                  </div>

                  <div className="col-9 col-md-5 ps-md-3 ps-lg-0 order-1 order-md-3 py-4 timeline-date">
                    <time>2021-07-31 Saturday</time>
                  </div>
                </div>

                <div className="row g-0 justify-content-end justify-content-md-around align-items-start timeline-nodes my-lg-5 my-4">
                  <div className="col-9 col-md-5 ms-md-4 ms-lg-0 order-3 order-md-1 timeline-content bg-white shadow-lg">
                    <h3 className=" text-light">Consulting your health</h3>

                    <p>You are fully permitted to use this template for your commercial or personal website. You are not permitted to redistribute the template ZIP file for a download purpose on any other <a href="https://www.google.com/search?q=free+css" target="_blank">Free CSS collection</a> website.</p>
                  </div>

                  <div className="col-3 col-sm-1 order-2 timeline-icons text-md-center">
                    <i className="bi-book timeline-icon"></i>
                  </div>

                  <div className="col-9 col-md-5 pe-md-3 pe-lg-0 order-1 order-md-3 py-4 timeline-date">
                    <time>2021-07-15 Thursday</time>
                  </div>
                </div>

                <div className="row g-0 justify-content-end justify-content-md-around align-items-start timeline-nodes">
                  <div className="col-9 col-md-5 me-md-4 me-lg-0 order-3 order-md-1 timeline-content bg-white shadow-lg">
                    <h3 className=" text-light">Certified Nurses</h3>

                    <p>Phasellus eleifend, urna interdum congue viverra, arcu neque ultrices ligula, id pulvinar nisi nibh et lacus. Vivamus gravida, ipsum non euismod tincidunt, sapien elit fermentum mi, quis iaculis enim ligula at arcu.</p>
                  </div>

                  <div className="col-3 col-sm-1 order-2 timeline-icons text-md-center">
                    <i className="bi-file-medical timeline-icon"></i>
                  </div>

                  <div className="col-9 col-md-5 ps-md-3 ps-lg-0 order-1 order-md-3 py-4 timeline-date">
                    <time>2021-06-28 Monday</time>
                  </div>
                </div>

                <div className="row g-0 justify-content-end justify-content-md-around align-items-start timeline-nodes my-lg-5 my-4">
                  <div className="col-9 col-md-5 ms-md-4 ms-lg-0 order-3 order-md-1 timeline-content bg-white shadow-lg">
                    <h3 className=" text-light">Covid-19 Hospitals</h3>

                    <p className="mb-0 pb-0">Fusce vestibulum euismod nulla sed ultrices. Praesent rutrum nulla vel sapien euismod, quis tempus dui placerat.</p>

                    <p>Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Maecenas faucibus mollis interdum. Donec ullamcorper nulla non metus auctor fringilla</p>
                  </div>

                  <div className="col-3 col-sm-1 order-2 timeline-icons text-md-center">
                    <i className="bi-globe timeline-icon"></i>
                  </div>

                  <div className="col-9 col-md-5 pe-md-3 pe-lg-0 order-1 order-md-3 py-4 timeline-date">
                    <time>2021-05-30 Sunday</time>
                  </div>
                </div>

                <div className="row g-0 justify-content-end justify-content-md-around align-items-start timeline-nodes">
                  <div className="col-9 col-md-5 me-md-4 me-lg-0 order-3 order-md-1 timeline-content bg-white shadow-lg">
                    <h3 className=" text-light">Freelance Nursing</h3>

                    <p>If you need a working contact form that submits email to your inbox, please <a rel="nofollow" href="https://templatemo.com/contact" target="_parent">visit our contact page</a> for more information.</p>
                  </div>

                  <div className="col-3 col-sm-1 order-2 timeline-icons text-md-center">
                    <i className="bi-person timeline-icon"></i>
                  </div>

                  <div className="col-9 col-md-5 ps-md-3 ps-lg-0 order-1 order-md-3 py-4 timeline-date">
                    <time>2021-05-18 Tuesday</time>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>




        <section className="section-padding" id="booking">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-12 mx-auto">
                <div className="booking-form">
                  <h2 className="text-center mb-lg-3 mb-2">Book an appointment</h2>
                  <form role="form" action="#booking" method="post" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-6 col-12">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="form-control"
                          placeholder="Full name"
                          required
                          value={formData.name}
                          onChange={handleChange}

                        />
                      </div>
                      <div className="col-lg-6 col-12">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          pattern="[^ @]*@[^ @]*"
                          className="form-control"
                          placeholder="Email address"
                          required
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-lg-6 col-12">
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          pattern="^[0-9]{10}$"
                          className="form-control"
                          placeholder="Phone: 123-456-7890"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-lg-6 col-12">
                        <input type="date" name="date" id="date" className="form-control"
                          value={formData.date}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-12">
                        <textarea
                          className="form-control"
                          rows="5"
                          id="message"
                          name="message"
                          placeholder="Additional Message"
                          value={formData.message}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                      <div className="col-lg-3 col-md-4 col-6 mx-auto">
                        <button type="submit" className="form-control" id="submit-button">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="site-footer section-padding" id="contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 me-auto col-12">
              <h5 className="mb-lg-4 mb-3">Opening Hours</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex">Sunday : Closed</li>
                <li className="list-group-item d-flex">
                  Monday, Tuesday - Friday
                  <span>8:00 AM - 3:30 PM</span>
                </li>
                <li className="list-group-item d-flex">
                  Saturday
                  <span>10:30 AM - 5:30 PM</span>
                </li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-6 col-12 my-4 my-lg-0">
              <h5 className="mb-lg-4 mb-3">Our Clinic</h5>
              <p>
                <a href="mailto:hello@company.co">hello@company.co</a>
              </p>
              <p>123 Digital Art Street, San Diego, CA 92123</p>
            </div>

            <div className="col-lg-3 col-md-6 col-12 ms-auto">
              <h5 className="mb-lg-4 mb-3">Socials</h5>
              <ul className="social-icon">
                <li>
                  <a href="#" className="social-icon-link bi-facebook"></a>
                </li>
                <li>
                  <a href="#" className="social-icon-link bi-twitter"></a>
                </li>
                <li>
                  <a href="#" className="social-icon-link bi-instagram"></a>
                </li>
                <li>
                  <a href="#" className="social-icon-link bi-youtube"></a>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-12 ms-auto mt-4 mt-lg-0">
              <p className="copyright-text">
                Copyright © Medic Care 2021
                <br />
                <br />
                Design:{" "}
                <a href="https://templatemo.com" target="_parent" rel="noopener noreferrer">
                  TemplateMo
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default Home
