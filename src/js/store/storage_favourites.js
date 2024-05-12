class StorageUI{
    constructor(){
        this.storageContainer = null;
        this.nodeListOfBtn = null;
        this.storageLogo = null;
    }
    UI(){
        this.storageContainer = document.querySelector('.storage');
        console.log(this.storageContainer)
        this.nodeListOfBtn = document.querySelectorAll('.addFavourite')
        console.log(this.nodeListOfBtn)
        this.storageLogo = document.querySelector('#storage_icon')
        console.log(this.storageLogo)
    }
    init(){
        this.UI()
        this.UIHandler()
    }
    UIHandler(){
        this.nodeListOfBtn.forEach((btn)=>{
            btn.addEventListener('click',(e)=>{
                e.preventDefault()    
                this.storageContainer.appendChild(this.ticketNodeTheft(e.target))
                console.log(e.target.parentElement.parentElement.parentElement)
            })
        })
        this.storageLogo.addEventListener('click',(e)=>{
            console.log(this.storageContainer)
            e.preventDefault()
            this.storageContainer.classList.toggle('d-none')
        })
    }
    ticketNodeTheft(nodeElement){
        const greatGreatParentEl = nodeElement.parentElement.parentElement.parentElement;
        nodeElement.remove()
        return greatGreatParentEl;
    }


}
const storageUI = new StorageUI()
export default storageUI