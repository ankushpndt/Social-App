export const Backdrop = ({ children, toggle, className }) => {
  console.log(className);
  return (
    <div className={`backdrop `} onClick={() => toggle(false)}>
      {children}
    </div>
  );
};
