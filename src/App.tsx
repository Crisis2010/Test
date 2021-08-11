import React, { FC, useRef, useState } from 'react';
import { Preview } from './components/Preview';
import './styles/style.css';

export const App: FC = () => {
  const fileInput = useRef<any>();
  const [image, setImage] = useState<File>();
  const [isPreview, setIsPreview] = useState<boolean>(false);

  function dragStartHandler(e: React.DragEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    // setDrag(true)
  }

  function dragLeaveHandler(e: React.DragEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    // setDrag(false)
  }

  function onDropHandler(e: any) {
    e.preventDefault();
    e.stopPropagation();
    const files = [...e.dataTransfer.files];
    const file = files[0];
    if (file) {
      setImage(file);
      setIsPreview(true);
    } else {
      // setImage(null)
    }
  }

  function onLoadHandler(e: any) {
    e.preventDefault();
    e.stopPropagation();
    const files = e.target.files;
    const file = files[0];
    if (file) {
      setImage(file);
    } else {
      // setImage(null)
    }
    // setDrag(false)
  }

  const triggerInput = () => {
    // почему србатывает 2 раза?
    if (!isPreview) {
      // fileInput.current.click()
      // console.log('123123')
    }
  };

  console.log(isPreview);

  return (
    <form
      className={!isPreview ? 'wrapper' : `wrapper active`}
      onDragOver={e => dragStartHandler(e)}
      onDragLeave={e => dragLeaveHandler(e)}
      onDrop={e => onDropHandler(e)}
      onClick={event => triggerInput()}
    >
      <input type="file" ref={fileInput} onChange={event => onLoadHandler(event)} style={{ display: 'none' }} />
      {isPreview && <Preview children={image} />}
    </form>
  );
};
