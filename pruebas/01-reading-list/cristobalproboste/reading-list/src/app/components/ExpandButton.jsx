import ArrowTop from "./svgs/ArrowTop";
import ArrowBottom from "./svgs/ArrowBottom";

const ExpandButton = ({ onClick, show }) => {
  const className = "h-6 w-6 sm:h-8 sm:w-8";
  return (
    <button onClick={onClick}>
      {show ? (
        <ArrowBottom className={className} />
      ) : (
        <ArrowTop className={className} />
      )}
    </button>
  );
};

export default ExpandButton;
