import classes from "./Information.module.css";
import { getData } from "../util/localStorage.js";
export default function Information() {
  const info = getData("currentUser");
  return (
    <>
      <div className={classes.info}>
        <div className="py-14">
          {" "}
          <section
            className={` bg-white border max-w-xl mx-auto py-16 flex flex-col items-center rounded-2xl shadow-lg`}
          >
            <h2 className=" text-3xl italic mb-20  text-neutral-500">
              User Information{" "}
            </h2>

            {/* Phần info */}
            <div className="w-4/5 text-xl ">
              <table>
                <tr>
                  <td className="pr-12 italic">Tên :</td>
                  <td>{info.name}</td>
                </tr>
                <tr>
                  <td className="pr-12 italic">Email :</td>
                  <td>{info.email}</td>
                </tr>
                <tr>
                  <td className="pr-12 italic">Số điện thoại :</td>
                  <td>{info.phone}</td>
                </tr>
              </table>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
