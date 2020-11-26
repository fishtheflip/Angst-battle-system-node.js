const elA = document.querySelectorAll('.el-a');
const elB = document.querySelectorAll('.el-b');
const elInpA = document.querySelectorAll('.va');
const elInpB = document.querySelectorAll('.vb');

const foundClassList=(item)=>{
    let tab = '';
    if(item[0] === 'a') {
        tab = 'tab-a';
    }
    if(item[0] === 'b') {
        tab = 'tab-b';
    }
    if(document.querySelector(`.${item}`).classList.contains(tab)){
        document.querySelector(`.${item}`).classList.remove(tab);
        document.querySelector(`.v${item}`).setAttribute('value', 'false'); 
    } else{
        document.querySelector(`.${item}`).classList.add(tab);
        document.querySelector(`.v${item}`).setAttribute('value', 'true');
    }
}

const takeA = (a)=>{
    foundClassList(a);
    console.log("ok");
    
}

const takeB = (b)=>{
    foundClassList(b);

}
const fullTie= () =>{
    elA.forEach((item)=>{
        item.classList.add('tab-a');
        
    });
    
    elB.forEach((item)=>{
        item.classList.add('tab-b');
       
    });
    elInpA.forEach((item)=>{
        item.setAttribute('value', 'true');
    });
    elInpB.forEach((item)=>{
        item.setAttribute('value', 'true');
    });
    
}
const resetField = ()=>{
    elA.forEach((item)=>{
        item.classList.remove('tab-a');
    });
    elB.forEach((item)=>{
        item.classList.remove('tab-b');
    });
    elInpA.forEach((item)=>{
        item.setAttribute('value', 'false');
    });
    elInpB.forEach((item)=>{
        item.setAttribute('value', 'false');
    });
}

