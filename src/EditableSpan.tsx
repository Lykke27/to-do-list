import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log("EdSpan clicked")
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onEnter = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            setEditMode(false)
            props.changeTitle(title)
        }
    }

    return (
        editMode
            ? <TextField
                value={title}
                onChange={changeTitle}
                onBlur={offEditMode}
                autoFocus
                onKeyPress={onEnter}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>

    )
})