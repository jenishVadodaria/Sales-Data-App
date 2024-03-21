import { useState, useEffect } from "react";
import styles from "./painPointCard.module.scss";
import GeneralContainerCard from "../../../components/containerCard/generalContainerCard";

const PainPointCard = (props: any) => {
  // const [size, setSize] = useState(620);
  const [showMore, setShowMore] = useState(false);
  const [readmore, setReadmore] = useState(false);
  const [arr, setArr] = useState([]);
  const capital = (text: any) => {
    const a = text[0].toUpperCase();
    return a + text.slice(1, text.length);
  };
  const total = props.contents;
  const lines = total.join(" !!! ");
  useEffect(() => {
    if (lines.length > 620) {
      setReadmore(true);
    }

    setArr(lines.slice(0, 620).split(" !!! "));
  }, [props.contents]);

  const readHandler = () => {
    setReadmore(false);
    setShowMore(true);

    setArr(lines.slice(0, lines.length).split(" !!! "));
  };
  const readLessHandler = () => {
    setShowMore(false);
    setReadmore(true);
    setArr(lines.slice(0, 620).split(" !!! "));
  };

  return (
    <>
      <div>
        <div style={{ width: "auto" }} className="rounded rounded-3 flex">
          <GeneralContainerCard
            isLoading={false}
            children={
              <div className="bg-white  pb-4">
                <div
                  className={
                    styles.curve +
                    ` ${"curves1" + props.cssCard} ${
                      props.type === "Problems"
                        ? styles.problems
                        : props.type === "painPoints"
                        ? styles.painPoints
                        : styles.challenges
                    } ` +
                    styles.colorWhite
                  }
                >
                  <h3
                    className={styles.heading + " mt-2 py-3 text-center fs-5 "}
                  >
                    {props.type == "painPoints"
                      ? "Pain Points"
                      : capital(props.type)}
                  </h3>
                </div>
                <ol
                  className={
                    styles.content +
                    "  bg-white pb-2 borderColor1" +
                    props.cssCard
                    //  +
                    // `${
                    //   props.type === "Problems"
                    //     ? styles.problemBorder
                    //     : props.type === "painPoints"
                    //     ? styles.painPointsBorder
                    //     : styles.challengesBorder
                    // } `
                  }
                >
                  {arr.map((item, i) => (
                    <li key={i} className="my-3 mx-3 lh-sm border-0 fs-6">
                      {i + 1}. {item}
                    </li>
                  ))}
                  {readmore && (
                    <div
                      className={`text-end my-2 fs-6 cursor-pointer pr-3 text-primary`}
                    >
                      <button
                        className={styles.readMoreColor}
                        onClick={readHandler}
                      >
                        Read more
                      </button>
                    </div>
                  )}
                  {showMore && (
                    <div className="text-end my-2 fs-6 cursor-pointer pr-3 text-primary">
                      <button
                        className={styles.readMoreColor}
                        onClick={readLessHandler}
                      >
                        Read less
                      </button>
                    </div>
                  )}
                </ol>
              </div>
            }
          />
        </div>
      </div>
    </>
  );
};

export default PainPointCard;
