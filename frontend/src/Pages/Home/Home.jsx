import Navbar from "../../Component/Navbar";
import Feed from "../Feed/Feed";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">LinkedIn Clone - Home Feed</h1>
        <Feed />
      </div>
    </div>
  );
}
