const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


class Setup{
    constructor(red, blue, rounds, id){
        this.red = red;
        this.blue = blue;
        this.rounds = rounds;
        this.id = uuidv4();
    }
    toJSON(){
        return {
            red : this.red,
            blue : this.blue,
            rounds: this.rounds,
            id : this.id
        }
    }

    async save (){
        const battle = await Setup.getAll();
        battle.push(this.toJSON());

        return new Promise((resolve, reject)=>{
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'table.json'),
                JSON.stringify(battle),
                (err)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve();
                    }
                }
            )
        });
    }

    static getAll(){
        return new Promise ((resolve, reject)=>{
            fs.readFile(
                path.join(__dirname, '..', 'data', 'table.json'),
                'utf-8', 
                (err, content)=>{
                    if(err){
                        reject(err);
                    } else {
                        resolve(JSON.parse(content));
                    }
                }
            )
        });
    }

    static async getById(id){
        const battle = await Setup.getAll();
        return battle.find(c => c.id ===id);
     }
}
module.exports = Setup;