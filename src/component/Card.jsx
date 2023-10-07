import { useEffect, useState } from 'react';
import styles from './Card.module.css';





const arrCards = [
    { id: 1, img: '../../img/bright-icon.png' },
    { id: 2, img: '../../img/confused-color-icon.png' },
    { id: 3, img: '../../img/smile-icon.png' },
    { id: 4, img: '../../img/smiley-icon.png' },
    { id: 5, img: '../../img/strange-icon.png' },
    { id: 6, img: '../../img/surprised-icon.png' }
]

const pairOfArrayCards = [...arrCards, ...arrCards];
function Card() {
    const [arrayCards, setArrayCards] = useState([]);
    const [openCards, setOpenCards] = useState([]);
    const [matched, setMatched] = useState([]);// совпадения
    const [moves, setMoves] = useState(0);

    const shuffle = (arr) => {
        let currentIndex = arr.length; //12
        let tempararyValue; // undefined
        let randomIndex; // undefined

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            // console.log('randomIndex', randomIndex);
            currentIndex = currentIndex - 1;

            tempararyValue = arr[currentIndex];
            // console.log('tempararyValue', tempararyValue);

            arr[currentIndex] = arr[randomIndex];
            arr[randomIndex] = tempararyValue;

        }

        return pairOfArrayCards;
    }

    useEffect(() => {
        setArrayCards(shuffle(pairOfArrayCards));
    }, []);

    useEffect(() => {
        if (openCards < 2) return;

        const firstMatched = arrayCards[openCards[0]];
        const secondMatched = arrayCards[openCards[1]];

        if (secondMatched && firstMatched.id === secondMatched.id) {
            setMatched([...matched, firstMatched.id])
        }

        if (openCards.length === 2) setTimeout(() => setOpenCards([]), 1000)
    }, [openCards])

    const flipCard = (index) => () => {
        setOpenCards(opened => [...opened, index]);
        setMoves(prevMove => prevMove + 1);
    }

    const handleGameRestart = () => {
        
        setOpenCards([]);
        setMatched([]);
        setMoves(0);
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Game</h1>
            <p className={styles.moves}>Зробленно ходів: {moves}</p>
            <div className={styles.cards}>

                {
                    arrayCards.map((item, index) => {
                        let isFlipped = false; // карточка не перевернутая 

                        if (openCards.includes(index)) isFlipped = true;
                        if (matched.includes(item.id)) isFlipped = true;

                        return (
                            <div
                                key={index}
                                className={[styles.card, isFlipped ? styles.flipped : ''].join(' ')}
                                onClick={flipCard(index)}
                            >
                                <div className={styles.inner}>
                                    <div className={styles.front}>
                                        <img
                                            src={item.img}
                                            alt="icon-smile"
                                            width={100} />
                                    </div>
                                    <div className={styles.back}>
                                        <img
                                            src="../../img/question-mark.png"
                                            alt="question-mark"
                                            width={100} />
                                    </div>
                                </div>

                            </div>

                        )
                    })}


            </div>
            <button
                className={styles.btn}
                onClick={handleGameRestart}
            >Спробувати ще!</button>
        </div>

    )
}

export default Card;