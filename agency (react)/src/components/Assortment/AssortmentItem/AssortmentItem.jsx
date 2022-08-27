import React from 'react'
import styles from './AssortmentItem.module.css'
import {VscTrash} from 'react-icons/vsc'

const AssortmentItem = ({
    name,
    img,
    category,

    currentItem,
    categoryHandle,
    itemHandle,
    deleteItem
}) => {
    return (
        <div
            className={`${styles.assortment__item} ${styles[img]}`}
            onClick={itemHandle}
            style={{
                outline: currentItem === name
                ? '7px solid #16CD53'
                : ''
            }}
        >
            <button onClick={(e) => {
                e.stopPropagation()
                categoryHandle()
            }}>{category}</button>
            <h1>{name}</h1>

            {currentItem === name && (
                <button
                    className={styles.assortment__delete}
                    onClick={(e) => {
                        e.stopPropagation()
                        deleteItem()
                    }}
                ><VscTrash size={30}/></button>
            )}
        </div>
    )
}

export default AssortmentItem