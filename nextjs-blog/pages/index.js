import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image'
import easternSpaJpg from '../public/assets/img/eastern-spa.jpg'
import logoJpg from '../public/assets/img/spa-logo.jpg'
import logoSmallJpg from '../public/assets/img/logo-small.jpg'
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
        <Image
          src={logoJpg}
          alt="Eastern Spa"
          className={styles.logoJpg}
        />
        {/* <h1 className={styles.title}>
          Eastern Spa
        </h1> */}

        <Image
          className={styles.mainImage}
          src={easternSpaJpg}
          alt="Eastern Spa"
        />

        <div className={styles.exploreText}>
          <p >EXPLORE EASTERN SPA</p>
        </div>

        <a className={styles.scheduleBtn} href="tel:+12012386649">Call To Learn More</a>




        {/* <a href="https://eastern-spa.com" className={styles.card}>
          <h3>Swedish & Deep Tissue & Foot Massage & Hot Stone &rarr;</h3>
        </a> */}


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


        {/*
        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Swedish & Deep Tissue & Foot Massage & Hot Stone &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div> */}
      </main>

      <footer className={styles.footer}>
        <Image className={styles.logoSmallJpg} src={logoSmallJpg} />
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
