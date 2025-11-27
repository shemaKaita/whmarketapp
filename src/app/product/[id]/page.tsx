import serverGetProduct from "@/app/serverGetProduct";
import ProductClient from "@/client/Product";

type ProductProps = {
  params: Promise<{ id: string }>;
};

const Product = async ({ params }: ProductProps) => {
  const resolvedParams = await params;
  const data = await serverGetProduct(resolvedParams.id);
  return <ProductClient product={data.product} />;
};

export default Product;
