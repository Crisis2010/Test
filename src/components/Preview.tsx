import React, {FC, useEffect, useRef, useState} from 'react'
import {observer} from "mobx-react-lite";

type Image = {
  image: string
}

export type Label = {
  key: number
  x: string
  y: string
  text: string
  clicked: boolean
}

export const Preview: FC = observer( (children) => {

  const [image, setImage] = useState<any>(children.children)
  const [preview, setPreview] = useState<string | null>()
  const [dimensions, setDimensions] = useState<DOMRect | undefined>();
  const [divArray, setDivArray] = useState<Label[] | []>([]);
  const parentRef = useRef<any>();
  const elementRef = useRef<any>();

    const imageClick = (e: any) => {
      let rect = e.target.getBoundingClientRect();
      let x = e.clientX;
      let y = e.clientY;
      let elem = { key:( Date.now()+~~(1000*Math.random()) ) , x, y, text: "test", clicked: false };
      console.log(elem)
      setDivArray([...divArray, elem])

    }

  useEffect(() => {
    if (children.children) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(image)
    } else {
      setPreview(null)
    }
  }, [children])

    const getDivList = () => {
      let markerList = divArray.map((el,index)=> {

        // const targetCoords = parentRef.getBoundingClientRect();
        //
        // const x = event.clientX - targetCoords.left;
        // const y = event.clientY - targetCoords.top;
        //
        // label.style.left = (x / (el.clientWidth / 100)) + '%';
        // label.style.top = (y / (el.clientHeight / 100)) + '%';


        const inputChange = (e: any) => {
          let newList = [...divArray];
          newList[index].text = e.target.value
          setDivArray(newList)
        }

        const containerMouseEnter = () => {
          let newList = [...divArray];
          newList[index].clicked = true
          setDivArray(newList)
        }

        const containerMouseLeave = () => {
          let newList = [...divArray];
          newList[index].clicked = false
          setDivArray(newList)
        }

        let div = (<div>{el.text}</div>);
        let input = (<input onChange={inputChange} type="text" value={el.text}></input>);
        let container = <div onMouseEnter={containerMouseEnter}
                             onMouseLeave={containerMouseLeave}
                             key={el.key}
                             style={{position:"absolute", top:el.y, left: el.x}}>{el.clicked? input: div}
        </div>
        return container
      });
      return markerList
    }

  return (
    <div className={'img-wrap'} onDoubleClick={imageClick} ref={parentRef}>
      <img src={preview as string} alt="123" ref={elementRef} />
      <button className={'button-preview'}>
        Удалить
      </button>
      {getDivList()}
    </div>
  )
}
)
