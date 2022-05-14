import {LOAD_STREETS, LOAD_HOUSES, LOAD_FLATS, LOAD_INPUTTEXT, SEARCH_FOR_MATCHES, CHANGE_INFO, DELETE_CLIENT, ADD_CLIENT} from '../types'

const initialState = {
    streets: [],
    houses: [],
    flats: [],

    streetValue: '',
    houseValue: '',
    flatValue: '',

    addressInfo: [
        {'2134 км, 1, 1': [
            {surname: 'Лобанов',
             name: 'Егор',
             patronymic: 'Романович',
             phone: '+79187702780',
             email: 'miher121234@mail.ru',
             id: Math.floor(Math.random() * 99999)
            },

            {surname: 'Лобанов',
             name: 'Артём',
             patronymic: 'Егорович',
             phone: '+79180755584',
             email: 'lbatdem11@mail.ru',
             id: Math.floor(Math.random() * 99999)
            },

            {surname: 'Майорова',
             name: 'Юлия',
             patronymic: 'Александрович',
             phone: '+79180718845',
             email: 'mrr1x275@mail.ru',
             id: Math.floor(Math.random() * 99999)
            }
        ]},
        {'Демонстрационная, 2к1, 22': [
            {surname: 'Мальцев',
             name: 'Анатолий',
             patronymic: 'Андреевич',
             phone: '+79780752781',
             email: 'kasnd5@mail.ru',
             id: Math.floor(Math.random() * 99999)
            },

            {surname: 'Смирнова',
             name: 'Яна',
             patronymic: 'Дмитриевна',
             phone: '+79780712984',
             email: 'mkld31vf@mail.ru',
             id: Math.floor(Math.random() * 99999)
            },

            {surname: 'Мальцев',
             name: 'Василий',
             patronymic: 'Анатольевич',
             phone: '+79780712985',
             email: 'kcxmioq5dm@mail.ru',
             id: Math.floor(Math.random() * 99999)
            }
        ]},
        {'25 лет Октября, 34, 1': [
            {surname: 'Родин',
             name: 'Максим',
             patronymic: 'Максимович',
             phone: '+79120754781',
             email: 'rrmax125@mail.ru',
             id: Math.floor(Math.random() * 99999)
            },

            {surname: 'Ткачёва',
             name: 'Мария',
             patronymic: 'Александровна',
             phone: '+79782212784',
             email: 'mariatkach98@mail.ru',
             id: Math.floor(Math.random() * 99999)
            }
        ]},
        {'50 лет ВЛКСМ, 13к1, 1': [
            {surname: 'Борисов',
             name: 'Егор',
             patronymic: 'Сергеевич',
             phone: '+79183750089',
             email: 'ybicd1976@mail.ru',
             id: Math.floor(Math.random() * 99999)
            },

            {surname: 'Борисова',
             name: 'Яна',
             patronymic: 'Макаровна',
             phone: '+79180712984',
             email: 'myborr_q@mail.ru',
             id: Math.floor(Math.random() * 99999)
            },

            {surname: 'Борисов',
             name: 'Алексей',
             patronymic: 'Егорович',
             phone: '+79180706985',
             email: 'alexhhc66@mail.ru',
             id: Math.floor(Math.random() * 99999)
            }
        ]},
        {'Авторемонтная, 23, 2': [
            {surname: 'Харитонов',
             name: 'Алексей',
             patronymic: 'Михайлович',
             phone: '+79183450089',
             email: 'pugtgy14@mail.ru',
             id: Math.floor(Math.random() * 99999)
            },

            {surname: 'Чистяков',
             name: 'Юрий',
             patronymic: 'Степанович',
             phone: '+79180839984',
             email: 'fffsel21@mail.ru',
             id: Math.floor(Math.random() * 99999)
            },

            {surname: 'Панкратов',
             name: 'Андрей',
             patronymic: 'Александрович',
             phone: '+79180957985',
             email: 'punkzz_g2@mail.ru',
             id: Math.floor(Math.random() * 99999)
            },

            {surname: 'Савельева',
             name: 'Алиса',
             patronymic: 'Гордеевна',
             phone: '+79220957901',
             email: 'alisa_sav6654@mail.ru',
             id: Math.floor(Math.random() * 99999)
            },

            {surname: 'Никитина',
             name: 'Елизавета',
             patronymic: 'Александровна',
             phone: '+79227747901',
             email: 'lisnck95@mail.ru',
             id: Math.floor(Math.random() * 99999)
            }
        ]}
    ],
    foundElement: []
}

