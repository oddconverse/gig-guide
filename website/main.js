Handlebars.registerHelper("dateString", (date) => {
    return new Handlebars.SafeString(date.toLocaleDateString('en-AU'));
});