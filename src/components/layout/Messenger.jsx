export default function Messenger() {
  const styles = {
    customer: "py-2 px-3 text-neutral-100 bg-sky-400 rounded",
    customerHolder: "self-end mb-6",
    admin: "py-2 px-3 text-neutral-500 bg-neutral-200 rounded",
    adminHolder: " mb-6 flex",
  };
  return (
    <div className="flex flex-col justify-between">
      {/* Logo */}
      <div className="flex justify-between p-3 border-b-2 border-neutral-100">
        <h3 className="text-lg font-bold">Customer Support</h3>
        <div className="py-1 px-2 text-neutral-400 text-sm rounded-sm italic bg-neutral-200">
          Let's Chat App
        </div>
      </div>
      {/* Khung chat */}
      <div className="flex flex-col p-4 h-[25rem]">
        <div className={styles.customerHolder}>
          <span className={styles.customer}>Xin chào</span>
        </div>
        <div className={styles.customerHolder}>
          {" "}
          <span className={styles.customer}>
            Làm thế nào để xem các sản phẩm
          </span>
        </div>
        <div className={styles.adminHolder}>
          <img
            className="w-10"
            src={require("../../image/3_avatar-512.png")}
            alt=""
          />
          <span className={styles.admin}>ADMIN: Chào bạn</span>
        </div>
        <div className={styles.adminHolder}>
          <img
            className="w-10"
            src={require("../../image/3_avatar-512.png")}
            alt=""
          />
          <span className={styles.admin}>ADMIN: Bạn có thể vào mục Shop</span>
        </div>
      </div>
      {/* Phần chat */}
      <div className="h-12 border-2 bg-neutral-100">
        <div className="py-2 pl-5 flex">
          <img
            className="w-8 mr-3 inline-block"
            src={require("../../image/3_avatar-512.png")}
            alt=""
          />
          <input className="w-64" type="text" placeholder="Enter Message!" />
          <div>
            {" "}
            <label className="cursor-pointer ml-2" for="file-input">
              <i className="fa-solid fa-paperclip text-neutral-400 hover:text-neutral-500 text-xl"></i>
            </label>
            <input className="hidden" id="file-input" type="file" />
            <i className="fa-solid fa-face-smile cursor-pointer text-xl ml-4 text-neutral-400 hover:text-neutral-500 inline-block"></i>
            <button className="bg-transparent">
              {" "}
              <i className="fa-solid fa-paper-plane text-sky-400 text-xl ml-4 hover:text-sky-500"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
