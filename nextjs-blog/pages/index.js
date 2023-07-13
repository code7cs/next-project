import styles from '../styles/Home.module.css';
import Image from 'next/image'

import easternSpaJpg from '../public/assets/img/eastern-spa.jpg'

import header__logoText from '../public/assets/img/spa-logo-text-only.png'
import header__logoIcon from '../public/assets/img/logo-small.jpg'

import card1 from '../public/assets/img/Swedish2.jpg';
import card2 from '../public/assets/img/deep.png';
import card3 from '../public/assets/img/foot-massage.jpg';
import card4 from '../public/assets/img/Hot-Stone.jpg';

export default function Home() {
  return (
    <div className={styles.container}>
      {/* <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head> */}

      <main>
        <div className={styles.header}>
          <div className={styles.header__logo}>
            <Image
              src={header__logoIcon}
              alt="Eastern Spa Logo Icon"
              className={styles.header__logoIcon}
            />
            <br />
            <Image
              src={header__logoText}
              alt="Eastern Spa Logo Text"
              className={styles.header__logoText}
            />
          </div>
          <div className={styles.header__address}>
            <p>1304 NJ-47 unit w</p>
            <p>Rio Grande, NJ 08242</p>
            <p>(609) 770-3693</p>
          </div>
        </div>


        {/* Main Section */}
        <div className={styles.main__imageWrapper}>
          <Image
            className={styles.main__image}
            src={easternSpaJpg}
            alt="Eastern Spa"
          />
          <div className={styles.main__exploreText}>
            <p >EXPLORE EASTERN SPA</p>
          </div>

          <a className={styles.main__scheduleBtn} href="tel:+16097703693">Call To Learn More</a>
        </div>

        <div className={styles.main__intro}>
          <h1>Eastern Spa Overview</h1>
          <hr />
          <p>
            We provide high quality Chinese massage therapy in Rio Grande, NJ.
            Our expert therapists are trained in numerous therapies including Swedish and deep tissue massages, reflexology, and more.
            Eastern Spa has been providing relaxing comfort over 10 years.
            Our facility offers three rooms, multiple services, all day hours and more.
          </p>
        </div>

        {/* Card Section */}
        <div className={styles.grid}>
          <div className={styles.grid__card}>
            <Image className={styles.grid__card_img} src={card1} />
            <span>Swedish</span>
          </div>

          <div className={styles.grid__card}>
            <Image className={styles.grid__card_img} src={card2} />
            <span>Deep Tissue</span>
          </div>

          <div className={styles.grid__card}>
            <Image className={styles.grid__card_img} src={card3} />
            <span>Foot Massage</span>
          </div>

          <div className={styles.grid__card}>
            <Image className={styles.grid__card_img} src={card4} />
            <span>Hot Stone</span>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <Image className={styles.footer__logoIcon} src={header__logoIcon} />
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
  )
}
