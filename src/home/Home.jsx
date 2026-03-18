import bg from "./../assets/bg.png";
import "./Home.css";
import SearchBar from "./../auth/search-input/Search";

export default function Home() {
  return (
    <div className="home-page ">
      <div className="text-container flex-col">
        <div className="wrapper">
          <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et quaerat
            voluptatem velit. Facilis debitis temporibus velit quaerat
            necessitatibus vero officia eaque eveniet dicta, eos tempore nobis
            asperiores beatae placeat voluptas! Enim architecto esse eaque,
            adipisci totam?
          </p>
          <SearchBar />
        </div>

        <div className="boxes flex justify-between">
          <div className="box">
            <h1>16+</h1>
            <h2>Years of Experience</h2>
          </div>
          <div className="box">
            <h1>200</h1>
            <h2>Award Gained</h2>
          </div>
          <div className="box">
            <h1>1200+</h1>
            <h2>Property Ready</h2>
          </div>
        </div>
      </div>

      <div className="image-container  bg-[#fcf5f3]">
        <img src={bg} alt="background-image" />
      </div>
    </div>
  );
}
