const Select = (props) => {
  return (
    <select
      className="py-1 px-2 text-sm bg-gray-200 rounded-md outline-none cursor-pointer"
      name={props.optionData.name}
      id={props.optionData.id}
      onChange={props.onChange}
      value={props.value}
    >
      {props.optionData.option.map((each) => {
        return (
          <option key={each.value} value={each.value}>
            {each.title}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
