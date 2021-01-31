import React, { useState, useImperativeHandle, forwardRef } from 'react';

const Toggleable = forwardRef((props, ref) => {
  const { buttonLabel } = props;
  const [visible, setVisible] = useState(false);

  const toggle = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({ toggle }));

  return visible ? (
    <div>
      {props.children}
      <button onClick={toggle}>
          cancel
      </button>
    </div>
  ) : (
    <div>
      <button onClick={toggle} >
        {buttonLabel}
      </button>
    </div>
  );
});

Toggleable.displayName = 'Toggleable';

export default Toggleable;
