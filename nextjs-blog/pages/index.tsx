import React from "react";
import { Analytics } from "@vercel/analytics/react";

import Map2 from "../components/Map2";
import ContactUsForm from "../components/ContactUsForm";

import styles from "../styles/Home.module.css";
import Image from "next/image";

import easternSpaJpg from "../public/assets/img/eastern-spa.jpg";

import header__logoText from "../public/assets/img/spa-logo-text-only.png";
import header__logoIcon from "../public/assets/img/logo-small.jpg";

import card1 from "../public/assets/img/swedish-16-9.jpg";
import card2 from "../public/assets/img/deep-16-9.jpg";
import card3 from "../public/assets/img/foot-16-9.jpg";
import card4 from "../public/assets/img/hot-16-9.jpg";
import CouponAlert from "../components/CouponAlert";

export default function Home() {
  return (
    <>
      <CouponAlert />
      <div className="min-h-screen flex flex-col justify-center items-center py-0 px-2 bg-green text-white">
        <main className="mt-[3.625rem]">
          {/* Header */}
          <div className="flex flex-col items-center w-full my-8 sm:flex-row sm:justify-between">
            <div className="flex justify-center items-center mb-8 sm:mb-0 sm:ml-8">
              <Image
                src={header__logoIcon}
                alt="Eastern Spa Logo Icon"
                className="w-12 h-12 mr-4 sm:w-16 sm:h-16"
              />
              <br />
              <Image
                src={header__logoText}
                alt="Eastern Spa Logo Text"
                className="w-40"
              />
            </div>
            <div className="grid place-items-center text-sm sm:mr-8 sm:place-items-end sm:text-base">
              <p>1304 NJ-47 unit w</p>
              <p>Rio Grande, NJ 08242</p>
              <p>
                <a href="tel:+16097703693">(609) 770-3693</a>
              </p>
            </div>
          </div>

          {/* Main Image - Explore Eastern Spa */}
          <div className="relative">
            <Image
              className="max-w-full w-screen h-auto transition-transform duration-500 ease-in-out opacity-90 hover:scale-[1.02] hover:opacity-80 hover:bg-[rgba(0,0,0,0.5)] hover:shadow-[0_0_10px_rgba(0,0,0,0.3)]"
              src={easternSpaJpg}
              alt="Eastern Spa"
              priority={true}
            />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 font-extralight text-3xl w-full text-center sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl">
              <p>EXPLORE EASTERN SPA</p>
            </div>

            <a
              className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-linear border-2 border-white rounded-md p-3 uppercase text-center text-xs font-light outline-none bg-transparent hover:bg-white hover:text-darkgreen hover:shadow md:p-5 md:text-xl"
              href="tel:+16097703693"
            >
              Call To Learn More
            </a>
          </div>

          {/* Intro paragraph Section */}
          <div className="bg-darkgreen w-full flex flex-col items-center p-5">
            <h1 className="font-normal text-xl mt-6">Eastern Spa Overview</h1>
            <hr className="w-1/2 my-5" />
            <p className=" text-sm text-justify leading-relaxed mb-6 md:w-3/4">
              We provide high quality Chinese massage therapy in Rio Grande,
              Cape May, NJ. Our expert therapists are trained in numerous
              therapies including Swedish and deep tissue massages, reflexology,
              and more. Eastern Spa has been providing relaxing comfort over 10
              years. Our facility offers three single rooms and one family size
              room, and multiple services, all day hours and more.
            </p>
          </div>

          {/* Google Map */}
          <div className="bg-white-marble w-screen flex flex-col gap-8 items-center text-sm md:flex-row">
            <div className="bg-darkgreen mt-12 flex flex-col items-center justify-center p-8 gap-2 min-w-[70%] md:min-w-fit md:w-1/2 md:ml-12 md:mt-0">
              <h1 className="text-2xl font-apple mb-2">
                Eastern Spa LLC &reg;
              </h1>
              <span>1304 NJ-47 unit w</span>
              <span>Rio Grande, NJ 08242</span>

              <span className="italic text-lg">Open Daily</span>
              <div className="relative pl-3 before:content-[''] before:absolute before:left-0 before:top-[7%] before:-translate-y-50 before:bg-white before:h-[87%] before:w-0.5">
                <h2 className="italic mb-1">Mon - Sun 10am - 10pm</h2>
                <h2 className="italic mb-1">Apps/Walk-ins Welcome!</h2>
                <h2 className="italic">
                  <a href="tel:+16097703693">
                    <i
                      className="fas fa-phone fa-beat"
                      style={{ animationDuration: "3s" }}
                    ></i>
                    &nbsp;&nbsp;&nbsp;
                    <span className="text-yellow-100 underline inline-block animate-pulseZoom">
                      609.770.3693
                    </span>
                  </a>
                </h2>
              </div>
            </div>
            <div className="grid place-items-center w-[70%] mb-12 md:w-1/2 md:mr-12 md:mt-12">
              <Map2 />
            </div>
          </div>

          {/* Card Section */}
          <div className="grid place-items-center mt-12 mb-10 text-2xl font-light">
            <span>Our Services</span>
          </div>

          <div className={styles.grid}>
            <div className={styles.grid__card}>
              <Image
                className={styles.grid__card_img}
                src={card1}
                alt="Swedish"
              />
              <span>Swedish</span>
              <p className={styles.grid__card_paragraph}>
                Swedish massage is designed to relax the entire body by rubbing
                the muscles in long, gliding strokes in the direction of blood
                returning to the heart.
              </p>
            </div>

            <div className={styles.grid__card}>
              <Image
                className={styles.grid__card_img}
                src={card2}
                alt="Deep Tissue"
              />
              <span>Deep Tissue</span>
              <p className={styles.grid__card_paragraph}>
                Deep tissue massage targets chronic tension in muscles that lie
                far below the body's surface. Slow strokes or friction movements
                that go across the muscle grain.
              </p>
            </div>

            <div className={styles.grid__card}>
              <Image
                className={styles.grid__card_img}
                src={card3}
                alt="Foot Massage"
              />
              <span>Foot Massage</span>
              <p className={styles.grid__card_paragraph}>
                Foot massage involves working on the feet with pressure,
                manually promote relaxation and health.
              </p>
            </div>

            <div className={styles.grid__card}>
              <Image
                className={styles.grid__card_img}
                src={card4}
                alt="Hot stone"
              />
              <span>Hot Stone</span>
              <p className={styles.grid__card_paragraph}>
                Hot stone used to help you relax and ease tense muscles and
                damaged soft tissues throughout your body.
              </p>
            </div>
          </div>

          {/* Contact Us Form Section */}
          <div className="bg-white-marble w-full px-10 py-12">
            <div className="bg-darkgreen w-full p-6 flex flex-col justify-center items-center">
              <ContactUsForm />
            </div>
          </div>
        </main>

        <footer>
          <Image
            className="w-8 h-8 mr-4"
            src={header__logoIcon}
            alt="Eastern Spa Logo"
          />
          <a
            href="https://eastern-spa.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Copyright © 2023 Eastern Spa LLC. All rights reserved.
          </a>
        </footer>

        <style jsx>{`
          main {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          footer {
            width: 100%;
            height: 100px;
            border-top: 1px solid #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          footer img {
            margin-left: 0.5rem;
          }
          footer a {
            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            color: inherit;
            font-size: 12px;
          }
          code {
            background: #fafafa;
            border-radius: 5px;
            padding: 0.75rem;
            font-size: 1.1rem;
            font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
              DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
          }
        `}</style>

        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }
          * {
            box-sizing: border-box;
          }
        `}</style>
      </div>

      <Analytics />
    </>
  );
}
