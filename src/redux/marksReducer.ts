import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {makeAutoObservable} from "mobx";

export type MarkItem = {
  id: number
  text: string
  x: string
  y: string
}

export type MarksStateType = {
  activeMark: null | MarkItem
  markList: MarkItem[]
}

class MarksState {
  State: MarksStateType = {
    activeMark: null,
    markList: [{ id: 1, text: 'work', x: '10', y: '10' }],
  }

  constructor() {
    makeAutoObservable(this)
  }
  createMark() {
    this.State.markList.push({ id: 2, text: 'ARBITEN', x: '50', y: '50' })
  }
}

export default new MarksState()