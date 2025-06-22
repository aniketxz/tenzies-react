export default function Die(props) {
  return (
    <button
      onClick={props.hold}
      className={`custom-die-button ${
        props.isHeld
          ? "bg-green-600 text-white focus:ring-1 focus:ring-green-300 focus:ring-offset-1"
          : "bg-white text-gray-700"
      }`}
      aria-pressed={props.isHeld}
      aria-label={`Die with value ${props.value}, ${
        props.isHeld ? "held" : "not held"
      }`}
    >
      {props.value}
    </button>
  );
}
