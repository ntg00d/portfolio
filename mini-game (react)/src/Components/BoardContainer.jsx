import Board from './Board'

const BoardContainer = () => {
    const totalSquares = []
    for (let i = 0; i < 36; i++) totalSquares.push(i)

    let process = {streak: 0, value: null, nextStage: 0, elements: []}
    const colors = [
        '8B0000', 'FF0000', 'CD5C5C',
        'C71585', 'FF1493', 'FFB6C1',
        'FF8C00', 'FF4500', 'FFD700',
        'BDB76B', '252525', '2F4F4F',
        '696969', 'BDC1C5', '006400',
        '32CD32', '00FF00', '20B2AA'
    ]
    
    const randomize = (arr) => arr.map(el => [Math.random(), el]).sort().map(el => el[1])
    const calculation = (e, process, calcLoses, result, setResult) => {
        if (process.value === null || process.value === e.target.style.backgroundColor) {
            process.elements.push(e.target)
            e.target.setAttribute('disabled', '')

            process.streak++
            process.value = e.target.style.backgroundColor
        } else if (process.value !== null & process.value !== e.target.style.backgroundColor) {
            calcLoses(prev => prev + 1)
            process.elements.forEach(el => el.removeAttribute('disabled'))
            process.elements = []

            process.nextStage = 0
            process.streak = 0
            process.value = null
        }
        if (process.streak === 2) {
            process.nextStage++
            process.streak = 0
            process.value = null
        }
        if (process.nextStage === 18) {
            setResult(result)
            process.nextStage = 0
        }
    }

    return <Board
        totalSquares={totalSquares}
        colors={colors}
        process={process}
        randomize={randomize}
        calculation={calculation}
    />
}

export default BoardContainer