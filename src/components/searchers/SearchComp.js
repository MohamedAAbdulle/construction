import { ClickAwayListener } from "@material-ui/core";
import InputComp from "components/input/InputComp";
import React from "react";
import "./searcher.sass";

const SearchComp = ({
  onAction,
  list,
  resultFormat,
  error,
  label,
  placeholder,
  value,
}) => {
  const [foundItems, setFoundItems] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value);
  const [inputValue2, setInputValue2] = React.useState(value);

  const getSearchResult = (query) => {
    let r = [];
    if (query)
      r = list.filter((q) =>
        q.name.toLowerCase().includes(query.toLowerCase())
      );
    setFoundItems(r);
    setInputValue(query);
    console.log("hello");
  };

  const onSelect = (item) => {
    console.log(item);
    setInputValue2(item.name);
    setInputValue(item.name);
    setFoundItems(false);
    onAction(item);
  };

  const onBlur = () => {
    setInputValue(inputValue2);
    setFoundItems(false);
  };

  //React.useEffect(()=>setInputValue("nn"),[])

  return (
    <ClickAwayListener onClickAway={onBlur}>
      <div className="searcher">
        <>
          <InputComp
            type="search"
            label={label || "Inventory"}
            onChange={(e) => getSearchResult(e.target.value)}
            value={inputValue}
            placeholder={placeholder}
            error={error}
          />
          {foundItems && inputValue && (
            <div className="searcher-results-comp">
              {foundItems.length ? (
                foundItems.map((i) => (
                  <div className="searcher-result" onClick={() => onSelect(i)}>
                    {resultFormat(i)}
                  </div>
                ))
              ) : (
                <p className="no-result">no result</p>
              )}
            </div>
          )}
        </>
      </div>
    </ClickAwayListener>
  );
};

export default SearchComp;
