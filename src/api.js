import axios from 'axios'
const url = 'https://www.dnd5eapi.co/api/'

export default {
    tallyXp: (enemy) => {
        axios(url + `monsters/${enemy.toLowerCase()}`)
        .then(res => {
            return res.data.xp
        })
        .catch(() => {
            return "error"
        })
    }
}