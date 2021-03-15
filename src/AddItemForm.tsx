import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {Add} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
    helperText: string
}

export function AddItemForm(props: AddItemFormPropsType) {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const addItem = () => {
        const trimTitle = title.trim()
        if (trimTitle) {
            props.addItem(trimTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem()
        }
    }

    return (
        <div>
            <TextField
                label={props.helperText}
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddItem}
                error={error}
                helperText={error ? "Title is required" : ""}
            />
            <IconButton
                onClick={addItem}
                color={"primary"}
            > <Add/>
            </IconButton>

        </div>

    )
}