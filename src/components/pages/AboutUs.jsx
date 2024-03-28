import React from "react";
import Banner from "../common/Banner";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";

const AboutUs = () => {


  return (
    <>
      {/* <Banner
        imgSrc={"/images/banner/banner-about.jpg"}
        currentPage={"about us"}
      /> */}
      <section className="about">
        <div className="container">
          <div className="content">
            <h2>about us</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum,
              perferendis illo?
            </p>
          </div>
          <div className="content">
            <h2>who we are</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
              doloremque, perspiciatis reprehenderit placeat architecto minus
              velit facilis eveniet ipsum voluptates. Blanditiis aperiam ipsam
              obcaecati at corrupti. Laborum, ex blanditiis dolore nobis alias
              maxime praesentium eligendi excepturi quod, aspernatur laboriosam
              repellat, saepe voluptates officia? Veniam dignissimos amet
              tempora. Dignissimos sed deserunt tenetur magni rerum quas,
              dolores maxime quaerat quo debitis culpa delectus hic cupiditate
              quisquam perspiciatis consequuntur at architecto repellat,
              deleniti laborum eum et earum. Reprehenderit inventore placeat
              porro eius dolores! Repellat molestiae porro aperiam dignissimos?
              Laboriosam nulla asperiores ullam hic ipsa amet harum aut
              consectetur atque possimus explicabo, quae maxime porro! Assumenda
              nam deserunt, sed fugiat culpa tempore pariatur magni, corrupti
              laudantium nisi, laboriosam atque quia modi ratione ullam rerum
              necessitatibus delectus illo laborum beatae similique. Magni
              veniam officiis sequi. Incidunt esse, deleniti dolor
              necessitatibus alias perferendis voluptatem doloremque ut
              praesentium, ducimus provident fugiat laudantium sapiente
              exercitationem veritatis recusandae. Omnis facere possimus dolores
              ab. Distinctio sed rerum aliquid temporibus corrupti molestias
              dolorum itaque similique deserunt laudantium dignissimos
              reiciendis non in delectus quos vitae, repudiandae quo ipsam a
              aperiam. Ullam molestias quas eligendi. Ducimus ipsum ex sit a,
              voluptatum cum dolore eum quis saepe esse rem? Suscipit dolor a
              quis perferendis?
            </p>
          </div>
          <div className="content" >
            <h2>the artist</h2>
            <div className="artist-pic">
              <img src="/images/artist-pp.jpg" alt="artist picture" />
            </div>
            <p>Muhammed Atef</p>
              <div className="social-icons">
                <Link
                  to={"https://www.facebook.com/"}
                  target="blank"
                  className="icon-container"
                >
                  <FaFacebookF />
                </Link>
                <Link
                  to={"https://www.instagram.com/"}
                  target="blank"
                  className="icon-container"
                >
                  <FaInstagram />
                </Link>
                <Link
                  to={"https://www.tiktok.com/en/"}
                  target="blank"
                  className="icon-container"
                >
                  <FaTiktok />
                </Link>
              </div>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Veritatis laborum asperiores cumque esse, saepe dolor facere
              assumenda quasi voluptate eaque id a non nemo totam placeat sit
              delectus voluptatibus molestias suscipit magni soluta.
            </p>
          </div>
          <div className="content">
            <h2>vision</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur iure cumque numquam. Commodi odio numquam, perspiciatis
              ad a suscipit consequuntur doloremque repellendus nihil deleniti.
              Ad eius voluptate repudiandae nemo magni officia at rem, in veniam
              quibusdam expedita doloremque optio exercitationem. Ut inventore
              ad voluptatem reiciendis aliquid molestiae perferendis similique
              nesciunt!
            </p>
          </div>
          <div className="content">
            <h2>values</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum,
              perferendis illo?
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
