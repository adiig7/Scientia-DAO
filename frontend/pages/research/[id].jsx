import React from "react";
import styles from "../../styles/Research.module.css";
import Head from "next/head";
import Image from "next/image";

export default function () {

    let url = "https://ipfs.io/ipfs/bafybeiebtlvqo4tgm4gfgwnw4v7hlsoz7zf3coyvbt7j2d7ucabmiqyj7q/players/1.png";

  return (
    <>
      <Head>
        <title>Read Research</title>
        <meta
          name="description"
          content="PUBLISH and SHARE YOUR RESEARCH ON THE WORLD'S FIRST DAO COMMUNITY FOR SCIENTISTS"
        />
        <link rel="icon" href="/microscope.png" />
      </Head>

      <main className={styles.main}>
        <h2>Fritz Haber&#39;s Experiments in Life and Death</h2>
        {/* <small>
          {" "}
          &#40; by 0x8c0Bf9B1BFa0dc00f7eC63ac528010Fbeb818CA6 &#41;
        </small> */}
        <div className={styles.research}>
          <p>
            In April of 1915, Allied forces were battling the German Army for
            control of Ypres, a Flemish town in western Belgium. Months before,
            fighting with many young and untested soldiers, the Germans had
            taken heavy casualties there in a battle they called the Massacre of
            the Innocents of Ypres. This time, they were determined to launch
            their first major attack on the Western Front. With thousands of
            French, British, Belgian and Canadian forces dug in around the town,
            the Germans turned to Fritz Haber. In 1918, Haber would be awarded
            the Nobel Prize in chemistry for his work in developing a method of
            synthesizing ammonia from nitrogen in the air—the process that
            enabled the production of fertilizer in quantities that
            revolutionized agriculture worldwide. But in the winter of 1915,
            Haber&#39;s thoughts turned to annihilating the Allies. For his
            efforts directing a team of scientists on the front lines in World
            War I, he would become known as the father of chemical warfare.
            <br />
            <br />
            Fritz Haber was born in Breslau, Prussia (now Wroclaw, Poland), in
            1868, and educated at the St. Elizabeth Classical School, where he
            took an early interest in chemistry. After studying at the
            University of Berlin, he transferred to the University of Heidelberg
            in 1886 and studied under the famed German chemist Robert Bunsen.
            Haber was ultimately appointed professor of physical chemistry and
            electrochemistry at the Karlshruhe Institute of Technology. When
            scientists warned that the world would not be able to produce enough
            food to feed its growing human population in the 20th century, he
            listened. Scientists knew nitrogen was crucial to plant life; they
            also knew the earth&#39;s supply of usable quantities was quite
            limited. But Haber discovered a way to convert the nitrogen gas in
            the earth&#39;s atmosphere into a compound that could be used in
            fertilizer. According to Vaclav Smil, a global agricultural
            historian at the University of Manitoba in Winnipeg, the Haber–Bosch
            process of synthesizing and manufacturing ammonia from nitrogen and
            hydrogen (and later industrialized by Carl Bosch, Haber&#39;s
            brother-in-law) was likely the most important technological
            innovation of the 20th century. It sustains the food base for the
            equivalent of half the world&#39;s population today.
            <br />
            <br />
            In 1901, Haber married the brilliant chemist Clara Immerwahr, the
            first woman to receive a doctorate from Breslau University. Years
            before, she&#39;d spurned a marriage proposal from him to focus on
            her studies and career. Like Haber, she converted from Judaism to
            Christianity, and the couple settled in Karlsruhe. But it wasn&#39;t
            long before Clara Haber&#39;s research took a back seat to the
            demands of being a homemaker and, after the birth of their son in
            1902, a mother. To keep her mind stimulated, she began collaborating
            with her husband on a textbook on the thermodynamics of gas, and
            tried to continue her own research, writing and speaking. As her
            husband&#39;s reputation spread, she was incensed to learn that her
            audiences assumed that he had written her lectures. Meanwhile,
            Haber&#39;s career flourished, and around the start of World War I,
            the German Army requested his help in the development of replacing
            explosives in shells with poison gasses.
          </p>
          <h3>Research Media </h3>
          <div className={styles.media}>
          <Image
            src={url}
            alt="Picture of the author"
            width={200}
            height={200}
          />
          </div>
          <button className={styles.button}>Apply for Grants</button>
        </div>
      </main>
    </>
  );
}
