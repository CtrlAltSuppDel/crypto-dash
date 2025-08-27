import { BarLoader } from "react-spinners";

const cssOverride = {
  display: "block",
  margin: "0 auto",
};

const Spinner = ({ color = "blue", size = "150" }) => {
  return (
    <div>
      <BarLoader
        color={color}
        size={size}
        cssOverride={cssOverride}
        aria-label="Loading..."
      />
    </div>
  );
};

export default Spinner;
