import { useRouteLoaderData, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Product from "./Product";

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get("search");

  // Lấy dữ liệu product
  const data = useRouteLoaderData("product-sample");

  // Khởi tạo list với full product, sau đó lọc theo query parameter
  const filteredProduct =
    !searchValue || searchValue === ("all" || "")
      ? data
      : data.filter((product) => product.category === searchValue);

  return (
    <div className="flex flex-wrap gap-9">
      {filteredProduct.map((product) => (
        <Product
          key={product._id.$oid}
          id={product._id.$oid}
          img={product.img1}
          name={product.name}
          price={product.price}
        ></Product>
      ))}
    </div>
  );
}
