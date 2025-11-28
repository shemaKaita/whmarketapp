import HomeClient from "@/client/Home";
import { serverGetRecommendProducts } from "./serverGetRecommendProducts";

// Force dynamic rendering to avoid build-time static generation
export const dynamic = "force-dynamic";

const Home = async () => {
  const data = await serverGetRecommendProducts();
  return (
    <div>
      <HomeClient recommendedProducts={data.products} />
    </div>
  );
};

export default Home;
