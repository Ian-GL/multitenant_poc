import React, { FC } from 'react';
import Select from 'react-select';

type PropType = {
  callback(): void;
};

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const TableFieldInput: FC<PropType> = (props) => {
  return (
    <div className="field-input-container">
      <input />
      <Select options={options} />
    </div>
  );
};

export default TableFieldInput;
