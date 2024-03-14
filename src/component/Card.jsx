import React, { useEffect, useState } from "react";
import axios from "axios";
import "./card.css";
export const Card = () => {
  const [val, setVal] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setVal(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [expandedCards, setExpandedCards] = useState([]);

  const toggleExpand = (id) => {
    if (expandedCards.includes(id)) {
      setExpandedCards(expandedCards.filter((item) => item !== id));
    } else {
      setExpandedCards([...expandedCards, id]);
    }
  };

  const removeCard = (id) => {
    setVal(val.filter((item) => item.id !== id));
  };

  return (
    <div className="container">
      <div className="row">
        {val.slice(0, 6).map((items) => {
          const isExpanded = expandedCards.includes(items.id);
          return (
            <div className="col-sm-4  mt-3" key={items.id}>
              <div
                className="card"
                style={{
                  minHeight: "400px",
                  maxHeight: "400px",
                  overflowY: "auto",
                }}
              >
                <div className="card-header">
                  <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={() => removeCard(items.id)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="card-body">
                  <h3>{isExpanded ? items.title : items.title.slice(0, 30)}</h3>
                  <p>{isExpanded ? items.body : items.body.slice(0, 100)}</p>
                  <button
                    className="btn btn-dark"
                    onClick={() => toggleExpand(items.id)}
                  >
                    {isExpanded ? "Read Less" : "Read More"}
                  </button>
                <img src="/image/img1.avif"/>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
