import HomeClient from "@/client/Home";
import { serverGetRecommendProducts } from "./serverGetRecommendProducts";

const Home = async () => {
  const data = await serverGetRecommendProducts();
  return (
    <div>
      <HomeClient recommendedProducts={data.products} />
    </div>
  );
};

export default Home;
