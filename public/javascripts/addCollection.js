const FormStatusList = document.querySelector('.status-list');
const btnAddCollection = document.querySelector('.add-collection');

btnAddCollection.addEventListener('click', () => {
    FormStatusList.classList.toggle('is-visible');
    
})

FormStatusList.addEventListener('mouseleave', () => {
    FormStatusList.classList.toggle('is-visible');
})

