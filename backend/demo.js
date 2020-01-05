function doSomething(connectionString) {
   return new Promise((resolve, reject) => {
       resolve('Connected to ' + connectionString);
   })
}

doSomething("mongodb").then(value => {
    console.log(value);
});


async function test() {
    const value = await doSomething("mongodb async");
    console.log(value);
    return `${value} has been awaited.`;
}

test().then(value => {
    console.log(value);
});

async  function test2() {
    const value2 = await test();
    console.log(value2);
}

test2();
