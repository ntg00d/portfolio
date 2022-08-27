import React from 'react'
import styles from './Assortment.module.css'
import AssortmentItem from './AssortmentItem/AssortmentItem'

const Assortment = ({
    categories,
    categoryHandle,
    currentCategory,
    
    items,
    currentItem,
    itemHandle,
    deleteItem,

    limit,
    limitHandle
}) => {
    

    return (
        <main className={styles.assortment}>
            <div className={`container ${styles.assortment__center}`}>
                <nav className={styles.assortment__categories}>
                    {categories.map(el => (
                        <button
                            key={el}
                            onClick={() => categoryHandle(el)}
                            style={{
                                color: currentCategory === el
                                ? '#16CD53'
                                : ''
                            }}
                        >{el}</button>
                    ))}
                </nav>

                <div className={styles.assortment__items}>
                    {items.filter(el => (
                        el.category === currentCategory
                        || currentCategory === categories[0] && el
                    )).slice(0, limit).map(el => {
                        const {name, img, category} = el
                        return <AssortmentItem
                            key={name}

                            name={name}
                            img={img}
                            category={category}
                            categoryHandle={() => categoryHandle(category)}

                            currentItem={currentItem}
                            itemHandle={() => itemHandle(name)}
                            deleteItem={() => deleteItem(name)}
                        />
                    })}
                </div>

                <div className={styles.assortment__loadmore}>
                    <button onClick={(e) => {
                        items.length !== limit
                        ? limitHandle()
                        : e.currentTarget.innerText = 'No more products'
                    }}>Load More</button>
                </div>
            </div>
        </main>
    )
}

export default Assortment