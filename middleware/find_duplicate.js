//  THIS METHODE FINDS ALL THE DUPLICATED VALUE IN AN ARRAY AND GETS THE NUMBER OF TIMES IT WAS DUPLICATED
module.exports = (array) => {
    // COUNTS THE DUPLICATE
    const count = {};
    // GETS THE RESULT IN AN OBJECT
    const result = [];

    array.forEach(item => {
        // IF ITEM IS IN COUNT ADD 1 AND RETURN
        if (count[item]) {
            count[item] += 1;
            return;
        }
        // ELSE ONLY ONE FOUND SO JUST ASSIGN 1
        count[item] = 1;
    });


    for (let prop in count) {
        result.push({
            name: prop.valueOf(),
            length: count[prop]
        });
    }
    return result;
}