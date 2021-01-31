alert(';jgf')
    var supervisor = new Supervisor({
    url: 'https://demo.proctoring.online'
});


    const startProctoring = async () => {

    supervisor.init({

        provider: 'jwt',

        token: fetch(`/api/token`).then((response) => {

            if (response.ok) return response.text();
            else throw Error('Failed to get JWT');
        })

    })
        .then(() => {
            return supervisor.start();
        })
        .catch((err) => {
            alert(err.toString());
            location.href = '/';
        });
}


    let but = document.querySelector('#button')
    but.addEventListener('click', function (e) {
    e.preventDefault();
    try {
//начало прокторинга
    startProctoring()
    document.querySelector('#button').remove()
    document.querySelector('#welcome-text').innerHTML = "Тестирование загружается, пожалуйста, подождите"
    //старт теста
    setTimeout(() => {

    let d = document.createElement('div')
    d.id = 'option-area'

    document.querySelector('#content').appendChild(d).innerHTML = 'Выберите, пожалуйста, один или несколько вариантов ответа и нажмите кнопку "Finish"'
    let ul = document.createElement('ul')
    ul.id = 'option-ul'
    ul.style = 'border: 1px solid'
    document.querySelector('#option-area').appendChild(ul)

    for (i = 1; i < 4; i++) {
    let divOption = document.createElement('input')
    divOption.id = `check-box-${i}`
    // divOption.style = 'width: 300px'
    divOption.type = 'radio'
    // divOption.style = 'padding: 100px'
    divOption.value = false
    divOption.innerText = `Вариант ${i}`
    document.querySelector('#option-area').appendChild(divOption)
    let newLine = document.createElement('br')
    let textOption = document.createElement('text')
    textOption.innerText = `   Вариант ${i}`
    divOption.insertAdjacentElement('afterend', textOption)
    textOption.insertAdjacentElement('afterend', newLine)


}


    let but1 = document.createElement('input')
    but1.type = 'button'
    but1.value = 'Finish'
    but1.id = 'butFinish'
    document.querySelector('#content').appendChild(but1)


    but1.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('#content').innerHTML = ''
    let x = document.createElement('div')
    x.id = 'finish-area'

    document.querySelector('#content').appendChild(d).innerHTML = '<h4>Complete!!!</h4><br> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium consequatur cum eius explicabo, illo laudantium odio optio perspiciatis placeat praesentium quis repellendus saepe tempora vero voluptatem? Animi laboriosam officia quaerat.'

    supervisor.stop()
    supervisor.logout()

})

}, 3000)

} catch (e) {
    console.log(e)

}


})