export const dataReducer = (state = initialState, action) => {
    let {streetValue, houseValue, flatValue, foundElement, addressInfo} = state
    
    switch (action.type) {
        case LOAD_STREETS:
            let filteredStreets = []
            for (let i = 0; i < action.data.length; i++) {
                for (let key in action.data[i]) {
                    if (key === 'cityId' && action.data[i][key] === 1) {
                        filteredStreets.push(action.data[i])
                    }
                }
            }
            return {...state, streets: filteredStreets}

        case LOAD_HOUSES:
            return {...state, houses: action.data}

        case LOAD_FLATS:
            let filteredFlats = []
            for (let i = 0; i < action.data.length; i++) {
                for (let key in action.data[i]) {
                    if (key === 'name' && !action.data[i][key].includes('Весь дом') && !action.data[i][key].includes('Подъезд')) {
                        filteredFlats.push(action.data[i])
                    }
                }
            }
            return {...state, flats: filteredFlats}
        
        case LOAD_INPUTTEXT:
            if (action.blocktype === 'streets') {
                return {...state, streetValue: action.inputvalue}
            }
            if (action.blocktype === 'houses') {
                return {...state, houseValue: action.inputvalue}
            }
            if (action.blocktype === 'flats') {
                return {...state, flatValue: action.inputvalue}
            }

        case SEARCH_FOR_MATCHES:
            let request = `${streetValue}, ${houseValue}, ${flatValue}`

            const validation = (address) => addressInfo.some(el => el[address])
            const find = (address) => addressInfo.find(el => el[address])

            if (validation(request)) {
                return {...state, foundElement: find(request)}
            }

        case CHANGE_INFO:
            return (() => {
                let foundElementCopy = {...foundElement}
                let clients = Object.values(foundElementCopy)[0]
                let foundIndexById = clients.findIndex(el => el.id === action.data.id)

                clients[foundIndexById] = action.data
                foundElement = foundElementCopy
                 
                let newState = {...state}
                newState.addressInfo = [...state.addressInfo]

                let foundIndexByAddress = newState.addressInfo.findIndex(el => el[action.address])
                let currentObject = Object.values(newState.addressInfo[foundIndexByAddress])[0][foundIndexById]
                currentObject = action.data
                return {...newState}
            })()

        case DELETE_CLIENT: 
            return (() => {
                let foundElementCopy = {...foundElement}
                let clients = Object.values(foundElementCopy)[0]
                let foundIndexById = clients.findIndex(el => el.id === action.id)

                clients.splice(foundIndexById, 1)
                foundElement = foundElementCopy

                let newState = {...state}
                newState.addressInfo = [...state.addressInfo]
            
                let foundIndexByAddress = newState.addressInfo.findIndex(el => el[action.address])
                newState.addressInfo[foundIndexByAddress] = foundElement
                return {...newState}
            })()

        case ADD_CLIENT:
            return (() => {
                let foundElementCopy = {...foundElement}
                let clients = Object.values(foundElementCopy)[0]

                clients.push(action.data)
                foundElement = foundElementCopy

                let newState = {...state}
                newState.addressInfo = [...state.addressInfo]

                let foundIndexByAddress = newState.addressInfo.findIndex(el => el[action.address])
                newState.addressInfo[foundIndexByAddress] = foundElement
                return {...newState}
            })()

        default:
            return state
    }
}