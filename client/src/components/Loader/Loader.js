import { Oval } from "react-loader-spinner";
import {ThreeDots} from "react-loader-spinner";

import "./Loader.css";

const Loader=()=>{
    return (
      <div className="loader-body">
        <Oval
          height={80}
          width={80}
          color="white"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#dfdfdf90"
          strokeWidth={4}
          strokeWidthSecondary={4}
        />
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="white"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    );
}

export default Loader;