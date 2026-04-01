import * as React from 'react';

import styles from "./page.module.css";

import Button from "@components/Button";
import Accordion from "@components/Accordion";
import Skeleton from "@components/Skeleton";
import Showcase from "@components/Showcase";
import Logo from '@root/components/Logo';
import Editorial from '@components/Editorial';

export default function Home() {
  return (
    <div className={styles.page}>
        <div className={styles.root}>
          <section className={styles.hero}>
            <header className={styles.header}>
              <Logo type='icon'></Logo>
              {/* <div className={styles.mug}>
                <img src="/coffee_mug_2.png" width={64} height={64}/>
              </div> */}
              <span className={styles.heroText}>Systems-driven product designer and web developer who loves building software humans use.</span>
            </header>

            <div className={styles.showcase}>
              <Showcase></Showcase>
            </div>

            <div className={styles.outlinks}>
              {/* Socials */}
              <div className={styles.socials}>
                <a href="https://github.com/maxlair1" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 18 18" fill="none">
                    <g clipPath="url(#clip0_788_22036)">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.00745 0C4.02656 0 0 4.05625 0 9.07438C0 13.0856 2.57996 16.4811 6.15904 17.6828C6.60652 17.7732 6.77043 17.4876 6.77043 17.2473C6.77043 17.037 6.75568 16.3159 6.75568 15.5646C4.25002 16.1055 3.72824 14.4828 3.72824 14.4828C3.32557 13.4312 2.72893 13.1609 2.72893 13.1609C1.90883 12.605 2.78867 12.605 2.78867 12.605C3.69837 12.6651 4.17572 13.5364 4.17572 13.5364C4.98089 14.9185 6.27833 14.528 6.8003 14.2876C6.87478 13.7016 7.11355 13.296 7.36706 13.0707C5.36863 12.8603 3.26602 12.0791 3.26602 8.59353C3.26602 7.60196 3.6237 6.79071 4.19047 6.15978C4.10105 5.93447 3.7878 5.00283 4.28008 3.7559C4.28008 3.7559 5.04062 3.51547 6.75549 4.68736C7.48969 4.48873 8.24685 4.38768 9.00745 4.38683C9.76799 4.38683 10.5433 4.49211 11.2592 4.68736C12.9743 3.51547 13.7348 3.7559 13.7348 3.7559C14.2271 5.00283 13.9137 5.93447 13.8242 6.15978C14.4059 6.79071 14.7489 7.60196 14.7489 8.59353C14.7489 12.0791 12.6463 12.8452 10.6329 13.0707C10.9611 13.3561 11.2443 13.8969 11.2443 14.7533C11.2443 15.9702 11.2295 16.9468 11.2295 17.2472C11.2295 17.4876 11.3936 17.7732 11.8409 17.683C15.42 16.4809 18 13.0856 18 9.07438C18.0147 4.05625 13.9734 0 9.00745 0Z" fill="var(--text)"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_788_22036">
                        <rect width="18" height="18" fill="var(--text)"/>
                      </clipPath>
                    </defs>
                  </svg>
                </a>
                <a href="https://bsky.app/profile/maxlair.bsky.social" aria-label="Bluesky" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 18 18" fill="none">
                    <path d="M4.07157 2.27583C6.06645 3.79465 8.21217 6.87419 8.99997 8.52685C9.78783 6.87431 11.9334 3.79462 13.9284 2.27583C15.3678 1.1799 17.7 0.331942 17.7 3.0302C17.7 3.56908 17.3953 7.55707 17.2166 8.2045C16.5955 10.4554 14.3323 11.0295 12.3191 10.6821C15.8381 11.2895 16.7333 13.3014 14.8 15.3133C11.1283 19.1343 9.52275 14.3546 9.11115 13.1298C9.03573 12.9053 9.00043 12.8003 8.99992 12.8896C8.99939 12.8003 8.9641 12.9053 8.88869 13.1298C8.47726 14.3546 6.8717 19.1344 3.19979 15.3133C1.26647 13.3014 2.16164 11.2893 5.6807 10.6821C3.66746 11.0295 1.4042 10.4554 0.783196 8.2045C0.60451 7.55701 0.299866 3.56902 0.299866 3.0302C0.299866 0.331942 2.63213 1.1799 4.07147 2.27583H4.07157Z" fill="#1185FE"/>
                  </svg>
                </a>
                <a href='https://linkedin.com/in/maxlair' aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 18 18" fill="none">
                    <g clipPath="url(#clip0_788_22035)">
                      <rect width="24" height="24" rx="2" fill="white"/>
                      <path d="M16.6712 0H1.32875C0.976344 0 0.638371 0.139993 0.389182 0.389182C0.139993 0.638371 0 0.976344 0 1.32875V16.6712C0 17.0237 0.139993 17.3616 0.389182 17.6108C0.638371 17.86 0.976344 18 1.32875 18H16.6712C17.0237 18 17.3616 17.86 17.6108 17.6108C17.86 17.3616 18 17.0237 18 16.6712V1.32875C18 0.976344 17.86 0.638371 17.6108 0.389182C17.3616 0.139993 17.0237 0 16.6712 0ZM5.365 15.3337H2.65875V6.7375H5.365V15.3337ZM4.01 5.54625C3.70302 5.54452 3.40344 5.4519 3.14905 5.28007C2.89466 5.10823 2.69688 4.8649 2.58066 4.58077C2.46444 4.29664 2.43499 3.98444 2.49602 3.68359C2.55706 3.38274 2.70585 3.10671 2.92362 2.89034C3.14138 2.67396 3.41836 2.52695 3.7196 2.46785C4.02084 2.40874 4.33283 2.4402 4.61621 2.55824C4.89959 2.67628 5.14165 2.87563 5.31185 3.13111C5.48204 3.38659 5.57274 3.68677 5.5725 3.99375C5.5754 4.19928 5.53688 4.40328 5.45926 4.5936C5.38163 4.78393 5.26649 4.95668 5.12068 5.10155C4.97487 5.24643 4.80139 5.36046 4.61057 5.43686C4.41975 5.51326 4.2155 5.55047 4.01 5.54625ZM15.34 15.3412H12.635V10.645C12.635 9.26 12.0463 8.8325 11.2863 8.8325C10.4838 8.8325 9.69625 9.4375 9.69625 10.68V15.3412H6.99V6.74375H9.5925V7.935H9.6275C9.88875 7.40625 10.8038 6.5025 12.2 6.5025C13.71 6.5025 15.3412 7.39875 15.3412 10.0238L15.34 15.3412Z" fill="#0A66C2"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_788_22035">
                        <rect width="18" height="18" rx="2" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </a>
              </div>
              <div>
                <a href="/MAX_LAIR.pdf" aria-label="Download Resume" target="_blank" rel="noopener noreferrer">Download Resume</a>
                {' | '}
                <a href="/old.maxlair.com" aria-label="Old Website" target="_blank" rel="noopener noreferrer">Old Website</a>
              </div>
            </div>

          </section>


          <section className={styles.editorials}>
            <aside className={styles.aside}>
              <header>
                <h3>About me</h3>
              </header>
              <div>
                <Accordion title="Education and certifications">
                  <ul>
                    <li>BFA in Graphic Design</li>
                    <li>Adobe CC (Il, lis, Id) Certifications </li>
                    <li>Google UX Professional Certificate (1&2)</li>
                    <li>Harvard’s CS50</li>
                    <li>Semrush SEO Introductory Certification</li>
                  </ul>
                </Accordion>
                <Accordion title="Super duper subtitle!">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis modi nulla atque, numquam voluptatibus nihil eligendi ex nesciunt pariatur. Labore assumenda temporibus maiores culpa doloribus illo incidunt officiis nobis vel tempora inventore repellat, nulla impedit repudiandae dolore saepe provident iure amet a dolores! Rem harum corrupti tempora sapiente omnis tempore.
                  </p>
                  <code>Test Code</code>
                </Accordion>
                <Accordion title="Super duper subtitle!">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis modi nulla atque, numquam voluptatibus nihil eligendi ex nesciunt pariatur. Labore assumenda temporibus maiores culpa doloribus illo incidunt officiis nobis vel tempora inventore repellat, nulla impedit repudiandae dolore saepe provident iure amet a dolores! Rem harum corrupti tempora sapiente omnis tempore.
                  </p>
                  <code>Test Code</code>
                </Accordion>
              </div>
            </aside>
            <main>
              <header>
                <h3>Thoughts & projects</h3>
              </header>
              <section className={styles.masonry}>
                <Editorial src='https://images.unsplash.com/photo-1745613998978-fae3bf6308fa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' color="teal" title="Editorial Title" subtitle="Editorial Subtitle">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </Editorial>
                <Editorial color="green" title="Editorial Title" subtitle="Editorial Subtitle">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </Editorial>
                <Editorial color="maroon" title="Editorial Title" subtitle="Editorial Subtitle">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </Editorial>
                <Editorial src='https://images.unsplash.com/photo-1745613998978-fae3bf6308fa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' color="teal" title="Editorial Title" subtitle="Editorial Subtitle">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </Editorial>
                <Editorial color="green" title="Editorial Title" subtitle="Editorial Subtitle">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </Editorial>
                <Editorial color="maroon" title="Editorial Title" subtitle="Editorial Subtitle">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </Editorial>
                <Editorial src='https://images.unsplash.com/photo-1745613998978-fae3bf6308fa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' color="teal" title="Editorial Title" subtitle="Editorial Subtitle">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </Editorial>
                <Editorial color="green" title="Editorial Title" subtitle="Editorial Subtitle">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </Editorial>
                <Editorial color="maroon" title="Editorial Title" subtitle="Editorial Subtitle">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </Editorial>
              </section>
            </main>
          </section>

        </div>
    </div>
  );
}
