import React from 'react'

export interface IFormItem {
    title: string
    info: string
}

interface IFormProps {
    toggle: () => void
    modeToggle: boolean
    setModeToggle: () => void
    formItems: IFormItem[]
    handleSubmit: (e: any) => void
    title: boolean
}

export type TForm = React.FC<IFormProps>