export default function Button({ children, textOnly, classname, ...props }) {
  let cssclasses = textOnly ? "text-button" : "button";
  cssclasses += " " + classname;

  return (
    <button className={cssclasses} {...props}>
      {children}
    </button>
  );
}
