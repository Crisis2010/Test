import React, {FC} from 'react';

type LabelProps = {
  el: any
  containerMouseEnter: any
  containerMouseLeave: any
  inputChange: ()=>void
}

export const Label: FC<any> = ({data, containerMouseEnter, containerMouseLeave, inputChange}) => {
  console.log(data)
  return (
      <div
        onMouseEnter={containerMouseEnter}
        onMouseLeave={containerMouseLeave}
        key={data.key}
        style={{position:"absolute", top:data.y, left: data.x}}
      >
        {data.clicked ? <div>{data.text}</div> : <input onChange={inputChange} type="text" value={data.text}></input>}
      </div>
  );
};