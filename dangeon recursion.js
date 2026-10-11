let health = 100

let gold = 0

let goldChest = 0

let eventText = "Начало подземелья..."

let rndMonster = 0.4
let rndFountain = 0.6
let rndChest = 0.8

// бой с боссом
function boss() {
    alert(`Встреча с Боссом!\nУрон: ${40}-${90}`)

    let enemyDmg = Math.floor(Math.random() * (90 - 40 + 1)) + 40

    health -= enemyDmg
    showHealth()
    alert(`Босс наносит вам ${enemyDmg} урона! Ваше HP: ${health}/${100}`)
}

// бой с монстром
function fight(monsterMinDmg, monsterMaxDmg) {
    alert(`Встреча с монстром!\nУрон: ${monsterMinDmg}-${monsterMaxDmg}`)

    let enemyDmg = Math.floor(Math.random() * (monsterMaxDmg - monsterMinDmg + 1)) + monsterMinDmg

    health -= enemyDmg
    showHealth()
    alert(`Монстр наносит вам ${enemyDmg} урона! Ваше HP: ${health}/${100}`)
}

// фонтан лечения
function fountain() {
    let fountainHealth = Math.floor(Math.random() * 12) + 7

    health += fountainHealth
    showHealth()
     alert(`Вы наткнулись на лечебный фонтан, вы получили + ${fountainHealth} HP!`)
}


// сундук
function chest() {
    goldChest = Math.floor((Math.random() * 100) + 15)

    gold += goldChest

    alert(`Вы открыли сундук и нашли ${goldChest} золота!`)

}

const death = (a,b,c) => {
    if (b === 10 && c > 0) {
        alert(`Вы пережили босса и выбрались из подземелья!\nЗолото: ${a}`)
    }
    else {
        alert(`Ваша жизнь на нуле! Вы проиграли!\nЗолото: ${a}\nСколько пройдено уровней: ${b}`)
    }
}

function fork(a,b,c) {
    a = (Math.floor(Math.random() * 9)+1)/10
    b = (Math.floor(Math.random() * 9)+1)/10
    c = (Math.floor(Math.random() * 9)+1)/10

    return {Monster: a, Fountain: b, Chest: c}
}

function showHealth() {
    if (health > 100) {health = 100}
    else if (health < 1) {health = 0}
}

//рекурсия

function game(numberRoom){
    if (health <= 0) {return death(gold, numberRoom, health)}

    if (numberRoom === 10) {
        boss()
        return death(gold,numberRoom,health)
    }

    alert(`Комната №${numberRoom}\n\nПредыдущее событие комнаты:\n${eventText}\n\nТы:\n------------\nЗдоровье: ${health}/${100}\nЗолото: ${gold}`)

    let rnd = Math.random()

    if (rnd < rndMonster) {
        fight(5, 15)
        eventText = "Встреча с монстром."
    }
    else if (rnd < rndFountain) {
        fountain()
        eventText = "Исциляющий фонтан..."
    }
    else if (rnd < rndChest) {
        chest()
        eventText = "Найденный сундук."
    }
    else if (rnd < 0.3) {
        let leftRight = ["направо","налево"]
        let leftOrRight = Math.random()
        if (leftOrRight > 0.5) {
            leftRight[0] = "налево"
            leftRight[1] = "направо"
        }
        else {
            leftRight[0] = "направо"
            leftRight[1] = "налево"
        }

        while (true) {
            let choice = Number(prompt(`Вы столкнулись с развилкой. Ваш выбор пути изменит вашу судьбу.\n------------\n\nПойти ${leftRight[0]} (1) Пойти ${leftRight[1]} (2)`))

            let randomChoice = Math.floor(Math.random() * 2)

            if (choice === 1 || choice === 2){
                if (choice === randomChoice && randomChoice === 1) {
                    ({
                        Monster: rndMonster,
                        Fountain: rndFountain,
                        Chest: rndChest
                    } = fork(rndMonster, rndFountain, rndChest))
                    alert("Вы выбрали непредсказуемый путь...")
                    alert("Кто знает что ждет тебя...")
                    numberRoom = 1
                    break
                } else if (choice === randomChoice && randomChoice === 2) {
                    alert("Вы выбрали обычный путь...")
                    break
                } else if (choice !== randomChoice) {
                    if (randomChoice === 1) {
                        ({
                            Monster: rndMonster,
                            Fountain: rndFountain,
                            Chest: rndChest
                        } = fork(rndMonster, rndFountain, rndChest))
                        alert("Вы выбрали непредсказуемый путь...")
                        alert("Кто знает что ждет тебя...")
                        numberRoom = 1
                        break
                    } else {
                        alert("Вы выбрали обычный путь...")
                        break
                    }
                }
            }
            else {
                alert("Вам придётся выбрать...")
            }
        }
        eventText = "Развилка?..."
    }
    else {
        alert("В конмнате ничего не оказалось...")
        eventText = "Пустая комната..."
    }

    numberRoom = numberRoom + 1
    game(numberRoom)
}

game(1)

// comment