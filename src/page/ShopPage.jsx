import Banner from "../components/ShopPage/Banner";
import ProductList from "../components/ShopPage/ProductList";
import SearchSection from "../components/ShopPage/SearchSection";
export default function ShopPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Banner></Banner>
      <section className="my-10 flex justify-between gap-7">
        {" "}
        <SearchSection className="basis-1/4"></SearchSection>
        <div className="basis-3/4">
          <form action="" className="h-8 flex justify-between mb-7">
            <input
              type="text"
              className="p-3 w-48 border-gray-200 hover:border-gray-400 border-solid border-2"
              placeholder="Enter Search Here!"
            />
            <select
              name=""
              id=""
              className="border-solid border-gray-400 text-sm border-2"
            >
              <option value="">Default sorting</option>
            </select>
          </form>
          <ProductList></ProductList>
        </div>
      </section>
    </div>
  );
}
