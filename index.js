(function main(){
    const emailsUl_DOM = document.querySelector(".emails");
    let initialSelectedId = "";

    let emailContent = [
        {
            content:"This is an input layout.",
            isRead:false
        },
        {
            content:"Check one item",
            isRead:false
        },
        {
            content:"Hold down your shift key",
            isRead:false
        },
        {
            content:"Check a lower item",
            isRead:false
        },
        {
            content:"Everything in between should be set or checked",
            isRead:false
        },
        {
            content:"Try to do it without any libraries",
            isRead:false
        },
        {
            content:"Just use regular javascript",
            isRead:false
        },
        {
            content:"Good luck!",
            isRead:false
        },
        {
            content:"Don't forget to tweet your results",
            isRead:false
        },
    
    ]

    function createEmailList(emailContent){
        emailsUl_DOM.innerHTML = ""
        emailContent.forEach((email,id) => {
            emailsUl_DOM.innerHTML += `
                <li class="email" data-index="${id}">
                    <span class="checkbox-span">
                        <input type="checkbox" class="email-checkbox" ${email.isRead ? "checked" : ""}>
                    </span>
                    <span class="content-span">
                        ${email.content}
                    </span>
                </li>
        `
        })
    }

    window.addEventListener("load",function(e){
        createEmailList(emailContent)
    })

    document.body.addEventListener("click",function(e){
        if(!event.target.closest(".checkbox-span")) return;
        let element = event.target.closest(".checkbox-span");
        if(!event.shiftKey){
            initialSelectedId = element.parentElement.dataset.index;
            emailContent = emailContent.map((email,index)=>{
                if(index === +initialSelectedId){
                    return {content:email.content,isRead:!email.isRead}
                } else {
                    return {content:email.content,isRead:false}
                }
            })
            // let selectedEmailContent = emailContent.find((email,index)=> index === initialSelectedId)
            // selectedEmailContent[0].isRead = !selectedEmailContent[0].isRead
        }
        if(event.shiftKey){
            let latestId = element.parentElement.dataset.index;
            if(latestId < initialSelectedId){
                let copyValue = initialSelectedId;
                initialSelectedId = latestId;
                latestId = copyValue;
            }
            emailContent = emailContent.map((email,index) => {
                if(index >= +initialSelectedId && index <= +latestId){
                    return {content:email.content,isRead:true}
                } else {
                    return {content:email.content,isRead:false};
                }
            })
            initialSelectedId = ""
        }
        createEmailList(emailContent);
    })
})();