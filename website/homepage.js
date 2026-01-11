//const templateText = require('event_list_template.js');

async function applyEvents() {
    //const templateText = document.getElementById("event_list_template").innerHTML;
    const res = await fetch('event_list_template.js');
    const templateTest = await res.body
    console.log(templateText);
    const template = Handlebars.compile(templateText);
    const response = await fetch('test.json');
    const json = await response.json();
    const data = template(json);
    document.getElementById("guide-table").innerHTML += data;
    console.log(json);
    console.log(document.getElementById("guide-table").innerHTML);
}

applyEvents();