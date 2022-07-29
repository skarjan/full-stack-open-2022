const Filter = ({ filterValue, filterHandler }) => {
  return (
    <>
      filter shown with
      <input value={filterValue} onChange={filterHandler} />
    </>
  );
};

export default Filter