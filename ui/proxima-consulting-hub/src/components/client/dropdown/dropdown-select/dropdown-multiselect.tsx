"use client";

import { useState, useEffect, useRef, ChangeEvent, MouseEvent } from "react";

export type DropdownMultiSelectProps = {
    formFieldName: string;
    options: {[key: string]: any};
    onChange: (selected: {[key: string]: any}) => void;
    prompt?: string;
}

export default function DropdownMultiSelect({
  formFieldName,
  options,
  onChange,
  prompt = "Select one or more options",
}: DropdownMultiSelectProps) {
  const [selectedOptions, setSelectedOptions] = useState<{[key: string]: any}>(options);
  const optionsListRef = useRef<HTMLUListElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, fieldFather: string[]) => {
    const isChecked = e.target.checked;
    const option = e.target.value;

    const recursiveState = (fieldFather: string[], prevState: {[key: string]:any}):{[key: string]: any} => {
      const key = fieldFather.shift();
      if(!key) return {
        ...prevState,
        [option]: isChecked
      }

      return {...prevState, [key]: recursiveState(fieldFather, prevState[key]) };
    }

    const newState = recursiveState(fieldFather, selectedOptions);
    setSelectedOptions(newState);
  };

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions]);

  return (
    <label className="[&_div]:w-full">
      <input type="checkbox" className="hidden peer" />

      <div className="cursor-pointer after:content-['▼'] after:text-xs after:ml-1 after:inline-flex after:items-center peer-checked:after:-rotate-180 after:transition-transform inline-flex border border-gray-700 dark:border-gray-200 rounded-sm px-5 py-2">
        {prompt}
      </div>

      <div className="[&_p]:font-semibold [&_p]:text-black [&_span]:text-black bg-white border border-gray-700 dark:border-gray-200  transition-opacity hidden pointer-events-none peer-checked:block peer-checked:pointer-events-auto max-h-60 overflow-y-scroll">
        <ul ref={optionsListRef}>
            <DropdownMultiSelectItem 
              formFieldName={formFieldName}
              handleChange={handleChange}
              fathers={[]}
              options={options}
            />
        </ul>
      </div>
    </label>
  );
}

type DropdownMultiSelectItemProps = {
  formFieldName: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>, fathers: string[]) => void;
  fathers: string[];
  options: {[key: string]: any};
}

const DropdownMultiSelectItem = ({
  formFieldName,
  handleChange,
  fathers,
  options,
}:DropdownMultiSelectItemProps) => {

  const properties = Object.keys(options);

  return (
    properties.map((p,i) => {
      if(typeof options[p] === "object") return (
        <ul key={p} className="ml-2">
          <p>{p}</p>
          <DropdownMultiSelectItem
            formFieldName={formFieldName}
            handleChange={handleChange}
            fathers={[...fathers, p]}
            options={options[p]}
          />
        </ul>
      )

      return (
        <li key={i}>
          <label
            className={`flex whitespace-nowrap cursor-pointer px-2 py-1 transition-colors hover:bg-blue-100 [&:has(input:checked)]:bg-blue-200`}
          >
            <input
              type="checkbox"
              name={formFieldName}
              value={p}
              checked={options[p]}
              className="cursor-pointer"
              onChange={(e) => handleChange(e, fathers)}
            />
            <span className="ml-1">{p}</span>
          </label>
        </li>
      )
    })

  )
}