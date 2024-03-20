// import { Ref } from "react"
import TopNavbar from "./topNavbar"
import SideNavbar from "./sideNavbar"

const Wrapper = ({ ref }: any) => {
    return (
      <div>
        <ComponentOne ref={ref} />
        <ComponentTwo forwardedRef={ref} />
      </div>
    );
  };

export default Wrapper;

  