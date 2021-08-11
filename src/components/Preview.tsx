import React, {FC, useLayoutEffect, useEffect, useRef, useState} from 'react'
import {observer} from "mobx-react-lite";
import { Label } from './Label';
import {useWindowSize} from "../hooks/useWindowSize";
import {customId} from "../hooks/customId";

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
  const [divArray, setDivArray] = useState<any>([]);
  const parentRef = useRef<any>();
  const elementRef = useRef<any>();
  const [size, setSize] = useWindowSize()

  const imageClick = (e: any) => {
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left;;
    let y = e.clientY - rect.top;
    let elem = { key: customId, x, y, text: "test", clicked: false };
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
      let markerList = divArray.map((el: any, index: number)=> {

        // альтернативное решение
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

        return <Label
                  onMouseEnter={containerMouseEnter}
                  onMouseLeave={containerMouseLeave}
                  data={el}
                />
      });
      return markerList
    }

  return (
    <div className={'img-wrap'} onDoubleClick={imageClick} ref={parentRef} >
      <img src={preview as string} alt="123" ref={elementRef} />
      <button className={'button-preview'}>
        Удалить
      </button>
      {getDivList()}
    </div>
  )
}
)

