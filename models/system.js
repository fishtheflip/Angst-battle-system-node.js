const fs = require('fs');
const path = require('path');



class SysemAng {
    constructor(id, red, blue, a1, a2,a3,b1,b2,b3){
        this.id = id
        this.red = red;
        this.blue = blue;
        this.a1 =  a1;
        this.a2 = a2;
        this.a3 = a3;
        this.b1 = b1;
        this.b2 = b2;
        this.b3 = b3;
        this.aa1 =  0;
        this.aa2 = 0;
        this.aa3 = 0;
        this.bb1 = 0;
        this.bb2 = 0;
        this.bb3 = 0;
    }

    async sum(){

        let totalA = 0;
        let totalB = 0;

        let win ='';
        let lose ='';

        if(this.a1 === this.b1){
            this.aa1 += 2;
            this.bb1 += 2;
        }
        if(this.a2 === this.b2){
            this.aa2 += 2;
            this.bb2 += 2;
        }
        if(this.a3 === this.b3){
            this.aa3 += 2;
            this.bb3 += 2;
        }

        if(this.a1 === 'true' && this.b1 === 'false'){
            this.aa1 += 3;
            this.bb1 += 1;
        }
        if(this.a2 === 'true' && this.b2 === 'false'){
            this.aa2 += 3;
            this.bb2 += 1;
        }
        if(this.a3 === 'true' && this.b3 === 'false'){
            this.aa3 += 3;
            this.bb3 += 1;
        }

        if(this.a1 === 'false' && this.b1 === 'true'){
            this.aa1 += 1;
            this.bb1 += 3;
        }
        if(this.a2 === 'false' && this.b2 === 'true'){
            this.aa2 += 1;
            this.bb2 += 3;
        }
        if(this.a3 === 'false' && this.b3 === 'true'){
            this.aa3 += 1;
            this.bb3 += 3;
        }
        totalA = this.aa1 + this.aa2 + this.aa3;
        totalB = this.bb1 + this.bb2 + this.bb3;

        if(totalA === totalB){
            win = 'Tie';
            lose = 'Tie';
        }
        if(totalA < totalB){
            win = this.blue;
            lose = this.red;
        }
        if(totalA > totalB){
            win = this.red;
            lose = this.blue;
        }
        const battle = await SysemAng.getAll();
        const check = await SysemAng.getById(this.id);
        
        if (check === undefined){

            battle.push(    
                {
               id: this.id,
               red: this.red,
               blue: this.blue,
               win: win,
               lose: lose,
               redscore: totalA,
               bluescore: totalB
           });
        } else {
            let ind = battle.indexOf(check);
            totalA += check['redscore'];
            totalB += check['bluescore'];
            if(totalA === totalB){
                win = 'Tie';
                lose = 'Tie';
            }
            if(totalA < totalB){
                win = this.blue;
                lose = this.red;
            }
            if(totalA > totalB){
                win = this.red;
                lose = this.blue;
            }
            battle.splice( ind , 1 );
            battle.push(    
                {
               id: this.id,
               red: this.red,
               blue: this.blue,
               win: win,
               lose: lose,
               redscore: totalA ,
               bluescore: totalB 
           });

           
        }


        return new Promise((resolve, reject)=>{
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'results.json'),
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
                path.join(__dirname, '..', 'data', 'results.json'),
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
        const battle = await SysemAng.getAll();
        return battle.find(c => c.id === id);
     }




    

}
 module.exports = SysemAng;