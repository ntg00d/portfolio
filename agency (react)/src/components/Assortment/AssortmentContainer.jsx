import React, {useState, useEffect} from 'react'
import Assortment from './Assortment'

const AssortmentContainer = () => {
    const categories = ['Show All', 'Design', 'Branding', 'Illustration', 'Motion']

    const [items, setItems] = useState([
        {name: 'SOFA', img: 'item1', category: categories[1]},
        {name: 'KeyBoard', img: 'item2', category: categories[2]},
        {name: 'Work Media', img: 'item3', category: categories[3]},
        {name: 'DDDone', img: 'item4', category: categories[4]},
        {name: 'Abstract', img: 'item5', category: categories[1]},
        {name: 'HandP', img: 'item6', category: categories[2]},
        {name: 'Architect', img: 'item7', category: categories[4]},
        {name: 'CalC', img: 'item8', category: categories[1]},
        {name: 'Sport', img: 'item9', category: categories[2]},

        {name: 'SOFA2', img: 'item1', category: categories[1]},
        {name: 'KeyBoard2', img: 'item2', category: categories[2]},
        {name: 'Work Media2', img: 'item3', category: categories[3]},
        {name: 'DDDone2', img: 'item4', category: categories[4]},
        {name: 'Abstract2', img: 'item5', category: categories[1]},
        {name: 'HandP2', img: 'item6', category: categories[2]},
        {name: 'Architect2', img: 'item7', category: categories[4]},
        {name: 'CalC2', img: 'item8', category: categories[1]},
        {name: 'Sport2', img: 'item9', category: categories[2]}
    ])

    const [currentCategory, setCurrentCategory] = useState(categories[0])
    const [currentItem, setCurrentItem] = useState('')
    const [limit, setLimit] = useState(9)

    const categoryHandle = (el) => {
        setCurrentCategory(el)
    }

    const itemHandle = (item) => (
        currentItem === item
        ? setCurrentItem('')
        : setCurrentItem(item)
    )

    const deleteItem = (item) => {
        const index = items.findIndex(el => el.name === item)
        const newItems = [...items]
        newItems.splice(index, 1)
        setItems(newItems)
    }

    const limitHandle = () => {
        setLimit(prev => prev + prev)
    }

    useEffect(() => {
        const handle = (e) => {
            e.code === 'Delete' && deleteItem(currentItem)
            document.removeEventListener('keydown', handle)
        }
        currentItem.length && document.addEventListener('keydown', handle)
    }, [currentItem])

    return (
        <Assortment
            categories={categories}
            currentCategory={currentCategory}
            categoryHandle={categoryHandle}

            items={items}
            currentItem={currentItem}
            itemHandle={itemHandle}
            deleteItem={deleteItem}

            limit={limit}
            limitHandle={limitHandle}
        />
    )
}

export default AssortmentContainer