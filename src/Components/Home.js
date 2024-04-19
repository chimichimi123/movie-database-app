import React from "react";
import "../App.css";

function Home() {
  return (
    <div className="Home">
      <h1>Welcome to my Movie App!</h1>
      <p>Explore and enjoy!</p>
      <p>
        This application uses an external API to display information related to
        movies. It also includes a "like" function that utilizes a db.json file.
      </p>
    </div>
  );
}

export default Home;
